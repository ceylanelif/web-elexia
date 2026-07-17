"use client";

import { useEffect, useState } from "react";
import { useQuoteStore } from "@/store/useQuoteStore";

// ─────────────────────────────────────────────────────────────────────────────
// STANDART ZORUNLU URUNLER
// ─────────────────────────────────────────────────────────────────────────────
const STANDART_URUNLER = [
  { code: "MKK-001",  name: "MAKİNA KASNAK KORUMA SACI",                                   qty: 1,  unit: "Adet",  group: "Standart" },
  { code: "HLK-6MM",  name: "HALAT KLEMENSİ (6 mm REGÜLATÖR HALATI İÇİN)",                qty: 6,  unit: "Adet",  group: "Standart" },
  { code: "HLT-126",  name: "HALAT TUTUCU 12x6,5 mm",                                      qty: 2,  unit: "Adet",  group: "Standart" },
  { code: "SEP-1100", name: "SEPERATÖR SACI (RAY ARASI 1100 mm)",                          qty: 1,  unit: "Adet",  group: "Standart" },
  { code: "YDL-KAB",  name: "YAĞDANLIK KABİN ÜSTÜ",                                       qty: 4,  unit: "Adet",  group: "Standart" },
  { code: "YTK-DIP",  name: "KUYU DİBİ YAĞ TOPLAMA KABI",                                 qty: 4,  unit: "Adet",  group: "Standart" },
  { code: "MRD-EN81", name: "MERDİVEN - KUYU DİBİ MERDİVENİ EN81-20",                    qty: 1,  unit: "Adet",  group: "Standart" },
  { code: "PRS-AN81", name: "PRADAS ANAKART DEVRESİ - EN81-20 ÇİFT YÖNLÜ HABERLEŞME",   qty: 1,  unit: "Adet",  group: "Standart" },
  { code: "BTN-STP",  name: "BUTON ACİL STOP KUTULU",                                      qty: 2,  unit: "Adet",  group: "Standart" },
  { code: "SPR-19",   name: "SPİRAL BORU 19'luk",                                          qty: 10, unit: "Metre", group: "Standart" },
  { code: "PKT-001",  name: "PAKETLEME",                                                    qty: 1,  unit: "Adet",  group: "Standart" },
];

// ─────────────────────────────────────────────────────────────────────────────
// YARDIMCI: Kuyu boyu hesabi (CartSidebar ile ayni mantik)
// ─────────────────────────────────────────────────────────────────────────────
function calcKuyuBoyu(cart) {
  const t = cart.technical ?? {};
  return (
    (Number(t.sonKatMesafesi)          || 0) +
    (Number(t.seyirMesafesi)           || 0) +
    (Number(t.kuyuDibi)                || 0) +
    (t.makineDairesi ? (Number(t.makineDairesiYuksekligi) || 0) : 0)
  );
}

function ceilTo5(n) {
  return Math.ceil(n / 5) * 5;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SEHPA / TAKOZ / HALAT SABİT UC
// ─────────────────────────────────────────────────────────────────────────────
function resolveSehpaTakozHalat(cart) {
  const makineDairesi = cart.technical?.makineDairesi ?? false;
  const gear          = cart.motor?.gear;
  const capacity      = Number(cart.motor?.capacity) || 0;
  const askiTipi      = cart.technical?.askiTipi;
  const isGearless    = gear === "GEARLESS";
  const items         = [];

  items.push(
    makineDairesi
      ? { code: "REG-YER", name: "REGÜLATÖR YER SEHPASI", qty: 1, unit: "Adet", group: "Sehpa & Takoz" }
      : { code: "REG-RAY", name: "REGÜLATÖR RAY SEHPASI", qty: 1, unit: "Adet", group: "Sehpa & Takoz" }
  );

  if (makineDairesi) {
    if (!isGearless) {
      items.push({ code: "SEH-AYKLI", name: "MAKİNE SEHPASI AYAKLI", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
    } else {
      if      (capacity <= 800)  items.push({ code: "SEH-YER-1", name: "DİŞLİSİZ MOTOR YER SEHPASI TİP 1", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
      else if (capacity <= 1250) items.push({ code: "SEH-YER-2", name: "DİŞLİSİZ MOTOR YER SEHPASI TİP 2", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
      else if (capacity <= 1600) items.push({ code: "SEH-YER-3", name: "DİŞLİSİZ MOTOR YER SEHPASI TİP 3", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
      else                       items.push({ code: "SEH-YER-4", name: "DİŞLİSİZ MOTOR YER SEHPASI TİP 4", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
    }
  } else {
    if      (capacity <= 800)  items.push({ code: "SEH-RAY-1", name: "RAY TİPİ SEHPA TİP 1", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
    else if (capacity <= 1250) items.push({ code: "SEH-RAY-2", name: "RAY TİPİ SEHPA TİP 2", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
    else if (capacity <= 1600) items.push({ code: "SEH-RAY-3", name: "RAY TİPİ SEHPA TİP 3", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
    else                       items.push({ code: "SEH-RAY-4", name: "RAY TİPİ SEHPA TİP 4", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
  }

  items.push(
    makineDairesi
      ? { code: "TAK-140", name: "TAKOZ - MAKİNA TAKOZU 140x140x30",      qty: 4, unit: "Adet", group: "Sehpa & Takoz" }
      : { code: "TAK-MRL", name: "TAKOZ - MRL MAKİNA VİBRASYON LASTİĞİ", qty: 1, unit: "Adet", group: "Sehpa & Takoz" }
  );

  if (makineDairesi) {
    if (askiTipi !== "1:1") {
      if      (capacity <= 800)  items.push({ code: "HSD-1", name: "HALAT SABİT UÇ DEMİRİ TİP 1", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
      else if (capacity <= 1250) items.push({ code: "HSD-2", name: "HALAT SABİT UÇ DEMİRİ TİP 2", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
      else if (capacity <= 1600) items.push({ code: "HSD-3", name: "HALAT SABİT UÇ DEMİRİ TİP 3", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
      else                       items.push({ code: "HSD-4", name: "HALAT SABİT UÇ DEMİRİ TİP 4", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
    }
  } else {
    if      (capacity <= 800)  items.push({ code: "HSR-1", name: "HALAT SABİT UÇ RAY TİPİ TİP 1", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
    else if (capacity <= 1250) items.push({ code: "HSR-2", name: "HALAT SABİT UÇ RAY TİPİ TİP 2", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
    else if (capacity <= 1600) items.push({ code: "HSR-3", name: "HALAT SABİT UÇ RAY TİPİ TİP 3", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
    else                       items.push({ code: "HSR-4", name: "HALAT SABİT UÇ RAY TİPİ TİP 4", qty: 1, unit: "Adet", group: "Sehpa & Takoz" });
  }

  return items;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. HIZ REGULATÖRÜ
// ─────────────────────────────────────────────────────────────────────────────
function resolveHizRegulatoru(cart, brand) {
  if (!brand) return null;
  const isGearless = cart.motor?.gear === "GEARLESS";
  const bobinTipi  = isGearless ? "MRL BOBİN" : "A3 BOBİN";
  const hiz        = cart.motor?.speed ?? "";
  return {
    code:  `HRG-${brand}`,
    name:  `HIZ REGÜLATÖRÜ - ${bobinTipi} 190 VDC ${hiz} m/s ${brand}`,
    qty:   1,
    unit:  "Adet",
    group: "Hız Regülatörü",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ÇELİK HALAT 6mm
// ─────────────────────────────────────────────────────────────────────────────
function resolveCelikHalat(cart) {
  const kuyuBoyuMm = calcKuyuBoyu(cart);
  const kuyuM      = kuyuBoyuMm / 1000;
  const qty        = (kuyuM + 3) * 2;
  return {
    code:  "CH-6MM",
    name:  "ÇELİK HALAT 6 mm REGÜLATÖR HALATI",
    qty:   Math.round(qty),
    unit:  "Metre",
    group: "Çelik Halat",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. MOTOR HALAT AKSESUARLARI
// ─────────────────────────────────────────────────────────────────────────────
function resolveHalatAksesuarlari(cart) {
  const ropeSize = cart.motor?.ropeSize;
  const ropeRow  = Number(cart.motor?.ropeRow) || 0;
  if (!ropeSize || !ropeRow) return [];

  const size         = String(ropeSize); // "6.5", "8", "10"
  const siseMiktar   = ropeRow * 2;
  const klemensMiktar = ropeRow * 6;

  return [
    { code: `HSP-${size}-PLT`, name: `HALAT ŞİŞESİ ${size} mm SAC GÖVDE PLASTİK`, qty: siseMiktar,    unit: "Adet", group: "Halat Aksesuar" },
    { code: `HSP-${size}-YAY`, name: `HALAT ŞİŞESİ ${size} mm SAC GÖVDE YAYLI`,   qty: siseMiktar,    unit: "Adet", group: "Halat Aksesuar" },
    { code: `HKL-${size}`,     name: `HALAT KLEMENSİ (${size} mm HALAT İÇİN)`,    qty: klemensMiktar, unit: "Adet", group: "Halat Aksesuar" },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. RAY
// ─────────────────────────────────────────────────────────────────────────────
function resolveRay(cart, rayMarka) {
  if (!rayMarka) return { items: [], meta: null };

  const capacity   = Number(cart.motor?.capacity) || 0;
  const speed      = Number(cart.motor?.speed)    || 0;
  const kuyuBoyuMm = calcKuyuBoyu(cart);
  const kuyuM      = kuyuBoyuMm / 1000;
  const rayMetraj  = ceilTo5(kuyuM * 2);
  const civataSayisi = rayMetraj / 5;

  // Ana ray
  let anaRayTip, anaRayCode;
  if (speed === 2.0 || capacity <= 500) {
    anaRayTip  = "T 70/A 75×65×9";
    anaRayCode = "T70A";
  } else if (capacity <= 800) {
    anaRayTip  = "T 89/B 89×62×16";
    anaRayCode = "T89B";
  } else {
    anaRayTip  = "T 90/B 90×75×16";
    anaRayCode = "T90B";
  }

  // Agirlik rayi
  let agirlikRayTip, agirlikRayCode;
  if (capacity < 1600) {
    agirlikRayTip  = "T 50/A 50×50×5";
    agirlikRayCode = "T50A";
  } else {
    agirlikRayTip  = "T 70/A 75×65×9";
    agirlikRayCode = "T70A";
  }

  // Civata takimi
  const civataTipiAna    = anaRayCode === "T70A" ? "70 LİK" : "89-90 LIK";
  const civataTipiAgirik = agirlikRayCode === "T50A" ? "50 LİK" : "70 LİK";

  const items = [
    { code: `RAY-ANA-${anaRayCode}`,    name: `${anaRayTip} RAY + FLANŞ ${rayMarka}`,     qty: rayMetraj,   unit: "Metre", group: "Ray" },
    { code: `CIV-ANA-${anaRayCode}`,    name: `${civataTipiAna} RAY FLANŞ CİVATA TAKIMI`, qty: civataSayisi, unit: "Adet",  group: "Ray" },
    { code: `RAY-AGR-${agirlikRayCode}`, name: `${agirlikRayTip} RAY + FLANŞ ${rayMarka}`, qty: rayMetraj,   unit: "Metre", group: "Ray" },
    { code: `CIV-AGR-${agirlikRayCode}`, name: `${civataTipiAgirik} RAY FLANŞ CİVATA TAKIMI`, qty: civataSayisi, unit: "Adet", group: "Ray" },
  ];

  return {
    items,
    meta: { anaRayTip, agirlikRayTip, rayMetraj, civataSayisi },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// RENK HARITASI
// ─────────────────────────────────────────────────────────────────────────────
const groupColor = {
  "Standart":        "bg-gray-100 text-gray-600 border-gray-300",
  "Sehpa & Takoz":   "bg-blue-50 text-blue-700 border-blue-200",
  "Hız Regülatörü":  "bg-red-50 text-red-700 border-red-200",
  "Çelik Halat":     "bg-teal-50 text-teal-700 border-teal-200",
  "Halat Aksesuar":  "bg-purple-50 text-purple-700 border-purple-200",
  "Ray":             "bg-orange-50 text-orange-700 border-orange-200",
};

const HIZ_REG_MARKALARI = ["SELKAS", "ASPAR", "LIMAK"];
const RAY_MARKALARI     = ["ÖZRAY", "YILMAZ", "SÜRÜCÜ", "ÜNAL"];

// ─────────────────────────────────────────────────────────────────────────────
// BİLEŞEN
// ─────────────────────────────────────────────────────────────────────────────
export default function Step9({ onNext, onBack }) {
  const { cart, updateCart } = useQuoteStore();

  const [hizBrand, setHizBrand] = useState(cart.extras?.hizRegulatotuMarka ?? "");
  const [rayMarka, setRayMarka] = useState(cart.extras?.rayMarka ?? "");

  const sehpaItems   = resolveSehpaTakozHalat(cart);
  const halatItem    = resolveCelikHalat(cart);
  const regulItem    = resolveHizRegulatoru(cart, hizBrand);
  const halatAksItems = resolveHalatAksesuarlari(cart);
  const { items: rayItems, meta: rayMeta } = resolveRay(cart, rayMarka);

  const allItems = [
    ...STANDART_URUNLER,
    ...sehpaItems,
    halatItem,
    ...(regulItem ? [regulItem] : []),
    ...halatAksItems,
    ...rayItems,
  ];

  useEffect(() => {
    updateCart("extras", {
      standart:           STANDART_URUNLER,
      sehpaTakozHalat:    sehpaItems,
      celikHalat:         halatItem,
      hizRegulatoru:      regulItem,
      hizRegulatotuMarka: hizBrand,
      halatAksesuarlari:  halatAksItems,
      ray:                rayItems,
      rayMarka,
    });
  }, [hizBrand, rayMarka]);

  const canContinue = !!hizBrand && !!rayMarka;

  const isGearless  = cart.motor?.gear === "GEARLESS";
  const motorHiz    = cart.motor?.speed ?? "—";
  const ropeSize    = cart.motor?.ropeSize ?? "—";
  const ropeRow     = cart.motor?.ropeRow  ?? "—";
  const kuyuBoyuMm  = calcKuyuBoyu(cart);
  const capacity    = Number(cart.motor?.capacity) || 0;

  return (
    <div className="flex flex-col gap-6">

      <div>
        <h2 className="text-xl font-bold text-gray-800">Ekstralar — Standart & Otomatik Ürünler</h2>
        <p className="text-sm text-gray-500 mt-1">
          Hız regülatörü ve ray markasını seçin. Diğer tüm ürünler otomatik belirlendi.
        </p>
      </div>

      {/* ── HIZ REGULATÖRÜ MARKA SEÇİMİ ── */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-red-600 px-5 py-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Hız Regülatörü Marka Seçimi</h3>
          {!hizBrand && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Zorunlu</span>}
          {hizBrand  && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">✓ Seçildi</span>}
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-3">
            Motor: <strong>{isGearless ? "Dişlisiz (MRL BOBİN)" : "Dişlili (A3 BOBİN)"}</strong>
            &nbsp;·&nbsp; Hız: <strong>{motorHiz} m/s</strong>
          </p>
          <div className="grid grid-cols-3 gap-3">
            {HIZ_REG_MARKALARI.map((m) => (
              <button
                key={m}
                onClick={() => setHizBrand(m)}
                className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  hizBrand === m
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          {hizBrand && (
            <p className="text-xs text-gray-500 mt-3 bg-gray-50 rounded-lg px-3 py-2 font-mono">
              {resolveHizRegulatoru(cart, hizBrand)?.name}
            </p>
          )}
        </div>
      </div>

      {/* ── RAY MARKA SEÇİMİ ── */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-orange-600 px-5 py-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Ray Marka Seçimi</h3>
          {!rayMarka && <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">Zorunlu</span>}
          {rayMarka  && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">✓ Seçildi</span>}
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-3">
            Kapasite: <strong>{capacity} kg</strong>
            &nbsp;·&nbsp; Hız: <strong>{motorHiz} m/s</strong>
            &nbsp;·&nbsp; Kuyu Boyu: <strong>{(kuyuBoyuMm / 1000).toFixed(1)} m</strong>
            &nbsp;·&nbsp; Ray Metrajı: <strong>{ceilTo5((kuyuBoyuMm / 1000) * 2)} m</strong>
          </p>
          {rayMeta && (
            <div className="text-xs text-gray-500 bg-orange-50 rounded-lg px-3 py-2 mb-3 space-y-0.5">
              <p>Ana Ray: <strong className="text-gray-700">{rayMeta.anaRayTip}</strong></p>
              <p>Ağırlık Rayı: <strong className="text-gray-700">{rayMeta.agirlikRayTip}</strong></p>
              <p>Cıvata Takımı: <strong className="text-gray-700">{rayMeta.civataSayisi} adet (her 5m = 1 adet)</strong></p>
            </div>
          )}
          <div className="grid grid-cols-4 gap-3">
            {RAY_MARKALARI.map((m) => (
              <button
                key={m}
                onClick={() => setRayMarka(m)}
                className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  rayMarka === m
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── OTO HESAP ÖZETLERİ ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-3">
          <p className="text-xs font-semibold text-teal-700 mb-1">Çelik Halat</p>
          <p className="text-xs text-teal-600">
            ({kuyuBoyuMm / 1000} + 3) × 2 = <strong>{halatItem.qty} Metre</strong>
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
          <p className="text-xs font-semibold text-purple-700 mb-1">Halat Aksesuarları</p>
          <p className="text-xs text-purple-600">
            Çap: <strong>{ropeSize} mm</strong> · Sıra: <strong>{ropeRow}</strong>
            &nbsp;→&nbsp; Şişe: {typeof ropeRow === "number" ? ropeRow * 2 : "—"} · Klemens: {typeof ropeRow === "number" ? ropeRow * 6 : "—"} adet
          </p>
        </div>
      </div>

      {/* ── TÜM OTOMATIK URUNLER ── */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-green-600 px-5 py-3">
          <h3 className="text-sm font-semibold text-white">
            Sepete Eklenecek Ürünler ({allItems.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {allItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-2.5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md bg-green-50 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{item.code}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${groupColor[item.group] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                  {item.group}
                </span>
                <span className="text-xs font-semibold text-gray-700 w-20 text-right">
                  {item.qty} {item.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
        <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-blue-700">
          Hız regülatörü ve ray markası seçilmeden devam edilemez.
        </p>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
          ← Geri
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${
            canContinue
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Devam →
        </button>
      </div>
    </div>
  );
}
