'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import Link from 'next/link';

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="relative flex flex-col min-h-screen w-full items-center justify-center p-4 overflow-hidden">
            {/* Background Blobs are already in layout.tsx, but we can add them here if needed for specific positioning, 
            however, layout.tsx ones are fixed. The user's HTML had them fixed too. 
            So we rely on layout.tsx for the background. 
        */}

            <div className="w-full max-w-md bg-white/5 border border-solid border-white/20 rounded-xl backdrop-blur-lg p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-white text-3xl md:text-4xl font-bold font-orbitron leading-tight tracking-tight">Admin Panel</h1>
                    <p className="text-gray-400 mt-2">Sign in to manage your portfolio</p>
                </div>

                <form action={formAction} className="flex flex-col gap-6">
                    <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block" htmlFor="username">Username</label>
                        <input
                            className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#25d1f4] focus:border-[#25d1f4] transition-colors outline-none"
                            id="username"
                            name="username"
                            placeholder="admin"
                            type="text"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-gray-300 text-sm font-medium mb-2 block" htmlFor="password">Password</label>
                        <input
                            className="w-full h-12 px-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#25d1f4] focus:border-[#25d1f4] transition-colors outline-none"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            type="password"
                            required
                            minLength={6}
                        />
                    </div>

                    {errorMessage && (
                        <div className="text-red-500 text-sm text-center">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-[#25d1f4] text-[#050510] text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isPending}
                    >
                        <span className="truncate">{isPending ? 'Logging in...' : 'Login'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
