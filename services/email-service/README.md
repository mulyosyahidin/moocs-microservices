# Email Service

Merupakan _service_ yang bertanggung jawab untuk mengirimkan email ke alamat email yang dituju. _Service_ ini melakukan langganan ke _message broker_ RabbitMQ untuk menerima pesan yang akan dikirimkan ke alamat email yang dituju.

## _Service_ Endpoints
_Service_ ini tidak memiliki _endpoints_ apapun.

## _Service Tech Stack_
Berikut adalah _tech stack_ yang digunakan oleh _service_ ini:
- NodeJS 20.12.1

## _Third Party Package_
Berikut merupakan _package_ pihak ketiga yang digunakan dalam service ini:
- Package [**amqplib** 0.10.3](https://github.com/amqp-node/amqplib)
- Package [**nodemailer** 6.9.13](https://github.com/nodemailer/nodemailer)

## _Third Party Email Service_
Untuk mengirimkan email, _service_ ini menggunakan layanan Brevo. Layanan ini memungkinkan pengguna untuk mengirimkan email dengan mudah dan cepat melalui API. Untuk informasi lebih lanjut, silahkan kunjungi [**Brevo**](https://brevo.com/).

## _RabbitMQ_
Berikut merupakan _exchange_ dan _queue_ yang diikuti oleh _service_ ini.
- `exchange`: `email`
- `queue`: `send-email`
