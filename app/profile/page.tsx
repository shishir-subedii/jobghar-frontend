'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { userRepo } from '@/lib/repo/UserRepo';
import Loading from '@/components/custom/Loading';
import { authRepo } from '@/lib/repo/AuthRepo';
import { useAuth } from '@/lib/context/AuthContext';

type UserProfile = {
    id: number;
    name: string;
    email: string;
    role: 'seeker' | 'employer';
    age: number;
    isProfileComplete: boolean;
    createdAt: string;
    updatedAt: string;
};

interface PasswordFormData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export default function ProfilePage() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const router = useRouter();

    const {removeData} = useAuth();

    const [loading, setLoading] = useState(true);

    const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    useEffect(() => {
        userRepo.getUserProfile({
            onSuccess: (data) => {
                setUserProfile(data);
                setLoading(false);
            },
            onError: (message) => {
                toast.error(message);
                setLoading(false);
            },
        });
    }, [router]);

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmNewPassword } = passwordForm;

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            toast.error('All fields are required');
            return;
        }
        if (newPassword.length < 6) {
            toast.error('New password must be at least 6 characters');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            toast.error('Passwords do not match');
            return;
        }
        await authRepo.changePassword({
            oldPassword,
            newPassword,
            confirmNewPassword,
            onSuccess: (message) => {
                toast.success(message);
                removeData();
                router.push('/login');
                setPasswordForm({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordForm((prev) => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return <Loading/>;
    }

    if (!userProfile) {
        return <p className='text-center'>No User Found</p>
    }

    return (
        <section className="bg-gray-50 flex flex-col min-h-screen">
            <div className="flex-grow py-8 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <Card className="bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl sm:text-2xl font-bold text-gray-900">
                                    <User className="mr-2 h-6 w-6 text-primary" />
                                    Profile Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 text-sm sm:text-base text-gray-600">
                                    <p><span className="font-medium">Name:</span> {userProfile.name}</p>
                                    <p><span className="font-medium">Email:</span> {userProfile.email}</p>
                                    <p><span className="font-medium">Role:</span> {userProfile.role}</p>
                                    <p><span className="font-medium">Age:</span> {userProfile.age}</p>
                                    <p><span className="font-medium">Profile Complete:</span> {userProfile.isProfileComplete ? 'Yes' : 'No'}</p>
                                    <p><span className="font-medium">Joined:</span> {new Date(userProfile.createdAt).toLocaleDateString()}</p>
                                    <p><span className="font-medium">Last Updated:</span> {new Date(userProfile.updatedAt).toLocaleDateString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl sm:text-2xl font-bold text-gray-900">
                                    <Lock className="mr-2 h-6 w-6 text-primary" />
                                    Change Password
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePasswordChange} className="space-y-4">
                                    <div>
                                        <Label htmlFor="oldPassword">Old Password</Label>
                                        <Input id="oldPassword" name="oldPassword" type="password" value={passwordForm.oldPassword} onChange={handleInputChange} required />
                                    </div>
                                    <div>
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input id="newPassword" name="newPassword" type="password" value={passwordForm.newPassword} onChange={handleInputChange} required />
                                    </div>
                                    <div>
                                        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                                        <Input id="confirmNewPassword" name="confirmNewPassword" type="password" value={passwordForm.confirmNewPassword} onChange={handleInputChange} required />
                                    </div>
                                    <Button type="submit" className="w-full sm:w-auto">Change Password</Button>
                                </form>
                            </CardContent>
                        </Card>

                        <div className="text-center">
                            <Button asChild variant="link">
                                <Link href={userProfile.role === 'seeker' ? '/seeker/dashboard' : '/employer/dashboard'}>
                                    Back to Dashboard
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
