'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <section className="bg-gradient-to-r from-primary/10 to-white flex flex-col min-h-screen">
            <div className="flex-grow flex items-center justify-center">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-16 md:py-24">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                        Oops! Page Not Found
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-md mx-auto">
                        We couldn’t find this page. Click below to return to the homepage.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" className="text-base font-medium" aria-label="Go to JobGhar homepage">
                            <Link href="/">
                                Go to Homepage
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}