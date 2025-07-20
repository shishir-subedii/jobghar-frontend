'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { toast } from 'sonner';
import { authRepo } from '@/lib/repo/AuthRepo';
import { useRouter } from 'next/navigation';
import { registerFormData } from '@/types/auth.types';

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState<registerFormData>({
        name: '',
        role: '',
        email: '',
        age: 0,
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (!formData.termsAccepted) {
            toast.error('You must accept the terms and conditions');
            return;
        }
        await authRepo.register({
            name: formData.name,
            role: formData.role,
            email: formData.email,
            age: Number(formData.age),
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            onSuccess: (message) => {
                toast.success(message);
                setFormData({
                    name: '',
                    role: '',
                    email: '',
                    age: 0,
                    password: '',
                    confirmPassword: '',
                    termsAccepted: false,
                });
                router.push('/login');
            },
            onError: (message) => {
                toast.error(message);
            },
        })
        setLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSelectChange = (value: 'seeker' | 'employer') => {
        setFormData((prev) => ({ ...prev, role: value }));
    };

    return (
        <section className="bg-gradient-to-r from-primary/10 to-white flex flex-col min-h-screen">
            <div className="flex-grow flex items-center justify-center py-16 md:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md lg:max-w-lg mx-auto bg-white p-8 rounded-lg shadow-sm">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
                            Sign Up for JobGhar
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="name" className="text-sm lg:text-base font-medium text-gray-900">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Bob"
                                    required
                                    className="mt-1 text-sm lg:text-base"
                                />
                            </div>

                            <div>
                                <Label htmlFor="role" className="text-sm lg:text-base font-medium text-gray-900">
                                    Role
                                </Label>
                                <Select
                                    name="role"
                                    value={formData.role}
                                    onValueChange={handleSelectChange}
                                    required
                                >
                                    <SelectTrigger id="role" className="mt-1 text-sm lg:text-base">
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="seeker">Job Seeker</SelectItem>
                                        <SelectItem value="employer">Employer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="age" className="text-sm lg:text-base font-medium text-gray-900">
                                    Age
                                </Label>
                                <Input
                                    id="age"
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    placeholder="18"
                                    min={18}
                                    max={100}
                                    required
                                    className="mt-1 text-sm lg:text-base"
                                />
                            </div>
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
                                    minLength={6}
                                    className="mt-1 text-sm lg:text-base"
                                />
                            </div>

                            <div>
                                <Label htmlFor="confirmPassword" className="text-sm lg:text-base font-medium text-gray-900">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="mt-1 text-sm lg:text-base"
                                />
                            </div>

                            <div className="flex items-center">
                                <Input
                                    id="termsAccepted"
                                    name="termsAccepted"
                                    type="checkbox"
                                    checked={formData.termsAccepted}
                                    onChange={handleInputChange}
                                    required
                                    className="h-4 w-4 text-primary focus:ring-primary"
                                    aria-label="Agree to Terms and Conditions"
                                />
                                <Label htmlFor="termsAccepted" className="ml-2 text-sm lg:text-base text-gray-900">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-primary hover:text-primary-dark">
                                        Terms and Conditions
                                    </Link>
                                </Label>
                            </div>
                            {
                                loading ? (
                                    <Button type="button" disabled className="w-full text-base lg:text-lg font-medium">
                                        Loading...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full text-base lg:text-lg font-medium cursor-pointer">
                                        Sign Up
                                    </Button>
                                )
                            }
                        </form>
                        <p className="mt-4 text-sm lg:text-base text-gray-600 text-center">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:text-primary-dark">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}