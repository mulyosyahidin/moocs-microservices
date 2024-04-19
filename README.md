# Microservices - Massive Open Online Courses

Microservices merupakan sebuah arsitektur pengembangan perangkat lunak yang membagi aplikasi menjadi beberapa bagian yang lebih kecil dan independen. Setiap service dapat berjalan sendiri tanpa tergantung dengan service lainnya serta mampu berkomunikasi dengan service lainnya melalui protokol HTTP, RPC, atau message broker.

Proyek ini merupakan tugas akhir yang menerapkan arsitektur microservices pada pembuatan aplikasi Massive Open Online Courses (MOOCs). Aplikasi ini terdiri dari beberapa service yang masing-masing service memiliki tanggung jawabnya sendiri-sendiri.

## Services
1. **Authentication Service** - Service yang bertanggung jawab untuk melakukan otentikasi pengguna.
2. **Email Service** - Stateless service untuk mengirim email.
3. On Progress...

## API Gateway
API Gateway merupakan service yang bertanggung jawab untuk menerima request dari client dan memproksikan request tersebut ke service yang sesuai. API Gateway juga bertanggung jawab untuk melakukan autentikasi dan autorisasi pengguna.

Proyek ini menggunakan [KrakenD](https://www.krakend.io/) sebagai API Gateway.
