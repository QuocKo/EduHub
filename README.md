B1: Giải nén

B2: Bật cmd từ windows gõ: C:\Users\Admins>py -m venv D:\classy\venv

B3: cd từ admins qua file repo rồi gõ .\venv\Scripts\activate

B4: sau khi hiện (venv)D:\classy thì cd qua backend

B5: tải dependency: pip install -r requirements.txt ( tải xong đừng tắt cmd vội nhé )
Có vài dependency bị outdate, chịu khó tải tay 1 vài cái này:
pip install Pillow==9.3.0
pip install Pillow mysqlclient
pip install django
pip install django
pip install django-environ
pip install django-cors-headers
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install coreapi
Tải hết đống này là hết bị lỗi

B6: sau khi tải xong thì mở folder backend, mở file cms_backend vào chỉnh file .env để điền thông tin email/password host ( mail đăng kí với trường để host, giờ trường chưa thông báo thì sau sẽ có group zalo của trường, join vào đấy sẽ có thông tin nha)

B7: vào file settings.py kiếm chỗ config DATABASE, đổi password theo MySQL của bản thân, host thì để local nếu trường chưa thông báo, thông báo rồi thì để host của trường vào.

B8: Vào MySQL tạo db tên cms

B9: vào tiếp cmd có (venv) gõ: py manage.py makemigrations để xem thay đổi 

B10: gõ py manage.py migrate để nhập bảng

B11: gõ py manage.py loaddata users.json để nhập data users ( nhớ vào db check bảng  users xem có data chưa )

B11: gõ py manage.py loaddata users.json để nhập data core ( nhớ vào db check từng bảng xem có data chưa )

B12: py manage.py runserver để chạy app be

Python 3.11.9
node  v18.18.0
npm 9.8.1

Cách đăng nhập: 

Đăng nhập ADMIN: cmsadmin01@mail.com/ cmsadmin ( default )
Đăng nhập Student: 
![alt text](image.png)
email/ pass: CMS + 0 + Class name + Section + SRN
vd: CMS012B0856
![alt text](image-1.png)
Đăng nhập Teacher:
email/ pass: CMS + TRN
vd: CMST023

Khi trường cho host db rồi, thì thao tác nhập data db y chang nha. Nhớ vào đổi HOST, USER, PASSWORD theo cloud của trường rồi nhập data db như hướng dẫn ở trên