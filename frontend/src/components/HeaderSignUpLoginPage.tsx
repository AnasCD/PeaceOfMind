import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/images/logobetter.png";

const HeaderSignUpLoginPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#5E9ED9] text-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center cursor-pointer">
          <a href="/" className="flex items-center">
            <img
              src={Logo}
              alt="Peace of Mind Logo"
              className="w-12 h-12 object-cover rounded-full mr-2"
            />
            <h1 className="text-lg font-bold">Peace of Mind</h1>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden font-bold md:flex space-x-1">
            <a href="/" className="cursor-pointer px-3 py-2 rounded hover:bg-[#4b8cc4]">
                Home
            </a>
            <a href="/for-therapists" className="cursor-pointer px-3 py-2 rounded hover:bg-[#4b8cc4]">
                For Therapists
            </a>
            <a href="/sign-up" className="cursor-pointer px-3 py-2 rounded hover:bg-[#4b8cc4]">
                Sign Up
            </a>
            <a href="/login" className="cursor-pointer px-3 py-2 rounded hover:bg-[#4b8cc4]">
                Login
            </a>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden text-center font-bold bg-[#5E9ED9] text-white p-4 space-y-2">
          <div className="space-y-2">
          <a
              href="/"
              className="block cursor-pointer px-3 py-2 rounded hover:bg-[#4b8cc4]"
            >
              Home
            </a>
            <a
              href="/for-therapists"
              className="block cursor-pointer px-3 py-2 rounded hover:bg-[#4b8cc4]"
            >
              For Therapists
            </a>
            <a
              href="/sign-up"
              className="block cursor-pointer px-3 py-2 rounded hover:bg-[#4b8cc4]"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="block cursor-pointer px-3 py-2 rounded hover:bg-[#4b8cc4]"
            >
              Login
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default HeaderSignUpLoginPage;
