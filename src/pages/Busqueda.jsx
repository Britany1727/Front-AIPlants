import { Link } from "react-router-dom"
import { Imagen } from "./Imagen"

export const Busqueda = () => {

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16 flex justify-between items-center px-4 md:px-6">
                <img className="h-16 w-auto object-contain" src="/Logo2.png" alt="" />
                <h1 className="text-2xl text-center ml-8 font-serif bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">AIPLANTS</h1>
            <nav className="flex-1 flex justify-center">
                <ul className="flex justify-center items-center gap-4 my-4">
                    <li><Link to="/Plantas" className="bg-green-300 text-black px-6 py-2 rounded-xl shadow-md hover:bg-cyan-200 hover:scale-105 transition-transform duration-200">Plantas</Link></li>
                </ul>
            </nav>
            </header>
            <body className="justificy-center bg-gradient-to-r from-green-300 to-blue-300 mt-20">
                <Imagen />
            </body>
        </>
    )
}