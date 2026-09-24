import  { useState } from 'react'
import hero from '/src/assets/logo-GdqARQRt.png'
import { Link, NavLink } from 'react-router'

export default function Nav() {

  const [isopen, setIsopen] = useState(false)

  function handlerhamp() {
    setIsopen(!isopen)
  }

  return (
    <nav dir="rtl" className="bg-[#121212] border-b border-zinc-800/80 fixed w-full z-50 top-0 inset-x-0 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
       
        <Link to="/" className="flex items-center [text-decoration:none] !no-underline gap-3">
          <div className="text-brand">
            <img src={hero} className='w-15' alt="Logo" />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-xl font-bold">عدسة</span>
            <span className="text-brand text-[14px] font-medium">عالم التصوير الفوتوغرافي</span>
          </div>
        </Link>

       
        <div className="hidden md:flex items-center gap-1 border !border-gray-800  rounded-full p-2 bg-[#161616]/50">
          <NavLink to="/" className={({ isActive }) => isActive ? "bg-brand !text-white !no-underline px-6 py-1.5 rounded-full text-sm font-semibold transition" : "!text-gray-400 !no-underline hover:!text-white px-6 py-1.5 rounded-full text-sm font-semibold transition"}>
            الرئيسية
          </NavLink>
          <NavLink to="/Blogs" className={({ isActive }) => isActive ? "bg-brand !text-white !no-underline px-6 py-1.5 rounded-full text-sm font-semibold transition" : "!text-gray-400 !no-underline hover:!text-white px-6 py-1.5 rounded-full text-sm font-semibold transition"}>
            المدونة
          </NavLink>
          <NavLink to="/Who" className={({ isActive }) => isActive ? "bg-brand !text-white !no-underline px-6 py-1.5 rounded-full text-sm font-semibold transition" : "!text-gray-400 !no-underline hover:!text-white px-6 py-1.5 rounded-full text-sm font-semibold transition"}>
            من نحن
          </NavLink>
        </div>

      
        <div className="flex items-center gap-3 md:gap-4">
          <button className="btn1 hidden md:flex" aria-label="Search">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <Link to="/Blogs" className="hidden md:flex bg-brand text-white text-sm font-bold px-5 md:px-6 py-2 rounded-full hover:opacity-90 transition shadow-md !no-underline">
            ابدأ القراءة
          </Link>

         
          <button 
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-zinc-400 rounded-lg md:hidden hover:bg-zinc-800 hover:text-white focus:outline-none"
            aria-controls="mobile-menu" 
            aria-expanded={isopen}
            onClick={handlerhamp}
          >
            <span className="sr-only">فتح القائمة</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
        </div>

      </div>

      <div className={`w-full md:hidden mt-3 border-t border-zinc-800 pt-3 ${isopen ? 'block' : 'hidden'}`} id="mobile-menu">
        <ul className="flex w-full flex-col gap-3 font-medium">
          <li>
            <NavLink to="/" onClick={() => setIsopen(false)} className={({ isActive }) => isActive ? "block bg-brand2 border-2 border-brand !text-white !no-underline w-full px-6 py-1.5 rounded-full text-sm font-semibold transition" : "block !text-gray-400 !no-underline w-full hover:!text-white px-6 py-1.5 rounded-full text-sm font-semibold transition"}>
              الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink to="/Blogs" onClick={() => setIsopen(false)} className={({ isActive }) => isActive ? "block bg-brand2 border-2 border-brand !text-white !no-underline w-full px-6 py-1.5 rounded-full text-sm font-semibold transition" : "block !text-gray-400 !no-underline w-full hover:!text-white px-6 py-1.5 rounded-full text-sm font-semibold transition"}>
              المدونة
            </NavLink>
          </li>
          <li>
            <NavLink to="/Who" onClick={() => setIsopen(false)} className={({ isActive }) => isActive ? "block bg-brand2 border-2 border-brand !text-white !no-underline w-full px-6 py-1.5 rounded-full text-sm font-semibold transition" : "block !text-gray-400 !no-underline w-full hover:!text-white px-6 py-1.5 rounded-full text-sm font-semibold transition"}>
              من نحن
            </NavLink>
          </li>
          <li>
            <Link to="/Blogs" onClick={() => setIsopen(false)} className="block text-center w-full bg-brand text-white text-sm font-bold px-5 py-2 rounded-full hover:opacity-90 transition shadow-md !no-underline">
              ابدأ القراءة
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}