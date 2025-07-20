'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogTrigger, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { toast } from 'sonner';
import { jobRepo } from '@/lib/repo/JobRepo';
import { applicationRepo } from '@/lib/repo/ApplicationRepo';
import Loading from '@/components/custom/Loading';


enum JobCategory {
    TECH = 'tech',
    HEALTH = 'health',
    EDUCATION = 'education',
    SALES = 'sales',
    FINANCE = 'finance',
}

enum JobType {
    FULL_TIME = 'full-time',
    PART_TIME = 'part-time',
    REMOTE = 'remote',
    INTERNSHIP = 'internship',
}

interface Job {
    id: number;
    title: string;
    slug: string;
    company: string;
    description: string;
    location: string;
    salary: number;
    deadline: string;
    jobType: JobType | '';
    category: JobCategory | '';
    isActive: boolean;
    createdAt: string;
    employer: {
        id: number;
        name: string;
        email: string;
        role: string;
        age: number | null;
        companyName: string | null;
        isProfileComplete: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

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

interface JobFormData {
    title: string;
    company: string;
    description: string;
    location: string;
    salary: number;
    deadline: string;
    jobType: JobType | '';
    category: JobCategory | '';
    isActive: boolean;
}

const dummyJobs: Job[] = [];

const dummyApplications: Application[] = [];

export default function EmployerDashboard() {
    const [jobs, setJobs] = useState<Job[]>(dummyJobs);
    const [applications, setApplications] = useState<Application[]>(dummyApplications);
    const [reviewedApplication, setReviewedApplication] = useState<Application[]>([]);
    const [editJob, setEditJob] = useState<Job | null>(null);
    const [deleteJobSlug, setDeleteJobSlug] = useState<string | null>(null);
    const [currentJobSlug, setCurrentJobSlug] = useState<string | null>(dummyJobs[0]?.slug || null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async (jobSlug: string) => {
        try {
            await applicationRepo.getApplicationsByJobSlug({
                jobSlug,
                onSuccess: (data) => setApplications(data),
                onError: (message) => toast.error(message),
            });
        }
        catch (error) {
            toast.error('Failed to fetch applications');
        }
    }

    const fetchReviewedApplications = async (jobSlug: string) => {
        try {
            await applicationRepo.getReviewedApplicationsByJobSlug({
                jobSlug,
                onSuccess: (data) => setReviewedApplication(data),
                onError: (message) => toast.error(message),
            });
        }
        catch (error) {
            toast.error('Failed to fetch reviewed applications');
        }
    }

    useEffect(() => {
        if (currentJobSlug) {
            fetchApplications(currentJobSlug);
            fetchReviewedApplications(currentJobSlug);
        }
    }, [currentJobSlug]);

    // Job CRUD

    const fetchJobs = async () => {
        setLoading(true);
        try {
            await jobRepo.findEmployerJobs({
                onSuccess: (data) => setJobs(data),
                onError: (message) => toast.error(message),
            });

        } catch (error) {
            toast.error('Failed to fetch jobs');
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchJobs();
    }, []);

    const handleCreateJob = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const newJob: JobFormData = {
                title: formData.get('title') as string,
                company: formData.get('company') as string,
                description: formData.get('description') as string,
                location: formData.get('location') as string,
                salary: parseInt(formData.get('salary') as string, 10),
                deadline: formData.get('deadline') as string,
                jobType: formData.get('jobType') as JobType,
                category: formData.get('category') as JobCategory,
                isActive: formData.get('isActive') === 'on',
            };

            const jobPayload = {
                title: newJob.title,
                company: newJob.company,
                description: newJob.description,
                location: newJob.location,
                salary: newJob.salary,
                deadline: newJob.deadline,
                jobType: newJob.jobType,
                category: newJob.category,
            }

            await jobRepo.createJob({
                jobData: jobPayload,
                onSuccess: (message) => {
                    fetchJobs();
                    toast.success(message || 'Job created successfully');
                    setIsCreateModalOpen(false);
                },
                onError: (message) => toast.error(message),
            });
        } catch (error) {
            toast.error('Failed to create job');
        }
        finally {
            setLoading(false);
        }
    };

    const handleEditJob = (slug: string) => {
        const job = jobs.find((j) => j.slug === slug);
        if (job) setEditJob(job);
    };

    const handleUpdateJob = async (e: React.FormEvent<HTMLFormElement>, slug: string) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const updatedJob: JobFormData = {
                title: formData.get('title') as string,
                company: formData.get('company') as string,
                description: formData.get('description') as string,
                location: formData.get('location') as string,
                salary: parseInt(formData.get('salary') as string, 10),
                deadline: formData.get('deadline') as string,
                jobType: formData.get('jobType') as JobType,
                category: formData.get('category') as JobCategory,
                isActive: formData.get('isActive') === 'on',
            };
            await jobRepo.updateJob({
                jobSlug: slug,
                jobData: {
                    title: updatedJob.title,
                    company: updatedJob.company,
                    description: updatedJob.description,
                    location: updatedJob.location,
                    salary: updatedJob.salary,
                    deadline: updatedJob.deadline,
                    jobType: updatedJob.jobType,
                    category: updatedJob.category,
                },
                onSuccess: (message) => {
                    fetchJobs();
                    toast.success(message || 'Job updated successfully');
                    setEditJob(null);
                },
                onError: (message) => toast.error(message),
            });
        } catch (error) {

            toast.error('Failed to update job');
        }
        finally {
            setLoading(false);
        }
    };

    const handleDeleteJob = async (slug: string) => {
        setLoading(true);
        try {
            await jobRepo.deleteJob({
                jobSlug: slug,
                onSuccess: (message) => {
                    setJobs((prev) => prev.filter((job) => job.slug !== slug));
                    toast.success(message || 'Job deleted successfully');
                },
                onError: (message) => toast.error(message),
            });
        } catch (error) {
            toast.error('Failed to delete job');
        }
        finally {
            setLoading(false);
        }

    };

    const handleViewApplications = (slug: string) => {
        setCurrentJobSlug(slug);
    };

    const submittedApplications = applications.filter(
        (app) => app.jobSlug === currentJobSlug && app.status === 'submitted'
    );
    const reviewedApplications = reviewedApplication.filter(
        (app) => app.jobSlug === currentJobSlug && app.status === 'reviewed'
    );

    if(loading) return <Loading/>;

    return (
        <section className="bg-gray-50 flex flex-col min-h-screen">
            <div className="flex-grow py-8 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Jobs Section */}
                    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-sm mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Jobs</h1>
                            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        className="text-base sm:text-lg"
                                        aria-label="Create new job"
                                    >
                                        Create Job
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md lg:max-w-lg">
                                    <VisuallyHidden>
                                        <DialogTitle>Create New Job</DialogTitle>
                                    </VisuallyHidden>
                                    <div className="flex justify-end">
                                        <DialogClose asChild>
                                        </DialogClose>
                                    </div>
                                    <div className="max-h-[80vh] overflow-y-auto px-1">
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                            Create Job
                                        </h2>
                                        <form onSubmit={handleCreateJob} className="space-y-4">
                                            <div>
                                                <Label htmlFor="title" className="text-sm sm:text-base font-medium">
                                                    Title
                                                </Label>
                                                <Input
                                                    id="title"
                                                    name="title"
                                                    required
                                                    className="mt-1 text-sm sm:text-base"
                                                    aria-label="Job title"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="company" className="text-sm sm:text-base font-medium">
                                                    Company
                                                </Label>
                                                <Input
                                                    id="company"
                                                    name="company"
                                                    required
                                                    className="mt-1 text-sm sm:text-base"
                                                    aria-label="Company name"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="description" className="text-sm sm:text-base font-medium">
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id="description"
                                                    name="description"
                                                    required
                                                    className="mt-1 text-sm sm:text-base"
                                                    aria-label="Job description"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="location" className="text-sm sm:text-base font-medium">
                                                    Location
                                                </Label>
                                                <Input
                                                    id="location"
                                                    name="location"
                                                    required
                                                    className="mt-1 text-sm sm:text-base"
                                                    aria-label="Job location"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="salary" className="text-sm sm:text-base font-medium">
                                                    Salary
                                                </Label>
                                                <Input
                                                    id="salary"
                                                    name="salary"
                                                    type="number"
                                                    required
                                                    className="mt-1 text-sm sm:text-base"
                                                    aria-label="Job salary"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="deadline" className="text-sm sm:text-base font-medium">
                                                    Deadline
                                                </Label>
                                                <Input
                                                    id="deadline"
                                                    name="deadline"
                                                    type="date"
                                                    required
                                                    className="mt-1 text-sm sm:text-base"
                                                    aria-label="Job deadline"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="jobType" className="text-sm sm:text-base font-medium">
                                                    Job Type
                                                </Label>
                                                <Select name="jobType" defaultValue="">
                                                    <SelectTrigger
                                                        id="jobType"
                                                        className="mt-1 text-sm sm:text-base"
                                                        aria-label="Job type"
                                                    >
                                                        <SelectValue placeholder="Select job type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={JobType.FULL_TIME}>Full-time</SelectItem>
                                                        <SelectItem value={JobType.PART_TIME}>Part-time</SelectItem>
                                                        <SelectItem value={JobType.REMOTE}>Remote</SelectItem>
                                                        <SelectItem value={JobType.INTERNSHIP}>Internship</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="category" className="text-sm sm:text-base font-medium">
                                                    Category
                                                </Label>
                                                <Select name="category" defaultValue="">
                                                    <SelectTrigger
                                                        id="category"
                                                        className="mt-1 text-sm sm:text-base"
                                                        aria-label="Job category"
                                                    >
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={JobCategory.TECH}>Tech</SelectItem>
                                                        <SelectItem value={JobCategory.HEALTH}>Health</SelectItem>
                                                        <SelectItem value={JobCategory.EDUCATION}>Education</SelectItem>
                                                        <SelectItem value={JobCategory.SALES}>Sales</SelectItem>
                                                        <SelectItem value={JobCategory.FINANCE}>Finance</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Label htmlFor="isActive" className="text-sm sm:text-base font-medium">
                                                    Active
                                                </Label>
                                                <Switch
                                                    id="isActive"
                                                    name="isActive"
                                                    defaultChecked={true}
                                                    aria-label="Toggle job active status"
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="w-full text-base sm:text-lg"
                                                aria-label="Create job"
                                            >
                                                Create Job
                                            </Button>
                                        </form>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        {jobs.length === 0 ? (
                            <p className="text-sm sm:text-base text-gray-600">No jobs found.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                No.
                                            </TableHead>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                Title
                                            </TableHead>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                Company
                                            </TableHead>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                Location
                                            </TableHead>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                Posted On
                                            </TableHead>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                Active
                                            </TableHead>
                                            <TableHead scope="col" className="text-sm sm:text-base">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {jobs.map((job, index) => (
                                            <TableRow key={job.slug}>
                                                <TableCell className="text-sm sm:text-base">{index + 1}</TableCell>
                                                <TableCell className="text-sm sm:text-base">{job.title}</TableCell>
                                                <TableCell className="text-sm sm:text-base">{job.company}</TableCell>
                                                <TableCell className="text-sm sm:text-base">{job.location}</TableCell>
                                                <TableCell className="text-sm sm:text-base">
                                                    {new Date(job.createdAt).toLocaleDateString('en-US', {
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        year: 'numeric',
                                                    })}
                                                </TableCell>
                                                <TableCell className="text-sm sm:text-base">
                                                    {job.isActive ? 'Yes' : 'No'}
                                                </TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link href={`/job/${job.slug}`}>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            aria-label={`View job ${job.title}`}
                                                        >
                                                            View Job
                                                        </Button>
                                                    </Link>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleEditJob(job.slug)}
                                                                aria-label={`Edit job ${job.title}`}
                                                            >
                                                                Edit
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-md lg:max-w-lg">
                                                            <VisuallyHidden>
                                                                <DialogTitle>Edit Job: {job.title}</DialogTitle>
                                                            </VisuallyHidden>
                                                            <div className="flex justify-end">
                                                                <DialogClose asChild></DialogClose>
                                                            </div>
                                                            <div className="max-h-[80vh] overflow-y-auto px-1">
                                                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                                                    Edit Job
                                                                </h2>
                                                                <form
                                                                    onSubmit={(e) => handleUpdateJob(e, job.slug)}
                                                                    className="space-y-4"
                                                                >
                                                                    <div>
                                                                        <Label htmlFor="title" className="text-sm sm:text-base font-medium">
                                                                            Title
                                                                        </Label>
                                                                        <Input
                                                                            id="title"
                                                                            name="title"
                                                                            defaultValue={job.title}
                                                                            required
                                                                            className="mt-1 text-sm sm:text-base"
                                                                            aria-label="Job title"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor="company" className="text-sm sm:text-base font-medium">
                                                                            Company
                                                                        </Label>
                                                                        <Input
                                                                            id="company"
                                                                            name="company"
                                                                            defaultValue={job.company}
                                                                            required
                                                                            className="mt-1 text-sm sm:text-base"
                                                                            aria-label="Company name"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="description"
                                                                            className="text-sm sm:text-base font-medium"
                                                                        >
                                                                            Description
                                                                        </Label>
                                                                        <Textarea
                                                                            id="description"
                                                                            name="description"
                                                                            defaultValue={job.description}
                                                                            required
                                                                            className="mt-1 text-sm sm:text-base"
                                                                            aria-label="Job description"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="location"
                                                                            className="text-sm sm:text-base font-medium"
                                                                        >
                                                                            Location
                                                                        </Label>
                                                                        <Input
                                                                            id="location"
                                                                            name="location"
                                                                            defaultValue={job.location}
                                                                            required
                                                                            className="mt-1 text-sm sm:text-base"
                                                                            aria-label="Job location"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="salary"
                                                                            className="text-sm sm:text-base font-medium"
                                                                        >
                                                                            Salary
                                                                        </Label>
                                                                        <Input
                                                                            id="salary"
                                                                            name="salary"
                                                                            type="number"
                                                                            defaultValue={job.salary}
                                                                            required
                                                                            className="mt-1 text-sm sm:text-base"
                                                                            aria-label="Job salary"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="deadline"
                                                                            className="text-sm sm:text-base font-medium"
                                                                        >
                                                                            Deadline
                                                                        </Label>
                                                                        <Input
                                                                            id="deadline"
                                                                            name="deadline"
                                                                            type="date"
                                                                            defaultValue={job.deadline}
                                                                            required
                                                                            className="mt-1 text-sm sm:text-base"
                                                                            aria-label="Job deadline"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="jobType"
                                                                            className="text-sm sm:text-base font-medium"
                                                                        >
                                                                            Job Type
                                                                        </Label>
                                                                        <Select name="jobType" defaultValue={job.jobType}>
                                                                            <SelectTrigger
                                                                                id="jobType"
                                                                                className="mt-1 text-sm sm:text-base"
                                                                                aria-label="Job type"
                                                                            >
                                                                                <SelectValue placeholder="Select job type" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value={JobType.FULL_TIME}>Full-time</SelectItem>
                                                                                <SelectItem value={JobType.PART_TIME}>Part-time</SelectItem>
                                                                                <SelectItem value={JobType.REMOTE}>Remote</SelectItem>
                                                                                <SelectItem value={JobType.INTERNSHIP}>Internship</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                    <div>
                                                                        <Label
                                                                            htmlFor="category"
                                                                            className="text-sm sm:text-base font-medium"
                                                                        >
                                                                            Category
                                                                        </Label>
                                                                        <Select name="category" defaultValue={job.category}>
                                                                            <SelectTrigger
                                                                                id="category"
                                                                                className="mt-1 text-sm sm:text-base"
                                                                                aria-label="Job category"
                                                                            >
                                                                                <SelectValue placeholder="Select category" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value={JobCategory.TECH}>Tech</SelectItem>
                                                                                <SelectItem value={JobCategory.HEALTH}>Health</SelectItem>
                                                                                <SelectItem value={JobCategory.EDUCATION}>Education</SelectItem>
                                                                                <SelectItem value={JobCategory.SALES}>Sales</SelectItem>
                                                                                <SelectItem value={JobCategory.FINANCE}>Finance</SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Label
                                                                            htmlFor="isActive"
                                                                            className="text-sm sm:text-base font-medium"
                                                                        >
                                                                            Active
                                                                        </Label>
                                                                        <Switch
                                                                            id="isActive"
                                                                            name="isActive"
                                                                            defaultChecked={job.isActive}
                                                                            aria-label="Toggle job active status"
                                                                        />
                                                                    </div>
                                                                    <Button
                                                                        type="submit"
                                                                        className="w-full text-base sm:text-lg"
                                                                        aria-label="Update job"
                                                                    >
                                                                        Update Job
                                                                    </Button>
                                                                </form>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleViewApplications(job.slug)}
                                                        aria-label={`View applications for ${job.title}`}
                                                    >
                                                        View Applications
                                                    </Button>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => setDeleteJobSlug(job.slug)}
                                                                aria-label={`Delete job ${job.title}`}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-md lg:max-w-lg">
                                                            <VisuallyHidden>
                                                                <DialogTitle>Confirm Delete Job: {job.title}</DialogTitle>
                                                            </VisuallyHidden>
                                                            <div className="flex justify-end">
                                                                <DialogClose asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="absolute top-2 right-2"
                                                                        aria-label="Close delete job modal"
                                                                    >
                                                                        ✕
                                                                    </Button>
                                                                </DialogClose>
                                                            </div>
                                                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                                                Confirm Delete
                                                            </h2>
                                                            <p className="text-sm sm:text-base text-gray-600">
                                                                Are you sure you want to delete "{job.title}"?
                                                            </p>
                                                            <div className="flex gap-4 mt-4">
                                                                <Button
                                                                    variant="destructive"
                                                                    onClick={() => handleDeleteJob(job.slug)}
                                                                    aria-label={`Confirm delete job ${job.title}`}
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <DialogClose asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        aria-label="Cancel delete job"
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                </DialogClose>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>

                    {/* Applications Section */}
                    {currentJobSlug && (
                        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-sm">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                                Applications for {jobs.find((j) => j.slug === currentJobSlug)?.title || 'Job'}
                            </h1>
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                                Submitted Applications
                            </h2>
                            {submittedApplications.length === 0 ? (
                                <p className="text-sm sm:text-base text-gray-600">
                                    No submitted applications found.
                                </p>
                            ) : (
                                <div className="overflow-x-auto mb-8">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead scope="col" className="text-sm sm:text-base">
                                                    ID
                                                </TableHead>
                                                <TableHead scope="col" className="text-sm sm:text-base">
                                                    Applicant Name
                                                </TableHead>
                                                <TableHead scope="col" className="text-sm sm:text-base">
                                                    Applied On
                                                </TableHead>
                                                <TableHead scope="col" className="text-sm sm:text-base">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {submittedApplications.map((app) => (
                                                <TableRow key={app.id}>
                                                    <TableCell className="text-sm sm:text-base">{app.id}</TableCell>
                                                    <TableCell className="text-sm sm:text-base">
                                                        {app.applicantName}
                                                    </TableCell>
                                                    <TableCell className="text-sm sm:text-base">
                                                        {new Date(app.appliedAt).toLocaleDateString('en-US', {
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            year: 'numeric',
                                                        })}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href={`/employer/application/${app.id}`}>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                aria-label={`View application ${app.id} by ${app.applicantName}`}
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
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 mt-8">
                                Reviewed Applications
                            </h2>
                            {reviewedApplications.length === 0 ? (
                                <p className="text-sm sm:text-base text-gray-600">
                                    No reviewed applications found.
                                </p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead scope="col" className="text-sm sm:text-base">
                                                    ID
                                                </TableHead>
                                                <TableHead scope="col" className="text-sm sm:text-base">
                                                    Applicant Name
                                                </TableHead>
                                                <TableHead scope="col" className="text-sm sm:text-base">
                                                    Applied On
                                                </TableHead>
                                                <TableHead scope="col" className="text-sm sm:text-base">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {reviewedApplications.map((app) => (
                                                <TableRow key={app.id}>
                                                    <TableCell className="text-sm sm:text-base">{app.id}</TableCell>
                                                    <TableCell className="text-sm sm:text-base">
                                                        {app.applicantName}
                                                    </TableCell>
                                                    <TableCell className="text-sm sm:text-base">
                                                        {new Date(app.appliedAt).toLocaleDateString('en-US', {
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            year: 'numeric',
                                                        })}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link href={`/employer/application/${app.id}`}>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                aria-label={`View application ${app.id} by ${app.applicantName}`}
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
                    )}
                </div>
            </div>
        </section>
    );
}