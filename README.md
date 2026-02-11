# 2026-peminjaman-ruangan-frontend

## Description
Sistem Peminjaman Ruangan berbasis web yang dikembangkan dengan arsitektur Modern Full-Stack. Project ini mengimplementasikan keamanan tingkat tinggi dengan JWT Authentication dan Role-Based Access Control (RBAC).

## Tech Stack
- Library: React.js (Vite), TypeScript, TailwindCss
- Security: JWT Bearer Token, BCrypt Password Hashing dan RBAC.

## Fitur Utama (RBAC Implementation)
Aplikasi ini membagi hak akses menjadi dua kasta utama yang tersimpan aman di database:
1. Admin Dashboard
- Full Access: Memiliki kontrol penuh terhadap manajemen ruangan.
- Room Management: Dapat menambah ruangan baru melalui AddRoomModal atau langsung lewat web.
- Data Integrity: Memiliki hak khusus untuk menghapus ruangan dengan verifikasi backend.

1. User Dashboard
- Restricted UI: Tombol manajemen (Tambah/hapus) disembunyikan secara dinamis untuk keamanan visual.
- Booking System: Fokus utama pada pencarian dan pemesanan ruangan.

## Security Audit & Testing
Sebagai bukti integritas sistem, saya telah melakukan uji coba penetrasi API (Pen-test) untuk memastikan "Pengaman Backend" bekerja dengan baik:
Method      Endpoint            Role        Status              Result
DELETE      /api/rooms/{id}     User        403 Forbidden       Akses Ditolak. Backend melarang penghapusan data oleh non-admin.
DELETE      /api/rooms/{id}     Admin       204 No Content      Akses Diterima. Data berhasil dihapus oleh otoritas yang sah.
POST        /api/auth/login     Invalid     401 Unauthorized    Akses Gagal. Password/Username tidak sesuai hash BCrypt.