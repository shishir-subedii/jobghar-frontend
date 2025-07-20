'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { toast } from 'sonner';
import { jobRepo } from '@/lib/repo/JobRepo';
import { useParams } from 'next/navigation';
import Loading from '@/components/custom/Loading';
import { useAuth } from '@/lib/context/AuthContext';
import { applicationRepo } from '@/lib/repo/ApplicationRepo';

interface Job {
    id: number;
    title: string;
    slug: string;
    company: string;
    description: string;
    location: string;
    salary: number;
    jobType: 'full-time' | 'part-time' | 'remote' | 'internship' | '';
    category: 'tech' | 'health' | 'education' | 'sales' | 'finance' | '';
    applicationsCount: number;
    createdAt: string;
    employer: {
        id: number;
        name: string;
        email: string;
        role: string;
        age: number | null;
        companyName: string;
        isProfileComplete: boolean;
        createdAt: string;
        updatedAt: string;
    };
    isActive: boolean;
    updatedAt: string;
}

interface ApplicationFormData {
    jobSlug: string;
    coverLetter: string;
    cv: File | null;
}

export default function JobDetail() {
    const params = useParams();
    const slug = params.slug as string;
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const {isLoggedIn, role} = useAuth();

    const [applicationForm, setApplicationForm] = useState<ApplicationFormData>({
        jobSlug: '',
        coverLetter: '',
        cv: null,
    });

    useEffect(() => {
        const fetchJobDetails = async () => {
            setLoading(true);
            try {
                await jobRepo.getJobDetails({
                    jobSlug: slug,
                    onSuccess: (data) => {
                        setJob(data);
                        setApplicationForm((prev) => ({
                            ...prev,
                            jobSlug: data.slug,
                        }));
                    },
                    onError: (message) => {
                        toast.error(message);
                        setJob(null);
                    }
                });
            } catch (error) {
                console.error('Error fetching job details:', error);
                toast.error('Failed to fetch job details');
                setJob(null);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [slug]);

    if (loading) return <Loading/>;
    if (!job) return notFound();

    const handleApplicationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!isLoggedIn || role !== 'seeker') {
            toast.error('You must be logged in as seeker to apply for jobs');
            return;
        }
        if (!applicationForm.coverLetter) {
            toast.error('Cover letter is required');
            return;
        }
        if (!applicationForm.cv) {
            toast.error('CV is required');
            return;
        }
        if (applicationForm.cv.size > 2 * 1024 * 1024) {
            toast.error('CV must be less than 2MB');
            return;
        }
        if (applicationForm.cv.type !== 'application/pdf') {
            toast.error('CV must be a PDF file');
            return;
        }
        await applicationRepo.submitApplication({
            jobSlug: applicationForm.jobSlug,
            coverLetter: applicationForm.coverLetter,
            cv: applicationForm.cv,
            onSuccess: (data) => {
                toast.success('Application submitted successfully');
                setApplicationForm({
                    jobSlug: '',
                    coverLetter: '',
                    cv: null,
                });
            },
            onError: (message) => {
                toast.error(message);
            }
        })
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setApplicationForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setApplicationForm((prev) => ({ ...prev, cv: file }));
    };

    return (
        <section className="bg-gray-50 flex flex-col min-h-screen">
            <div className="flex-grow py-8 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
                        <Link
                            href="/jobs"
                            className="text-primary hover:text-primary-dark text-sm sm:text-base mb-6 inline-block"
                            aria-label="Back to jobs list"
                        >
                            ← Back to Jobs
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            {job.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600">{job.company}</p>
                        <div className="mt-4 space-y-2 text-sm sm:text-base text-gray-600">
                            <p>
                                <span className="font-medium">Location:</span> {job.location}
                            </p>
                            <p>
                                <span className="font-medium">Salary:</span> ₹
                                {job.salary.toLocaleString()}
                            </p>
                            {job.jobType && (
                                <p>
                                    <span className="font-medium">Job Type:</span> {job.jobType}
                                </p>
                            )}
                            {job.category && (
                                <p>
                                    <span className="font-medium">Category:</span> {job.category}
                                </p>
                            )}
                            <p>
                                <span className="font-medium">Applications:</span>{' '}
                                {job.applicationsCount}
                            </p>
                            <p>
                                <span className="font-medium">Posted:</span>{' '}
                                {new Date(job.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                Description
                            </h2>
                            <p className="mt-2 text-sm sm:text-base text-gray-600 whitespace-pre-wrap">
                                {job.description}
                            </p>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className="mt-6 w-full sm:w-auto text-base sm:text-lg"
                                    aria-label={`Apply for ${job.title} at ${job.company}`}
                                >
                                    Apply Now
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md lg:max-w-lg">
                                <VisuallyHidden>
                                    <DialogTitle>Apply for {job.title}</DialogTitle>
                                </VisuallyHidden>
                                <div className="flex justify-end">
                                    <DialogClose asChild>
                                    </DialogClose>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                    Apply for {job.title}
                                </h2>
                                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                                    <div className="hidden">
                                        <Input
                                            type="text"
                                            name="jobSlug"
                                            value={applicationForm.jobSlug}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="coverLetter"
                                            className="text-sm sm:text-base font-medium text-gray-900"
                                        >
                                            Cover Letter
                                        </Label>
                                        <Textarea
                                            id="coverLetter"
                                            name="coverLetter"
                                            value={applicationForm.coverLetter}
                                            onChange={handleInputChange}
                                            placeholder="Write your cover letter here..."
                                            required
                                            className="mt-1 text-sm sm:text-base"
                                            aria-label="Cover letter for job application"
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="coverLetter"
                                            className="text-sm sm:text-base font-medium text-gray-900"
                                        >
                                            CV (PDF, max 2MB)
                                        </Label>
                                        <Input
                                            id="cv"
                                            name="cv"
                                            type="file"
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            required
                                            className="mt-1 text-sm sm:text-base"
                                            aria-label="Upload CV (PDF, max 2MB)"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full text-base sm:text-lg cursor-pointer"
                                        aria-label="Submit job application"
                                    >
                                        Submit Application
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </section>
    );
}