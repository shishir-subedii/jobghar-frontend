'use client';

import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <section className="bg-gray-50 flex flex-col min-h-screen">
            <div className="flex-grow py-8 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
                        <Link
                            href="/"
                            className="text-primary hover:text-primary-dark text-sm sm:text-base mb-6 inline-block"
                            aria-label="Back to home"
                        >
                            ← Back to Home
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Privacy Policy
                        </h1>
                        <div className="space-y-6 text-sm sm:text-base text-gray-600">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    1. Introduction
                                </h2>
                                <p>
                                    Welcome to JobGhar’s Privacy Policy. This policy outlines how we collect, use, and protect your personal information when you use our website. By using JobGhar, you consent to the practices described in this policy.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    2. Information We Collect
                                </h2>
                                <p>
                                    We may collect the following types of information:
                                </p>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>Personal Information: Information you provide, such as your name, email address, CV, and cover letter when applying for jobs or creating job listings.</li>
                                    <li>Usage Data: Information about how you interact with our website, such as pages visited and actions taken.</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    3. How We Use Your Information
                                </h2>
                                <p>
                                    We use your information to:
                                </p>
                                <ul className="list-disc pl-5 mt-2">
                                    <li>Facilitate job applications and employer job postings.</li>
                                    <li>Improve the functionality and user experience of our website.</li>
                                    <li>Communicate with you, such as responding to inquiries.</li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    4. Data Sharing
                                </h2>
                                <p>
                                    We do not sell, trade, or share your personal information with third parties, except as required to provide our services (e.g., sharing applicant data with employers for job applications) or as required by law.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    5. Data Security
                                </h2>
                                <p>
                                    We take reasonable measures to protect your personal information. However, as JobGhar is a hobby project, we cannot guarantee the security of your data. Please exercise caution when sharing sensitive information.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    6. Hobby Project Disclaimer
                                </h2>
                                <p>
                                    JobGhar is a hobby project. The information provided on this website may not be accurate or reliable. Do not share sensitive personal information, such as financial details or passwords. Be cautious of fake or fraudulent emails claiming to be from JobGhar, as we cannot verify their authenticity. Always verify the source before responding to any communication.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    7. Your Rights
                                </h2>
                                <p>
                                    You may have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at{' '}
                                    <a
                                        href="mailto:support@jobghar.com"
                                        className="text-primary hover:text-primary-dark underline"
                                        aria-label="Contact support"
                                    >
                                        support@jobghar.com
                                    </a>. Note that as a hobby project, our ability to process such requests may be limited. The email address provided is a dummy email and may not be monitored.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    8. Changes to This Policy
                                </h2>
                                <p>
                                    We may update this Privacy Policy from time to time. Changes will be effective upon posting to the website. Your continued use of JobGhar after such changes constitutes acceptance of the updated policy.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    9. Contact Us
                                </h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at{' '}
                                    <a
                                        href="mailto:support@jobghar.com"
                                        className="text-primary hover:text-primary-dark underline"
                                        aria-label="Contact support"
                                    >
                                        support@jobghar.com
                                    </a> (this is a dummy email).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}