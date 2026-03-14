"use client";

import { useState } from "react";
import { Header } from "@/components/ui/header";
import styles from "./report-screen.module.css";

interface ReportScreenProps {
  onBack: () => void;
}

interface ReportData {
  pname: string;
  pnum: string;
  sdate: string;
  client: string;
  loc: string;
  purpose: string;
  ptype: string;
  area: string;
  dims: string;
  works: string[];
  equip: string;
  crs: string;
  acc: string;
  pts: string;
  sw: string;
  terrain: string;
  weather: string;
  obstacles: string[];
  findings: string;
  notes: string;
  level: string;
  lang: string;
}

interface ReportResult {
  info: string;
  description: string;
  methodology: string;
  results: string;
  analysis: string;
  recommendations: string;
}

const WORKS_OPTIONS = [
  "ضبط شبكة تحكم جيوديزية",
  "رفع مساحي شامل",
  "تحديد حدود القطعة",
  "رسم مخطط طبوغرافي",
  "حساب مساحات وإحداثيات",
  "إعداد مخططات AutoCAD",
  "تحليل GIS وخرائط",
];

const OBSTACLES_OPTIONS = [
  "تداخل بنايات وجدران",
  "أشجار وغطاء نباتي",
  "حركة مرور كثيفة",
  "ضعف إشارة GPS",
  "لا توجد عوائق",
];

function extractSection(text: string, label: string): string {
  const regex = new RegExp(`===\\s*${label}\\s*===\\s*([\\s\\S]*?)(?:===|$)`);
  const match = text.match(regex);
  return match ? match[1].trim() : "لم يتم استخراج هذا القسم.";
}

export function ReportScreen({ onBack }: ReportScreenProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("تحليل البيانات...");
  const [result, setResult] = useState<ReportResult | null>(null);
  const [completed, setCompleted] = useState(false);

  const [data, setData] = useState<ReportData>({
    pname: "",
    pnum: "",
    sdate: "",
    client: "",
    loc: "",
    purpose: "",
    ptype: "",
    area: "",
    dims: "",
    works: [],
    equip: "",
    crs: "WGS84 / EPSG:4326",
    acc: "",
    pts: "",
    sw: "QGIS 3.x",
    terrain: "أرض مستوية",
    weather: "مشمس وصافي",
    obstacles: [],
    findings: "",
    notes: "",
    level: "تقرير أولي مبدئي",
    lang: "عربي",
  });

  const updateField = (field: keyof ReportData, value: string | string[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleWork = (work: string) => {
    setData((prev) => ({
      ...prev,
      works: prev.works.includes(work)
        ? prev.works.filter((w) => w !== work)
        : [...prev.works, work],
    }));
  };

  const toggleObstacle = (obs: string) => {
    setData((prev) => ({
      ...prev,
      obstacles: prev.obstacles.includes(obs)
        ? prev.obstacles.filter((o) => o !== obs)
        : [...prev.obstacles, obs],
    }));
  };

  const goToStep = (n: number) => {
    if (n === 2 && (!data.pname || !data.sdate || !data.client || !data.loc)) {
      alert("يرجى تعبئة الحقول المطلوبة");
      return;
    }
    if (n === 3 && (!data.ptype || !data.area)) {
      alert("يرجى تعبئة نوع المشروع والمساحة");
      return;
    }
    if (n === 4 && !data.equip) {
      alert("يرجى اختيار الجهاز المستخدم");
      return;
    }
    setStep(n);
    window.scrollTo(0, 0);
  };

  const generate = async () => {
    setLoading(true);

    const steps = [
      "تحليل البيانات الميدانية...",
      "صياغة وصف الموقع...",
      "إعداد النتائج الفنية...",
      "كتابة التوصيات...",
      "تنسيق التقرير النهائي...",
    ];
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setLoadingStep(steps[stepIndex]);
    }, 1200);

    const prompt = `أنت مساح أرضي خبير. اكتب تقريراً مساحياً فنياً احترافياً رسمياً باللغة العربية بناءً على:
المشروع: ${data.pname}
رقم الملف: ${data.pnum || "—"}
التاريخ: ${data.sdate}
العميل: ${data.client}
الموقع: ${data.loc}
الغرض: ${data.purpose}
نوع المشروع: ${data.ptype}
المساحة: ${data.area} | الأبعاد: ${data.dims || "—"}
الأعمال: ${data.works.join("، ") || "—"}
الجهاز: ${data.equip}
نظام الإحداثيات: ${data.crs}
الدقة: ${data.acc || "±2 سم"}
عدد النقاط: ${data.pts || "—"}
البرنامج: ${data.sw}
التضاريس: ${data.terrain}
الطقس: ${data.weather}
العوائق: ${data.obstacles.join("، ") || "—"}
النتائج: ${data.findings || "—"}
ملاحظات: ${data.notes || "—"}
المستوى: ${data.level}

بالتنسيق:
===معلومات===
[معلومات المشروع]
===وصف===
[وصف الموقع]
===منهجية===
[المنهجية والأجهزة]
===نتائج===
[نتائج المسح]
===تحليل===
[التحليل الفني]
===توصيات===
[التوصيات والخلاصة]`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
        }),
      });

      clearInterval(interval);
      const response = await res.json();

      if (response.content) {
        setResult({
          info: extractSection(response.content, "معلومات"),
          description: extractSection(response.content, "وصف"),
          methodology: extractSection(response.content, "منهجية"),
          results: extractSection(response.content, "نتائج"),
          analysis: extractSection(response.content, "تحليل"),
          recommendations: extractSection(response.content, "توصيات"),
        });
        setCompleted(true);
      } else {
        throw new Error();
      }
    } catch {
      clearInterval(interval);
      alert("حدث خطأ. حاول مرة أخرى.");
      setStep(5);
    }

    setLoading(false);
  };

  return (
    <div className={styles.screen}>
      <Header
        onBack={onBack}
        rightContent={
          <div className={styles.stepLabel}>الخطوة {step} من 5</div>
        }
      />

      <div className={styles.serviceBadge}>
        <div className={styles.sbIcon}>📍</div>
        <div>
          <div className={styles.sbTitle}>تقرير مساحي احترافي</div>
          <div className={styles.sbSub}>
            تقرير متكامل بمعايير شركات المساحة الكبرى
          </div>
        </div>
        <div className={styles.sbPrice}>99 ر.س</div>
      </div>

      <div className={styles.stepBar}>
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`${styles.stepItem} ${step === s ? styles.active : ""} ${
              s < step ? styles.done : ""
            }`}
          >
            <span className={styles.stepNum}>
              {["①", "②", "③", "④", "⑤"][s - 1]}
            </span>
            {["المشروع", "نوع المسح", "المعدات", "الموقع", "التفاصيل"][s - 1]}
          </div>
        ))}
      </div>

      <div className={styles.body}>
        {/* Step 1 */}
        {step === 1 && !loading && !result && (
          <div className={styles.formStep}>
            <div className={styles.stepTitle}>📋 معلومات المشروع</div>
            <div className={styles.stepDesc}>
              البيانات الرسمية للمشروع والجهة المستفيدة
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                اسم المشروع <span className={styles.req}>*</span>
              </label>
              <input
                className={styles.input}
                value={data.pname}
                onChange={(e) => updateField("pname", e.target.value)}
                placeholder="مثال: مشروع تطوير أرض سكنية — حي النرجس، الرياض"
              />
            </div>

            <div className={styles.row2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>رقم المشروع</label>
                <input
                  className={styles.input}
                  value={data.pnum}
                  onChange={(e) => updateField("pnum", e.target.value)}
                  placeholder="HGS-2026-001"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  تاريخ المسح <span className={styles.req}>*</span>
                </label>
                <input
                  className={styles.input}
                  type="date"
                  value={data.sdate}
                  onChange={(e) => updateField("sdate", e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                اسم العميل / الجهة <span className={styles.req}>*</span>
              </label>
              <input
                className={styles.input}
                value={data.client}
                onChange={(e) => updateField("client", e.target.value)}
                placeholder="اسم العميل أو الشركة"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                الموقع التفصيلي <span className={styles.req}>*</span>
              </label>
              <input
                className={styles.input}
                value={data.loc}
                onChange={(e) => updateField("loc", e.target.value)}
                placeholder="مثال: الرياض، حي النرجس، المربع D7، قطعة 15"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>الغرض من المسح</label>
              <select
                className={styles.select}
                value={data.purpose}
                onChange={(e) => updateField("purpose", e.target.value)}
              >
                <option value="">اختر الغرض</option>
                <option>تطوير عقاري وبناء</option>
                <option>تقسيم أراضي وتخطيط</option>
                <option>توثيق ملكية وحدود</option>
                <option>دراسة جدوى مشروع</option>
                <option>تصميم بنية تحتية</option>
                <option>تقييم بيئي</option>
                <option>أغراض قانونية ونزاعات</option>
              </select>
            </div>

            <button className={styles.primaryBtn} onClick={() => goToStep(2)}>
              التالي ←
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && !loading && !result && (
          <div className={styles.formStep}>
            <div className={styles.stepTitle}>🗺️ نوع وطبيعة المسح</div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                نوع المشروع <span className={styles.req}>*</span>
              </label>
              <select
                className={styles.select}
                value={data.ptype}
                onChange={(e) => updateField("ptype", e.target.value)}
              >
                <option value="">اختر النوع</option>
                <option>مساحة مساحية / تقسيم أراضي</option>
                <option>مسح طبوغرافي</option>
                <option>طرق وبنية تحتية</option>
                <option>طاقة شمسية</option>
                <option>صرف صحي وتصريف</option>
                <option>موقع إنشاء</option>
                <option>تخطيط موقع / Setting Out</option>
                <option>مسح شبكات مياه وكهرباء</option>
              </select>
            </div>

            <div className={styles.row2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  المساحة الإجمالية <span className={styles.req}>*</span>
                </label>
                <input
                  className={styles.input}
                  value={data.area}
                  onChange={(e) => updateField("area", e.target.value)}
                  placeholder="مثال: 5,200 م²"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>الطول × العرض</label>
                <input
                  className={styles.input}
                  value={data.dims}
                  onChange={(e) => updateField("dims", e.target.value)}
                  placeholder="مثال: 80م × 65م"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>الأعمال المنجزة</label>
              <div className={styles.chipGroup}>
                {WORKS_OPTIONS.map((work) => (
                  <div
                    key={work}
                    className={`${styles.chip} ${
                      data.works.includes(work) ? styles.selected : ""
                    }`}
                    onClick={() => toggleWork(work)}
                  >
                    {work}
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.primaryBtn} onClick={() => goToStep(3)}>
              التالي ←
            </button>
            <button className={styles.secondaryBtn} onClick={() => goToStep(1)}>
              → رجوع
            </button>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && !loading && !result && (
          <div className={styles.formStep}>
            <div className={styles.stepTitle}>🔧 المعدات والمنهجية</div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                الجهاز الرئيسي <span className={styles.req}>*</span>
              </label>
              <select
                className={styles.select}
                value={data.equip}
                onChange={(e) => updateField("equip", e.target.value)}
              >
                <option value="">اختر الجهاز</option>
                <option>RTK-GPS (دقة ±2 سم)</option>
                <option>Total Station</option>
                <option>Auto Level</option>
                <option>GPS/GNSS</option>
                <option>RTK-GPS + Total Station</option>
                <option>Drone / UAV</option>
              </select>
            </div>

            <div className={styles.row2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>نظام الإحداثيات</label>
                <select
                  className={styles.select}
                  value={data.crs}
                  onChange={(e) => updateField("crs", e.target.value)}
                >
                  <option>WGS84 / EPSG:4326</option>
                  <option>UTM Zone 37N — الرياض</option>
                  <option>UTM Zone 38N — الشرقية</option>
                  <option>UTM Zone 36N — الحجاز</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>دقة القياس</label>
                <input
                  className={styles.input}
                  value={data.acc}
                  onChange={(e) => updateField("acc", e.target.value)}
                  placeholder="مثال: ±2 سم"
                />
              </div>
            </div>

            <div className={styles.row2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>عدد نقاط القياس</label>
                <input
                  className={styles.input}
                  type="number"
                  value={data.pts}
                  onChange={(e) => updateField("pts", e.target.value)}
                  placeholder="مثال: 250"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>برنامج المعالجة</label>
                <select
                  className={styles.select}
                  value={data.sw}
                  onChange={(e) => updateField("sw", e.target.value)}
                >
                  <option>QGIS 3.x</option>
                  <option>ArcGIS Online</option>
                  <option>ArcGIS Pro</option>
                  <option>AutoCAD Civil 3D</option>
                  <option>AutoCAD 2D</option>
                  <option>QGIS + AutoCAD</option>
                </select>
              </div>
            </div>

            <button className={styles.primaryBtn} onClick={() => goToStep(4)}>
              التالي ←
            </button>
            <button className={styles.secondaryBtn} onClick={() => goToStep(2)}>
              → رجوع
            </button>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && !loading && !result && (
          <div className={styles.formStep}>
            <div className={styles.stepTitle}>🏔️ ظروف الموقع</div>

            <div className={styles.formGroup}>
              <label className={styles.label}>طبيعة التضاريس</label>
              <select
                className={styles.select}
                value={data.terrain}
                onChange={(e) => updateField("terrain", e.target.value)}
              >
                <option>أرض مستوية</option>
                <option>أرض منحدرة خفيفة</option>
                <option>أرض وعرة ومتكسرة</option>
                <option>أرض صحراوية رملية</option>
                <option>منطقة حضرية مبنية</option>
                <option>منطقة زراعية</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>حالة الطقس</label>
              <select
                className={styles.select}
                value={data.weather}
                onChange={(e) => updateField("weather", e.target.value)}
              >
                <option>مشمس وصافي</option>
                <option>غائم جزئياً</option>
                <option>رياح متوسطة</option>
                <option>حرارة شديدة</option>
                <option>ضباب خفيف</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>العوائق الميدانية</label>
              <div className={styles.chipGroup}>
                {OBSTACLES_OPTIONS.map((obs) => (
                  <div
                    key={obs}
                    className={`${styles.chip} ${
                      data.obstacles.includes(obs) ? styles.selected : ""
                    }`}
                    onClick={() => toggleObstacle(obs)}
                  >
                    {obs}
                  </div>
                ))}
              </div>
            </div>

            <button className={styles.primaryBtn} onClick={() => goToStep(5)}>
              التالي ←
            </button>
            <button className={styles.secondaryBtn} onClick={() => goToStep(3)}>
              → رجوع
            </button>
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && !loading && !result && (
          <div className={styles.formStep}>
            <div className={styles.stepTitle}>📝 نتائج وملاحظات</div>

            <div className={styles.formGroup}>
              <label className={styles.label}>نتائج بارزة من المسح</label>
              <textarea
                className={styles.textarea}
                value={data.findings}
                onChange={(e) => updateField("findings", e.target.value)}
                placeholder="مثال: تم اكتشاف انحراف في حدود الجهة الشمالية بمقدار 0.8م..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>ملاحظات ميدانية</label>
              <textarea
                className={styles.textarea}
                value={data.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="مثال: الموقع يحتاج تسوية في الجزء الجنوبي الغربي قبل البناء..."
              />
            </div>

            <div className={styles.row2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>مستوى التقرير</label>
                <select
                  className={styles.select}
                  value={data.level}
                  onChange={(e) => updateField("level", e.target.value)}
                >
                  <option>تقرير أولي مبدئي</option>
                  <option>تقرير فني تفصيلي</option>
                  <option>تقرير رسمي معتمد</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>لغة التقرير</label>
                <select
                  className={styles.select}
                  value={data.lang}
                  onChange={(e) => updateField("lang", e.target.value)}
                >
                  <option>عربي</option>
                  <option>عربي + إنجليزي</option>
                </select>
              </div>
            </div>

            <button className={styles.primaryBtn} onClick={generate}>
              🔍 توليد التقرير الاحترافي
            </button>
            <button className={styles.secondaryBtn} onClick={() => goToStep(4)}>
              → رجوع
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className={styles.loadingBox}>
            <div className={styles.spinner} />
            <div className={styles.loadText}>
              جارٍ إعداد التقرير المساحي الاحترافي...
            </div>
            <div className={styles.loadStep}>{loadingStep}</div>
          </div>
        )}

        {/* Result */}
        {result && (
          <>
            <div className={styles.resultBox}>
              <div className={styles.resultHeader}>
                <div className={styles.rhTop}>
                  <span className={styles.rhTitle}>التقرير المساحي الفني</span>
                  <span className={styles.rhBadge}>✅ معتمد</span>
                </div>
                <div className={styles.rhMeta}>
                  المشروع: {data.pname} | العميل: {data.client} | Geoconsult AI
                </div>
              </div>
              <div className={styles.resultBody}>
                <div className={styles.section}>
                  <div className={`${styles.sectionTitle} ${styles.blue}`}>
                    ١. معلومات المشروع والجهة المستفيدة
                  </div>
                  <div className={styles.sectionContent}>{result.info}</div>
                </div>
                <div className={styles.section}>
                  <div className={`${styles.sectionTitle} ${styles.gold}`}>
                    ٢. وصف الموقع والبيانات الجغرافية
                  </div>
                  <div className={styles.sectionContent}>
                    {result.description}
                  </div>
                </div>
                <div className={styles.section}>
                  <div className={`${styles.sectionTitle} ${styles.green}`}>
                    ٣. المنهجية والمعدات المستخدمة
                  </div>
                  <div className={styles.sectionContent}>
                    {result.methodology}
                  </div>
                </div>
                <div className={styles.section}>
                  <div className={`${styles.sectionTitle} ${styles.purple}`}>
                    ٤. نتائج المسح الميداني
                  </div>
                  <div className={styles.sectionContent}>{result.results}</div>
                </div>
                <div className={styles.section}>
                  <div className={`${styles.sectionTitle} ${styles.red}`}>
                    ٥. التحليل الفني والملاحظات
                  </div>
                  <div className={styles.sectionContent}>{result.analysis}</div>
                </div>
                <div className={styles.section}>
                  <div className={`${styles.sectionTitle} ${styles.teal}`}>
                    ٦. التوصيات والخلاصة
                  </div>
                  <div className={styles.sectionContent}>
                    {result.recommendations}
                  </div>
                </div>
              </div>
            </div>

            {completed && (
              <div className={styles.payAfter}>
                <div className={styles.paTitle}>📍 لإعداد تقرير جديد</div>
                <div className={styles.paSub}>
                  أرسل <strong style={{ color: "var(--green)" }}>99 ر.س</strong>{" "}
                  وأرسل الإيصال على واتساب لإعادة التفعيل.
                </div>
                <div className={styles.paIban}>
                  رقم الآيبان:
                  <br />
                  <span className={styles.paIbanNum}>
                    SA0430100991100864564620
                  </span>
                  البنك: الأول — المستفيد: حسام حسين
                </div>
                <a
                  className={styles.paBtn}
                  href="https://wa.me/966508410082?text=مرحباً، أرسلت إيصال دفع تقرير مساحي - 99 ر.س"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  أرسل الإيصال على واتساب ✓
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
