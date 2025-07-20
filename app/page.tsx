'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, Search, Shield } from 'lucide-react';
import heroImage from '@/public/img/hero-image.png'
import { useAuth } from '@/lib/context/AuthContext';

export default function Home() {
  const {isLoggedIn, role } = useAuth();
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                Find Your Dream Job, Simply
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-md mx-auto lg:mx-0">
                JobGhar is a minimal job portal connecting job seekers and employers with an ethical, user-focused platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                {isLoggedIn ? (
                  role === 'seeker' ? (
                    <Button asChild size="lg" className="text-base font-medium">
                      <Link href="/jobs">
                        <Search className="mr-2 h-5 w-5" />
                        Browse Jobs
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild size="lg" className="text-base font-medium">
                      <Link href="/employer/dashboard">
                        <Briefcase className="mr-2 h-5 w-5" />
                        Post a Job
                      </Link>
                    </Button>
                  )
                ) : (
                  <>
                    <Button asChild size="lg" className="text-base font-medium">
                      <Link href="/jobs">
                        <Search className="mr-2 h-5 w-5" />
                        Browse Jobs
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="text-base font-medium">
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="flex-1 hidden lg:block">
              <div className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500 ease-in-out" aria-hidden="true">
                <img
                  src={heroImage.src}
                  alt="Hero"
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose JobGhar?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <Search className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Browse Jobs Easily</h3>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Explore a curated list of jobs tailored for you, with simple filters and no clutter.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <Briefcase className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Post Jobs Fast</h3>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Employers can create job listings in minutes with our streamlined process.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Secure & Ethical</h3>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Your data is protected with our commitment to privacy and ethical practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 italic text-center">
                “JobGhar made finding my next role so easy. The platform is clean and focused, with no distractions.”
              </p>
              <p className="mt-4 text-sm font-medium text-gray-900 text-center">— Priya Sharma, Job Seeker</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 italic text-center">
                “Posting jobs on JobGhar was quick and hassle-free. We found great candidates in no time.”
              </p>
              <p className="mt-4 text-sm font-medium text-gray-900 text-center">— Anil Gupta, Employer</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600 italic text-center">
                “The intuitive design of JobGhar helped me land my ideal job in just a few clicks.”
              </p>
              <p className="mt-4 text-sm font-medium text-gray-900 text-center">— Sunita Rai, Job Seeker</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-primary/90 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/80 max-w-md mx-auto mb-8">
            Join JobGhar today and take the next step in your career or hiring journey.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-base font-medium">
            <Link href={isLoggedIn ? '/jobs' : '/register'}>Join Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}