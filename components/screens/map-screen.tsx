"use client";

import { useState } from "react";
import { Header } from "@/components/ui/header";
import styles from "./map-screen.module.css";

interface MapScreenProps {
  onBack: () => void;
}

const MAP_SYSTEM_PROMPT = `أنت خبير GIS متخصص في تحليل توزيع الخدمات العامة في المملكة العربية السعودية. قدم تقريراً احترافياً يتضمن: تقييم الكثافة السكانية، تحديد مناطق الخدمة الجيدة والضعيفة، مقارنة بالمعايير السعودية، توصيات عملية، أولويات التدخل. الرد بالعربية بأسلوب احترافي.`;

export function MapScreen({ onBack }: MapScreenProps) {
  const [region, setRegion] = useState("");
  const [service, setService] = useState("");
  const [purpose, setPurpose] = useState("");
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [analyzed, setAnalyzed] = useState(false);

  const analyze = async () => {
    if (!region || !service || !purpose) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setLoading(true);

    const prompt = `قم بتحليل توزيع الخدمات:
المنطقة: ${region}
نوع الخدمة: ${service}
الغرض: ${purpose}${extra ? "\nمعلومات إضافية: " + extra : ""}
قدم تقريراً احترافياً شاملاً.`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: MAP_SYSTEM_PROMPT,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();

      if (data.content) {
        setResult(data.content);
        setAnalyzed(true);
      } else {
        throw new Error();
      }
    } catch {
      alert("تعذر الاتصال. تحقق من الإنترنت.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.screen}>
      <Header onBack={onBack} />

      <div className={styles.serviceBadge}>
        <div className={styles.sbIcon}>🗺️</div>
        <div>
          <div className={styles.sbTitle}>خرائط الخدمات والشبكات</div>
          <div className={styles.sbSub}>تحليل ذكي لتوزيع الخدمات العامة</div>
        </div>
        <div className={styles.sbPrice}>99 ر.س</div>
      </div>

      <div className={styles.body}>
        {!result && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                اسم المنطقة / الحي <span className={styles.req}>*</span>
              </label>
              <input
                className={styles.input}
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="مثال: حي النرجس، الرياض"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                نوع الخدمة <span className={styles.req}>*</span>
              </label>
              <select
                className={styles.select}
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <option value="">اختر نوع الخدمة</option>
                <option value="schools">المدارس والتعليم</option>
                <option value="hospitals">المستشفيات والصحة</option>
                <option value="fuel">محطات الوقود</option>
                <option value="shopping">مراكز التسوق</option>
                <option value="parks">الحدائق والترفيه</option>
                <option value="all">جميع الخدمات</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                الغرض من التحليل <span className={styles.req}>*</span>
              </label>
              <select
                className={styles.select}
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option value="">اختر الغرض</option>
                <option value="municipality">تقرير للبلدية</option>
                <option value="developer">تقرير للمطور العقاري</option>
                <option value="investor">دراسة للمستثمر</option>
                <option value="research">بحث أكاديمي</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>معلومات إضافية (اختياري)</label>
              <textarea
                className={styles.textarea}
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="أي تفاصيل أخرى تساعد في التحليل..."
              />
            </div>

            <button
              className={styles.actionBtn}
              onClick={analyze}
              disabled={loading}
            >
              ابدأ تحليل الخدمات 🗺️
            </button>
          </>
        )}

        {loading && (
          <div className={styles.loadingBox}>
            <div className={styles.spinner} />
            <div className={styles.loadText}>جاري تحليل توزيع الخدمات...</div>
          </div>
        )}

        {result && (
          <div className={styles.resultBox}>
            <div className={styles.resultHeader}>📊 نتائج تحليل الخدمات</div>
            <div className={styles.resultBody}>{result}</div>
          </div>
        )}

        {analyzed && (
          <div className={styles.payAfter}>
            <div className={styles.paTitle}>🗺️ لتحليل منطقة جديدة</div>
            <div className={styles.paSub}>
              أرسل <strong style={{ color: "var(--green)" }}>99 ر.س</strong>{" "}
              وأرسل الإيصال على واتساب لإعادة التفعيل.
            </div>
            <div className={styles.paIban}>
              رقم الآيبان:
              <br />
              <span className={styles.paIbanNum}>SA0430100991100864564620</span>
              البنك: الأول — المستفيد: حسام حسين
            </div>
            <a
              className={styles.paBtn}
              href="https://wa.me/966508410082?text=مرحباً، أرسلت إيصال دفع تحليل خرائط - 99 ر.س"
              target="_blank"
              rel="noopener noreferrer"
            >
              أرسل الإيصال على واتساب ✓
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
