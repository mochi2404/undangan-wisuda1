# 📖 SETUP.md – Panduan Lengkap Deploy & Integrasi Neon DB

## 🎯 Apa yang Sudah Siap

| File | Fungsi |
|------|--------|
| `index.html` | Halaman undangan utama |
| `admin.html` | Panel admin untuk kelola tamu & lihat RSVP |
| `vercel.json` | Konfigurasi routing Vercel |
| `api/rsvp.js` | Endpoint Neon untuk simpan dan baca RSVP |
| `package.json` | Dependensi Vercel serverless untuk Neon |
| `SETUP.md` | Panduan ini |

---

## 🔥 LANGKAH 1 – Setup Neon DB (WAJIB untuk RSVP Bersama)

Neon DB diperlukan agar RSVP dari semua link undangan bisa tersimpan di database bersama.  
**Neon Serverless PostgreSQL** cocok untuk penyimpanan RSVP global dan bisa dibaca oleh admin serta pengunjung.

### 1.1 Buat Project Neon DB

1. Buka [neon.tech](https://neon.tech) dan masuk atau daftar.
2. Buat project baru dan buat database serverless PostgreSQL.
3. Salin connection string yang disebut `NEON_DATABASE_URL`.

### 1.2 Buat Realtime Database

1. Di sidebar kiri, klik **"Build"** → **"Realtime Database"**
2. Klik **"Create Database"**
3. Pilih lokasi **Singapore (asia-southeast1)** (terdekat untuk Indonesia)
4. Pilih **"Start in test mode"** (untuk sementara, aman untuk testing)
5. Klik **"Enable"**

### 1.3 Ambil Konfigurasi Firebase

1. Klik ⚙️ ikon gear di sidebar → **"Project settings"**
2. Scroll ke bawah ke bagian **"Your apps"**
3. Klik ikon **`</>`** (Web app)
4. Daftarkan app dengan nama apa saja (misal: `undangan-web`)
5. **Salin konfigurasi** yang muncul, bentuknya seperti ini:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "undangan-wisuda-putri.firebaseapp.com",
  databaseURL: "https://undangan-wisuda-putri-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "undangan-wisuda-putri",
  storageBucket: "undangan-wisuda-putri.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 1.2 Atur Variabel Lingkungan di Vercel

1. Buka dashboard Vercel project kamu.
2. Pilih menu **Settings** -> **Environment Variables**.
3. Tambahkan variabel:

   - `NEON_DATABASE_URL` = `<connection string Neon kamu>`

4. Deploy ulang project setelah menyimpan variabel.

### 1.3 Konfigurasi Neon Otomatis

File `api/rsvp.js` akan membuat tabel `rsvp` secara otomatis saat pertama kali dipanggil.

### 1.4 Catatan penting

Jika Neon API belum aktif atau variabel lingkungan belum diset, undangan akan menampilkan fallback lokal. Namun RSVP global hanya akan berfungsi setelah Neon DB terkonfigurasi.

### 1.5 Atur Aturan Keamanan Database

Di Firebase Console → Realtime Database → **Rules**, paste aturan ini:

```json
{
  "rules": {
    "rsvp": {
      ".read": false,
      ".write": true
    },
    "invitations": {
      ".read": false,
      ".write": false
    }
  }
}
```

> ⚠️ **Penting:** Aturan ini memungkinkan tamu mengirim RSVP tapi tidak bisa membaca data orang lain. Hanya admin (melalui Firebase Console) yang bisa melihat semua data.

---

## 🚀 LANGKAH 2 – Deploy ke Vercel

### Cara A: Via GitHub (Direkomendasikan)

1. **Buat repository GitHub baru:**
   - Buka [github.com](https://github.com) → klik **"New repository"**
   - Nama repo: `undangan-wisuda` (atau sesuai keinginan)
   - Set ke **Public** atau **Private**

2. **Upload semua file ke GitHub:**
   - Klik **"uploading an existing file"**
   - Upload: `index.html`, `admin.html`, `vercel.json`, `SETUP.md`

3. **Deploy ke Vercel:**
   - Buka [vercel.com](https://vercel.com) → Login dengan GitHub
   - Klik **"Add New"** → **"Project"**
   - Pilih repository yang baru dibuat
   - Klik **"Deploy"**
   - Tunggu beberapa detik → 🎉 Website online!

### Cara B: Via Vercel CLI

```bash
# Install Vercel CLI (sekali saja)
npm install -g vercel

# Masuk ke folder project
cd "c:\Users\Asus\Documents\New folder"

# Deploy
vercel

# Ikuti instruksi di layar:
# - Link to existing project? → N
# - Project name: undangan-wisuda-putri
# - Directory: ./
# - Override settings? → N
```

---

## 🔗 LANGKAH 3 – Gunakan Panel Admin

Setelah deploy, akses panel admin di:
```
https://nama-project-kamu.vercel.app/admin
```

**Password default:** `wisuda2024`
> Ganti password di `admin.html` → cari `const ADMIN_PASSWORD = "wisuda2024";`

### Cara Membuat Link Undangan Personal:

1. Buka `/admin` → Login
2. Klik **"Kelola Tamu"**
3. Ketik nama tamu (contoh: `Budi Santoso dan Keluarga`)
4. Klik **"Buat Link"**
5. Salin link yang dihasilkan (contoh: `https://undangan-wisuda.vercel.app/?to=Budi+Santoso+dan+Keluarga`)
6. Kirim link tersebut ke tamu via WhatsApp/Email

---

## 💬 LANGKAH 4 – Cara Kerja Link Kustom

| URL | Nama yang tampil di Cover |
|-----|--------------------------|
| `https://undangan.vercel.app/` | Nama Tamu Undangan (default) |
| `https://undangan.vercel.app/?to=Budi+Santoso` | Budi Santoso |
| `https://undangan.vercel.app/?to=Keluarga+Ahmad` | Keluarga Ahmad |
| `https://undangan.vercel.app/?to=Rekan+Kerja+Bu+Sari` | Rekan Kerja Bu Sari |

Semua link menampilkan **konten undangan yang sama** — hanya nama di cover yang berubah.  
Semua RSVP dari link manapun akan **terkumpul di satu tempat** dan bisa dilihat di panel admin.

---

## 📊 Fitur Panel Admin

| Fitur | Keterangan |
|-------|-----------|
| 🔐 Login | Password protected |
| 📊 Dashboard | Statistik total tamu, total RSVP, hadir/tidak |
| 👥 Kelola Tamu | Buat, salin, hapus link undangan |
| 📬 Semua RSVP | Lihat semua respon dari semua link |
| 🔍 Filter & Cari | Filter by hadir/tidak, search by nama |
| 📥 Export CSV | Download data RSVP ke Excel |

---

## ❓ FAQ

**Q: Apakah Firebase berbayar?**  
A: Tidak untuk skala undangan. Firebase Spark Plan (gratis) cukup untuk ribuan RSVP.

**Q: Apa yang terjadi jika Firebase tidak dikonfigurasi?**  
A: Website tetap berfungsi, tapi RSVP hanya tersimpan di browser masing-masing tamu (tidak bisa dilihat dari admin panel). Cukup untuk testing lokal.

**Q: Bagaimana cara ganti nama wisudawan?**  
A: Buka `index.html`, cari `Putri Anindya, S.E.` dan ganti dengan nama yang diinginkan.

**Q: Bagaimana cara ganti tanggal acara?**  
A: Buka `index.html`, cari `Minggu, 25 Agustus 2024` dan sesuaikan.

**Q: Bisakah satu orang punya banyak link?**  
A: Bisa! Buat link sebanyak yang dibutuhkan. Semua RSVP tetap terkumpul di panel admin.
