"# express-mssql-restapi" 

Veri Tabanı Oluştur

create database SampleDB;  //burada veritabanı yetkilendirme işlemleri de yapılmalıdır.

Paketler

$ npm install bcryptjs --save

$ npm install express --save

$ npm install jsonwebtoken --save

$ npm install nodemon --save

$ npm install sequelize --save

$ npm install tedious --save 

$ npm install sequelize-msnodesqlv8 --save



Test

Test etmek için önce paketleri yükleyin ve çalıştırın.

$ npm install

$ npm start

Oluşturulan servisler ise aşağıdaki gibidir.

S1)
 http://localhost:3000/signup  //(POST) kullanıcı oluşturmak için kullanılır
 
 
 {
     "name": "person1",

     "username": "person1",

     "email": "person1@gmail.com",

     "roles": "user",  

     "password": "hmt123456"
 }



S2) 
 http://localhost:3000/signin  //(POST methoduyla istekte bulunulmalı) oturum açmak için kullanılır.
 {

     "email": "person1@gmail.com",

     "password": "hmt123456"
 }



S3)
http://localhost:3000/notes   //(POST methoduyla istekte bulunulmalı)  notları eklemek için kullanılır.



{

    "email": "person1@gmail.com",

    "detail": "güncel "
}

**not eklerken Header kısmına 
x-access-token: giriş yaparken alınan token 
yazılmalıdır.



S4)
http://localhost:3000/notes (GET) //notları listeleme için kullanılır



**not listelerken Header kısmına 
x-access-token: giriş yaparken alınan token 
yazılmalıdır.



S5)
http://localhost:3000/note:id (DELETE) //notu silmek için kullanılır



**not silerken Header kısmına 
x-access-token: giriş yaparken alınan token 
yazılmalıdır.


S6)
http://localhost:3000/note:id (UPDATED) //notu güncellemek için kullanılır


{

    "email": "person2@gmail.com",

    "detail": "yayınlandı "
}


**not güncellerken Header kısmına 
x-access-token: giriş yaparken alınan token 
yazılmalıdır.


#
