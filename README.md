<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GIS Area Calculator</title>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<!-- ═══════════ CASE STUDY PAGE ═══════════ -->
<div id="casePage">
<div class="cs-wrap">
  <button class="cs-back" onclick="showPage('homePage')">← الرئيسية</button>

  <div class="cs-hero">
    <div class="cs-tag">CASE STUDY · 2026</div>
    <h1>تحويل العمل اليدوي<br>إلى <span>منصة GIS ذكية</span></h1>
    <p>كيف ساعدنا مكتب مساحة في الرياض على التخلص من حسابات Excel اليدوية وتوليد تقارير احترافية في ثوانٍ.</p>
    <div class="cs-meta">
      <div class="cs-meta-item"><span class="cs-meta-label">العميل</span><span class="cs-meta-val">مكتب مساحة — الرياض</span></div>
      <div class="cs-meta-item"><span class="cs-meta-label">المجال</span><span class="cs-meta-val">المساحة والـ GIS</span></div>
      <div class="cs-meta-item"><span class="cs-meta-label">المنصة</span><span class="cs-meta-val">Web App</span></div>
      <div class="cs-meta-item"><span class="cs-meta-label">الموقع</span><span class="cs-meta-val" style="color:var(--accent);">Riyadh, KSA</span></div>
    </div>
  </div>

  <!-- Stats -->
  <div class="cs-stats">
    <div class="cs-stat"><span class="cs-stat-num">90%</span><div class="cs-stat-desc">توفير في وقت إعداد التقارير</div></div>
    <div class="cs-stat"><span class="cs-stat-num">0</span><div class="cs-stat-desc">أخطاء حسابية بعد التطبيق</div></div>
    <div class="cs-stat"><span class="cs-stat-num">5x</span><div class="cs-stat-desc">سرعة في إنجاز المشاريع</div></div>
  </div>

  <!-- 01 Problem -->
  <div class="cs-section">
    <div class="cs-section-hdr">
      <span class="cs-section-num">01</span>
      <h2>المشكلة</h2>
      <div class="cs-line"></div>
    </div>
    <div class="cs-prob-grid">
      <div class="cs-prob-card"><span class="cs-prob-icon">📊</span><h3>حسابات يدوية وبطيئة</h3><p>الفريق كان يعتمد على Excel وحسابات يدوية لاستخراج المساحات والإحداثيات مما يستغرق ساعات لكل مشروع.</p></div>
      <div class="cs-prob-card"><span class="cs-prob-icon">❌</span><h3>أخطاء متكررة</h3><p>الإدخال اليدوي للإحداثيات كان مصدراً دائماً للأخطاء التي تؤثر على دقة التقارير النهائية.</p></div>
      <div class="cs-prob-card"><span class="cs-prob-icon">📄</span><h3>تقارير غير احترافية</h3><p>لم يكن هناك نظام موحد لتوليد تقارير PDF بشكل سريع واحترافي قابل للتسليم للعملاء.</p></div>
      <div class="cs-prob-card"><span class="cs-prob-icon">🔄</span><h3>تحويل الإحداثيات معقد</h3><p>التحويل بين UTM وWGS84 كان يتطلب أدوات خارجية متعددة وجهداً إضافياً في كل مشروع.</p></div>
    </div>
  </div>

  <!-- 02 Solution -->
  <div class="cs-section">
    <div class="cs-section-hdr">
      <span class="cs-section-num">02</span>
      <h2>الحل</h2>
      <div class="cs-line"></div>
    </div>
    <div class="cs-sol-list">
      <div class="cs-sol-item"><div class="cs-sol-icon">🗺️</div><div class="cs-sol-content"><h3>حساب المساحات بدقة عالية</h3><p>منصة تحسب مساحات المضلعات فوراً بوحدات متعددة (م²، دونم، هكتار، قدم²) مع جدول الأضلاع والانحرافات تلقائياً.</p></div></div>
      <div class="cs-sol-item"><div class="cs-sol-icon">🔄</div><div class="cs-sol-content"><h3>محوّل إحداثيات UTM ↔ WGS84</h3><p>تحويل فوري ودقيق مع دعم رفع ملفات Excel أو CSV مباشرة وتحويلها تلقائياً.</p></div></div>
      <div class="cs-sol-item"><div class="cs-sol-icon">📄</div><div class="cs-sol-content"><h3>تقارير PDF احترافية في ثوانٍ</h3><p>تقارير جاهزة للتسليم تحمل شعار المكتب وبيانات المشروع الكاملة، قابلة للتصدير بصيغ PDF وExcel وCSV.</p></div></div>
      <div class="cs-sol-item"><div class="cs-sol-icon">📐</div><div class="cs-sol-content"><h3>أدوات GIS متكاملة</h3><p>ترافيرس، شبكة ضبط، شبكة نقاط، تصدير DXF — كل أدوات المساحة في مكان واحد بدون برامج إضافية.</p></div></div>
    </div>
  </div>

  <!-- 03 Results -->
  <div class="cs-section">
    <div class="cs-section-hdr">
      <span class="cs-section-num">03</span>
      <h2>النتائج</h2>
      <div class="cs-line"></div>
    </div>
    <div class="cs-res-grid">
      <div class="cs-res-card"><span class="cs-res-emoji">⚡</span><h3>وقت أقل بكثير</h3><p>ما كان يأخذ ساعات أصبح ينجز في دقائق معدودة.</p></div>
      <div class="cs-res-card"><span class="cs-res-emoji">✅</span><h3>صفر أخطاء</h3><p>القضاء التام على أخطاء الحسابات اليدوية وضمان الدقة في كل مشروع.</p></div>
      <div class="cs-res-card"><span class="cs-res-emoji">🏆</span><h3>تقارير احترافية</h3><p>تقارير PDF تعكس احترافية المكتب وتقوي الثقة مع العملاء.</p></div>
    </div>
    <div class="cs-quote">
      <p class="cs-quote-text">الأداة غيّرت طريقة عملنا بالكامل — بدل ما نقضي وقتاً طويلاً في الحسابات، دلوقتي نركز على المشاريع نفسها.</p>
      <div class="cs-quote-author">— مهندس مساحة، مكتب مساحة في الرياض</div>
    </div>
  </div>

  <!-- 04 Tech -->
  <div class="cs-section">
    <div class="cs-section-hdr">
      <span class="cs-section-num">04</span>
      <h2>التقنيات المستخدمة</h2>
      <div class="cs-line"></div>
    </div>
    <div class="cs-tech">
      <span class="cs-tech-badge">JavaScript</span>
      <span class="cs-tech-badge">Leaflet Maps</span>
      <span class="cs-tech-badge">GIS Algorithms</span>
      <span class="cs-tech-badge">UTM / WGS84</span>
      <span class="cs-tech-badge">PDF Generation</span>
      <span class="cs-tech-badge">DXF Export</span>
      <span class="cs-tech-badge">Excel / CSV</span>
    </div>
  </div>

  <!-- CTA -->
  <div class="cs-cta">
    <h2>عندك مشكلة مشابهة؟</h2>
    <p>أبني حلول رقمية مخصصة للمجالات الهندسية والطبية — سريعة، دقيقة، واحترافية.</p>
    <button class="cs-cta-btn" onclick="showPage('homePage');openEnterModal()">🚀 جرب الأداة مجاناً</button>
  </div>
</div>
</div>

<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<style>
:root{
  --bg:#0a0f1e;--surface:#111827;--card:#1a2235;
  --accent:#00d4ff;--accent2:#00ff88;--accent3:#ff6b35;--violet:#a78bfa;
  --text:#e2e8f0;--muted:#64748b;--border:#1e3a5f;
}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Tajawal',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;}
body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(0,212,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,212,255,.03) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;z-index:0;}

/* ── SHARED ── */
.btn{padding:10px 20px;border-radius:10px;border:none;cursor:pointer;font-family:'Tajawal',sans-serif;font-size:13px;font-weight:700;transition:all .25s;display:inline-flex;align-items:center;gap:6px;}
.btn-primary{background:linear-gradient(135deg,#00d4ff,#0099cc);color:#0a0f1e;box-shadow:0 4px 14px rgba(0,212,255,.3);}
.btn-primary:hover{transform:translateY(-1px);}
.btn-success{background:linear-gradient(135deg,#00ff88,#00cc6a);color:#0a0f1e;box-shadow:0 4px 14px rgba(0,255,136,.3);}
.btn-danger{background:rgba(255,107,53,.15);border:1px solid rgba(255,107,53,.4);color:#ff6b35;}
.btn-outline{background:transparent;border:1px solid var(--border);color:var(--text);}
.btn-outline:hover{border-color:var(--accent);color:var(--accent);}
.btn-violet{background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;box-shadow:0 3px 10px rgba(124,58,237,.3);}
input[type=number],input[type=text],input[type=password]{width:100%;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:9px 11px;color:var(--text);font-family:'Tajawal',sans-serif;font-size:13px;transition:border-color .3s;direction:ltr;}
input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(0,212,255,.1);}
.ig{display:flex;flex-direction:column;gap:4px;margin-bottom:10px;}
.il{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:900;display:none;align-items:center;justify-content:center;backdrop-filter:blur(6px);padding:20px;overflow-y:auto;}
.overlay.show{display:flex;}
.modal{background:var(--card);border:1px solid var(--border);border-radius:20px;padding:26px;width:90%;max-width:380px;position:relative;margin:auto;}
.modal-close{position:absolute;top:12px;left:12px;background:rgba(255,107,53,.1);border:1px solid rgba(255,107,53,.3);color:#ff6b35;border-radius:7px;width:26px;height:26px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:12px;}
.msg-ok{font-size:11px;color:var(--accent2);margin-top:5px;display:none;}

/* ── HOME ── */
#homePage{min-height:100vh;min-height:100dvh;width:100%;display:none;flex-direction:column;align-items:center;justify-content:center;position:relative;z-index:1;background:radial-gradient(ellipse at 50% 20%,#0d2a45 0%,#0a0f1e 65%);padding:24px 20px;}
#homePage.active{display:flex;}
.home-inner{width:100%;max-width:400px;display:flex;flex-direction:column;align-items:center;}
#homeLogo{width:80px;height:80px;border-radius:16px;object-fit:contain;display:none;border:2px solid rgba(0,212,255,.3);background:rgba(0,212,255,.05);padding:8px;margin-bottom:14px;box-shadow:0 0 28px rgba(0,212,255,.15);}
#homeLogo.show{display:block;}
.home-label{font-size:10px;color:var(--muted);letter-spacing:3px;text-transform:uppercase;margin-bottom:7px;}
#homeCompanyName{font-size:clamp(20px,6vw,36px);font-weight:900;background:linear-gradient(135deg,#00d4ff,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:5px;text-align:center;}
.home-tagline{font-size:12px;color:var(--muted);margin-bottom:28px;text-align:center;line-height:1.6;}
.home-btns{width:100%;display:flex;flex-direction:column;gap:10px;}
.btn-enter{width:100%;padding:14px;background:linear-gradient(135deg,#00d4ff,#0099cc);color:#0a0f1e;border:none;border-radius:13px;font-family:'Tajawal',sans-serif;font-size:15px;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;box-shadow:0 6px 22px rgba(0,212,255,.35);transition:all .3s;}
.btn-wa{width:100%;padding:12px;background:linear-gradient(135deg,#25d366,#128c7e);color:#fff;border:none;border-radius:13px;font-family:'Tajawal',sans-serif;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .3s;}
.btn-admin-vis{width:100%;padding:9px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.4);border-radius:11px;font-family:'Tajawal',sans-serif;font-size:12px;cursor:pointer;transition:all .3s;}
.owner-ghost{width:100%;height:12px;background:transparent;cursor:default;border:none;outline:none;}
.btn-case{width:100%;padding:11px;background:rgba(0,255,136,.08);border:1px solid rgba(0,255,136,.25);color:var(--accent2);border-radius:13px;font-family:'Tajawal',sans-serif;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .3s;}
.btn-case:hover{background:rgba(0,255,136,.14);border-color:var(--accent2);}

/* ── CASE STUDY PAGE ── */
#casePage{display:none;position:relative;z-index:1;min-height:100vh;background:var(--bg);}
#casePage.active{display:block;}
.cs-wrap{max-width:800px;margin:0 auto;padding:24px 20px 48px;}
.cs-back{display:inline-flex;align-items:center;gap:7px;background:transparent;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.4);padding:6px 14px;border-radius:8px;cursor:pointer;font-family:'Tajawal',sans-serif;font-size:12px;margin-bottom:28px;transition:all .3s;}
.cs-back:hover{border-color:var(--accent);color:var(--accent);}
.cs-tag{display:inline-block;background:rgba(0,212,255,.1);color:var(--accent);border:1px solid rgba(0,212,255,.25);padding:4px 14px;border-radius:20px;font-size:11px;letter-spacing:2px;margin-bottom:18px;}
.cs-hero h1{font-size:clamp(1.6rem,5vw,2.8rem);font-weight:900;line-height:1.25;margin-bottom:14px;}
.cs-hero h1 span{background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.cs-hero p{font-size:14px;color:var(--muted);line-height:1.8;max-width:580px;margin-bottom:28px;}
.cs-meta{display:flex;gap:24px;flex-wrap:wrap;padding-bottom:28px;border-bottom:1px solid var(--border);}
.cs-meta-item{display:flex;flex-direction:column;gap:3px;}
.cs-meta-label{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;}
.cs-meta-val{font-size:13px;font-weight:700;color:var(--text);}
.cs-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin:32px 0;}
.cs-stat{background:var(--card);padding:24px 16px;text-align:center;}
.cs-stat-num{font-size:2rem;font-weight:900;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:block;margin-bottom:6px;}
.cs-stat-desc{font-size:12px;color:var(--muted);}
.cs-section{margin:40px 0;}
.cs-section-hdr{display:flex;align-items:center;gap:12px;margin-bottom:22px;}
.cs-section-num{font-size:11px;color:var(--accent);background:rgba(0,212,255,.1);border:1px solid rgba(0,212,255,.2);padding:3px 9px;border-radius:4px;white-space:nowrap;}
.cs-section h2{font-size:1.3rem;font-weight:700;}
.cs-line{flex:1;height:1px;background:var(--border);}
.cs-prob-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
@media(max-width:500px){.cs-prob-grid{grid-template-columns:1fr;}.cs-stats{grid-template-columns:1fr;}}
.cs-prob-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:18px;position:relative;overflow:hidden;}
.cs-prob-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#ef4444,#f97316);}
.cs-prob-icon{font-size:24px;margin-bottom:10px;display:block;}
.cs-prob-card h3{font-size:14px;font-weight:700;margin-bottom:6px;}
.cs-prob-card p{font-size:12px;color:var(--muted);line-height:1.7;}
.cs-sol-list{display:flex;flex-direction:column;gap:12px;}
.cs-sol-item{display:flex;align-items:flex-start;gap:16px;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:18px;transition:border-color .3s,transform .3s;}
.cs-sol-item:hover{border-color:rgba(0,212,255,.3);transform:translateX(-3px);}
.cs-sol-icon{width:42px;height:42px;background:rgba(0,212,255,.08);border:1px solid rgba(0,212,255,.2);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.cs-sol-content h3{font-size:14px;font-weight:700;margin-bottom:5px;}
.cs-sol-content p{font-size:12px;color:var(--muted);line-height:1.7;}
.cs-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.cs-res-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:22px 16px;text-align:center;position:relative;overflow:hidden;transition:transform .3s;}
.cs-res-card:hover{transform:translateY(-3px);}
.cs-res-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--accent),#f59e0b);}
.cs-res-emoji{font-size:32px;display:block;margin-bottom:10px;}
.cs-res-card h3{font-size:14px;font-weight:700;margin-bottom:6px;color:var(--accent);}
.cs-res-card p{font-size:12px;color:var(--muted);line-height:1.6;}
.cs-quote{background:var(--card);border:1px solid var(--border);border-right:4px solid var(--accent);border-radius:10px;padding:24px;margin:28px 0;position:relative;}
.cs-quote-text{font-size:14px;line-height:1.8;color:var(--text);font-style:italic;margin-bottom:12px;}
.cs-quote-author{font-size:11px;color:var(--accent);}
.cs-tech{display:flex;flex-wrap:wrap;gap:10px;}
.cs-tech-badge{background:var(--card);border:1px solid var(--border);color:var(--text);padding:7px 14px;border-radius:7px;font-size:12px;transition:border-color .3s,color .3s;}
.cs-tech-badge:hover{border-color:var(--accent);color:var(--accent);}
.cs-cta{background:linear-gradient(135deg,rgba(0,212,255,.07),rgba(0,255,136,.07));border:1px solid rgba(0,212,255,.2);border-radius:14px;padding:36px 24px;text-align:center;margin-top:40px;}
.cs-cta h2{font-size:1.4rem;font-weight:900;margin-bottom:10px;}
.cs-cta p{color:var(--muted);font-size:13px;margin-bottom:22px;}
.cs-cta-btn{display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#0a0f1e;font-family:'Tajawal',sans-serif;font-weight:900;font-size:14px;padding:13px 28px;border-radius:9px;border:none;cursor:pointer;transition:transform .2s,box-shadow .2s;}
.cs-cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,212,255,.3);}
.home-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(0,212,255,.2),transparent);margin:4px 0;}

/* ── MAIN APP ── */
#mainApp{display:none;position:relative;z-index:1;}
#mainApp.active{display:block;}
.container{max-width:1200px;margin:0 auto;padding:16px;}

/* ── APP HEADER ── */
.app-header{text-align:center;padding:16px 0 10px;border-bottom:1px solid var(--border);margin-bottom:14px;}
#appLogo{width:48px;height:48px;border-radius:10px;object-fit:contain;margin:0 auto 6px;display:none;border:1px solid var(--border);background:var(--surface);padding:4px;}
#appLogo.show{display:block;}
#appName{font-size:clamp(16px,4vw,26px);font-weight:900;background:linear-gradient(135deg,#00d4ff,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:2px;}
.app-sub{color:var(--muted);font-size:11px;}

/* ── WORKFLOW TABS ── */
.workflow-tabs{display:flex;background:var(--surface);border-radius:12px;padding:4px;gap:4px;margin-bottom:14px;border:1px solid var(--border);}
.wf-tab{flex:1;padding:9px 6px;border:none;border-radius:9px;cursor:pointer;font-family:'Tajawal',sans-serif;font-size:12px;font-weight:700;transition:all .25s;background:transparent;color:var(--muted);text-align:center;}
.wf-tab.active{background:linear-gradient(135deg,#00d4ff,#0099cc);color:#0a0f1e;box-shadow:0 2px 8px rgba(0,212,255,.3);}
.wf-panel{display:none;}
.wf-panel.active{display:block;}

/* ── CARDS ── */
.card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:16px;position:relative;overflow:hidden;margin-bottom:12px;}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent),transparent);opacity:.4;}
.card-title{font-size:13px;font-weight:700;color:var(--accent);margin-bottom:11px;display:flex;align-items:center;gap:6px;}
.card-icon{width:24px;height:24px;background:rgba(0,212,255,.1);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;}

/* ── INPUT PANEL ── */
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
@media(max-width:500px){.two-col{grid-template-columns:1fr;}}
.upload-zone{border:2px dashed var(--border);border-radius:10px;padding:18px;text-align:center;cursor:pointer;transition:all .3s;background:var(--surface);margin-bottom:8px;}
.upload-zone:hover{border-color:var
