"use client";

import { useState } from "react";
import { HomeScreen } from "@/components/screens/home-screen";
import { PaymentScreen } from "@/components/screens/payment-screen";
import { ChatScreen } from "@/components/screens/chat-screen";
import { PdfScreen } from "@/components/screens/pdf-screen";
import { ReportScreen } from "@/components/screens/report-screen";
import { MapScreen } from "@/components/screens/map-screen";

export type ServiceType = "gis" | "pdf" | "report" | "map" | "annual";
export type ScreenType = "home" | "pay" | "chat" | "pdf" | "report" | "map";

export interface ServiceInfo {
  type: ServiceType;
  name: string;
  price: string;
  icon: string;
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("home");
  const [pendingService, setPendingService] = useState<ServiceInfo | null>(
    null
  );

  const goToPay = (
    type: ServiceType,
    name: string,
    price: string,
    icon: string
  ) => {
    setPendingService({ type, name, price, icon });
    setCurrentScreen("pay");
  };

  const goHome = () => {
    setCurrentScreen("home");
  };

  const goToService = (type: ServiceType) => {
    switch (type) {
      case "gis":
        setCurrentScreen("chat");
        break;
      case "pdf":
        setCurrentScreen("pdf");
        break;
      case "report":
        setCurrentScreen("report");
        break;
      case "map":
        setCurrentScreen("map");
        break;
      default:
        setCurrentScreen("home");
    }
  };

  return (
    <main>
      {currentScreen === "home" && <HomeScreen onSelectService={goToPay} />}
      {currentScreen === "pay" && pendingService && (
        <PaymentScreen service={pendingService} onBack={goHome} />
      )}
      {currentScreen === "chat" && <ChatScreen onBack={goHome} />}
      {currentScreen === "pdf" && <PdfScreen onBack={goHome} />}
      {currentScreen === "report" && <ReportScreen onBack={goHome} />}
      {currentScreen === "map" && <MapScreen onBack={goHome} />}
    </main>
  );
}
