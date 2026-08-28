# Panduan Lengkap Memasang & Mempublikasikan IPS Maestro di Google Apps Script (GAS)

Aplikasi **IPS Maestro** (Karya **Catur Pamungkas, S.Pd.,Gr.** - [toer.my.id](https://toer.my.id)) dapat dipublikasikan dan dijalankan 100% gratis secara mandiri di **Google Apps Script** (infrastruktur server Google Drive Anda sendiri).

---

## 🌟 Keunggulan Edisi Google Apps Script (GAS)
1. **100% Gratis Selamanya**: Dihosting langsung di cloud Google Drive pribadi Anda tanpa biaya langganan server/hosting.
2. **Kemandirian Kuota & Privasi Data**: Setiap pengguna login dengan akun Google dan Kunci API Gemini milik masing-masing, menjamin keamanan privasi dan kuota mandiri.
3. **Ekspor Langsung ke Google Docs**: 1-klik untuk mengekspor Modul Ajar, LKPD, dan Bank Soal langsung menjadi file Google Docs di Google Drive.
4. **Unduh Format Word (.doc) & PDF**: Hasil dokumen dapat langsung dicetak atau diunduh dalam format Microsoft Word dengan tata letak KOP sekolah resmi.
5. **Watermark Atribusi Hak Cipta**: Setiap dokumen resmi memuat tanda kepemilikan dan tautan pengembang [toer.my.id](https://toer.my.id).
6. **Dukungan Penuh & Saluran Komunitas**: Terhubung langsung ke [Saluran WhatsApp Resmi Guru IPS Maestro](https://whatsapp.com/channel/0029Vb6R2Ny2v1J1dll5Mq27).

---

## 🚀 Langkah-Langkah Deploy (Hanya 3 Menit)

### Langkah 1: Buka Google Apps Script
1. Buka browser (Google Chrome disarankan) dan kunjungi: **[https://script.google.com/home/start](https://script.google.com/home/start)**
2. Pastikan Anda sudah login ke akun Google aktif Anda.
3. Klik tombol **"Project Baru"** (*New project*) di kiri atas.
4. Ubah nama proyek di bagian kiri atas (dari *Untitled project*) menjadi: **`IPS Maestro Web App`**.

---

### Langkah 2: Masukkan Kode Backend (`Code.gs`)
1. Buka file **`Code.gs`** di editor Google Apps Script.
2. Hapus semua teks bawaan yang ada di editor.
3. Buka file **`gas/Code.gs`** dari repositori ini, salin (*copy*) seluruh isinya, lalu tempel (*paste*) ke editor `Code.gs`.
4. Tekan tombol **Simpan** (ikon disket) atau tekan kombinasi keyboard `Ctrl + S` (Windows) / `Cmd + S` (Mac).

---

### Langkah 3: Buat Berkas Antarmuka (`Index.html`)
1. Pada bilah menu sebelah kiri (bagian *Files*), klik ikon tanda tambah (**+**) lalu pilih **HTML**.
2. Beri nama file tepat: **`Index`** (tanpa menuliskan ekstensi `.html`, karena Google Apps Script otomatis menambahkannya).
3. Hapus semua kode bawaan di dalam file `Index.html` tersebut.
4. Buka file **`gas/Index.html`** dari repositori ini, salin (*copy*) seluruh isinya, lalu tempel (*paste*) ke editor `Index.html`.
5. Tekan tombol **Simpan** (`Ctrl + S`).

---

### Langkah 4: Publikasikan sebagai Web App (Penerapan Baru)
1. Di pojok kanan atas editor Google Apps Script, klik tombol biru **Deploy** (Penerapan) > pilih **New deployment** (Penerapan baru).
2. Klik ikon **Gerigi** (di sebelah *Select type*) > pilih jenis **Web app** (Aplikasi web).
3. Isi konfigurasi penerapan sebagai berikut:
   - **Description**: `IPS Maestro Enterprise v1.2 - Karya Catur Pamungkas, S.Pd.,Gr.`
   - **Execute as** (*Jalankan sebagai*): 
     - Pilih **`User accessing the web app`** *(Pengguna yang mengakses aplikasi web)* ➔ Direkomendasikan agar dokumen Google Docs tersimpan di Google Drive masing-masing pengguna.
     - *Atau* pilih **`Me`** jika Anda ingin menjalankan di bawah otorisasi akun pembuat saja.
   - **Who has access** (*Siapa yang memiliki akses*): 
     - Pilih **`Anyone with Google account`** atau **`Anyone`** *(Siapa saja)*.
4. Klik tombol **Deploy** (Terapkan).
5. Pada jendela otorisasi yang muncul:
   - Klik **Authorize access** (Otorisasi akses).
   - Pilih akun Google Anda.
   - Jika muncul peringatan *"Google hasn't verified this app"*, klik **Advanced** (Lanjutan) di bagian bawah > lalu klik **Go to IPS Maestro Web App (unsafe)**.
   - Klik tombol **Allow** (Izinkan).
6. Salin **Web app URL** yang muncul di layar (contoh: `https://script.google.com/macros/s/.../exec`).
7. **Selesai!** Buka tautan tersebut di peramban Anda. Aplikasi IPS Maestro kini siap digunakan secara mandiri kapan saja dari Laptop, Komputer Sekolah, Tablet, maupun Smartphone Anda!

---

## 🔑 Konfigurasi Kunci API Gemini Gratis
1. Buka [https://aistudio.google.com/](https://aistudio.google.com/) dan login dengan akun Google Anda.
2. Klik tombol **"Get API key"** > pilih **"Create API key"**.
3. Salin Kunci API yang berawalan `AIzaSy...`.
4. Di aplikasi web IPS Maestro Anda, klik tombol **"Kunci API"** di pojok kanan atas, lalu tempelkan kuncinya dan klik **Simpan Pengaturan**.

---

## 📞 Bantuan & Saluran WhatsApp Resmi
- **Pengembang**: Catur Pamungkas, S.Pd.,Gr.
- **Website Resmi**: [https://toer.my.id](https://toer.my.id)
- **Saluran WhatsApp Resmi**: [https://whatsapp.com/channel/0029Vb6R2Ny2v1J1dll5Mq27](https://whatsapp.com/channel/0029Vb6R2Ny2v1J1dll5Mq27)
