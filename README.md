# Undangan - Single-Page Graduation Invitation Website

Website Undangan Wisuda digital yang elegan dengan tema *Undangan* (kombinasi warna pastel pink, cream, dan mawar). Website ini menggunakan format **Single-Page Application (SPA)** sehingga seluruh konten termuat dalam satu halaman (`index.html`) dengan transisi scroll yang mulus (*smooth scrolling*).

## Struktur & Fitur Single-Page
1. **Cover Overlay**:
   - Tampilan pembuka yang menutupi seluruh layar saat website pertama kali dibuka.
   - Menampilkan nama tamu kustom yang diambil dari URL (contoh: `?to=Nama+Tamu`).
   - Tombol **"BUKA UNDANGAN"** akan menyembunyikan cover secara perlahan, mengaktifkan musik latar belakang, dan menampilkan isi undangan utama.
2. **Smooth Scroll Target**:
   - Menu navigasi di bagian atas (Desktop) dan bawah (Mobile) menggunakan link anchor (`#beranda`, `#detail`, `#galeri`, `#rsvp`) untuk menggulir halaman secara otomatis ke bagian yang dituju.
   - **Scroll Spy**: Menu navigasi atas dan bawah akan menyala (*active style*) secara otomatis sesuai dengan posisi bagian halaman yang sedang dilihat.
3. **Background Music Player**:
   - Musik instrumental piano akan berputar secara otomatis saat undangan dibuka.
   - Disediakan tombol melayang di pojok kanan atas untuk mematikan/menyalakan musik sewaktu-waktu.
4. **Auto-Fill RSVP**:
   - Kolom nama di form RSVP akan terisi secara otomatis sesuai dengan parameter nama tamu (`?to=Nama+Tamu`) yang ada pada link undangan.

---

## Cara Deploy ke Vercel

Karena seluruh website sekarang berada dalam satu file `index.html`, deploy ke Vercel menjadi sangat mudah dan cepat.

### Cara 1: Menggunakan Vercel CLI (Sangat Cepat & Tanpa Git)
1. Buka terminal (Command Prompt / PowerShell / Git Bash) di folder project ini (`c:\Users\Asus\Documents\New folder`).
2. Install Vercel CLI (jika belum):
   ```bash
   npm install -g vercel
   ```
3. Jalankan perintah deploy:
   ```bash
   vercel
   ```
4. Ikuti instruksi di layar:
   - Ketik `Y` untuk menyetujui deployment.
   - Untuk *Link to existing project?*, jawab `N` (No).
   - Berikan nama project (misal: `undangan-wisuda-putri`).
   - Untuk *In which directory is your code located?*, tekan `Enter` (default `./`).
   - Vercel akan otomatis mengenali ini sebagai static website. Untuk modifikasi settings, jawab `N` (No).
5. Vercel akan memproses upload dan memberikan link website yang sudah online!

### Cara 2: Import dari GitHub
1. Buat repository baru di GitHub.
2. Unggah file `index.html` dan `README.md` ke repository tersebut.
3. Masuk ke dashboard [Vercel](https://vercel.com).
4. Klik **Add New** -> **Project**, pilih repository GitHub kamu, lalu klik **Deploy**.

---

## Cara Membuat Link Undangan Kustom untuk Tamu
Setelah dideploy (misalnya URL website kamu adalah `https://undangan-wisuda.vercel.app`), kamu bisa mengirimkan link kustom ke setiap tamu undangan dengan format:

```text
https://undangan-wisuda.vercel.app/?to=Nama+Tamu+Undangan
```

*Contoh:* `https://undangan-wisuda.vercel.app/?to=Budi+Setiawan+dan+Keluarga`
