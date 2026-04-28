<div dir="rtl">

# 📞 منشی هوشمند هژی
### Hozhi AI Phone Receptionist

> سیستم منشی تلفنی هوشمند مبتنی بر هوش مصنوعی برای کسب‌وکارها

**© تمام حقوق مادی و معنوی این نرم‌افزار متعلق به محمد هژبری است**

---

## ✨ ویژگی‌ها

- 🤖 پشتیبانی از ۶ ارائه‌دهنده AI (Anthropic، OpenAI، Google، DeepSeek، OpenRouter، Mistral)
- 📂 آپلود اسناد PDF، Word، TXT برای آموزش منشی
- ❓ مدیریت سوالات متداول
- 🕐 تنظیم ساعات کاری هفتگی
- 🔀 انتقال تماس به اپراتور انسانی
- ☁️ اتصال به Twilio (سرویس تلفن ابری)
- 📊 گزارش و آمار تماس‌ها
- 💾 ذخیره‌سازی در localStorage (بدون نیاز به سرور)
- ⚡ بهینه‌سازی مصرف توکن

---

## 🚀 راه‌اندازی روی Netlify

### روش ۱ — آپلود مستقیم (ساده‌ترین روش)
1. به [app.netlify.com](https://app.netlify.com) بروید
2. روی **"Add new site" → "Deploy manually"** کلیک کنید
3. پوشه پروژه را drag & drop کنید
4. تمام! سایت شما آنلاین است ✓

### روش ۲ — از GitHub
```bash
# کلون کردن
git clone https://github.com/your-username/hozhi-ai-receptionist.git
cd hozhi-ai-receptionist

# Push به GitHub
git add .
git commit -m "Initial commit"
git push origin main
```
سپس در Netlify: **"Add new site" → "Import from Git"** → ریپو را انتخاب کنید.

---

## 📁 ساختار پروژه

```
hozhi-ai-receptionist/
├── index.html          ← فایل اصلی HTML
├── netlify.toml        ← تنظیمات Netlify
├── README.md           ← این فایل
└── src/
    ├── style.css       ← استایل‌ها (فونت Vazirmatn، تم تاریک)
    ├── data.js         ← داده‌های ثابت (مدل‌ها، endpointها)
    ├── storage.js      ← localStorage + helper functions
    ├── ai.js           ← ارتباط با API هوش مصنوعی
    ├── pages.js        ← HTML تمام صفحات
    └── app.js          ← منطق اصلی برنامه
```

---

## 🎮 راهنمای استفاده

### مرحله ۱ — اطلاعات کسب‌وکار
بخش **کسب‌وکار** را کامل کنید (نام، توضیح، آدرس، شماره تماس)

### مرحله ۲ — آپلود اسناد
در بخش **اسناد کسب‌وکار** فایل‌های PDF یا Word خود را آپلود کنید

### مرحله ۳ — سوالات متداول
سوالات پرتکرار مشتریان و پاسخ‌شان را وارد کنید

### مرحله ۴ — هوش مصنوعی
ارائه‌دهنده، مدل و API Key خود را وارد کنید

### مرحله ۵ — آزمایش
به بخش **آزمایش منشی** بروید و سوال بپرسید

---

## 🔑 دریافت API Key

| ارائه‌دهنده | لینک | فارسی |
|---|---|---|
| Anthropic | [console.anthropic.com](https://console.anthropic.com) | ⭐⭐⭐⭐⭐ |
| OpenAI | [platform.openai.com](https://platform.openai.com) | ⭐⭐⭐⭐⭐ |
| Google | [aistudio.google.com](https://aistudio.google.com) | ⭐⭐⭐⭐ |
| DeepSeek | [platform.deepseek.com](https://platform.deepseek.com) | ⭐⭐⭐⭐ |
| OpenRouter | [openrouter.ai](https://openrouter.ai) | ⭐⭐⭐⭐ |

---

## 📞 Twilio (تلفن ابری)

1. اکانت رایگان بسازید: [twilio.com](https://www.twilio.com)
2. شماره مجازی دریافت کنید ($15 اعتبار رایگان)
3. Webhook را روی سرور خود تنظیم کنید
4. اطلاعات را در بخش **خط Twilio** وارد کنید

---

## 📄 لایسنس

**© تمام حقوق مادی و معنوی این نرم‌افزار متعلق به محمد هژبری است**  
All rights reserved — Hozhi AI — 2025

</div>
