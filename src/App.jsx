import { useState } from 'react'

function App() {
  const [file, setFile] = useState(null)
  const [searchText, setSearchText] = useState('') // Estado para el texto del buscador
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([]) // Historial de "Plantas Recientes"

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile)) // Previsualización de la imagen
    }
  }

  const handleIdentify = async (e) => {
    e.preventDefault()
    if (!file && !searchText) return alert("Sube una foto o escribe un nombre")

    setLoading(true)
    const formData = new FormData()
    if (file) formData.append('file', file)
    formData.append('descripcion', searchText) // Enviamos el texto al backend

    try {
      const response = await fetch('https://back-ai-plants-yg9e.vercel.app/identificar', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      setResult(data)
      
      // Actualizar historial lateral
      const newEntry = { 
        name: data.planta, 
        img: preview || 'https://cdn-icons-png.flaticon.com/512/628/628283.png' 
      }
      setHistory(prev => [newEntry, ...prev.slice(0, 2)])
      setSearchText("") // Limpiar input tras buscar
    } catch (error) {
      alert("Error en el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a7f3d0] via-[#e2f3f5] to-[#93c5fd] relative overflow-hidden font-sans">
      
      {/* Hojas Decorativas */}
      <img src="https://www.pngarts.com/files/3/Tropical-Leaves-Transparent-Background-PNG.png" 
           className="absolute -bottom-20 -left-20 w-96 opacity-30 pointer-events-none" alt="" />

      {/* Navbar */}
      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto relative z-20">
        <div className="flex items-center gap-3">
          <div className="bg-[#0a2e52] text-white p-2 rounded-full font-bold px-4">AIP</div>
          <h1 className="text-[#0a2e52] font-black text-2xl italic">AIPLANTS</h1>
        </div>
        <button className="bg-[#93f5b7] text-slate-800 font-bold py-2 px-10 rounded-full shadow-lg">Plantas</button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-10 relative z-10">
        <div className="mb-10">
          <h2 className="text-6xl font-black text-[#0a2e52] tracking-tighter">Bienvenido</h2>
          <p className="text-2xl text-slate-700 font-medium">¿Qué planta estas buscando?</p>
        </div>

        {/* BUSCADOR DUAL: Imagen + Texto */}
        <form onSubmit={handleIdentify} className="bg-[#1e293b] p-2 rounded-2xl flex items-center gap-4 shadow-2xl mb-16 border border-slate-700">
          <label className="cursor-pointer bg-[#334155] w-14 h-14 flex items-center justify-center rounded-xl text-white text-3xl hover:bg-slate-600 transition-all shrink-0">
            +
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          
          <input 
            type="text" 
            placeholder="Sube la imagen de tu planta" 
            className="flex-1 bg-transparent border-none text-slate-200 placeholder-slate-5K00 focus:outline-none text-lg italic"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button type="submit" disabled={loading} className="bg-[#10b981] text-white px-12 py-4 rounded-xl font-extrabold text-lg hover:bg-[#059669] transition-all shrink-0">
            {loading ? "..." : "Buscar"}
          </button>
        </form>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* TARJETA DE RESULTADOS */}
          {result && (
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white/40 backdrop-blur-2xl p-8 rounded-[50px] shadow-2xl border border-white/50">
                <div className="relative h-80 w-full mb-6">
                  <img src={preview || 'https://via.placeholder.com/400'} 
                      className="w-full h-full object-cover rounded-[40px] shadow-md" alt="" />
                  <div className="absolute bottom-6 left-6 bg-white/90 px-6 py-2 rounded-full font-black text-[#0a2e52]">
                    {result.planta}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-800 text-lg"><span className="font-black">Beneficios:</span> {result.beneficios}</p>
                  <div className="bg-[#93f5b7]/40 p-5 rounded-3xl border border-[#93f5b7]">
                    <p className="text-slate-700 text-sm font-bold">Cuidados: {result.cuidados}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HISTORIAL LATERAL */}
          <div className="lg:col-span-5 bg-slate-800/5 backdrop-blur-sm rounded-[50px] p-8 border border-white/20">
            <h4 className="text-2xl font-black text-[#0a2e52] mb-8 flex items-center gap-2">🌿 Plantas Recientes</h4>
            <div className="space-y-4">
              {history.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/70 p-4 rounded-[30px] shadow-sm">
                  <img src={item.img} className="w-16 h-16 rounded-2xl object-cover" />
                  <div>
                    <h5 className="font-bold text-[#0a2e52]">{item.name}</h5>
                    <p className="text-[10px] text-slate-400 italic">Identificada hace un momento</p>
                  </div>
                </div>
              ))}
              {history.length === 0 && <p className="text-slate-400 italic text-center py-10">Tu historial aparecerá aquí...</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
