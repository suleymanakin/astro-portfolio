'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-5 z-50 flex items-center justify-between whitespace-nowrap border border-solid border-white/20 bg-white/5 p-4 md:px-8 rounded-xl backdrop-blur-lg mx-4 sm:mx-8 md:mx-12 lg:mx-20 xl:mx-40">
            <div className="flex items-center gap-4 text-white">
                <div className="size-6">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                    </svg>
                </div>
                <h2 className="text-white text-xl font-bold font-orbitron leading-tight tracking-[-0.015em]">
                    Cosmic Perspectives
                </h2>
            </div>

            <nav className="hidden md:flex flex-1 justify-end items-center gap-8">
                <div className="flex items-center gap-8">
                    <Link href="#gallery" className="text-white text-sm font-medium leading-normal hover:text-[#25d1f4] transition-colors">
                        Gallery
                    </Link>
                    <Link href="#about" className="text-white text-sm font-medium leading-normal hover:text-[#25d1f4] transition-colors">
                        About
                    </Link>
                    <Link href="#" className="text-white text-sm font-medium leading-normal hover:text-[#25d1f4] transition-colors">
                        Contact
                    </Link>
                </div>
                <div className="flex gap-2">
                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-white/10 text-white hover:bg-white/20 transition-colors">
                        <span className="material-symbols-outlined">share</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                    className="text-white p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="material-symbols-outlined text-3xl">menu</span>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#050510] border border-white/20 rounded-xl p-4 flex flex-col gap-4 md:hidden">
                    <Link href="#gallery" className="text-white text-sm font-medium hover:text-[#25d1f4]" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                    <Link href="#about" className="text-white text-sm font-medium hover:text-[#25d1f4]" onClick={() => setIsMenuOpen(false)}>About</Link>
                    <Link href="#" className="text-white text-sm font-medium hover:text-[#25d1f4]" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                </div>
            )}
        </header>
    );
}
