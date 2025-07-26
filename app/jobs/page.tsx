'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { jobRepo } from '@/lib/repo/JobRepo';
import { toast } from 'sonner';
import Loading from '@/components/custom/Loading';
import { DialogClose } from '@radix-ui/react-dialog';

interface Job {
    id: number;
    title: string;
    slug: string;
    company: string;
    location: string;
    salary: number;
    jobType: string;
    category: string;
    applicationsCount: number;
    createdAt: string;
    deadline: string;
}

interface Filters {
    jobType: string[];
    category: string[];
    applicationsCount: string[];
    salaryMin: number;
    salaryMax: number;
}

export default function Jobs() {
    const [allJobs, setAllJobs] = useState<Job[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<Filters>({
        jobType: [],
        category: [],
        applicationsCount: [],
        salaryMin: 0,
        salaryMax: 2000000,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const jobsPerPage = 10;

    useEffect(() => {
        setLoading(true);
        jobRepo.getJobList({
            onSuccess: (data) => {
                setAllJobs(data || []);
            },
            onError: (message) => {
                toast.error(message || 'Failed to fetch job list');
            },
        }).finally(() => setLoading(false));
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setFilters((prev) => {
            const updated = { ...prev };
            if (name === 'salaryMin' || name === 'salaryMax') {
                updated[name] = Number(value);
            } else {
                const list = updated[name as keyof Omit<Filters, 'salaryMin' | 'salaryMax'>];
                updated[name as keyof Omit<Filters, 'salaryMin' | 'salaryMax'>] = checked
                    ? [...list, value]
                    : list.filter((item) => item !== value);
            }
            return updated;
        });
        setCurrentPage(1);
    };

    const filteredJobs = allJobs
        .filter((job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((job) =>
            filters.jobType.length === 0 || filters.jobType.includes(job.jobType)
        )
        .filter((job) =>
            filters.category.length === 0 || filters.category.includes(job.category)
        )
        .filter((job) => {
            if (filters.applicationsCount.length === 0) return true;
            return filters.applicationsCount.some((range) => {
                if (range === '<5') return job.applicationsCount < 5;
                if (range === '5-20') return job.applicationsCount >= 5 && job.applicationsCount <= 20;
                if (range === '20-50') return job.applicationsCount > 20 && job.applicationsCount <= 50;
                if (range === '50+') return job.applicationsCount > 50;
                return true;
            });
        })
        .filter((job) =>
            job.salary >= filters.salaryMin && job.salary <= filters.salaryMax
        );

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * jobsPerPage,
        currentPage * jobsPerPage
    );

    return (
        <section className="bg-gray-50 flex flex-col min-h-screen">
            <div className="flex-grow py-8 sm:py-12">
                {loading && <Loading />}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
                            Browse Jobs
                        </h1>
                        <Input
                            type="text"
                            placeholder="Search jobs by title..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full sm:flex-1 max-w-md text-sm sm:text-base"
                        />
                    </div>

                    {/* Mobile Filter */}
                    <div className="flex items-center justify-center sm:hidden mb-6">
                        <Dialog>
                            <div className="flex items-center justify-around w-full">
                                <DialogTitle className="text-lg font-semibold text-gray-900">
                                    Filter Jobs
                                </DialogTitle>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="text-sm font-medium">
                                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                                    </Button>
                                </DialogTrigger>
                            </div>
                            <DialogContent className="sm:max-w-md">
                                <div className="space-y-6">
                                    <FilterSection title="Job Type" name="jobType" options={['full-time', 'part-time', 'remote', 'internship']} onChange={handleFilterChange} selected={filters.jobType} />
                                    <FilterSection title="Category" name="category" options={['tech', 'health', 'education', 'sales', 'finance']} onChange={handleFilterChange} selected={filters.category} />
                                    <FilterSection title="Applications Count" name="applicationsCount" options={['<5', '5-20', '20-50', '50+']} onChange={handleFilterChange} selected={filters.applicationsCount} />
                                    <SalaryFilter min={filters.salaryMin} max={filters.salaryMax} onChange={handleFilterChange} />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Sidebar Filter */}
                        <div className="hidden sm:block col-span-1 bg-white p-6 rounded-lg shadow-sm min-h-[650px] max-h-[850px] overflow-y-auto">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
                            <div className="space-y-6">
                                <FilterSection title="Job Type" name="jobType" options={['full-time', 'part-time', 'remote', 'internship']} onChange={handleFilterChange} selected={filters.jobType} />
                                <FilterSection title="Category" name="category" options={['tech', 'health', 'education', 'sales', 'finance']} onChange={handleFilterChange} selected={filters.category} />
                                <FilterSection title="Applications Count" name="applicationsCount" options={['<5', '5-20', '20-50', '50+']} onChange={handleFilterChange} selected={filters.applicationsCount} />
                                <SalaryFilter min={filters.salaryMin} max={filters.salaryMax} onChange={handleFilterChange} />
                            </div>
                        </div>

                        {/* Job List */}
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                            <div className="grid grid-cols-1 gap-6">
                                {paginatedJobs.length === 0 ? (
                                    <p className="text-center text-gray-600">No jobs found.</p>
                                ) : (
                                    paginatedJobs.map((job) => (
                                        <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{job.title}</h3>
                                            <p className="mt-1 text-gray-600">{job.company} • {job.location}</p>
                                            <p className="mt-1 text-gray-600">₹{job.salary.toLocaleString()} • {job.jobType} • {job.category}</p>
                                            <p className="mt-1 text-gray-600">Applications: {job.applicationsCount}</p>
                                            <p className="mt-1 text-gray-500">Posted on {new Date(job.createdAt).toLocaleDateString()}</p>
                                            <Button asChild variant="link" className="mt-4 p-0 text-primary hover:text-primary-dark">
                                                <Link href={`/job/${job.slug}`}>View Details</Link>
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-8 flex items-center justify-center space-x-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <p className="text-gray-600">Page {currentPage} of {totalPages}</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface FilterSectionProps {
    title: string;
    name: string;
    options: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selected: string[];
}

function FilterSection({ title, name, options, onChange, selected }: FilterSectionProps) {
    return (
        <div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900">{title}</h3>
            <div className="mt-2 space-y-2">
                {options.map((option) => (
                    <div key={option} className="flex items-center">
                        <Input
                            type="checkbox"
                            id={`${name}-${option}`}
                            name={name}
                            value={option}
                            checked={selected.includes(option)}
                            onChange={onChange}
                            className="h-4 w-4 text-primary focus:ring-primary"
                        />
                        <Label htmlFor={`${name}-${option}`} className="ml-2 text-sm sm:text-base text-gray-900">
                            {option}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface SalaryFilterProps {
    min: number;
    max: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SalaryFilter({ min, max, onChange }: SalaryFilterProps) {
    return (
        <div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900">Salary Range (₹)</h3>
            <div className="mt-2 space-y-4">
                <div className="flex space-x-4">
                    <div>
                        <Label htmlFor="salaryMin" className="text-sm sm:text-base text-gray-900">Min</Label>
                        <Input
                            id="salaryMin"
                            name="salaryMin"
                            type="number"
                            value={min}
                            onChange={onChange}
                            min={0}
                            max={2000000}
                            step={10000}
                        />
                    </div>
                    <div>
                        <Label htmlFor="salaryMax" className="text-sm sm:text-base text-gray-900">Max</Label>
                        <Input
                            id="salaryMax"
                            name="salaryMax"
                            type="number"
                            value={max}
                            onChange={onChange}
                            min={0}
                            max={2000000}
                            step={10000}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="salaryRange" className="sr-only">Salary Range Slider</Label>
                    <input
                        id="salaryRange"
                        type="range"
                        name="salaryMax"
                        value={max}
                        onChange={onChange}
                        min={0}
                        max={2000000}
                        step={10000}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-1 text-sm sm:text-base text-gray-600">
                        <span>₹0</span>
                        <span>₹20,00,000</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
