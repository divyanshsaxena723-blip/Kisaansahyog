import {
  BUYER_TABS,
  FARMER_TABS,
  LANGUAGES,
  type BuyerTab,
  type FarmerTab,
  type Language,
  type NavKey,
  type Role,
  type WeatherStatus,
} from "./constants";

export interface Dictionary {
  app: {
    name: string;
    tagline: string;
  };
  nav: Record<NavKey, string>;
  greetings: {
    morning: string;
    afternoon: string;
    evening: string;
    welcome: string;
    welcomeBack: string;
  };
  roles: Record<Role, string>;
  weather: Record<WeatherStatus, string>;
  screens: Record<NavKey | "voice", string>;
  common: {
    language: string;
    changeLanguage: string;
    role: string;
    switchRole: string;
    twoGMode: string;
    dataSaver: string;
    online: string;
    offline: string;
    enabled: string;
    disabled: string;
    close: string;
    voiceAssistant: string;
    activeTab: string;
    screenSlot: string;
    loading: string;
    retry: string;
  };
  disclaimers: {
    kvkTitle: string;
    kvkShort: string;
    kvkFull: string;
    price: string;
    weather: string;
  };
  scaffold: {
    badge: string;
    title: string;
    body: string;
    workspaceTitle: string;
    workspaceBody: string;
    stackTitle: string;
    stackBody: string;
    stateTitle: string;
    stitchTitle: string;
    stitchBody: string;
    voiceBody: string;
  };
}

const en: Dictionary = {
  app: {
    name: "KisaanSahyog",
    tagline: "Smarter farming, stronger harvests.",
  },
  nav: {
    advisory: "Advisory",
    soil: "Soil",
    sell: "Sell",
    market: "Market",
    directory: "Directory",
    requirements: "Requirements",
    saved: "Saved",
    account: "Account",
  },
  greetings: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    welcome: "Welcome",
    welcomeBack: "Welcome back",
  },
  roles: {
    farmer: "Farmer",
    buyer: "Buyer",
  },
  weather: {
    clear: "Clear sky",
    partlyCloudy: "Partly cloudy",
    cloudy: "Cloudy",
    lightRain: "Light rain",
    heavyRain: "Heavy rain",
    thunderstorm: "Thunderstorm",
    fog: "Fog",
    hot: "Hot",
    cold: "Cold",
    humid: "Humid",
    windy: "Windy",
  },
  screens: {
    advisory: "Crop advisory",
    soil: "Soil health",
    sell: "Sell your harvest",
    market: "Mandi market",
    directory: "Buyer directory",
    requirements: "My requirements",
    saved: "Saved crops",
    account: "My account",
    voice: "Voice assistant",
  },
  common: {
    language: "Language",
    changeLanguage: "Change language",
    role: "Role",
    switchRole: "Switch role",
    twoGMode: "2G mode",
    dataSaver: "Data saver",
    online: "Online",
    offline: "Offline",
    enabled: "On",
    disabled: "Off",
    close: "Close",
    voiceAssistant: "Voice assistant",
    activeTab: "Active tab",
    screenSlot: "Screen slot",
    loading: "Loading",
    retry: "Try again",
  },
  disclaimers: {
    kvkTitle: "KVK advisory notice",
    kvkShort:
      "General guidance only. Confirm doses and local recommendations with your nearest Krishi Vigyan Kendra (KVK) before acting.",
    kvkFull:
      "KisaanSahyog shares general agronomic information for planning. It does not replace a soil test, a field visit, or advice from your local Krishi Vigyan Kendra (KVK) or a licensed agronomist. Confirm variety choice, pesticide dose, waiting period, and irrigation timing with your KVK before use. Always follow the product label and local regulations.",
    price:
      "Mandi prices are indicative and may change during the trading day. Confirm the final rate with your local mandi or buyer before selling.",
    weather:
      "Weather data is indicative. Use local warnings and field conditions when making irrigation or spraying decisions.",
  },
  scaffold: {
    badge: "Phase 1 scaffold ready",
    title: "Your KisaanSahyog workspace is live",
    body: "Navigation, bilingual copy, role switching, 2G state, and the screen registry are wired. Stitch screens can now be dropped into apps/web/src/screens.",
    workspaceTitle: "Monorepo online",
    workspaceBody:
      "Web, API, shared contracts, skill engine, data, and docs build from one npm workspace.",
    stackTitle: "Configured stack",
    stackBody: "Vite, React, TypeScript, Tailwind CSS, Zustand, Express, and Vitest.",
    stateTitle: "Live app state",
    stitchTitle: "Stitch drop zone",
    stitchBody:
      "Place page-level Stitch screens in apps/web/src/screens and reusable cards, buttons, and gauges in components/stitch.",
    voiceBody:
      "The voice assistant entry point is ready. Speech capture and advisory responses arrive in the advisory phase.",
  },
};

const hi: Dictionary = {
  app: {
    name: "किसान सहयोग",
    tagline: "बेहतर खेती, मजबूत फसल।",
  },
  nav: {
    advisory: "सलाह",
    soil: "मिट्टी",
    sell: "बेचें",
    market: "बाज़ार",
    directory: "निर्देशिका",
    requirements: "ज़रूरतें",
    saved: "सहेजे गए",
    account: "खाता",
  },
  greetings: {
    morning: "सुप्रभात",
    afternoon: "नमस्ते",
    evening: "शुभ संध्या",
    welcome: "स्वागत है",
    welcomeBack: "फिर से स्वागत है",
  },
  roles: {
    farmer: "किसान",
    buyer: "व्यापारी",
  },
  weather: {
    clear: "साफ़ आसमान",
    partlyCloudy: "कुछ बादल",
    cloudy: "बादल छाए हैं",
    lightRain: "हल्की बारिश",
    heavyRain: "भारी बारिश",
    thunderstorm: "आंधी-तूफ़ान",
    fog: "कोहरा",
    hot: "गर्मी",
    cold: "ठंड",
    humid: "उमस",
    windy: "तेज़ हवा",
  },
  screens: {
    advisory: "फसल सलाह",
    soil: "मिट्टी स्वास्थ्य",
    sell: "फसल बेचें",
    market: "मंडी बाज़ार",
    directory: "खरीदार निर्देशिका",
    requirements: "मेरी ज़रूरतें",
    saved: "सहेजी फसलें",
    account: "मेरा खाता",
    voice: "आवाज़ सहायक",
  },
  common: {
    language: "भाषा",
    changeLanguage: "भाषा बदलें",
    role: "भूमिका",
    switchRole: "भूमिका बदलें",
    twoGMode: "2G मोड",
    dataSaver: "डेटा सेवर",
    online: "ऑनलाइन",
    offline: "ऑफ़लाइन",
    enabled: "चालू",
    disabled: "बंद",
    close: "बंद करें",
    voiceAssistant: "आवाज़ सहायक",
    activeTab: "सक्रिय टैब",
    screenSlot: "स्क्रीन स्लॉट",
    loading: "लोड हो रहा है",
    retry: "फिर कोशिश करें",
  },
  disclaimers: {
    kvkTitle: "KVK सलाह सूचना",
    kvkShort:
      "यह केवल सामान्य जानकारी है। कुछ भी लागू करने से पहले अपने नज़दीकी कृषि विज्ञान केंद्र (KVK) से मात्रा और स्थानीय सलाह की पुष्टि करें।",
    kvkFull:
      "किसान सहयोग योजना के लिए सामान्य कृषि जानकारी देता है। यह मिट्टी परीक्षण, खेत के निरीक्षण, या अपने स्थानीय कृषि विज्ञान केंद्र (KVK) अथवा लाइसेंस प्राप्त कृषि विशेषज्ञ की सलाह का विकल्प नहीं है। किस्म, कीटनाशक की मात्रा, प्रतीक्षा अवधि और सिंचाई का समय तय करने से पहले KVK से पुष्टि करें। हमेशा उत्पाद लेबल और स्थानीय नियमों का पालन करें।",
    price:
      "मंडी भाव सांकेतिक हैं और व्यापार के दौरान बदल सकते हैं। बेचने से पहले अपनी स्थानीय मंडी या खरीदार से अंतिम दाम की पुष्टि करें।",
    weather:
      "मौसम डेटा सांकेतिक है। सिंचाई या छिड़काव का फैसला लेते समय स्थानीय चेतावनी और खेत की स्थिति को ध्यान में रखें।",
  },
  scaffold: {
    badge: "चरण 1 का ढांचा तैयार",
    title: "आपका किसान सहयोग वर्कस्पेस तैयार है",
    body: "नेविगेशन, द्विभाषी सामग्री, भूमिका बदलना, 2G स्थिति और स्क्रीन रजिस्ट्री जुड़ चुके हैं। अब Stitch स्क्रीन को apps/web/src/screens में जोड़ा जा सकता है।",
    workspaceTitle: "मोनोरेपो चालू है",
    workspaceBody:
      "वेब, API, साझा टाइप, स्किल इंजन, डेटा और दस्तावेज़ एक ही npm वर्कस्पेस से बनते हैं।",
    stackTitle: "तैयार टेक स्टैक",
    stackBody: "Vite, React, TypeScript, Tailwind CSS, Zustand, Express और Vitest.",
    stateTitle: "लाइव ऐप स्थिति",
    stitchTitle: "Stitch स्क्रीन क्षेत्र",
    stitchBody:
      "पेज-स्तर की Stitch स्क्रीन apps/web/src/screens में और कार्ड, बटन व गेज components/stitch में रखें।",
    voiceBody:
      "आवाज़ सहायक का प्रवेश बिंदु तैयार है। आवाज़ पहचान और सलाह का जवाब सलाह चरण में जुड़ेगा।",
  },
};

export const dictionaries: Record<Language, Dictionary> = { hi, en };

export function getDictionary(language: Language): Dictionary {
  return dictionaries[language];
}

export function isLanguage(value: string): value is Language {
  return LANGUAGES.some((language) => language === value);
}

export function getNavigationKeys(role: Role): readonly NavKey[] {
  return role === "farmer" ? FARMER_TABS : BUYER_TABS;
}

export function isFarmerTab(tab: NavKey): tab is FarmerTab {
  return FARMER_TABS.some((farmerTab) => farmerTab === tab);
}

export function isBuyerTab(tab: NavKey): tab is BuyerTab {
  return BUYER_TABS.some((buyerTab) => buyerTab === tab);
}
