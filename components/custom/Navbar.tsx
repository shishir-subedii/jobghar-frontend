'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { authRepo } from '@/lib/repo/AuthRepo';
import { toast } from 'sonner';


export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isLoggedIn, token, role, removeData } = useAuth();
    const router = useRouter();

    // Navigation links based on auth status
    const navLinks = isLoggedIn
        ? [
            { href: '/', label: 'Home' },
            { href: '/jobs', label: 'Jobs' },
            { href: role === 'seeker' ? '/seeker/dashboard' : '/employer/dashboard', label: 'Dashboard' },
            { href: '/profile', label: 'Profile' },
            { href: '/terms', label: 'Terms' },
            { href: '/privacy', label: 'Privacy' },
        ]
        : [
            { href: '/', label: 'Home' },
            { href: '/jobs', label: 'Jobs' },
            { href: '/terms', label: 'Terms' },
            { href: '/privacy', label: 'Privacy' },
        ];

    // User display name (capitalize role or fallback to "User")
    const displayName = role ? role.charAt(0).toUpperCase() + role.slice(1) : 'User';

    const handleLogout = async () => {
        await authRepo.logOut({
            onSuccess: (message) => {
                toast.success(message);
            },
            onError: (message) => {
                toast.error(message);
            },
        });
        removeData();
        setIsMobileMenuOpen(false);
        router.push('/');
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
                {/* Logo */}
                <Link href="/" className="text-2xl font-semibold text-primary hover:text-primary-dark transition-colors" aria-label="JobGhar Home">
                    JobGhar
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-700 hover:text-primary font-medium text-sm transition-colors duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isLoggedIn ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center space-x-2 rounded-full px-4 py-2" aria-label="User menu">
                                    <User className="h-5 w-5 text-gray-600" />
                                    <span className="text-sm font-medium">{displayName}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuLabel className="text-sm font-medium">{displayName}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link href="/profile">View Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" asChild className="text-sm font-medium text-gray-700 hover:text-primary">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild className="text-sm font-medium">
                                <Link href="/register">Register</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Trigger */}
                <div className="md:hidden">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Toggle mobile menu">
                                <Menu className="h-6 w-6 text-gray-700" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[340px] bg-white px-6">
                            <SheetTitle className="sr-only">Main Menu</SheetTitle>
                            <div className="flex flex-col space-y-5 mt-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-gray-700 hover:text-primary font-medium text-base transition-colors duration-200 pl-4"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                {isLoggedIn ? (
                                    <div className="border-t pt-5 mt-5">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="w-full justify-start space-x-3 text-base font-medium text-gray-700 pl-4">
                                                    <User className="h-5 w-5" />
                                                    <span>{displayName}</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel className="text-sm font-medium">{displayName}</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild className="cursor-pointer">
                                                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                                                        View Profile
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Logout
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-4 border-t pt-5 mt-5">
                                        <Button variant="ghost" asChild className="text-base font-medium text-gray-700 hover:text-primary justify-start pl-4">
                                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                                        </Button>
                                        <Button asChild className="text-base font-medium justify-start pl-4">
                                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}