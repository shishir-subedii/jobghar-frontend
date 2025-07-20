'use client';

import Link from 'next/link';

export default function TermsPage() {
    return (
        <section className="bg-gray-50 flex flex-col min-h-screen">
            <div className="flex-grow py-8 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                            Terms and Conditions
                        </h1>
                        <div className="space-y-6 text-sm sm:text-base text-gray-600">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    1. Acceptance of Terms
                                </h2>
                                <p>
                                    By accessing or using JobGhar, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use this website.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    2. Use of the Website
                                </h2>
                                <p>
                                    JobGhar is provided for personal and non-commercial use. You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of, other users. You are responsible for ensuring that all information you provide is accurate and up-to-date.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    3. Intellectual Property
                                </h2>
                                <p>
                                    All content on JobGhar, including text, graphics, logos, and software, is the property of JobGhar or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without express permission.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    4. Privacy Policy
                                </h2>
                                <p>
                                    Your use of JobGhar is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. Please review the Privacy Policy at{' '}
                                    <Link
                                        href="/privacy"
                                        className="text-primary hover:text-primary-dark underline"
                                        aria-label="View privacy policy"
                                    >
                                        /privacy
                                    </Link>{' '}
                                    for more details.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    5. Limitation of Liability
                                </h2>
                                <p>
                                    JobGhar is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of any content on the website. JobGhar is not liable for any damages arising from your use of the website, including but not limited to direct, indirect, incidental, or consequential damages.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    6. Disclaimer: Hobby Project
                                </h2>
                                <p>
                                    JobGhar is a hobby project. The information listed on this website may not be accurate or up-to-date. Users should exercise caution and verify any information before relying on it. Do not share sensitive personal information on this website, as we cannot guarantee its security.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    7. Changes to Terms
                                </h2>
                                <p>
                                    We reserve the right to modify these Terms and Conditions at any time. Changes will be effective upon posting to the website. Your continued use of JobGhar after such changes constitutes acceptance of the updated terms.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                    8. Contact Us
                                </h2>
                                <p>
                                    If you have any questions about these Terms and Conditions, please contact us at{' '}
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