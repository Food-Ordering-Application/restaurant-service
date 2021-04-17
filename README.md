# Hướng dẫn chạy backend với docker
- Tạo file docker.env giống cấu trúc như docker.example.env trong thư mục env
- Tạo các file .env giống như .env.example trong các thư mục api-gateway, microservices/user-service
- Chạy docker-compose up --build -d
- Dùng lệnh "docker inspect postgres" tìm ra địa chỉ IP của postgres
- Truy cập vào pgAdmin ở đường dẫn localhost:8080/ Nhập username password tương ứng với PGADMIN_DEFAULT_EMAIL PGADMIN_DEFAULT_PASSWORD trong file docker.env để đăng nhập
- Chuột phải Server -> Create. Đặt tên cho server, ở tab Connection nhập địa chỉ IP vừa tìm đc, nhập tiếp username,password tương ứng POSTGRES_USER POSTGRES_PASSWORD trong file docker.env -> Kết nối postgres thành công
- Apiendpoints: localhost:8000/
- RabbitMQ: localhost:15672/ username password tương ứng RABBITMQ_DEFAULT_USER RABBITMQ_DEFAULT_PASS trong docker.env