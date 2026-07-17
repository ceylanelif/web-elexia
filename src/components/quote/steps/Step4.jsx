"use client"
import { useState, useEffect } from "react"
import { useQuoteStore } from "@/lib/quoteStore"

const MATERIALS = [
  "Satin Stainless Steel",
  "Mirror Stainless Steel",
  "Decorative Stainless Steel",
  "Glass With Stainless Steel Frame",
  "Ral Painted",
]

export default function Step4({ onNext, onBack }) {
  const { technical, cabin, cabinDoor, setCabinDoor } = useQuoteStore()

  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState("")

  // Filters
  const [filterMaterial, setFilterMaterial]   = useState("")
  const [filterBrand, setFilterBrand]         = useState("")
  const [filterFire, setFilterFire]           = useState("")

  const [selected, setSelected] = useState(cabinDoor || null)

  // The door dimension from Step 3
  const door     = cabin?.door      // DoorDimension object selected in Step3
  const cabinSize = cabin?.cabinSize // { width, depth, capacity, ... }

  useEffect(() => {
    if (!door) return
    setLoading(true)
    const params = new URLSearchParams({
      productType:   "CAR_DOOR",
      width:         door.openingWidth,
      height:        door.openingHeight,
    })
    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setError("Ürünler yüklenemedi.")
        setLoading(false)
      })
  }, [door])

  // Filtered list
  const filtered = products.filter((p) => {
    if (filterMaterial && p.material !== filterMaterial) return false
    if (filterBrand    && p.brand    !== filterBrand)    return false
    if (filterFire     && String(p.fireResistance) !== filterFire) return false
    return true
  })

  // Unique values for filter dropdowns
  const brands    = [...new Set(products.map((p) => p.brand))]

  function handleSelect(product) {
    setSelected(product)
    setError("")
  }

  function handleNext() {
    if (!selected) {
      setError("Lütfen bir kabin kapısı seçin.")
      return
    }
    setCabinDoor(selected)
    onNext()
  }

  if (!door) {
    return (
      <div className="p-6 text-center text-gray-500">
        Önce 3. adımda kapı boyutu ve kabin ölçüsü seçin.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Kabin Kapısı Seçimi</h2>
        <p className="text-sm text-gray-500 mt-1">
          Seçilen kapı boyutu:{" "}
          <span className="font-medium text-gray-700">
            {door.openingWidth} × {door.openingHeight} mm —{" "}
            {door.type === "CENTRAL" ? "Merkezi" : "Teleskopik"}
          </span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterMaterial}
          onChange={(e) => setFilterMaterial(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Tüm Malzemeler</option>
          {MATERIALS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {brands.length > 1 && (
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Tüm Markalar</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        )}

        <select
          value={filterFire}
          onChange={(e) => setFilterFire(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Yangın Direnci: Tümü</option>
          <option value="true">Yangına Dayanıklı</option>
          <option value="false">Standart</option>
        </select>

        {(filterMaterial || filterBrand || filterFire) && (
          <button
            onClick={() => { setFilterMaterial(""); setFilterBrand(""); setFilterFire("") }}
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Filtreleri Temizle
          </button>
        )}
      </div>

      {/* Product table */}
      {loading ? (
        <div className="text-center py-8 text-gray-400 text-sm">Yükleniyor...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-sm">
          Bu boyut için ürün bulunamadı.
        </div>
      ) : (
        <div className="overflow-auto max-h-80 border border-gray-200 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-2 text-gray-600 font-medium">Marka</th>
                <th className="text-left px-4 py-2 text-gray-600 font-medium">Malzeme</th>
                <th className="text-left px-4 py-2 text-gray-600 font-medium">Tip</th>
                <th className="text-left px-4 py-2 text-gray-600 font-medium">Yangın</th>
                <th className="text-right px-4 py-2 text-gray-600 font-medium">Fiyat</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const isSelected = selected?.id === p.id
                return (
                  <tr
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    className={`cursor-pointer border-t border-gray-100 transition ${
                      isSelected ? "text-white" : "hover:bg-gray-50"
                    }`}
                    style={isSelected ? { backgroundColor: "#009444" } : {}}
                  >
                    <td className="px-4 py-2 font-medium">{p.brand}</td>
                    <td className="px-4 py-2">{p.material}</td>
                    <td className="px-4 py-2">
                      {p.doorDimension?.type === "CENTRAL" ? "Merkezi" : "Teleskopik"} ·{" "}
                      {p.doorDimension?.openingWidth}×{p.doorDimension?.openingHeight}mm
                    </td>
                    <td className="px-4 py-2">
                      {p.fireResistance ? (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isSelected ? "bg-white/20 text-white" : "bg-orange-100 text-orange-700"}`}>
                          Yangına Dayanıklı
                        </span>
                      ) : (
                        <span className={`text-xs ${isSelected ? "text-white/70" : "text-gray-400"}`}>—</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {p.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} €
                    </td>
                    <td className="px-4 py-2 text-center">
                      {isSelected && (
                        <svg className="w-5 h-5 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Selected summary */}
      {selected && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm">
          <span className="font-medium text-green-800">Seçilen: </span>
          <span className="text-green-700">
            {selected.brand} · {selected.material} ·{" "}
            {selected.doorDimension?.openingWidth}×{selected.doorDimension?.openingHeight}mm ·{" "}
            <span className="font-semibold">
              {selected.price.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} €
            </span>
          </span>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Navigation */}
      <div className="flex justify-between pt-2">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition"
        >
          Geri
        </button>
        <button
          onClick={handleNext}
          disabled={!selected}
          className="px-6 py-2 rounded-lg text-white text-sm font-medium transition disabled:opacity-40"
          style={{ backgroundColor: "#009444" }}
        >
          Devam
        </button>
      </div>
    </div>
  )
}
