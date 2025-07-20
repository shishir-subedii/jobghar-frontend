'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-center">
                    {/* Brand and Description */}
                    <div className="space-y-4 flex flex-col items-center">
                        <Link href="/" className="text-xl font-semibold text-primary hover:text-primary-dark transition-colors" aria-label="JobGhar Home">
                            JobGhar
                        </Link>
                        <p className="text-sm text-gray-600 max-w-xs">
                            JobGhar is a minimal job portal connecting seekers and employers with a simple, ethical platform.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-4">
                        <h3 className="text-base font-medium text-gray-900">Quick Links</h3>
                        <ul className="space-y-2 text-sm flex flex-col items-center">
                            <li>
                                <Link href="/jobs" className="hover:text-primary transition-colors">
                                    Browse Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-primary transition-colors">
                                    Terms and Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-base font-medium text-gray-900">Contact Us</h3>
                        <ul className="space-y-2 text-sm flex flex-col items-center">
                            <li className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-gray-600" />
                                <a href="mailto:support@jobghar.com" className="hover:text-primary transition-colors">
                                    support@jobghar.com
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-gray-600" />
                                <a href="tel:+977123456789" className="hover:text-primary transition-colors">
                                    +977 123 456 789
                                </a>
                            </li>
                        </ul>
                        <div className="flex justify-center space-x-3 pt-2">
                            <Button variant="ghost" size="icon" asChild aria-label="Facebook">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                    <svg className="h-5 w-5 text-gray-600 hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                    </svg>
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild aria-label="Twitter">
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                    <svg className="h-5 w-5 text-gray-600 hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild aria-label="LinkedIn">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                    <svg className="h-5 w-5 text-gray-600 hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                    </svg>
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-200 pt-6 text-center">
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()} JobGhar. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}