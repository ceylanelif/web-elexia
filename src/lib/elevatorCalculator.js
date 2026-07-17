import { ShaftConstantDatas as C } from "./constants"

// ─── 1. CTW Konum & Motor Tipi Belirleyici ────────────────────────────────────
export function determineCtwLocation({ makineDairesi, sonKatMesafesi }) {
  const oh = parseInt(sonKatMesafesi)
  let motorFrame
  let location = { sideCtw: false, backCtw: false }

  if (makineDairesi) {
    motorFrame = "MrFrame"
    location.sideCtw = true
    location.backCtw = true
  } else if (!makineDairesi && oh <= 3400) {
    motorFrame = "MrlRailBase"
    location.sideCtw = true
    location.backCtw = false
  } else if (!makineDairesi && oh > 3400) {
    motorFrame = "MrlBeam"
    location.sideCtw = true
    location.backCtw = oh >= 3800
  }

  return { motorFrame, location }
}

// ─── 2. Kapı Filtreleyici ─────────────────────────────────────────────────────
export function filterDoorsByShaftWidth(doors, kuyuGenisligi) {
  const shaft = parseInt(kuyuGenisligi)
  const wallWS = C.door.door_A_WS + C.door.door_B_WS // 100mm

  return doors.filter(
    (d) => d.mechanismWidth && d.mechanismWidth + wallWS <= shaft
  )
}

// ─── 3. Kapının Kuyu İçinde Kapladığı Alan ────────────────────────────────────
export function calcDoorSpace(door, kuyuGenisligi, kuyuDerinligi) {
  const shaftW = parseInt(kuyuGenisligi)
  const shaftD = parseInt(kuyuDerinligi)
  const wallWS = C.door.door_A_WS + C.door.door_B_WS

  return {
    emptyDepthRemains: shaftD - door.depth,
    emptyWidthRemains: shaftW - (door.mechanismWidth + wallWS),
  }
}

// ─── 4. Karkas Boy Hesaplayıcı ────────────────────────────────────────────────
export function calcCarcassLength(barit, technical) {
  const oh = parseInt(technical.sonKatMesafesi)
  const pit = parseInt(technical.kuyuDibi)
  const { motorFrame } = determineCtwLocation(technical)
  const L = C.carcassLength

  const base =
    oh + pit
    - L.bufferHeightMin - L.bufferWS - L.downside
    - L.ctwWs - L.upside - L.pulley
    - L.pulleyProtection - L.ceilingWs

  let emptyLength
  if (motorFrame === "MrFrame") {
    emptyLength = base
  } else if (motorFrame === "MrlBeam") {
    emptyLength = base - L.machineBeam * 2 - L.motorHeight - L.motorToCeilingWS
  } else {
    // MrlRailBase
    emptyLength = base - L.carcassMotorWs - L.motorHeight - L.motorToCeilingWS
  }

  return {
    motorFrame,
    emptyLength,
    piece: Math.floor(emptyLength / barit.ctwC),
    // Eski algoritmadaki gibi: floor EN SONDA uygulanır (bölüm + çarpım bittikten sonra)
    // Math.floor(piece * kg) değil, Math.floor((emptyLength / ctwC) * kg)
    // Fark: 10.78 * 43 = 463 (doğru) vs floor(10.78) * 43 = 10 * 43 = 430 (yanlış)
    singleKg: Math.floor((emptyLength / barit.ctwC) * barit.ctwKg),
    doubleKg: Math.floor((emptyLength / barit.ctwC) * barit.ctwKg * 2),
  }
}

// ─── 5. Karkas Derinlik Hesaplayıcı ──────────────────────────────────────────
// Slim = tek sıra barit (ctwB genişliğinde)
// Fat  = iki barit yan yana (two_X_b = ctwB * 2 — derinlik 2 katına çıkar)
export function calcCarcassDepth(barit) {
  const d = C.carcassDepth
  const noPudrelBase   = d.ctw_B_WS + d.seperatorCtwWs + d.seperatorWidth
  const withPudrelBase = d.ctw_D_WS + d.ctwPudrelWs + d.pudrelWidth

  return {
    slimNoPudrel:   noPudrelBase   + barit.ctwB,       // tek sıra, arka CTW
    fatNoPudrel:    noPudrelBase   + barit.ctwB * 2,   // çift sıra, arka CTW (two_X_b = ctwB × 2)
    slimWithPudrel: withPudrelBase + barit.ctwB,       // tek sıra, yan CTW
    fatWithPudrel:  withPudrelBase + barit.ctwB * 2,   // çift sıra, yan CTW (two_X_b = ctwB × 2)
  }
}

// ─── 6. Karkas Genişlik Hesaplayıcı ──────────────────────────────────────────
// two_X_a = ctwA × 2 (çift sıra yan yana — genişlik 2 katına çıkar)
export function calcCarcassWidth(barit) {
  const w = C.carcassWidth
  const pudrelTotal = 2 * (w.pudrelWallWS + w.pudrelWidth + w.ctwRailSizeMax + w.railCarcassWs)

  return {
    single:      pudrelTotal + barit.ctwA,      // tek sıra sistem genişliği
    doubleSided: pudrelTotal + barit.ctwA * 2,  // çift sıra sistem genişliği (two_X_a = ctwA × 2)
  }
}

// ─── 7. Kabin Alanı → Kapasite ───────────────────────────────────────────────
const cabinSizeTable = {
  100: 0.37,  180: 0.58,  225: 0.70,  300: 0.90,  375: 1.10,
  400: 1.17,  450: 1.30,  525: 1.45,  600: 1.60,  630: 1.66,
  675: 1.75,  750: 1.90,  800: 2.00,  825: 2.05,  900: 2.20,
  1000: 2.40, 1050: 2.50, 1125: 2.65, 1200: 2.80, 1250: 2.90,
  1350: 3.10, 1425: 3.25, 1500: 3.40, 1600: 3.56,
}

const cabinKgTable = {
  225: 350,   300: 450,   375: 550,   400: 600,   450: 650,
  525: 750,   600: 850,   630: 900,   675: 950,   750: 1050,
  800: 1150,  825: 1200,  900: 1300,  1000: 1400, 1050: 1500,
  1125: 1600, 1200: 1700, 1250: 1750, 1350: 1900, 1425: 2000,
  1500: 2100, 1600: 2250,
}

export function areaToCapacity(areaSqM) {
  let closest = null, minDiff = Infinity
  for (const [kg, area] of Object.entries(cabinSizeTable)) {
    const diff = Math.abs(areaSqM - area)
    if (diff < minDiff) { minDiff = diff; closest = parseInt(kg) }
  }
  return closest
}

export function capacityToNeededBarit(capacityKg) {
  let closest = null, minDiff = Infinity
  for (const [kg, baritKg] of Object.entries(cabinKgTable)) {
    const diff = Math.abs(capacityKg - parseInt(kg))
    if (diff < minDiff) { minDiff = diff; closest = baritKg }
  }
  return closest
}

// ─── 8. Ana Hesaplama — Geçerli Kabin Boyutları ───────────────────────────────
export function calcValidCabinSizes(barits, technical, door) {
  const { location } = determineCtwLocation(technical)
  const shaftW = parseInt(technical.kuyuGenisligi)
  const shaftD = parseInt(technical.kuyuDerinligi)
  const doorSpace = calcDoorSpace(door, shaftW, shaftD)
  const wC = C.cabinWidth
  const dC = C.carcassDepth

  const results = []
  // Back ve side CTW için AYRI unique set — eski algoritmadaki gibi
  // Aynı kabin boyutu hem back hem side için geçerliyse ikisi de listelenir
  const uniqueBackKeys = new Set()
  const uniqueSideKeys = new Set()

  for (const barit of barits) {
    const carcassLen   = calcCarcassLength(barit, technical)
    const carcassDepth = calcCarcassDepth(barit)
    const carcassWidth = calcCarcassWidth(barit)

    // ── ARKA CTW ────────────────────────────────────────────────────────────
    if (location.backCtw) {
      // Kuyu genişliği ağırlık sistemine yetiyor mu?
      // Yeterliyse çift sıra mı tek sıra mı diye belirle → kapasiteyi buna göre al
      let backBaritCap
      if (shaftW >= carcassWidth.doubleSided) {
        backBaritCap = carcassLen.doubleKg        // çift sıra sığıyor
      } else if (shaftW >= carcassWidth.single) {
        backBaritCap = carcassLen.singleKg        // sadece tek sıra sığıyor
      } else {
        continue  // bu barit arka CTW için hiç uygun değil
      }

      // Slim (tek sıra) ve fat (çift sıra yan yana) — derinlikleri aynı ama
      // ileride genişlik hesabında ayrı kullanılabilir diye ikisini de tara
      for (const type of ["slim", "fat"]) {
        const ctwD = type === "slim"
          ? carcassDepth.slimNoPudrel
          : carcassDepth.fatNoPudrel  // two_X_b = ctwB → slimNoPudrel ile aynı değer

        // Kapı derinliği + ağırlık derinliği düşüldükten sonra kalan boşluk
        const depthAfterCTW = doorSpace.emptyDepthRemains - ctwD
        if (depthAfterCTW <= 0) continue

        // Separator çalışma boşluğunu 1mm artırarak 50mm katan kabin derinliklerini bul
        for (let sepWs = dC.seperatorCabinWs; sepWs <= depthAfterCTW; sepWs++) {
          const cabinD = depthAfterCTW - sepWs
          if (cabinD < 800) break
          if (cabinD % 50 !== 0) continue

          // Duvar konsolunu 1mm artırarak 50mm katan kabin genişliklerini bul
          for (let cons = wC.railWallConsoleMin; cons <= wC.railWallConsoleMax; cons++) {
            const cabinW = shaftW - 2 * (wC.railCabinWS + wC.mainRailSizeMax) - 2 * cons
            if (cabinW < 800) break
            if (cabinW % 50 !== 0) continue

            const areaSqM    = (cabinW * cabinD) / 1_000_000
            const capacity   = areaToCapacity(areaSqM)
            const neededBarit = capacityToNeededBarit(capacity)

            if (backBaritCap < neededBarit) continue  // kapasite yetmiyor

            const key = `${cabinW}-${cabinD}-${capacity}`
            if (uniqueBackKeys.has(key)) continue
            uniqueBackKeys.add(key)

            results.push({
              width: cabinW, depth: cabinD, capacity, neededBarit,
              location: "back",
              baritModel: barit.model,
              baritBrand: barit.brand,
            })
          }
        }
      }
    }

    // ── YAN CTW ─────────────────────────────────────────────────────────────
    if (location.sideCtw) {
      for (const type of ["slim", "fat"]) {
        // Ağırlık sistemi derinliği (pudrel dahil) — yan CTW genişliği etkiler
        const ctwDepthWithPudrel = type === "slim"
          ? carcassDepth.slimWithPudrel
          : carcassDepth.fatWithPudrel  // iki değer aynı çünkü two_X_b = ctwB

        // Kapı yanında ağırlık için yer var mı?
        // Varsa → tüm kuyu derinliğini kullan, yoksa → kapıdan artan derinliği kullan
        const isSpaceNextToDoor = doorSpace.emptyWidthRemains >= ctwDepthWithPudrel
        const emptyLengthForCtw = isSpaceNextToDoor ? shaftD : doorSpace.emptyDepthRemains

        // Mevcut uzunluğa göre çift sıra mı tek sıra mı sığıyor → kapasiteyi belirle
        let sideBaritCap
        if (emptyLengthForCtw >= carcassWidth.doubleSided) {
          // Çift sıra yan yana sığıyor
          sideBaritCap = type === "fat"
            ? carcassLen.doubleKg * 2   // fat + doubleSided = en yüksek kapasite
            : carcassLen.doubleKg
        } else if (emptyLengthForCtw >= carcassWidth.single) {
          // Sadece tek sıra sığıyor
          sideBaritCap = type === "fat"
            ? carcassLen.doubleKg       // fat + single
            : carcassLen.singleKg
        } else {
          continue  // bu barit bu tip için hiç uygun değil
        }

        // Kabin derinlikleri: kapıdan artan boşluktan 75mm min çalışma boşluğu düş
        for (let ws = 75; ws <= doorSpace.emptyDepthRemains; ws++) {
          const cabinD = shaftD - door.depth - ws
          if (cabinD < 800) break
          if (cabinD % 50 !== 0) continue

          // Kabin genişliği: yan CTW sistemi genişlikten yer alıyor
          for (let cons = wC.railWallConsoleMin; cons <= wC.railWallConsoleMax; cons++) {
            const cabinW =
              shaftW
              - ctwDepthWithPudrel          // ağırlık sistemi (pudrel dahil)
              - wC.pudrelConsole            // pudrel konsolu
              - wC.mainRailSizeMax * 2      // her iki taraf ana ray
              - wC.railCabinWS * 2          // ray-kabin çalışma boşlukları
              - cons                        // duvar konsolu

            if (cabinW < 800) break
            if (cabinW % 50 !== 0) continue

            const areaSqM     = (cabinW * cabinD) / 1_000_000
            const capacity    = areaToCapacity(areaSqM)
            const neededBarit = capacityToNeededBarit(capacity)

            if (sideBaritCap < neededBarit) continue  // kapasite yetmiyor

            const key = `${cabinW}-${cabinD}-${capacity}`
            if (uniqueSideKeys.has(key)) continue
            uniqueSideKeys.add(key)

            results.push({
              width: cabinW, depth: cabinD, capacity, neededBarit,
              location: "side",
              baritModel: barit.model,
              baritBrand: barit.brand,
            })
          }
        }
      }
    }
  }

  return results.sort((a, b) => a.capacity - b.capacity)
}
