# İnteraktif Basit Bilgi Yarışması Sistemi

> Tamamen özelleştirilebilir, dinamik gruplu, web tabanlı interaktif bilgi yarışması uygulaması.

Bu proje, HTML, CSS ve JavaScript kullanılarak oluşturulmuş, zengin özelliklere sahip bir bilgi yarışması platformudur. 2 ila 10 arasında dinamik olarak oluşturulan grupların yarışmasına olanak tanır, şıklı ve klasik soru tiplerini destekler ve yarışma yöneticisi için tam zamanlayıcı kontrolü sunar.

## 📸 Ekran Görüntüleri

![Ana Ekran](https://i.hizliresim.com/7i8owp3.png "Ana Ekran")
![Grup Oluşturma](https://i.hizliresim.com/cx3rngo.png "Grup Oluşturma")
![Klasik Soru Ekranı](https://i.hizliresim.com/ssxx8w4.png "Klasik Soru Ekranı")
![Şıklı Soru Ekranı](https://i.hizliresim.com/jejpedg.png "Şıklı Soru Ekranı")
![Sonuç Ekranı](https://i.hizliresim.com/9iis8hf.png "Sonuç Ekranı")
![Podyum](https://i.hizliresim.com/f71rnix.png "Yarışma Sonu Podyumu")

## ✨ Özellikler

Bu projede yer alan temel özellikler:

* **Dinamik Grup Yönetimi:**
    * Ana ekrandan "Grupları Yönet" menüsüne erişim.
    * En az 2, en fazla 10 grup ekleme, isimlendirme ve silme.
    * En az 2 grup oluşturulmadan yarışmayı başlatmayı engelleyen doğrulama.
* **Gelişmiş Soru Sistemi:**
    * **Kategori Desteği:** Her soru için kategori ("Tarih", "Coğrafya" vb.) belirleme.
    * **İki Soru Tipi:**
        1.  **Klasik:** Sadece sorunun gösterildiği, cevabın açık uçlu olduğu sorular.
        2.  **Şıklı:** Dört seçenekli çoktan seçmeli sorular.
    * **Soru Sayacı:** `Soru: 3 / 10` şeklinde mevcut ilerlemeyi gösteren sayaç.
* **İnteraktif Yarışma Ekranı:**
    * Soru başına 60 saniyelik ayarlanabilir geri sayım.
    * Soru sırasında çalan fon müziği.
    * **Tam Yönetici Kontrolü:**
        * `Durdur`: Zamanlayıcıyı ve müziği duraklatır.
        * `Devam Ettir`: Kaldığı yerden devam ettirir.
        * `Süreyi Bitir`: Zamanı anında sıfırlar ve sonuç ekranına geçer.
* **Puanlama ve Sonuçlar:**
    * Süre bitiminde doğru cevabı (şıklı sorularda tüm şıklarla beraber) gösteren sonuç ekranı.
    * Tüm gruplar için dinamik olarak oluşturulan **manuel puan giriş** alanları.
    * Her 5 soruda bir güncellenen genel **Liderlik Tablosu**.
* **Yarışma Sonu:**
    * Tüm sorular bittiğinde, puanlara göre sıralanmış ilk 3 grubu gösteren şık bir **Podyum (Kupa) Ekranı**.
    * "Yeni Oyun" butonu ile ana ekrana dönüp aynı gruplarla tekrar başlama imkanı.

## 💻 Kullanılan Teknolojiler

* **🚀 HTML5:** Uygulamanın temel iskeleti ve ekranları.
* **🎨 CSS3:** Modern ve canlı bir görünüm için (Flexbox, Grid, Gradient arka planlar, gölgeler ve animasyonlar).
* **🧠 JavaScript:** Tüm oyun mantığı, zamanlayıcılar, dinamik HTML manipülasyonu, grup yönetimi ve ekran geçişleri.

## 🚀 Kurulum ve Çalıştırma

Bu projeyi yerel makinenizde çalıştırmak çok basittir:

1.  Bu depoyu (repository) indirin veya klonlayın.
2.  İndirdiğiniz klasörde `index.html`, `style.css` ve `app.js` dosyalarının bulunduğundan emin olun.
3.  **Önemli:** Fon müziğinin çalışması için bu dosyaların yanına `music.mp3` adında bir müzik dosyası ekleyin.
4.  `index.html` dosyasına çift tıklayarak projeyi herhangi bir web tarayıcısında (Google Chrome, Firefox, Edge vb.) açın.
5.  **Artık yarışmaya hazırsınız!**

## ⚙️ Özelleştirme: Yeni Sorular Ekleme

Yarışmaya kendi sorularınızı eklemek çok kolaydır.

1.  `app.js` dosyasını bir metin düzenleyici ile açın.
2.  Dosyanın en üstündeki `const sorular = [ ... ]` dizisini bulun.
3.  Aşağıdaki formatlara uygun olarak istediğiniz kadar soru objesi ekleyin:

### Klasik Soru Örneği:

```javascript
{
    kategori: "Kategorisi (örn: Tarih)",
    tip: "Klasik",
    soru: "Sorunuzun metni buraya gelecek.",
    dogruCevap: "Cevabınız buraya gelecek."
},
```
### Şıklı Soru Örneği:

```javascript
{
    kategori: "Kategorisi (örn: Coğrafya)",
    tip: "Şıklı",
    soru: "Sorunuzun metni buraya gelecek?",
    secenekler: ["Seçenek A", "Seçenek B", "Seçenek C", "Seçenek D"],
    dogruCevap: "Doğru olan seçeneğin metni (örn: Seçenek B)"
},
```