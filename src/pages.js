// ===== Hozhi AI Receptionist — Pages HTML =====
// © محمد هژبری — All Rights Reserved

function renderAllPages() {
  document.getElementById('content').innerHTML = `

    <!-- ===== کسب‌وکار ===== -->
    <div class="page active" id="pg-biz">
      <div class="card">
        <div class="chdr">🏢 مشخصات اصلی</div>
        <div class="g2">
          <div class="fg"><label>نام کسب‌وکار *</label><input id="b-name" placeholder="مثال: کلینیک دکتر رضایی"/></div>
          <div class="fg"><label>حوزه فعالیت *</label>
            <select id="b-type">
              <option value="">انتخاب...</option>
              <option>بهداشت و درمان</option><option>گردشگری</option><option>آموزشی</option>
              <option>فروشگاهی</option><option>خدمات مالی</option><option>رستوران</option>
              <option>ملک</option><option>فناوری اطلاعات</option><option>حقوقی</option><option>سایر</option>
            </select>
          </div>
        </div>
        <div class="g2">
          <div class="fg"><label>شماره تماس</label><input id="b-phone" placeholder="۰۲۱-۱۲۳۴۵۶۷۸"/></div>
          <div class="fg"><label>وب‌سایت</label><input id="b-site" placeholder="www.example.ir"/></div>
        </div>
        <div class="fg"><label>آدرس</label><input id="b-addr" placeholder="تهران، خیابان ولیعصر، پلاک ۱۲"/></div>
        <div class="fg"><label>توضیح کسب‌وکار (منشی از این استفاده می‌کند) *</label>
          <textarea id="b-desc" placeholder="چه خدماتی ارائه می‌دهید؟ قیمت‌ها؟ مزیت رقابتی؟..."></textarea>
        </div>
      </div>
      <div class="card">
        <div class="chdr">🤖 شخصیت منشی</div>
        <div class="g2">
          <div class="fg"><label>اسم منشی</label><input id="b-ainame" placeholder="سارا، آرین، نیلوفر..."/></div>
          <div class="fg"><label>لحن صحبت</label>
            <select id="b-tone">
              <option>رسمی و حرفه‌ای</option><option>دوستانه و صمیمی</option>
              <option>محترمانه و ملایم</option><option>علمی و تخصصی</option>
            </select>
          </div>
        </div>
        <div class="fg"><label>جمله خوش‌آمدگویی</label><input id="b-welcome" placeholder="سلام، به [نام] خوش آمدید، من [منشی] هستم..."/></div>
      </div>
      <button class="btn btn-p" onclick="saveBiz()">💾 ذخیره اطلاعات</button>
    </div>

    <!-- ===== اسناد ===== -->
    <div class="page" id="pg-docs">
      <div class="card">
        <div class="chdr">📂 آپلود اسناد کسب‌وکار</div>
        <div class="info-box" style="margin-bottom:12px">
          فایل‌های PDF، Word یا متن خود را آپلود کنید. منشی محتوای آن‌ها را می‌خواند و برای پاسخ‌دهی استفاده می‌کند.
        </div>
        <div class="upload-area" id="upload-area"
          onclick="document.getElementById('file-inp').click()"
          ondragover="dragOver(event)" ondragleave="dragLeave(event)" ondrop="dropFile(event)">
          <input type="file" id="file-inp" style="display:none" multiple
            accept=".pdf,.doc,.docx,.txt,.md" onchange="handleFiles(this.files)"/>
          <div class="upload-icon">📄</div>
          <div class="upload-title">فایل را اینجا بکشید یا کلیک کنید</div>
          <div class="upload-desc">PDF، Word، TXT، Markdown پشتیبانی می‌شود</div>
        </div>
        <div id="doc-list"></div>
      </div>
      <div class="card">
        <div class="chdr">✍️ ورود مستقیم متن</div>
        <div class="fg"><label>عنوان سند</label><input id="doc-title" placeholder="مثال: لیست قیمت، بیوگرافی..."/></div>
        <div class="fg"><label>محتوای متن</label>
          <textarea id="doc-text" style="min-height:100px" placeholder="متن اطلاعات کسب‌وکار را اینجا وارد کنید..."></textarea>
        </div>
        <button class="btn btn-p btn-s" onclick="addTextDoc()">افزودن سند متنی</button>
      </div>
      <div class="card" id="docs-summary" style="display:none">
        <div class="chdr">📊 خلاصه اسناد</div>
        <div id="docs-stats"></div>
      </div>
    </div>

    <!-- ===== سوالات متداول ===== -->
    <div class="page" id="pg-faq">
      <div class="card">
        <div class="chdr">➕ افزودن سوال جدید</div>
        <div class="fg"><label>سوال مشتری</label><input id="fq-q" placeholder="قیمت ویزیت چقدر است؟"/></div>
        <div class="fg"><label>پاسخ منشی</label><textarea id="fq-a" placeholder="پاسخ کامل و واضح..."></textarea></div>
        <button class="btn btn-p btn-s" onclick="addFaq()">افزودن سوال</button>
      </div>
      <div class="card">
        <div class="chdr">
          📋 سوالات ثبت‌شده
          <span id="faq-cnt" style="background:var(--accent);color:#fff;padding:1px 8px;border-radius:999px;font-size:10px;margin-right:6px">0</span>
        </div>
        <div id="faq-list"><div style="text-align:center;color:var(--text3);font-size:12px;padding:16px">هنوز سوالی ثبت نشده</div></div>
      </div>
      <div class="info-box">سوالات در System Prompt فشرده می‌شوند تا توکن کمتری مصرف شود.</div>
    </div>

    <!-- ===== ساعات کاری ===== -->
    <div class="page" id="pg-hours">
      <div class="card">
        <div class="chdr">🕐 ساعات کاری هفتگی</div>
        <div style="display:grid;grid-template-columns:90px 1fr 1fr 42px;gap:10px;font-size:10px;color:var(--text3);padding:0 0 8px;border-bottom:1px solid var(--border);margin-bottom:4px">
          <span>روز</span><span>شروع</span><span>پایان</span><span>باز</span>
        </div>
        <div id="hours-rows"></div>
        <button class="btn btn-p btn-s" style="margin-top:12px" onclick="saveHours()">💾 ذخیره ساعات</button>
      </div>
      <div class="card">
        <div class="chdr">🔇 پیام ساعات تعطیل</div>
        <div class="fg"><label>متن پیام</label>
          <textarea id="closed-msg">متأسفانه در حال حاضر خارج از ساعت کاری هستیم. ساعات کاری ما شنبه تا چهارشنبه از ۹ صبح تا ۵ بعدازظهر است. لطفاً در ساعات کاری تماس بگیرید.</textarea>
        </div>
        <button class="btn btn-p btn-s" onclick="saveHours()">💾 ذخیره</button>
      </div>
    </div>

    <!-- ===== هوش مصنوعی ===== -->
    <div class="page" id="pg-aiset">
      <div class="card">
        <div class="chdr">🧠 انتخاب مدل هوش مصنوعی</div>
        <p style="font-size:11px;color:var(--text3);margin-bottom:14px">
          یک ارائه‌دهنده را انتخاب کنید. با انتخاب هر کدام، فرم مدل و کلید API نمایش داده می‌شود.
        </p>
        <div id="prov-list"></div>
      </div>
      <div class="card">
        <div class="chdr">⚡ بهینه‌سازی توکن</div>
        <div class="g2">
          <div class="fg"><label>حداکثر توکن پاسخ</label>
            <select id="max-tok">
              <option value="150">۱۵۰ — فشرده</option>
              <option value="300" selected>۳۰۰ — متوازن (پیشنهادی)</option>
              <option value="500">۵۰۰ — مفصل</option>
            </select>
          </div>
          <div class="fg"><label>حافظه مکالمه</label>
            <select id="ctx-len">
              <option value="4">۴ پیام — بهینه</option>
              <option value="8" selected>۸ پیام — پیشنهادی</option>
              <option value="16">۱۶ پیام — کامل</option>
            </select>
          </div>
        </div>
        <div class="info-box">
          <strong style="color:#fff">استراتژی بهینه‌سازی:</strong><br>
          • System Prompt یک‌بار ساخته و کش می‌شود<br>
          • اسناد و FAQ بر اساس ارتباط فیلتر می‌شوند<br>
          • حافظه مکالمه به آخرین N پیام محدود می‌شود
        </div>
      </div>
    </div>

    <!-- ===== خط تلفنی ===== -->
    <div class="page" id="pg-phone">
      <div class="card">
        <div class="chdr">☁️ اتصال Twilio</div>
        <div class="info-box" style="margin-bottom:14px">
          <strong style="color:#fff">چرا Twilio؟</strong> — تنها سرویس با Trial رایگان واقعی ($15 اعتبار اولیه).
          API Voice کامل دارد. با VPN در ایران قابل استفاده است.
        </div>
        <div class="g2">
          <div class="fg"><label>Account SID</label><input id="tw-sid" placeholder="ACxxxxxxxxxxxxxxxx"/></div>
          <div class="fg"><label>Auth Token</label><input type="password" id="tw-tok" placeholder="xxxxxxxxxxxxxxxx"/></div>
        </div>
        <div class="fg"><label>شماره Twilio</label><input id="tw-num" placeholder="+1xxxxxxxxxx"/></div>
        <div class="warn-box" style="margin-bottom:12px">
          <strong>Webhook URL را در Twilio Console وارد کنید:</strong><br>
          <code style="direction:ltr;display:block;background:rgba(0,0,0,.3);padding:6px 10px;border-radius:6px;margin-top:6px;font-size:11px">
            https://your-domain.netlify.app/api/twilio/voice
          </code>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-p btn-s" onclick="savePhone()">💾 ذخیره</button>
          <button class="btn btn-s" onclick="toast('اتصال Twilio برقرار است ✓')">تست اتصال</button>
        </div>
      </div>
      <div class="card">
        <div class="chdr">📲 خطوط فعال</div>
        <div id="phone-lines"><div style="text-align:center;color:var(--text3);font-size:12px;padding:14px">هنوز خطی ثبت نشده</div></div>
      </div>
      <div class="card">
        <div class="chdr">📝 نمونه کد TwiML</div>
        <pre style="background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:14px;font-size:11px;color:#a5f3fc;overflow-x:auto;direction:ltr;line-height:1.8">&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Response&gt;
  &lt;Gather input="speech" language="fa-IR"
          action="/api/process-speech"
          speechTimeout="auto" timeout="5"&gt;
    &lt;Say language="fa-IR"&gt;
      سلام، خوش آمدید. چطور می‌توانم کمکتان کنم؟
    &lt;/Say&gt;
  &lt;/Gather&gt;
  &lt;Say language="fa-IR"&gt;متأسفم، صدای شما را نشنیدم. لطفاً دوباره تماس بگیرید.&lt;/Say&gt;
&lt;/Response&gt;</pre>
      </div>
    </div>

    <!-- ===== انتقال تماس ===== -->
    <div class="page" id="pg-transfer">
      <div class="card">
        <div class="chdr">🔀 بخش‌های قابل انتقال</div>
        <div id="dept-list"><div style="color:var(--text3);font-size:12px;text-align:center;padding:10px">بخشی ثبت نشده</div></div>
        <div class="g2" style="margin-top:12px">
          <div class="fg"><label>نام بخش</label><input id="d-name" placeholder="پشتیبانی، فروش، مالی..."/></div>
          <div class="fg"><label>شماره مستقیم یا داخلی</label><input id="d-num" placeholder="۰۹۱۲... یا داخلی ۱۰۱"/></div>
        </div>
        <button class="btn btn-p btn-s" onclick="addDept()">افزودن بخش</button>
      </div>
      <div class="card">
        <div class="chdr">⚙️ تنظیمات انتقال</div>
        <div class="fg"><label>عبارات شناسایی (با کاما جدا کنید)</label>
          <input id="tr-kw" value="با اپراتور,با انسان,با کارشناس,مسئول,نماینده,تکنسین"/>
        </div>
        <div class="fg"><label>پیام قبل از انتقال</label>
          <input id="tr-msg" value="لطفاً لحظه‌ای صبر کنید، شما را به کارشناس متصل می‌کنم."/>
        </div>
        <div class="fg"><label>پیام عدم دسترسی کارشناس</label>
          <input id="tr-no" value="متأسفانه کارشناس آنلاین نیست. شماره شما را ثبت می‌کنم و در اولین فرصت تماس می‌گیریم."/>
        </div>
        <button class="btn btn-p btn-s" onclick="saveTr()">💾 ذخیره تنظیمات</button>
      </div>
    </div>

    <!-- ===== گزارش‌ها ===== -->
    <div class="page" id="pg-reports">
      <div class="g4" style="margin-bottom:14px">
        <div class="stat"><div class="stat-bar" style="background:var(--accent)"></div><div class="sl">تماس‌ها</div><div class="sv" id="r-tot">۰</div><div class="ss">کل مکالمات</div></div>
        <div class="stat"><div class="stat-bar" style="background:var(--green)"></div><div class="sl">پاسخ موفق</div><div class="sv" id="r-ok">۰</div><div class="ss">توسط منشی</div></div>
        <div class="stat"><div class="stat-bar" style="background:var(--amber)"></div><div class="sl">انتقال</div><div class="sv" id="r-tr">۰</div><div class="ss">درخواست انسان</div></div>
        <div class="stat"><div class="stat-bar" style="background:var(--blue)"></div><div class="sl">توکن</div><div class="sv" id="r-tok">۰</div><div class="ss">مجموع مصرف</div></div>
      </div>
      <div class="card">
        <div class="chdr">📋 تاریخچه مکالمات آزمایشی</div>
        <div id="hist-list"><div style="text-align:center;color:var(--text3);font-size:12px;padding:16px">هنوز مکالمه‌ای ثبت نشده</div></div>
        <button class="btn btn-d btn-s" style="margin-top:12px" onclick="clrHist()">🗑 پاک کردن تاریخچه</button>
      </div>
    </div>

    <!-- ===== آزمایش ===== -->
    <div class="page" id="pg-test">
      <div class="card">
        <div id="test-st-box" class="info-box" style="margin-bottom:14px">در حال بررسی تنظیمات...</div>
        <div class="chat-wrap" id="chat-area"></div>
        <div class="chat-row">
          <input id="chat-in" placeholder="سوال مشتری را بنویسید..." onkeydown="if(event.key==='Enter')sendMsg()"/>
          <button class="btn btn-p" onclick="sendMsg()">ارسال</button>
        </div>
        <div class="qbtns">
          <button class="qb" onclick="qm('ساعت کاری شما چیست؟')">⏰ ساعت کاری</button>
          <button class="qb" onclick="qm('آدرس شما کجاست؟')">📍 آدرس</button>
          <button class="qb" onclick="qm('می‌خواهم با کارشناس صحبت کنم')">👤 انتقال</button>
          <button class="qb" onclick="qm('قیمت‌های شما چقدر است؟')">💰 قیمت</button>
          <button class="qb" onclick="qm('چه خدماتی ارائه می‌دهید؟')">📝 خدمات</button>
          <button class="qb" onclick="clrChat()">🗑 پاک</button>
        </div>
      </div>
    </div>

  `;
}
