'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { authRepo } from '@/lib/repo/AuthRepo';
import { toast } from 'sonner';
import { loginData } from '@/types/auth.types';
import { loginFormData } from '@/types/auth.types';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<loginFormData>({
        email: '',
        password: '',
    });
    const { setData } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await authRepo.login({
            email: formData.email,
            password: formData.password,
            onSuccess: (data: loginData) => {
                toast.success('Login successful');
                setData(data.accessToken, data.role);
                setFormData({
                    email: '',
                    password: '',
                });
                if (data.role === 'seeker') {
                    router.push('/seeker/dashboard');
                }
                else if (data.role === 'employer') {
                    router.push('/employer/dashboard');
                } else {
                    router.push('/');
                }
            },
            onError: (message) => {
                toast.error(message);
            },
        })
        setLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className="bg-gradient-to-r from-primary/10 to-white flex flex-col min-h-screen">
            <div className="flex-grow flex items-center justify-center py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md lg:max-w-lg mx-auto bg-white p-8 rounded-lg shadow-sm">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
                            Log In to JobGhar
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="email" className="text-sm lg:text-base font-medium text-gray-900">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="user@example.com"
                                    required
                                    className="mt-1 text-sm lg:text-base"
                                />
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-sm lg:text-base font-medium text-gray-900">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    required
                                    className="mt-1 text-sm lg:text-base"
                                />
                            </div>

                            {
                                loading ? (
                                    <Button type="button" disabled className="w-full text-base lg:text-lg font-medium">
                                        Loading...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full text-base lg:text-lg font-medium cursor-pointer">
                                        Log In
                                    </Button>
                                )
                            }
                        </form>
                        <p className="mt-4 text-sm lg:text-base text-gray-600 text-center">
                            Don’t have an account?{' '}
                            <Link href="/register" className="text-primary hover:text-primary-dark">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}