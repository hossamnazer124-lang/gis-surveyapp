"use client";

import styles from "./header.module.css";

interface HeaderProps {
  onBack: () => void;
  rightContent?: React.ReactNode;
}

export function Header({ onBack, rightContent }: HeaderProps) {
  return (
    <header className={styles.header}>
      <button className={styles.backBtn} onClick={onBack}>
        ← رجوع
      </button>
      <div className={styles.logo}>
        Geoconsult <span>AI</span>
      </div>
      <div className={styles.rightSlot}>{rightContent}</div>
    </header>
  );
}
