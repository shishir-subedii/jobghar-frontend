'use client';

import Loading from '@/components/custom/Loading';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { applicationRepo } from '@/lib/repo/ApplicationRepo';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Application {
    id: number;
    applicantId: number;
    applicantName: string;
    applicantEmail: string;
    jobSlug: string;
    jobTitle: string;
    cv: string;
    coverLetter: string;
    status: string;
    appliedAt: string;
}

const dummyApplications: Application[] = [];

export default function SeekerDashboard() {
    const [applications, setApplications] = useState<Application[]>(dummyApplications);
    const [loading, setLoading] = useState(true);
    const fetchApplications = async () => {
        try {
            await applicationRepo.getMyApplications({
                onSuccess: (data) => {
                    setApplications(data);
                },
                onError: (message) => {
                    toast.error(message);
                }
            })
        } catch (error) {
            toast.error('Failed to fetch applications');
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchApplications();
    }, []);

    return (
        <section className="bg-gray-50 flex flex-col min-h-screen">
            <div className="flex-grow py-8 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {
                        loading? <Loading /> : <></>
                    }
                    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-sm">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Your Applications
                        </h1>
                        {applications.length === 0 ? (
                            <p className="text-sm sm:text-base text-gray-600">
                                No applications found.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                SNo.
                                            </TableHead>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                Job Title
                                            </TableHead>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                Company
                                            </TableHead>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                Applied On
                                            </TableHead>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                Status
                                            </TableHead>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {applications.map((app, index) => (
                                            <TableRow key={app.id}>
                                                <TableCell className="text-sm sm:text-base">{index+1}</TableCell>
                                                <TableCell className="text-sm sm:text-base">{app.jobTitle}</TableCell>
                                                <TableCell className="text-sm sm:text-base">Google</TableCell>
                                                <TableCell className="text-sm sm:text-base">
                                                    {new Date(app.appliedAt).toLocaleDateString('en-US', {
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        year: 'numeric',
                                                    })}
                                                </TableCell>
                                                <TableCell className="text-sm sm:text-base">{app.status}</TableCell>
                                                <TableCell>
                                                    <Link href={`/seeker/application/${app.id}`}>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className='cursor-pointer'
                                                            aria-label={`View application ${app.id} for ${app.jobTitle}`}
                                                        >
                                                            View
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}