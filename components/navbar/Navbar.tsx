"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-expand-md bg-white shadow-lg">
            <div className="container">

                <Link href="/" className="navbar-brand d-flex align-items-center">
                    <span className="h3 mb-0 font-weight-bold text-gray-800">C&F</span>
                </Link>

                <button 
                    className="navbar-toggler border-0" 
                    type="button" 
                    onClick={toggleMenu}
                    aria-controls="navbarNav" 
                    aria-expanded={isOpen} 
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link 
                                href="/" 
                                className="nav-link text-gray-900 font-weight-semibold hover-text-primary"
                            >
                                Chats
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
