# weatherapp

Teknoloji :
- Node JS / PHP / java ( Python ... vs. (Backend)
- Angular JS (Frontend)

Problem : Online Hava Durumu Sorgulama (OHDS) projesi
0- Hava durumu bilgisi https://www.wunderground.com/weather/api/d/docs uzerindeki API'nin ucretsiz surumu kullanilarak JSON verinin cekilerek parse edilmesi sonucu elde edilecektir.

1- MySQL  veritabani (VT) yonetim sistemi kullanarak calisacak dinamik bir hava durumu uygulamasi gelistirmesi beklenmektedir.

2- Uygulamaya kullanici adi - sifre bilgileri belirtilerek giris yapilacaktir.

3- Kullanici yetkisi admin / standart seklinde farkli 2 tipte kullanici tanimlanabilecek bir tablo yapisi VT uzerinde olusturulacaktir.

4- Giris yapildiginda kullaniciya asagidaki menuler yetki tipine gore gosterilecektir :
* Menu-1 : Lokasyon Duzenle
* Menu-2 : Hava Durumu
* Menu-3 : Kullanici Duzenle
* Menu-4 : Raporlar

5- Menu-1 ve Menu-3 sadece admin yetkisine sahip kullanicilara gorunur olacaktir.

6- Menu-1 icinde ekleme, silme, guncelleme ve listeleme yetenekleri olan bir ekran yapisi yer alacaktir. Bu ekran uzerinden yeni lokasyonlar https://www.wunderground.com/weather/api/d/docs API'sinde kullanilmak uzere metin olarak eklenip VT uzerinde tutulabilecektir. Ornegin; Istanbul, San Fransisco gibi kullanici ne yazarsa kabul edilecektir. (https://www.wunderground.com/weather/api/d/docs API'sinin bekledigi isimler manuel admin tarafindan ekrandan duzeltilecektir. Uygun olmayan isim kontrolu gibi extra bir kontrole gerek yoktur.)

7- Menu-3 icinde kullanici ekleme, guncelleme, silme ve listeleme yetenekleri yer alacaktir. Tanri kullanici (username = root olan kullanici) silinemeyecek veya sifresi guncellenemeyecektir. VT'de kullanici tablosu ilk yaratildiginda elle bu kullanici girilerek ekrandan mudahale yapilmasi sadece username = root olan kullanici icin engellenecektir.

8- Menu-2'de ise kullanici menu-1'de girmis oldugu lokasyonlardan birini combobox'dan secerek "Hava Durumu Sorgula" butonuna tikladiginda https://www.wunderground.com/weather/api/d/docs API'si uzerinden sorgulama yapilarak sonuc ekranda gosterilecektir. :Yapilan her sorgulama islemi VT uzerinde sorgulama tarihcesi seklinde asagidaki formatta loglanacaktir :

- sorgulayan kullanici id
- sorgulama zamani
- sorgulama yapilan lokasyon id
- sorgulama yapan kullanici ip adresi
- sorgulama sonucu
- sorgulama sonuc getirme suresi (mili saniye cinsinden)
- sorgulama durumu (BASARILI / BASARISIZ)

9- Menu-4'de combobox'dan secilen kullanici icin yapilmis sorgulama islemleri order by sorgulama zaman DESC seklinde son yapilan sorgulama en ustte gosterilecek sekilde listelenecektir. Rapor ekraninda sorgulama zaman araligi, sorgulama yapilan lokasyon ve sorgulama durumu kriterlerine gore de filtreleme yapilabilecektir.