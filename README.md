# Our Little Archive

Satu domain, banyak cerita. Semua path memakai trailing slash (`/maaf/01/`) supaya path relatif tiap website selalu benar. Netlify dan Vercel sudah dikonfigurasi (netlify.toml, vercel.json); GitHub Pages juga bekerja karena setiap folder punya index.html.

## Menjalankan lokal
Halaman archive memuat data/websites.json lewat fetch, jadi jangan buka dengan klik dua kali (file://). Jalankan:

    python3 -m http.server 8000

lalu buka http://localhost:8000/

## Web 01
File audio harus ada di `maaf/01/1.mp3` (Web 01 memanggil `./1.mp3`). File ini belum ikut karena tidak ada di unggahan.

## Menambah Web baru (misal 03)
1. Ganti isi `maaf/03/index.html` dengan website barunya (aset di folder itu juga).
2. Edit entri id "03" di `data/websites.json`: title, description, date, thumbnail, `"status": "available"`.
3. Opsional: tambahkan script nav sebelum `</body>`: `<script src="../../assets/shared/nav.js"></script>`.
Untuk Web 05 dst: buat folder `maaf/05/` dan tambah satu entri JSON baru. Archive dan Previous/Next Story ikut otomatis.
