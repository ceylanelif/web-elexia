import { create } from "zustand"

/**
 * useQuoteStore — Elexia konfigürasyon sihirbazı için global state
 *
 * Step 1 — Technical: durakSayisi, kuyuGenisligi, kuyuDerinligi,
 *                      kuyuDibi, sonKatMesafesi, makineDairesi, hiz, ropeTip
 * Step 2 — (reserved / company info)
 * Step 3 — cabin: { door: DoorDimension, cabinSize: { width, depth, capacity, ... } }
 * Step 4 — cabinDoor: Product (CAR_DOOR)
 * Step 5 — landingDoors: { default: Product, floors: [{ floor, productId }] }
 */
export const useQuoteStore = create((set, get) => ({
  // ── Step 1 ──────────────────────────────────────────────────────────────
  technical: {
    durakSayisi:     "",
    kuyuGenisligi:   "",
    kuyuDerinligi:   "",
    kuyuDibi:        "",
    sonKatMesafesi:  "",
    makineDairesi:   false,
    hiz:             "1.0",
    ropeTip:         "steel",
  },
  setTechnical: (data) =>
    set((s) => ({ technical: { ...s.technical, ...data } })),

  // ── Step 3 ──────────────────────────────────────────────────────────────
  cabin: null, // { door, cabinSize }
  setCabin: (cabin) => set({ cabin }),

  // ── Step 4 — Kabin Kapısı ────────────────────────────────────────────
  cabinDoor: null,
  setCabinDoor: (product) => set({ cabinDoor: product }),

  // ── Step 5 — Kat Kapısı ─────────────────────────────────────────────
  landingDoors: null,
  // landingDoors shape:
  // { brand, defaultProduct: Product, floors: [{ floor, product: Product }] }
  setLandingDoors: (data) => set({ landingDoors: data }),

  // ── Reset ────────────────────────────────────────────────────────────
  reset: () =>
    set({
      technical: {
        durakSayisi: "", kuyuGenisligi: "", kuyuDerinligi: "",
        kuyuDibi: "", sonKatMesafesi: "", makineDairesi: false,
        hiz: "1.0", ropeTip: "steel",
      },
      cabin:        null,
      cabinDoor:    null,
      landingDoors: null,
    }),
}))
