"use client";

import type { ServiceType } from "@/app/page";
import styles from "./home-screen.module.css";

interface HomeScreenProps {
  onSelectService: (
    type: ServiceType,
    name: string,
    price: string,
    icon: string
  ) => void;
}

const services = [
  {
    type: "gis" as ServiceType,
    name: "استشارة GIS الذكية",
    description: "10 ردود متخصصة · QGIS · ArcGIS · GPS",
    price: "49",
    icon: "🌐",
  },
  {
    type: "pdf" as ServiceType,
    name: "تحليل ملفات PDF",
    description: "تحليل ذكي للتقارير والعقود الجغرافية",
    price: "49",
    icon: "📄",
  },
  {
    type: "report" as ServiceType,
    name: "تقرير مساحي احترافي",
    description: "6 أقسام · جاهز للطباعة والتسليم",
    price: "99",
    icon: "📍",
  },
  {
    type: "map" as ServiceType,
    name: "خرائط الخدمات والشبكات",
    description: "تحليل توزيع الخدمات العامة والمناطق",
    price: "99",
    icon: "🗺️",
  },
];

export function HomeScreen({ onSelectService }: HomeScreenProps) {
  return (
    <div className={styles.screen}>
      <div className={styles.glow} />
      <div className={styles.content}>
        <h1 className={styles.logo}>
          Geoconsult <span>AI</span> 🌐
        </h1>
        <p className={styles.subtitle}>
          منصة استشارات جغرافية ذكية مدعومة بالذكاء الاصطناعي
          <br />
          الرياض، المملكة العربية السعودية
        </p>

        <div className={styles.cards}>
          {services.map((service) => (
            <div
              key={service.type}
              className={styles.card}
              onClick={() =>
                onSelectService(
                  service.type,
                  service.name,
                  service.price,
                  service.icon
                )
              }
            >
              <div className={styles.cardIcon}>{service.icon}</div>
              <div className={styles.cardInfo}>
                <div className={styles.cardTitle}>{service.name}</div>
                <div className={styles.cardDesc}>{service.description}</div>
              </div>
              <div className={styles.cardPrice}>{service.price} ر.س</div>
            </div>
          ))}
        </div>

        <div
          className={styles.annual}
          onClick={() =>
            onSelectService("annual", "اشتراك سنوي غير محدود", "200", "⭐")
          }
        >
          <div className={styles.annualBadge}>⭐ الأوفر والأشمل</div>
          <div className={styles.annualTitle}>اشتراك سنوي غير محدود</div>
          <div className={styles.annualSubtext}>
            جميع الخدمات بلا حدود لمدة سنة كاملة
          </div>
          <div className={styles.annualPrice}>
            200 ر.س <span>/ سنة</span>
          </div>
          <button className={styles.annualBtn}>ادفع واشترك الآن ←</button>
        </div>

        <div className={styles.support}>
          الدعم الفني:{" "}
          <a
            href="https://wa.me/966508410082"
            target="_blank"
            rel="noopener noreferrer"
          >
            واتساب 0508410082
          </a>
        </div>
      </div>
    </div>
  );
}
