'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { applicationRepo } from '@/lib/repo/ApplicationRepo';
import Loading from '@/components/custom/Loading';

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

export default function ApplicationDetail() {
    const params = useParams<{ id: string }>();
    const id = parseInt(params.id, 10);
    const [application, setApplication] = useState<Application | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [marking, setMarking] = useState<boolean>(false);

    useEffect(() => {
        if (isNaN(id)) {
            toast.error('Invalid application ID');
            notFound();
            return;
        }

        applicationRepo.getApplicationByIdForEmployer({
            id,
            onSuccess: (data) => {
                setApplication(data);
            },
            onError: (message) => {
                toast.error(message || 'Application not found');
                notFound();
            },
        }).finally(() => setLoading(false));
    }, [id]);

    const handleMarkAsReviewed = () => {
        if (!application) return;

        setMarking(true);
        applicationRepo.markApplicationAsReviewed({
            id: application.id,
            onSuccess: (data) => {
                setApplication({ ...application, status: 'reviewed' });
                toast.success('Application marked as reviewed');
            },
            onError: (message) => {
                toast.error(message || 'Failed to mark as reviewed');
            },
        }).finally(() => setMarking(false));
    };

    if (loading) {
        return <Loading />;
    }

    if (!application) {
        return null; // Already handled by notFound()
    }

    return (
        <section className="bg-gray-50 flex flex-col min-h-screen">
            <div className="flex-grow py-8 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
                        <Link
                            href="/employer/dashboard"
                            className="text-primary hover:text-primary-dark text-sm sm:text-base mb-6 inline-block"
                        >
                            ← Back to Dashboard
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            Application Details
                        </h1>
                        <div className="space-y-4 text-sm sm:text-base text-gray-600">
                            <div>
                                <Label className="font-medium">Application ID:</Label> {application.id}
                            </div>
                            <div>
                                <Label className="font-medium">Job Title:</Label> {application.jobTitle}
                            </div>
                            <div>
                                <Label className="font-medium">Company:</Label> {/* Optional field */} -
                            </div>
                            <div>
                                <Label className="font-medium">Applicant Name:</Label> {application.applicantName}
                            </div>
                            <div>
                                <Label className="font-medium">Applicant Email:</Label> {application.applicantEmail}
                            </div>
                            <div>
                                <Label className="font-medium">Job Slug:</Label> {application.jobSlug}
                            </div>
                            <div>
                                <Label className="font-medium">CV:</Label>{' '}
                                <a
                                    href={application.cv}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary-dark underline"
                                >
                                    {application.cv.split('/').pop()}
                                </a>
                            </div>
                            <div>
                                <Label className="font-medium">Cover Letter:</Label>
                                <p className="mt-1 whitespace-pre-wrap">{application.coverLetter}</p>
                            </div>
                            <div>
                                <Label className="font-medium">Status:</Label> {application.status}
                            </div>
                            <div>
                                <Label className="font-medium">Applied On:</Label>{' '}
                                {new Date(application.appliedAt).toLocaleDateString('en-US', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    year: 'numeric',
                                })}
                            </div>
                            {application.status !== 'reviewed' && (
                                <Button
                                    onClick={handleMarkAsReviewed}
                                    disabled={marking}
                                    className="w-full text-base sm:text-lg"
                                >
                                    {marking ? 'Marking...' : 'Mark as Reviewed'}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
