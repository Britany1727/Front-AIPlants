import { useState } from 'react'

export const Tarjeta_Planta = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Cuadro con imagen */}
            <div 
                onClick={() => setIsOpen(true)}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
                <img 
                    src="/planta-ejemplo.jpg" 
                    alt="Planta" 
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800">Rosa</h3>
                    <p className="text-gray-600">Click para ver más</p>
                </div>
            </div>

            {/* Modal con información */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsOpen(false)}
                >
                    <div 
                        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botón cerrar */}
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="float-right m-4 text-gray-500 hover:text-gray-800"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Contenido del modal */}
                        <div className="p-6">
                            <img 
                                src="/planta-ejemplo.jpg" 
                                alt="Planta" 
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Rosa</h2>
                            
                            <div className="space-y-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">Nombre científico:</h3>
                                    <p className="text-gray-600">Rosa spp.</p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">Descripción:</h3>
                                    <p className="text-gray-600">
                                        Las rosas son plantas del género Rosa, dentro de la familia Rosaceae. 
                                        Son conocidas por sus flores hermosas y fragantes.
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">Cuidados:</h3>
                                    <ul className="list-disc list-inside text-gray-600">
                                        <li>Riego moderado</li>
                                        <li>Luz solar directa</li>
                                        <li>Suelo bien drenado</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}