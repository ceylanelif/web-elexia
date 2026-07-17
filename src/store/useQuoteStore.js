import { create } from "zustand";

/**
 * useQuoteStore — Elexia konfigürasyon sihirbazı global state
 *
 * cart keys:
 *   technical   — Step1: teknik ölçüler
 *   cabin       — Step3: kabin boyutu & kapı
 *   cabinDoor   — Step4: kabin kapısı ürünü
 *   landingDoors— Step5: kat kapıları
 *   motor       — Step6: motor
 *   panel       — Step7: pano (brand, model)
 *   cassette    — Step8: COP & LOP & Kapı Üstü
 *   lop         — Step9: LOP (eski yapı uyumu)
 *   extras      — ek seçenekler
 */
export const useQuoteStore = create((set, get) => ({
  cart: {
    technical:    null,
    cabin:        null,
    cabinDoor:    null,
    landingDoors: null,
    motor:        null,
    panel:        null,
    cassette:     null,
    lop:          null,
    extras:       null,
  },

  updateCart: (key, data) =>
    set((s) => ({
      cart: { ...s.cart, [key]: { ...(s.cart[key] ?? {}), ...data } },
    })),

  resetCart: () =>
    set({
      cart: {
        technical: null, cabin: null, cabinDoor: null,
        landingDoors: null, motor: null, panel: null,
        cassette: null, lop: null, extras: null,
      },
    }),
}));
