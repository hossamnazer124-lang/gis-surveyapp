"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/ui/header";
import styles from "./chat-screen.module.css";

interface ChatScreenProps {
  onBack: () => void;
}

interface Message {
  role: "user" | "ai";
  content: string;
}

const CHAT_MAX = 10;
const QUICK_QUESTIONS = [
  "الفرق بين QGIS وArcGIS؟",
  "نظام الإحداثيات للسعودية؟",
  "كيف أبدأ في GIS؟",
  "تحويل GPS لخريطة؟",
];

const SYSTEM_PROMPT = `أنت مساعد ذكي متخصص في نظم المعلومات الجغرافية (GIS) والمساحة، تعمل لصالح منصة Geoconsult AI في الرياض، المملكة العربية السعودية.
تخصصاتك: QGIS، ArcGIS Online، ArcGIS Pro، GPS/GNSS، RTK-GPS، Total Station، Auto Level، التحليل المكاني، WGS84، UTM، AutoCAD Map 3D، مشاريع رؤية 2030.
أسلوبك: ردود واضحة ومباشرة باللغة العربية، لا تتجاوز 300 كلمة، استخدم أمثلة من السياق السعودي.
إذا سُئلت عن شيء خارج نطاق GIS والمساحة، اعتذر بأدب.`;

export function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: `مرحباً! أنا مساعد Geoconsult AI المتخصص في نظم المعلومات الجغرافية والمساحة.

يمكنني مساعدتك في <strong>QGIS، ArcGIS، GPS، التحليل المكاني</strong>، وكل ما يتعلق بمجال المساحة والـ GIS.

عندك 10 ردود في هذه الجلسة. كيف يمكنني مساعدتك؟ 🗺️`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const [showQuick, setShowQuick] = useState(true);
  const messagesRef = useRef<HTMLDivElement>(null);

  const remaining = CHAT_MAX - chatCount;

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || chatCount >= CHAT_MAX) return;

    setLoading(true);
    setShowQuick(false);
    setChatCount((c) => c + 1);

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const chatHistory = messages
        .filter((m) => m.role === "user" || m.role === "ai")
        .map((m) => ({
          role: m.role === "ai" ? "assistant" : "user",
          content: m.content.replace(/<[^>]*>/g, ""),
        }));

      chatHistory.push({ role: "user", content: text });

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: chatHistory,
        }),
      });

      const data = await res.json();

      if (data.content) {
        setMessages((prev) => [...prev, { role: "ai", content: data.content }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", content: "عذراً، حدث خطأ. حاول مرة أخرى." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "عذراً، تعذر الاتصال." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className={styles.screen}>
      <div className={styles.wrap}>
        <Header
          onBack={onBack}
          rightContent={
            <div
              className={`${styles.counter} ${
                remaining <= 2
                  ? styles.danger
                  : remaining <= 4
                  ? styles.warn
                  : ""
              }`}
            >
              {remaining} / {CHAT_MAX}
            </div>
          }
        />

        <div className={styles.serviceBadge}>
          <div className={styles.sbIcon}>🌐</div>
          <div>
            <div className={styles.sbTitle}>استشارة GIS الذكية</div>
            <div className={styles.sbSub}>
              مساعد متخصص في نظم المعلومات الجغرافية
            </div>
          </div>
          <div className={styles.sbPrice}>49 ر.س</div>
        </div>

        <div className={styles.messages} ref={messagesRef}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${styles.msg} ${
                msg.role === "user" ? styles.user : styles.ai
              }`}
            >
              <div
                className={`${styles.avatar} ${
                  msg.role === "user" ? styles.avatarUser : styles.avatarAi
                }`}
              >
                {msg.role === "ai" ? "🤖" : "👤"}
              </div>
              <div
                className={styles.bubble}
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\n/g, "<br>"),
                }}
              />
            </div>
          ))}
          {loading && (
            <div className={`${styles.msg} ${styles.ai}`}>
              <div className={`${styles.avatar} ${styles.avatarAi}`}>🤖</div>
              <div className={styles.bubble}>
                <div className={styles.typing}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {showQuick && (
          <div className={styles.quick}>
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                className={styles.quickBtn}
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {chatCount >= CHAT_MAX ? (
          <div className={styles.payWall}>
            <div className={styles.pwTitle}>💬 انتهت رسائلك العشر</div>
            <div className={styles.pwSub}>
              لمواصلة الاستشارة، حوّل{" "}
              <strong style={{ color: "var(--green)" }}>49 ر.س</strong> وأرسل
              الإيصال على واتساب.
            </div>
            <div className={styles.pwIban}>
              رقم الآيبان:
              <br />
              <span className={styles.pwIbanNum}>SA0430100991100864564620</span>
              البنك: الأول — المستفيد: حسام حسين
            </div>
            <a
              className={styles.pwBtn}
              href="https://wa.me/966508410082?text=مرحباً، أرسلت إيصال دفع استشارة GIS - 49 ر.س"
              target="_blank"
              rel="noopener noreferrer"
            >
              أرسل الإيصال على واتساب ✓
            </a>
          </div>
        ) : (
          <div className={styles.inputArea}>
            <div className={styles.inputRow}>
              <textarea
                className={styles.inputBox}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اكتب سؤالك في GIS أو المساحة..."
                rows={1}
              />
              <button
                className={styles.sendBtn}
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
              >
                ➤
              </button>
            </div>
            <div className={styles.inputNote}>
              الاستشارة متخصصة في GIS والمساحة فقط
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
