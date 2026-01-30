import { useState } from 'react'

export const Imagen = () => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [searchText, setSearchText] = useState('')

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedImage(file)
            // Crear preview de la imagen
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = () => {
        setSelectedImage(null)
        setPreviewUrl(null)
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">

            <div className="mb-6">
                <h2 className="text-3xl font-bold text-black mb-2">Bienvenido</h2>
                <p className="text-2xl text-black">¿Qué planta estas buscando?</p>
            </div>

            {previewUrl && (
                <div className="mt-4 relative">
                    <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-w-full h-auto rounded-lg shadow-lg"
                    />
                    <button 
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-4">

                <label className="cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        className="hidden"
                    />
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </label>

                <input 
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Describe la planta o sube una imagen..."
                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
                />

                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Buscar
                </button>
            </div>
        </div>
    )
}