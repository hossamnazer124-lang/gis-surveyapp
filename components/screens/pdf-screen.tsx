"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/ui/header";
import styles from "./pdf-screen.module.css";

interface PdfScreenProps {
  onBack: () => void;
}

interface AnalysisResult {
  summary: string;
  risks: string;
  recommendations: string;
}

function extractSection(text: string, label: string): string {
  const regex = new RegExp(`===\\s*${label}\\s*===\\s*([\\s\\S]*?)(?:===|$)`);
  const match = text.match(regex);
  return match ? match[1].trim() : "لم يتم استخراج هذا القسم.";
}

export function PdfScreen({ onBack }: PdfScreenProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("قراءة الملف...");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (f.type !== "application/pdf") {
      alert("يرجى رفع ملف PDF فقط");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      alert("حجم الملف يتجاوز 10MB");
      return;
    }
    setFile(f);
    setResult(null);
    setAnalyzed(false);
  };

  const removeFile = () => {
    setFile(null);
    setResult(null);
    setAnalyzed(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyze = async () => {
    if (!file) return;
    setLoading(true);

    const steps = [
      "قراءة الملف...",
      "استخراج النص...",
      "تحليل البنود...",
      "إعداد التقرير...",
    ];
    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setLoadingStep(steps[stepIndex]);
    }, 1500);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/analyze-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdf: base64,
          prompt: `حلل هذا الملف وأعد تقريراً باللغة العربية بالتنسيق:

===ملخص===
[ملخص مختصر للمحتوى]

===مخاطر===
[النقاط الحساسة والمخاطر، كل نقطة تبدأ بـ •]

===توصيات===
[توصيات عملية، كل نقطة تبدأ بـ •]`,
        }),
      });

      clearInterval(interval);
      const data = await res.json();

      if (data.content) {
        setResult({
          summary: extractSection(data.content, "ملخص"),
          risks: extractSection(data.content, "مخاطر"),
          recommendations: extractSection(data.content, "توصيات"),
        });
        setAnalyzed(true);
      } else {
        throw new Error("No content");
      }
    } catch {
      clearInterval(interval);
      alert("حدث خطأ. حاول مرة أخرى.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.screen}>
      <Header onBack={onBack} />

      <div className={styles.serviceBadge}>
        <div className={styles.sbIcon}>📄</div>
        <div>
          <div className={styles.sbTitle}>تحليل ملفات PDF</div>
          <div className={styles.sbSub}>
            تحليل ذكي للتقارير والعقود الجغرافية
          </div>
        </div>
        <div className={styles.sbPrice}>49 ر.س</div>
      </div>

      <div className={styles.body}>
        {!file && (
          <div
            className={`${styles.uploadZone} ${isDragOver ? styles.over : ""}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const f = e.dataTransfer.files[0];
              if (f && f.type === "application/pdf") handleFile(f);
            }}
          >
            <div className={styles.uploadIcon}>📂</div>
            <div className={styles.uploadTitle}>ارفع ملف PDF</div>
            <div className={styles.uploadSub}>
              اسحب الملف هنا أو اضغط للاختيار • PDF فقط • حد أقصى 10MB
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".pdf"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
          </div>
        )}

        {file && !loading && !result && (
          <div className={styles.fileSelected}>
            <div className={styles.fileIcon}>📄</div>
            <div className={styles.fileInfo}>
              <div className={styles.fileName}>{file.name}</div>
              <div className={styles.fileSize}>
                {(file.size / 1024).toFixed(0)} KB
              </div>
            </div>
            <button className={styles.removeBtn} onClick={removeFile}>
              إزالة
            </button>
          </div>
        )}

        {!loading && !result && (
          <button
            className={styles.actionBtn}
            onClick={analyze}
            disabled={!file}
          >
            🔍 تحليل الملف بالذكاء الاصطناعي
          </button>
        )}

        {loading && (
          <div className={styles.loadingBox}>
            <div className={styles.spinner} />
            <div className={styles.loadText}>جارٍ تحليل الملف...</div>
            <div className={styles.loadStep}>{loadingStep}</div>
          </div>
        )}

        {result && (
          <div className={styles.resultBox}>
            <div className={styles.resultHeader}>✅ اكتمل التحليل</div>
            <div className={styles.resultBody}>
              <div className={styles.section}>
                <div className={`${styles.sectionTitle} ${styles.blue}`}>
                  📋 ملخص المحتوى
                </div>
                <div className={styles.sectionContent}>{result.summary}</div>
              </div>
              <div className={styles.section}>
                <div className={`${styles.sectionTitle} ${styles.red}`}>
                  ⚠️ النقاط الحساسة والمخاطر
                </div>
                <div className={styles.sectionContent}>{result.risks}</div>
              </div>
              <div className={styles.section}>
                <div className={`${styles.sectionTitle} ${styles.green}`}>
                  ✅ التوصيات
                </div>
                <div className={styles.sectionContent}>
                  {result.recommendations}
                </div>
              </div>
            </div>
          </div>
        )}

        {analyzed && (
          <div className={styles.payAfter}>
            <div className={styles.paTitle}>📄 لتحليل ملف جديد</div>
            <div className={styles.paSub}>
              أرسل <strong style={{ color: "var(--green)" }}>49 ر.س</strong>{" "}
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
              href="https://wa.me/966508410082?text=مرحباً، أرسلت إيصال دفع تحليل PDF - 49 ر.س"
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
