const { PrismaClient } = require("@prisma/client")
const fs = require("fs")
const path = require("path")
const prisma = new PrismaClient()

// ── Suppliers ─────────────────────────────────────────────────────────────────
const SUPPLIERS = [
  { id: 1,  name: "Özinan Asansör", region: "Samsun/TURKEY", country: "Turkey" },
  { id: 2,  name: "Merih Asansör",  region: "TURKEY",        country: "Turkey" },
  { id: 3,  name: "Wisemont",       region: "TURKEY",        country: "Turkey" },
  { id: 4,  name: "Akış",           region: "TURKEY",        country: "Turkey" },
  { id: 5,  name: "Arkel",          region: "Turkey",        country: "Turkey" },
  { id: 6,  name: "Rate",           region: "TURKEY",        country: "Turkey" },
  { id: 7,  name: "GreenWeight",    region: "Turkey",        country: "Turkey" },
  { id: 8,  name: "OKKA LIFT",      region: "TURKEY",        country: "Turkey" },
  { id: 9,  name: "Çelikray",       region: "Turkey",        country: "Turkey" },
  { id: 10, name: "Aspar",          region: "Turkey",        country: "Turkey" },
  { id: 11, name: "FURDER",         region: "China",         country: "China"  },
  { id: 12, name: "BLUE LİGHT",     region: "China",         country: "China"  },
  { id: 13, name: "DE BLUELIGHT",   region: "China",         country: "China"  },
  { id: 14, name: "NAGEL",          region: "Turkey",        country: "Turkey" },
  { id: 15, name: "ALBERTO SASSI", region: "Italy/Spain",   country: "Italy"  },
]

// ── Panel specs (karşılaştırma özellikleri) ───────────────────────────────────
const PANEL_SPECS = {
  "ARCODE":        { gosterge: "LCD, DOT, 7SEG",      haberleme: "RS485, Paralel",  tesisatTipi: "Paralel, Hazır", uzaktanIzleme: "Opsiyonel", grupKontrol: "4 Kabine Kadar", kurtarma: "ARD",      tftCop: "Yok",      dokunmatikCop: "Yok", yangin: "Var", deprem: "Opsiyonel", programlama: "Kolay", mensei: "Türkiye-Arkel" },
  "ARL300":        { gosterge: "LCD, DOT, 7SEG",      haberleme: "RS485, Paralel",  tesisatTipi: "Paralel, Hazır", uzaktanIzleme: "Opsiyonel", grupKontrol: "4 Kabine Kadar", kurtarma: "ARD",      tftCop: "Yok",      dokunmatikCop: "Yok", yangin: "Var", deprem: "Opsiyonel", programlama: "Kolay", mensei: "Türkiye-Arkel" },
  "ARCUBE":        { gosterge: "LCD, DOT, 7SEG",      haberleme: "RS485, Paralel",  tesisatTipi: "Paralel, Hazır", uzaktanIzleme: "Opsiyonel", grupKontrol: "4 Kabine Kadar", kurtarma: "ARD",      tftCop: "Yok",      dokunmatikCop: "Yok", yangin: "Var", deprem: "Opsiyonel", programlama: "Kolay", mensei: "Türkiye-Arkel" },
  "WISEMONT MT70": { gosterge: "TFT, LCD, DOT, 7SEG", haberleme: "CANBUS, RS485",   tesisatTipi: "Seri, Paralel",  uzaktanIzleme: "Var",       grupKontrol: "8 Kabine Kadar", kurtarma: "UPS, ARD", tftCop: "Var",      dokunmatikCop: "Var", yangin: "Var", deprem: "Opsiyonel", programlama: "Orta",  mensei: "Çin-HP Mont" },
  "HD DRIVER":     { gosterge: "LCD, DOT, 7SEG",      haberleme: "RS485, Paralel",  tesisatTipi: "Paralel, Hazır", uzaktanIzleme: "Opsiyonel", grupKontrol: "4 Kabine Kadar", kurtarma: "ARD",      tftCop: "Kısıtlı",  dokunmatikCop: "Yok", yangin: "Var", deprem: "Opsiyonel", programlama: "Kolay", mensei: "Türkiye" },
  "REVO DRIVE":    { gosterge: "LCD, DOT, 7SEG",      haberleme: "RS485, Paralel",  tesisatTipi: "Paralel, Hazır", uzaktanIzleme: "Opsiyonel", grupKontrol: "4 Kabine Kadar", kurtarma: "ARD",      tftCop: "Kısıtlı",  dokunmatikCop: "Yok", yangin: "Var", deprem: "Opsiyonel", programlama: "Kolay", mensei: "Türkiye" },
  "U-STO":         { gosterge: "TFT, LCD, DOT, 7SEG", haberleme: "CANBUS, RS485",   tesisatTipi: "Seri, Paralel",  uzaktanIzleme: "Var",       grupKontrol: "8+ Kabin",       kurtarma: "UPS, ARD", tftCop: "Var",      dokunmatikCop: "Var", yangin: "Var", deprem: "Var",       programlama: "Zor",   mensei: "Çin" },
}

// ── Panel data ────────────────────────────────────────────────────────────────
const PANELS = [
  // ARKEL - ARCODE
  { brand: "ARKEL",    model: "ARCODE",        name: "ARKEL-ARCODE SENKRON 7,5 kW",          type: "SENKRON",  power: 7.5,  amper: 17, maxStop: 64, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1821.87,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCODE",        name: "ARKEL-ARCODE SENKRON 11 kW",           type: "SENKRON",  power: 11,   amper: 26, maxStop: 64, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1965.40,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCODE",        name: "ARKEL-ARCODE SENKRON 15 kW",           type: "SENKRON",  power: 15,   amper: 35, maxStop: 64, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 2458.90,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCODE",        name: "ARKEL-ARCODE SENKRON 22 kW",           type: "SENKRON",  power: 22,   amper: 50, maxStop: 64, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 2629.38,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCODE",        name: "ARKEL-ARCODE SENKRON 35 kW",           type: "SENKRON",  power: 35,   amper: 75, maxStop: 64, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 2947.895, country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCODE",        name: "ARKEL-ARCODE ASENKRON 7,5 kW",         type: "ASENKRON", power: 7.5,  amper: 17, maxStop: 64, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1780.62,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCODE",        name: "ARKEL-ARCODE ASENKRON 11 kW",          type: "ASENKRON", power: 11,   amper: 26, maxStop: 64, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1924.15,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCODE",        name: "ARKEL-ARCODE ASENKRON 15 kW",          type: "ASENKRON", power: 15,   amper: 35, maxStop: 64, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 2417.65,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCODE",        name: "ARKEL-ARCODE ASENKRON 22 kW",          type: "ASENKRON", power: 22,   amper: 50, maxStop: 64, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 2588.13,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCODE",        name: "ARKEL-ARCODE ASENKRON 35 kW",          type: "ASENKRON", power: 35,   amper: 75, maxStop: 64, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 2906.645, country: "Türkiye" },
  // ARKEL - ARL300
  { brand: "ARKEL",    model: "ARL300",        name: "ARKEL-ARL300 SENKRON 7,5 kW",          type: "SENKRON",  power: 7.5,  amper: 17, maxStop: 24, maxHiz: 1.6,  hazirTesisat: false, paralel: true, price: 2631.35,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARL300",        name: "ARKEL-ARL300 SENKRON 11 kW",           type: "SENKRON",  power: 11,   amper: 26, maxStop: 24, maxHiz: 1.6,  hazirTesisat: false, paralel: true, price: 2760.12,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARL300",        name: "ARKEL-ARL300 SENKRON 15 kW",           type: "SENKRON",  power: 15,   amper: 35, maxStop: 24, maxHiz: 1.6,  hazirTesisat: false, paralel: true, price: 3266.13,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARL300",        name: "ARKEL-ARL300 SENKRON 22 kW",           type: "SENKRON",  power: 22,   amper: 50, maxStop: 24, maxHiz: 1.6,  hazirTesisat: false, paralel: true, price: 3403.85,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARL300",        name: "ARKEL-ARL300 ASENKRON 7,5 kW",         type: "ASENKRON", power: 7.5,  amper: 17, maxStop: 24, maxHiz: 1.6,  hazirTesisat: false, paralel: true, price: 2152.90,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARL300",        name: "ARKEL-ARL300 ASENKRON 11 kW",          type: "ASENKRON", power: 11,   amper: 26, maxStop: 24, maxHiz: 1.6,  hazirTesisat: false, paralel: true, price: 2290.96,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARL300",        name: "ARKEL-ARL300 ASENKRON 15 kW",          type: "ASENKRON", power: 15,   amper: 35, maxStop: 24, maxHiz: 1.6,  hazirTesisat: false, paralel: true, price: 3082.15,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARL300",        name: "ARKEL-ARL300 ASENKRON 22 kW",          type: "ASENKRON", power: 22,   amper: 50, maxStop: 24, maxHiz: 1.6,  hazirTesisat: false, paralel: true, price: 3183.35,  country: "Türkiye" },
  // ARKEL - ARCUBE
  { brand: "ARKEL",    model: "ARCUBE",        name: "ARKEL-ARCUBE SENKRON 7,5 kW",          type: "SENKRON",  power: 7.5,  amper: 17, maxStop: 16, maxHiz: 1.75, hazirTesisat: true,  paralel: true, price: 1813.91,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCUBE",        name: "ARKEL-ARCUBE SENKRON 11 kW",           type: "SENKRON",  power: 11,   amper: 26, maxStop: 16, maxHiz: 1.75, hazirTesisat: true,  paralel: true, price: 1945.81,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCUBE",        name: "ARKEL-ARCUBE ASENKRON 7,5 kW",         type: "ASENKRON", power: 7.5,  amper: 17, maxStop: 16, maxHiz: 1.75, hazirTesisat: true,  paralel: true, price: 1322.16,  country: "Türkiye" },
  { brand: "ARKEL",    model: "ARCUBE",        name: "ARKEL-ARCUBE ASENKRON 11 kW",          type: "ASENKRON", power: 11,   amper: 26, maxStop: 16, maxHiz: 1.75, hazirTesisat: true,  paralel: true, price: 1440.87,  country: "Türkiye" },
  // WISEROL - WISEMONT MT70
  { brand: "WISEROL",  model: "WISEMONT MT70", name: "WISEROL-WISEMONT MT70 SENKRON 7,5 kW",  type: "SENKRON",  power: 7.5,  amper: 17, maxStop: 48, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1870.77,  country: "Türkiye" },
  { brand: "WISEROL",  model: "WISEMONT MT70", name: "WISEROL-WISEMONT MT70 SENKRON 11 kW",   type: "SENKRON",  power: 11,   amper: 26, maxStop: 48, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1964.31,  country: "Türkiye" },
  { brand: "WISEROL",  model: "WISEMONT MT70", name: "WISEROL-WISEMONT MT70 SENKRON 15 kW",   type: "SENKRON",  power: 15,   amper: 35, maxStop: 48, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 2432.00,  country: "Türkiye" },
  { brand: "WISEROL",  model: "WISEMONT MT70", name: "WISEROL-WISEMONT MT70 SENKRON 22 kW",   type: "SENKRON",  power: 22,   amper: 50, maxStop: 48, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 3928.62,  country: "Türkiye" },
  { brand: "WISEROL",  model: "WISEMONT MT70", name: "WISEROL-WISEMONT MT70 SENKRON 35 kW",   type: "SENKRON",  power: 35,   amper: 75, maxStop: 48, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 4209.235, country: "Türkiye" },
  { brand: "WISEROL",  model: "WISEMONT MT70", name: "WISEROL-WISEMONT MT70 ASENKRON 7,5 kW", type: "ASENKRON", power: 7.5,  amper: 17, maxStop: 48, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1683.69,  country: "Türkiye" },
  { brand: "WISEROL",  model: "WISEMONT MT70", name: "WISEROL-WISEMONT MT70 ASENKRON 11 kW",  type: "ASENKRON", power: 11,   amper: 26, maxStop: 48, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1777.23,  country: "Türkiye" },
  { brand: "WISEROL",  model: "WISEMONT MT70", name: "WISEROL-WISEMONT MT70 ASENKRON 15 kW",  type: "ASENKRON", power: 15,   amper: 35, maxStop: 48, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 2151.38,  country: "Türkiye" },
  { brand: "WISEROL",  model: "WISEMONT MT70", name: "WISEROL-WISEMONT MT70 ASENKRON 22 kW",  type: "ASENKRON", power: 22,   amper: 50, maxStop: 48, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 3648.00,  country: "Türkiye" },
  { brand: "WISEROL",  model: "WISEMONT MT70", name: "WISEROL-WISEMONT MT70 ASENKRON 35 kW",  type: "ASENKRON", power: 35,   amper: 75, maxStop: 48, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 3881.845, country: "Türkiye" },
  // HEDEFSAN - HD DRIVER
  { brand: "HEDEFSAN", model: "HD DRIVER",    name: "HEDEFSAN-HD DRIVER SENKRON 7,5 kW",     type: "SENKRON",  power: 7.5,  amper: 17, maxStop: 16, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 2631.35,  country: "Türkiye" },
  { brand: "HEDEFSAN", model: "HD DRIVER",    name: "HEDEFSAN-HD DRIVER SENKRON 11 kW",      type: "SENKRON",  power: 11,   amper: 26, maxStop: 16, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 2760.12,  country: "Türkiye" },
  { brand: "HEDEFSAN", model: "HD DRIVER",    name: "HEDEFSAN-HD DRIVER SENKRON 15 kW",      type: "SENKRON",  power: 15,   amper: 35, maxStop: 16, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 3266.13,  country: "Türkiye" },
  { brand: "HEDEFSAN", model: "HD DRIVER",    name: "HEDEFSAN-HD DRIVER ASENKRON 7,5 kW",    type: "ASENKRON", power: 7.5,  amper: 17, maxStop: 16, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 2290.96,  country: "Türkiye" },
  { brand: "HEDEFSAN", model: "HD DRIVER",    name: "HEDEFSAN-HD DRIVER ASENKRON 11 kW",     type: "ASENKRON", power: 11,   amper: 26, maxStop: 16, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 3082.15,  country: "Türkiye" },
  { brand: "HEDEFSAN", model: "HD DRIVER",    name: "HEDEFSAN-HD DRIVER ASENKRON 15 kW",     type: "ASENKRON", power: 15,   amper: 35, maxStop: 16, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 3183.35,  country: "Türkiye" },
  // KONEL - REVO DRIVE
  { brand: "KONEL",    model: "REVO DRIVE",   name: "KONEL-REVO DRIVE SENKRON 7,5 kW",       type: "SENKRON",  power: 7.5,  amper: 17, maxStop: 40, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1192.00,  country: "Çin" },
  { brand: "KONEL",    model: "REVO DRIVE",   name: "KONEL-REVO DRIVE SENKRON 11 kW",        type: "SENKRON",  power: 11,   amper: 26, maxStop: 40, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1241.00,  country: "Çin" },
  { brand: "KONEL",    model: "REVO DRIVE",   name: "KONEL-REVO DRIVE SENKRON 15 kW",        type: "SENKRON",  power: 15,   amper: 35, maxStop: 40, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1290.00,  country: "Çin" },
  { brand: "KONEL",    model: "REVO DRIVE",   name: "KONEL-REVO DRIVE SENKRON 22 kW",        type: "SENKRON",  power: 22,   amper: 50, maxStop: 40, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1339.00,  country: "Çin" },
  { brand: "KONEL",    model: "REVO DRIVE",   name: "KONEL-REVO DRIVE ASENKRON 7,5 kW",      type: "ASENKRON", power: 7.5,  amper: 17, maxStop: 40, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 926.00,   country: "Çin" },
  { brand: "KONEL",    model: "REVO DRIVE",   name: "KONEL-REVO DRIVE ASENKRON 11 kW",       type: "ASENKRON", power: 11,   amper: 26, maxStop: 40, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1020.00,  country: "Çin" },
  { brand: "KONEL",    model: "REVO DRIVE",   name: "KONEL-REVO DRIVE ASENKRON 15 kW",       type: "ASENKRON", power: 15,   amper: 35, maxStop: 40, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1090.00,  country: "Çin" },
  { brand: "KONEL",    model: "REVO DRIVE",   name: "KONEL-REVO DRIVE ASENKRON 22 kW",       type: "ASENKRON", power: 22,   amper: 50, maxStop: 40, maxHiz: 4,    hazirTesisat: true,  paralel: true, price: 1176.00,  country: "Çin" },
  // MIK-EL - U-STO
  { brand: "MIK-EL",   model: "U-STO",        name: "MIK-EL-U-STO SENKRON 7,5 kW",           type: "SENKRON",  power: 7.5,  amper: 18, maxStop: 48, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 1870.77,  country: "Çin" },
  { brand: "MIK-EL",   model: "U-STO",        name: "MIK-EL-U-STO SENKRON 11 kW",            type: "SENKRON",  power: 11,   amper: 26, maxStop: 48, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 1964.31,  country: "Çin" },
  { brand: "MIK-EL",   model: "U-STO",        name: "MIK-EL-U-STO SENKRON 15 kW",            type: "SENKRON",  power: 15,   amper: 34, maxStop: 48, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 2432.00,  country: "Çin" },
  { brand: "MIK-EL",   model: "U-STO",        name: "MIK-EL-U-STO ASENKRON 7,5 kW",          type: "ASENKRON", power: 7.5,  amper: 18, maxStop: 48, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 1683.69,  country: "Çin" },
  { brand: "MIK-EL",   model: "U-STO",        name: "MIK-EL-U-STO ASENKRON 11 kW",           type: "ASENKRON", power: 11,   amper: 26, maxStop: 48, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 1777.23,  country: "Çin" },
  { brand: "MIK-EL",   model: "U-STO",        name: "MIK-EL-U-STO ASENKRON 15 kW",           type: "ASENKRON", power: 15,   amper: 34, maxStop: 48, maxHiz: 3,    hazirTesisat: true,  paralel: true, price: 2151.38,  country: "Çin" },
]

async function main() {
  console.log("Seeding...")

  const doors = [
    { info: "Central 2 Panels 650*2000mm", opening: "Central", numberOfPanels: 2, width: 650, height: 2000, depth: 240, mechanismWidth: 1350 },
    { info: "Central 2 Panels 700*2000mm", opening: "Central", numberOfPanels: 2, width: 700, height: 2000, depth: 240, mechanismWidth: 1500 },
    { info: "Central 2 Panels 800*2000mm", opening: "Central", numberOfPanels: 2, width: 800, height: 2000, depth: 240, mechanismWidth: 1700 },
    { info: "Central 2 Panels 900*2000mm", opening: "Central", numberOfPanels: 2, width: 900, height: 2000, depth: 240, mechanismWidth: 1900 },
    { info: "Central 2 Panels 1000*2000mm", opening: "Central", numberOfPanels: 2, width: 1000, height: 2000, depth: 240, mechanismWidth: 2100 },
    { info: "Central 2 Panels 1100*2000mm", opening: "Central", numberOfPanels: 2, width: 1100, height: 2000, depth: 240, mechanismWidth: 2300 },
    { info: "Central 2 Panels 1200*2000mm", opening: "Central", numberOfPanels: 2, width: 1200, height: 2000, depth: 240, mechanismWidth: 2460 },
    { info: "Central 2 Panels 1300*2000mm", opening: "Central", numberOfPanels: 2, width: 1300, height: 2000, depth: 240, mechanismWidth: 2660 },
    { info: "Telescopic 2 Panels 700*2000mm", opening: "Telescopic", numberOfPanels: 2, width: 700, height: 2000, depth: 310, mechanismWidth: 1220 },
    { info: "Telescopic 2 Panels 800*2000mm", opening: "Telescopic", numberOfPanels: 2, width: 800, height: 2000, depth: 310, mechanismWidth: 1370 },
    { info: "Telescopic 2 Panels 900*2000mm", opening: "Telescopic", numberOfPanels: 2, width: 900, height: 2000, depth: 310, mechanismWidth: 1500 },
    { info: "Telescopic 2 Panels 1000*2000mm", opening: "Telescopic", numberOfPanels: 2, width: 1000, height: 2000, depth: 310, mechanismWidth: 1670 },
    { info: "Telescopic 2 Panels 1100*2000mm", opening: "Telescopic", numberOfPanels: 2, width: 1100, height: 2000, depth: 310, mechanismWidth: 1820 },
    { info: "Telescopic 2 Panels 1200*2000mm", opening: "Telescopic", numberOfPanels: 2, width: 1200, height: 2000, depth: 310, mechanismWidth: 2035 },
    { info: "Telescopic 2 Panels 1300*2000mm", opening: "Telescopic", numberOfPanels: 2, width: 1300, height: 2000, depth: 310, mechanismWidth: 2035 },
    { info: "Central 2 Panels 650*2100mm", opening: "Central", numberOfPanels: 2, width: 650, height: 2100, depth: 240, mechanismWidth: 1350 },
    { info: "Central 2 Panels 700*2100mm", opening: "Central", numberOfPanels: 2, width: 700, height: 2100, depth: 240, mechanismWidth: 1500 },
    { info: "Central 2 Panels 800*2100mm", opening: "Central", numberOfPanels: 2, width: 800, height: 2100, depth: 240, mechanismWidth: 1700 },
    { info: "Central 2 Panels 900*2100mm", opening: "Central", numberOfPanels: 2, width: 900, height: 2100, depth: 240, mechanismWidth: 1900 },
    { info: "Central 2 Panels 1000*2100mm", opening: "Central", numberOfPanels: 2, width: 1000, height: 2100, depth: 240, mechanismWidth: 2100 },
    { info: "Central 2 Panels 1100*2100mm", opening: "Central", numberOfPanels: 2, width: 1100, height: 2100, depth: 240, mechanismWidth: 2300 },
    { info: "Central 2 Panels 1200*2100mm", opening: "Central", numberOfPanels: 2, width: 1200, height: 2100, depth: 240, mechanismWidth: 2460 },
    { info: "Central 2 Panels 1300*2100mm", opening: "Central", numberOfPanels: 2, width: 1300, height: 2100, depth: 240, mechanismWidth: 2660 },
    { info: "Telescopic 2 Panels 700*2100mm", opening: "Telescopic", numberOfPanels: 2, width: 700, height: 2100, depth: 310, mechanismWidth: 1220 },
    { info: "Telescopic 2 Panels 800*2100mm", opening: "Telescopic", numberOfPanels: 2, width: 800, height: 2100, depth: 310, mechanismWidth: 1370 },
    { info: "Telescopic 2 Panels 900*2100mm", opening: "Telescopic", numberOfPanels: 2, width: 900, height: 2100, depth: 310, mechanismWidth: 1500 },
    { info: "Telescopic 2 Panels 1000*2100mm", opening: "Telescopic", numberOfPanels: 2, width: 1000, height: 2100, depth: 310, mechanismWidth: 1670 },
    { info: "Telescopic 2 Panels 1100*2100mm", opening: "Telescopic", numberOfPanels: 2, width: 1100, height: 2100, depth: 310, mechanismWidth: 1820 },
    { info: "Telescopic 2 Panels 1200*2100mm", opening: "Telescopic", numberOfPanels: 2, width: 1200, height: 2100, depth: 310, mechanismWidth: 2035 },
    { info: "Telescopic 2 Panels 1300*2100mm", opening: "Telescopic", numberOfPanels: 2, width: 1300, height: 2100, depth: 310, mechanismWidth: 2035 },
    { info: "Central 2 Panels 650*2200mm", opening: "Central", numberOfPanels: 2, width: 650, height: 2200, depth: 240, mechanismWidth: 1350 },
    { info: "Central 2 Panels 700*2200mm", opening: "Central", numberOfPanels: 2, width: 700, height: 2200, depth: 240, mechanismWidth: 1500 },
    { info: "Central 2 Panels 800*2200mm", opening: "Central", numberOfPanels: 2, width: 800, height: 2200, depth: 240, mechanismWidth: 1700 },
    { info: "Central 2 Panels 900*2200mm", opening: "Central", numberOfPanels: 2, width: 900, height: 2200, depth: 240, mechanismWidth: 1900 },
    { info: "Central 2 Panels 1000*2200mm", opening: "Central", numberOfPanels: 2, width: 1000, height: 2200, depth: 240, mechanismWidth: 2100 },
    { info: "Central 2 Panels 1100*2200mm", opening: "Central", numberOfPanels: 2, width: 1100, height: 2200, depth: 240, mechanismWidth: 2300 },
    { info: "Central 2 Panels 1200*2200mm", opening: "Central", numberOfPanels: 2, width: 1200, height: 2200, depth: 240, mechanismWidth: 2460 },
    { info: "Central 2 Panels 1300*2200mm", opening: "Central", numberOfPanels: 2, width: 1300, height: 2200, depth: 240, mechanismWidth: 2660 },
    { info: "Telescopic 2 Panels 700*2200mm", opening: "Telescopic", numberOfPanels: 2, width: 700, height: 2200, depth: 310, mechanismWidth: 1220 },
    { info: "Telescopic 2 Panels 800*2200mm", opening: "Telescopic", numberOfPanels: 2, width: 800, height: 2200, depth: 310, mechanismWidth: 1370 },
    { info: "Telescopic 2 Panels 900*2200mm", opening: "Telescopic", numberOfPanels: 2, width: 900, height: 2200, depth: 310, mechanismWidth: 1500 },
    { info: "Telescopic 2 Panels 1000*2200mm", opening: "Telescopic", numberOfPanels: 2, width: 1000, height: 2200, depth: 310, mechanismWidth: 1670 },
    { info: "Telescopic 2 Panels 1100*2200mm", opening: "Telescopic", numberOfPanels: 2, width: 1100, height: 2200, depth: 310, mechanismWidth: 1820 },
    { info: "Telescopic 2 Panels 1200*2200mm", opening: "Telescopic", numberOfPanels: 2, width: 1200, height: 2200, depth: 310, mechanismWidth: 2035 },
    { info: "Telescopic 2 Panels 1300*2200mm", opening: "Telescopic", numberOfPanels: 2, width: 1300, height: 2200, depth: 310, mechanismWidth: 2035 },
    { info: "W Type Central 2 Panels 600*2000mm", opening: "W Type", numberOfPanels: 2, width: 600, height: 2000, depth: 140, mechanismWidth: 855 },
    { info: "W Type Central 2 Panels 700*2000mm", opening: "W Type", numberOfPanels: 2, width: 700, height: 2000, depth: 140, mechanismWidth: 955 },
    { info: "W Type Central 2 Panels 800*2000mm", opening: "W Type", numberOfPanels: 2, width: 800, height: 2000, depth: 140, mechanismWidth: 1055 },
    { info: "W Type Central 2 Panels 900*2000mm", opening: "W Type", numberOfPanels: 2, width: 900, height: 2000, depth: 140, mechanismWidth: 1155 },
    { info: "Semi Automatic 700*2000mm", opening: "Single Wing", numberOfPanels: 1, width: 700, height: 2000, depth: 56, mechanismWidth: 960 },
    { info: "Semi Automatic 800*2000mm", opening: "Single Wing", numberOfPanels: 1, width: 800, height: 2000, depth: 56, mechanismWidth: 1060 },
    { info: "Semi Automatic 900*2000mm", opening: "Single Wing", numberOfPanels: 1, width: 900, height: 2000, depth: 56, mechanismWidth: 1160 },
    { info: "Semi Automatic 1000*2000mm", opening: "Single Wing", numberOfPanels: 1, width: 1000, height: 2000, depth: 56, mechanismWidth: 1260 },
  ]

  const barits = [
    { brand: "RATE", model: "MRL96", ctwA: 960, ctwB: 200, ctwC: 53, ctwKg: 35 },
    { brand: "RATE", model: "MRL76", ctwA: 760, ctwB: 200, ctwC: 68, ctwKg: 35 },
    { brand: "RATE", model: "MRL56", ctwA: 560, ctwB: 200, ctwC: 91, ctwKg: 35 },
    { brand: "RATE", model: "RPD96", ctwA: 960, ctwB: 150, ctwC: 60, ctwKg: 25 },
    { brand: "RATE", model: "RPD76", ctwA: 760, ctwB: 150, ctwC: 76, ctwKg: 25 },
    { brand: "RATE", model: "RPD56", ctwA: 560, ctwB: 150, ctwC: 110, ctwKg: 25 },
    { brand: "RATE", model: "D4 96", ctwA: 960, ctwB: 150, ctwC: 60, ctwKg: 33 },
    { brand: "RATE", model: "D4 76", ctwA: 760, ctwB: 150, ctwC: 76, ctwKg: 33 },
    { brand: "RATE", model: "D4 56", ctwA: 560, ctwB: 150, ctwC: 110, ctwKg: 33 },
    { brand: "GreenWeight", model: "GWK 970", ctwA: 970, ctwB: 150, ctwC: 50, ctwKg: 45 },
    { brand: "GreenWeight", model: "GWK 770", ctwA: 770, ctwB: 150, ctwC: 50, ctwKg: 35 },
    { brand: "GreenWeight", model: "GWK 670", ctwA: 670, ctwB: 150, ctwC: 50, ctwKg: 30 },
    { brand: "OKKA LIFT", model: "BRT 55", ctwA: 550, ctwB: 150, ctwC: 120, ctwKg: 28 },
    { brand: "OKKA LIFT", model: "BRT 60", ctwA: 600, ctwB: 150, ctwC: 120, ctwKg: 30 },
    { brand: "OKKA LIFT", model: "BRT 76", ctwA: 760, ctwB: 150, ctwC: 120, ctwKg: 40 },
    { brand: "OKKA LIFT", model: "BRT 96-1", ctwA: 960, ctwB: 150, ctwC: 120, ctwKg: 50 },
    { brand: "OKKA LIFT", model: "OPD55", ctwA: 550, ctwB: 150, ctwC: 120, ctwKg: 40 },
    { brand: "OKKA LIFT", model: "OPD60", ctwA: 600, ctwB: 150, ctwC: 100, ctwKg: 38 },
    { brand: "OKKA LIFT", model: "OPD76", ctwA: 760, ctwB: 150, ctwC: 100, ctwKg: 50 },
    { brand: "OKKA LIFT", model: "OPD86", ctwA: 850, ctwB: 150, ctwC: 75, ctwKg: 40 },
    { brand: "OKKA LIFT", model: "OPD96", ctwA: 960, ctwB: 150, ctwC: 70, ctwKg: 45 },
    { brand: "OKKA LIFT", model: "OPD100", ctwA: 960, ctwB: 150, ctwC: 100, ctwKg: 65 },
    { brand: "Özinan", model: "BRT 50", ctwA: 960, ctwB: 160, ctwC: 120, ctwKg: 50 },
    { brand: "Özinan", model: "BRT 40", ctwA: 760, ctwB: 160, ctwC: 120, ctwKg: 40 },
    { brand: "Özinan", model: "BRT 30", ctwA: 500, ctwB: 160, ctwC: 120, ctwKg: 30 },
    { brand: "Özinan", model: "BOX-big", ctwA: 960, ctwB: 160, ctwC: 120, ctwKg: 75 },
    { brand: "Özinan", model: "BOX-mid", ctwA: 760, ctwB: 160, ctwC: 120, ctwKg: 55 },
    { brand: "Özinan", model: "BOX-small", ctwA: 500, ctwB: 160, ctwC: 120, ctwKg: 45 },
  ]

  // ── Supplier seed ──────────────────────────────────────────────────────────
  await prisma.motor.deleteMany()
  await prisma.supplier.deleteMany()
  for (const s of SUPPLIERS) {
    await prisma.supplier.upsert({
      where:  { id: s.id },
      update: { name: s.name, region: s.region, country: s.country },
      create: s,
    })
  }
  console.log(`✓ ${SUPPLIERS.length} tedarikçi eklendi`)

  // ── Door / Barit seed ──────────────────────────────────────────────────────
  await prisma.product.deleteMany()
  await prisma.doorDimension.deleteMany()
  await prisma.barit.deleteMany()

  await prisma.doorDimension.createMany({ data: doors })
  await prisma.barit.createMany({ data: barits })

  console.log(`✓ ${doors.length} kapı boyutu eklendi`)
  console.log(`✓ ${barits.length} barit eklendi`)

  // ── Ürün seeding (products 2.csv) ──────────────────────────────────────────
  const CSV_PATH = path.join(__dirname, "..", "products 2.csv")

  if (!fs.existsSync(CSV_PATH)) {
    console.log("⚠ products 2.csv bulunamadı, ürün seeding atlandı")
  } else {
    const allDims = await prisma.doorDimension.findMany()

    function findDim(opening, width, height) {
      return allDims.find(d => d.opening === opening && d.width === width && d.height === height)
    }
    function parseName(name) {
      const productType = name.includes("Car Door") ? "CAR_DOOR" : "LANDING_DOOR"
      const opening = name.includes("Telescopic") ? "Telescopic" : "Central"
      const dimMatch = name.match(/(\d+)\*(\d+)mm/)
      const width  = dimMatch ? parseInt(dimMatch[1]) : 0
      const height = dimMatch ? parseInt(dimMatch[2]) : 0
      const material = name.replace(/.*\d+\*\d+mm\s*/i, "").trim()
      const brand = name.split(" ")[0]
      return { productType, opening, width, height, material, brand }
    }

    const raw = fs.readFileSync(CSV_PATH, "utf-8")
    const lines = raw.split("\n").filter(Boolean).slice(1)

    let created = 0, skipped = 0
    for (const line of lines) {
      const cols = line.split(";")
      const csvId = parseInt(cols[0])
      const name  = cols[1]?.trim()
      const price = parseFloat(cols[2]) || 0
      const catId = parseInt(cols[3])
      if (!name || isNaN(csvId) || catId !== 1) continue

      const p = parseName(name)
      const dim = findDim(p.opening, p.width, p.height)
      if (!dim) { skipped++; continue }

      await prisma.product.upsert({
        where:  { csvId },
        update: {},
        create: {
          csvId,
          name,
          category:        "DOOR",
          price,
          brand:           p.brand,
          material:        p.material,
          productType:     p.productType,
          doorDimensionId: dim.id,
        },
      })
      created++
    }
    console.log(`✓ ${created} ürün eklendi (${skipped} atlandı)`)
  }

  // ── Motor seeding (motors 2.csv) ───────────────────────────────────────────
  const MOTOR_CSV_PATH = path.join(__dirname, "..", "motors 2.csv")

  if (!fs.existsSync(MOTOR_CSV_PATH)) {
    console.log("⚠ motors 2.csv bulunamadı, motor seeding atlandı")
  } else {
    const motorRaw = fs.readFileSync(MOTOR_CSV_PATH, "utf-8")
    const motorLines = motorRaw.split("\n").filter(Boolean)
    const motorHeaders = motorLines[0].split(";").map(h => h.trim())
    const motorRows = motorLines.slice(1)

    let motorCreated = 0
    for (const line of motorRows) {
      const cols = line.split(";")
      if (cols.length < 2) continue

      const row = {}
      motorHeaders.forEach((h, i) => { row[h] = cols[i]?.trim() ?? "" })

      const csvId = parseInt(row.motor_id)
      if (!csvId) continue

      const supplierId = parseInt(row.supplier_id) || 0
      const supplier   = SUPPLIERS.find(s => s.id === supplierId)
      if (!supplier) {
        console.warn(`  ⚠ Bilinmeyen supplier_id: ${supplierId} (motor: ${row.model_name})`)
        continue
      }

      const motorData = {
        csvId,
        modelName:       row.model_name || "",
        capacity:        parseInt(row.capacity)    || 0,
        speed:           parseFloat(row.speed)     || 0,
        kw:              parseFloat(row.kw)        || 0,
        pulleySize:      parseInt(row.pulley_size) || 0,
        ropeRow:         parseInt(row.rope_row)    || 0,
        ropeSize:        parseFloat(row.rope_size) || 0,
        supplierId,
        current:         row.current             ? parseFloat(row.current)              : null,
        frequency:       row.frequency           ? parseFloat(row.frequency)            : null,
        brakeVoltage:    row.brake_voltage        ? parseFloat(row.brake_voltage)        : null,
        staticLoad:      row.static_load          ? parseFloat(row.static_load)          : null,
        maxTravel:       row.max_travel_d         ? parseFloat(row.max_travel_d)         : null,
        maxTravelWithBC: row.max_travel_d_with_BC ? parseFloat(row.max_travel_d_with_BC) : null,
        ropeType:        row.rope_type || "",
        gear:            row.gear      || "",
        encoder:         row.encoder  || null,
        poleAmount:      row.pole_amount ? parseInt(row.pole_amount) : null,
        vvvf:            row.vvvf      || null,
        rpm:             row.rpm       ? parseInt(row.rpm)          : null,
        brand:           supplier.name,
        country:         supplier.country,
        active:          true,
      }

      await prisma.motor.upsert({
        where:  { csvId },
        update: motorData,
        create: motorData,
      })
      motorCreated++
    }
    console.log(`✓ ${motorCreated} motor eklendi`)
  }

  // ── CommandBox (Panel) seed ────────────────────────────────────────────────
  await prisma.commandBox.deleteMany()
  for (const p of PANELS) {
    const specs = PANEL_SPECS[p.model] || null
    await prisma.commandBox.create({
      data: { ...p, specs: specs ? JSON.stringify(specs) : null },
    })
  }
  console.log(`✓ ${PANELS.length} pano eklendi`)

  // ── CabinModel seed ───────────────────────────────────────────────────────
  await prisma.cabinModel.deleteMany()
  await prisma.cabinModel.createMany({
    data: [
      { name: "Kabin Model A", material: "Satine Paslanmaz",       imageUrl: null },
      { name: "Kabin Model B", material: "Ayna Paslanmaz",         imageUrl: null },
      { name: "Kabin Model C", material: "Sarı Ayna Paslanmaz",    imageUrl: null },
      { name: "Kabin Model D", material: "Siyah Paslanmaz",        imageUrl: null },
      { name: "Kabin Model E", material: "Titanyum Kaplama",       imageUrl: null },
      { name: "Kabin Model F", material: "RAL Boyalı",             imageUrl: null },
      { name: "Kabin Model G", material: "Satine Paslanmaz",       imageUrl: null },
      { name: "Kabin Model H", material: "Ayna Paslanmaz",         imageUrl: null },
    ],
  })
  console.log("✓ Kabin modelleri eklendi")

  // ── CeilingModel seed ─────────────────────────────────────────────────────
  await prisma.ceilingModel.deleteMany()
  await prisma.ceilingModel.createMany({
    data: [
      { name: "Tavan Model 1",          materials: JSON.stringify(["Ayna Paslanmaz", "Satine Paslanmaz", "Sarı Ayna Paslanmaz", "Siyah Paslanmaz"]), imageUrl: null },
      { name: "Tavan Model 2",          materials: JSON.stringify(["Ayna Paslanmaz", "Satine Paslanmaz", "RAL Boyalı"]),                             imageUrl: null },
      { name: "Tavan Model 3 (Lazer)",  materials: JSON.stringify(["Ayna Paslanmaz", "Satine Paslanmaz", "Sarı Ayna Paslanmaz"]),                    imageUrl: null },
      { name: "Tavan Model 4 (Lazer)",  materials: JSON.stringify(["Siyah Paslanmaz", "Titanyum Kaplama"]),                                          imageUrl: null },
      { name: "Tavan Model 5 (Lazer)",  materials: JSON.stringify(["Ayna Paslanmaz", "Satine Paslanmaz", "Sarı Ayna Paslanmaz", "RAL Boyalı"]),      imageUrl: null },
      { name: "Tavan Model 6",          materials: JSON.stringify(["Ayna Paslanmaz", "Satine Paslanmaz"]),                                           imageUrl: null },
    ],
  })
  console.log("✓ Tavan modelleri eklendi")

  // ── FloorModel seed ───────────────────────────────────────────────────────
  await prisma.floorModel.deleteMany()
  await prisma.floorModel.createMany({
    data: [
      { name: "Granit Model 1", floorType: "Granit", imageUrl: null },
      { name: "Granit Model 2", floorType: "Granit", imageUrl: null },
      { name: "Granit Model 3", floorType: "Granit", imageUrl: null },
      { name: "Granit Model 4", floorType: "Granit", imageUrl: null },
      { name: "PVC Model 1",    floorType: "PVC",    imageUrl: null },
      { name: "PVC Model 2",    floorType: "PVC",    imageUrl: null },
      { name: "PVC Model 3",    floorType: "PVC",    imageUrl: null },
    ],
  })
  console.log("✓ Taban modelleri eklendi")

  // ── ButtonModel seed ──────────────────────────────────────────────────────
  await prisma.buttonModel.deleteMany()
  await prisma.buttonModel.createMany({
    data: [
      { name: "Yuvarlak Buton",  imageUrl: null },
      { name: "Kare Buton",      imageUrl: null },
      { name: "Kristal Buton",   imageUrl: null },
      { name: "Metal Buton",     imageUrl: null },
      { name: "Premium Buton",   imageUrl: null },
    ],
  })
  console.log("✓ Buton modelleri eklendi")

  // ── CopModel seed ─────────────────────────────────────────────────────────
  await prisma.copModel.deleteMany()
  await prisma.copModel.createMany({
    data: [
      { name: "COP Model 1", panoBrand: "ARKEL",    boyTipi: "Tam Boy",  montajTipi: "Sıva Altı",  material: "Satine Paslanmaz",    tftSupport: true,  imageUrl: null },
      { name: "COP Model 2", panoBrand: "ARKEL",    boyTipi: "Tam Boy",  montajTipi: "Sıva Üstü",  material: "Ayna Paslanmaz",      tftSupport: true,  imageUrl: null },
      { name: "COP Model 3", panoBrand: "ARKEL",    boyTipi: "Yarı Boy", montajTipi: "Sıva Altı",  material: "Siyah Paslanmaz",     tftSupport: false, imageUrl: null },
      { name: "COP Model 4", panoBrand: "HEDEFSAN", boyTipi: "Tam Boy",  montajTipi: "Sıva Altı",  material: "Satine Paslanmaz",    tftSupport: true,  imageUrl: null },
      { name: "COP Model 5", panoBrand: "HEDEFSAN", boyTipi: "Tam Boy",  montajTipi: "Sıva Üstü",  material: "Sarı Ayna Paslanmaz", tftSupport: false, imageUrl: null },
      { name: "COP Model 6", panoBrand: "HEDEFSAN", boyTipi: "Yarı Boy", montajTipi: "Sıva Üstü",  material: "Ayna Paslanmaz",      tftSupport: true,  imageUrl: null },
      { name: "COP Model 7", panoBrand: "WISEROL",  boyTipi: "Tam Boy",  montajTipi: "Sıva Altı",  material: "Satine Paslanmaz",    tftSupport: true,  imageUrl: null },
      { name: "COP Model 8", panoBrand: "WISEROL",  boyTipi: "Yarı Boy", montajTipi: "Sıva Altı",  material: "Siyah Paslanmaz",     tftSupport: false, imageUrl: null },
      { name: "COP Model 9", panoBrand: "KONEL",    boyTipi: "Tam Boy",  montajTipi: "Sıva Üstü",  material: "Titanyum Kaplama",    tftSupport: false, imageUrl: null },
      { name: "COP Model 10",panoBrand: "MIK-EL",   boyTipi: "Tam Boy",  montajTipi: "Sıva Altı",  material: "RAL Boyalı",          tftSupport: false, imageUrl: null },
    ],
  })
  console.log("✓ COP modelleri eklendi")

  // ── LopModel seed ─────────────────────────────────────────────────────────
  await prisma.lopModel.deleteMany()
  await prisma.lopModel.createMany({
    data: [
      { name: "LOP Model 1", panoBrand: "ARKEL",    material: "Satine Paslanmaz",    supportedDisplays: JSON.stringify(["Ekransız","LCD","TFT","Dot Matrix","7 Segment"]), imageUrl: null },
      { name: "LOP Model 2", panoBrand: "ARKEL",    material: "Ayna Paslanmaz",      supportedDisplays: JSON.stringify(["Ekransız","LCD","TFT"]),                          imageUrl: null },
      { name: "LOP Model 3", panoBrand: "ARKEL",    material: "Siyah Paslanmaz",     supportedDisplays: JSON.stringify(["Ekransız","LCD","Dot Matrix"]),                   imageUrl: null },
      { name: "LOP Model 4", panoBrand: "HEDEFSAN", material: "Satine Paslanmaz",    supportedDisplays: JSON.stringify(["Ekransız","LCD","TFT","7 Segment"]),              imageUrl: null },
      { name: "LOP Model 5", panoBrand: "HEDEFSAN", material: "Sarı Ayna Paslanmaz", supportedDisplays: JSON.stringify(["Ekransız","LCD"]),                               imageUrl: null },
      { name: "LOP Model 6", panoBrand: "HEDEFSAN", material: "Ayna Paslanmaz",      supportedDisplays: JSON.stringify(["Ekransız","LCD","TFT","Dot Matrix"]),             imageUrl: null },
      { name: "LOP Model 7", panoBrand: "WISEROL",  material: "Satine Paslanmaz",    supportedDisplays: JSON.stringify(["Ekransız","LCD","TFT"]),                          imageUrl: null },
      { name: "LOP Model 8", panoBrand: "WISEROL",  material: "RAL Boyalı",          supportedDisplays: JSON.stringify(["Ekransız","7 Segment"]),                         imageUrl: null },
      { name: "LOP Model 9", panoBrand: "KONEL",    material: "Satine Paslanmaz",    supportedDisplays: JSON.stringify(["Ekransız","LCD","Dot Matrix"]),                   imageUrl: null },
      { name: "LOP Model 10",panoBrand: "MIK-EL",   material: "Ayna Paslanmaz",      supportedDisplays: JSON.stringify(["Ekransız","LCD"]),                               imageUrl: null },
    ],
  })
  console.log("✓ LOP modelleri eklendi")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
