import React from "react";

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-pink text-white py-2'>
        <div className="logo">
            <span className="font-bold text-xl mx-8">To-do</span>
        </div>
      <ul className="flex gap-8">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar;
