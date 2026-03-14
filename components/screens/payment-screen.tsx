"use client";

import { useState } from "react";
import type { ServiceInfo } from "@/app/page";
import { Header } from "@/components/ui/header";
import styles from "./payment-screen.module.css";

interface PaymentScreenProps {
  service: ServiceInfo;
  onBack: () => void;
}

const IBAN = "SA0430100991100864564620";
const PHONE = "966508410082";

export function PaymentScreen({ service, onBack }: PaymentScreenProps) {
  const [copied, setCopied] = useState(false);

  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(IBAN);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy");
    }
  };

  const waLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    `مرحباً، أرسلت إيصال دفع خدمة "${service.name}" بقيمة ${service.price} ر.س`
  )}`;

  return (
    <div className={styles.screen}>
      <Header onBack={onBack} />
      <div className={styles.body}>
        <div className={styles.hero}>
          <div className={styles.iconBig}>{service.icon}</div>
          <div className={styles.name}>{service.name}</div>
          <div className={styles.amount}>{service.price} ر.س</div>
        </div>

        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepText}>
              انسخ رقم الآيبان وأرسل المبلغ من تطبيق البنك
            </div>
            <div className={styles.stepNum}>١</div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepText}>
              اضغط "أرسل الإيصال" وأرسله على واتساب
            </div>
            <div className={styles.stepNum}>٢</div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepText}>
              بعد التأكيد سيُرسَل لك رابط الخدمة مباشرة
            </div>
            <div className={styles.stepNum}>٣</div>
          </div>
        </div>

        <div className={styles.ibanBox}>
          <div className={styles.ibanLabel}>رقم الآيبان</div>
          <span className={styles.ibanValue}>{IBAN}</span>
          <div className={styles.ibanInfo}>
            البنك: الأول &nbsp;|&nbsp; المستفيد: حسام حسين
          </div>
          <button
            className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
            onClick={copyIban}
          >
            {copied ? "تم النسخ ✓" : "نسخ الآيبان 📋"}
          </button>
        </div>

        <a
          className={styles.waBtn}
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          أرسل الإيصال على واتساب ✓
        </a>
        <button className={styles.closeBtn} onClick={onBack}>
          إغلاق
        </button>
      </div>
    </div>
  );
}
