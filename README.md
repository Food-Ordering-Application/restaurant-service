- Tạo file docker.env giống cấu trúc như docker.example.env trong thư mục env
- Tạo các file .env giống như .env.example trong các thư mục api-gateway, microservices/*-service (user,restaurant,order service)
- Chạy docker-compose up --build -d
# Hướng dẫn truy cập database
- Dùng lệnh "docker inspect postgis" tìm ra địa chỉ IP của postgis

- Truy cập vào pgAdmin ở đường dẫn localhost:7999/ 
- Đăng nhập username password tương ứng với PGADMIN_DEFAULT_EMAIL PGADMIN_DEFAULT_PASSWORD trong file docker.env
- Chuột phải Server -> Create. 
- Đặt tên cho server, ở tab Connection nhập địa chỉ IP vừa tìm được 
- Đăng nhập với username,password tương ứng POSTGRES_USER POSTGRES_PASSWORD trong file docker.env -> Kết nối postgres thành công
# Các end point
- Api: localhost:8000/
- Document: localhost:8000/api
- pgAdmin: localhost:7999/
- RabbitMQ: localhost:15672/ (username password tương ứng RABBITMQ_DEFAULT_USER RABBITMQ_DEFAULT_PASS trong docker.env)


## Spec
# Chỉ chạy các service rabbitmq, postgis, pdAdmin
```
docker compose -f docker-compose-spec.yml up --build -d
```
# Các service còn lại 
Ex: API-gateway
```
cd api-gateway
npm run start:dev
```
