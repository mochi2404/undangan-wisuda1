import { createPool } from "@neondatabase/serverless";

const pool = createPool(process.env.NEON_DATABASE_URL);

async function ensureTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS rsvp (
      id TEXT PRIMARY KEY,
      nama TEXT NOT NULL,
      pesan TEXT NOT NULL,
      attendance TEXT NOT NULL,
      guests INTEGER NOT NULL DEFAULT 1,
      invited_as TEXT,
      waktu BIGINT NOT NULL
    )
  `);
}

async function getAllEntries(client) {
  const result = await client.query("SELECT * FROM rsvp ORDER BY waktu DESC");
  return result.rows;
}

export default async function handler(req, res) {
  console.log("NEON_DATABASE_URL set:", !!process.env.NEON_DATABASE_URL);
  if (!process.env.NEON_DATABASE_URL) {
    return res.status(500).json({ error: "NEON_DATABASE_URL belum dikonfigurasi" });
  }

  const client = await pool.connect();
  try {
    await ensureTable(client);

    if (req.method === "GET") {
      const rows = await getAllEntries(client);
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const body = req.body;
      const nama = (body?.nama || "").trim();
      const pesan = (body?.pesan || "").trim();
      const attendance = (body?.attendance || "").trim().toUpperCase();
      const guests = Number(body?.guests) || 1;
      const invitedAs = (body?.invitedAs || "").trim();
      const waktu = Date.now();

      if (!nama || !pesan || !attendance) {
        return res.status(400).json({ error: "Nama, pesan, dan kehadiran wajib diisi." });
      }

      const id = `${waktu}-${Math.random().toString(36).slice(2, 8)}`;
      await client.query(
        "INSERT INTO rsvp (id, nama, pesan, attendance, guests, invited_as, waktu) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [id, nama, pesan, attendance, guests, invitedAs, waktu]
      );

      const rows = await getAllEntries(client);
      return res.status(201).json(rows);
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Neon RSVP error:", error);
    return res.status(500).json({ error: "Terjadi kesalahan server. Coba lagi nanti." });
  } finally {
    client.release();
  }
}
