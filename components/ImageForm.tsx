'use client';

import { Image as ImageType } from '@prisma/client';
import Link from 'next/link';
import { useActionState, useState } from 'react';

const initialState = {
    message: '',
    errors: {},
};

export default function ImageForm({
    image,
    action,
}: {
    image?: ImageType;
    action: (prevState: any, formData: FormData) => Promise<any>;
}) {
    const [state, formAction, isPending] = useActionState(action, initialState);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };

    return (
        <form action={formAction} className="space-y-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-8 bg-gray-50 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 font-orbitron">
                        {image ? 'Edit Image Details' : 'New Image Details'}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Fill in the technical details of your astrophotography capture.
                    </p>
                </div>

                <div className="p-8 space-y-6">
                    {/* Title Section */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            defaultValue={image?.title}
                            required
                            placeholder="e.g., The Orion Nebula"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                        />
                        {state?.errors?.title && (
                            <p className="mt-1 text-sm text-red-500">{state.errors.title}</p>
                        )}
                    </div>

                    {/* Image Upload Section */}
                    <div className="p-6 bg-blue-50 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors group">
                        <label htmlFor="imageFile" className="cursor-pointer block text-center">
                            <div className="mb-3 text-blue-500 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            <span className="block text-sm font-medium text-blue-900 mb-1">
                                {fileName ? fileName : 'Click to upload an image'}
                            </span>
                            <span className="block text-xs text-blue-600">
                                {fileName ? 'Change file' : 'SVG, PNG, JPG or GIF (max. 10MB)'}
                            </span>
                            <input
                                type="file"
                                name="imageFile"
                                id="imageFile"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Or use URL</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                            Image URL
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-400 text-sm">🔗</span>
                            </div>
                            <input
                                type="url"
                                name="imageUrl"
                                id="imageUrl"
                                defaultValue={image?.imageUrl}
                                placeholder="https://example.com/image.jpg"
                                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            />
                        </div>
                        {state?.errors?.imageUrl && (
                            <p className="mt-1 text-sm text-red-500">{state.errors.imageUrl}</p>
                        )}
                    </div>

                    {/* Description Section */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={4}
                            defaultValue={image?.description}
                            required
                            placeholder="Describe the object, location, and conditions..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                        />
                        {state?.errors?.description && (
                            <p className="mt-1 text-sm text-red-500">{state.errors.description}</p>
                        )}
                    </div>

                    {/* Technical Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                            <label htmlFor="camera" className="block text-sm font-semibold text-gray-700 mb-2">
                                Camera
                            </label>
                            <input
                                type="text"
                                name="camera"
                                id="camera"
                                defaultValue={image?.camera || ''}
                                placeholder="e.g., ZWO ASI2600MC"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="telescope" className="block text-sm font-semibold text-gray-700 mb-2">
                                Telescope / Lens
                            </label>
                            <input
                                type="text"
                                name="telescope"
                                id="telescope"
                                defaultValue={image?.telescope || ''}
                                placeholder="e.g., Redcat 51"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="mount" className="block text-sm font-semibold text-gray-700 mb-2">
                                Mount
                            </label>
                            <input
                                type="text"
                                name="mount"
                                id="mount"
                                defaultValue={image?.mount || ''}
                                placeholder="e.g., AM5"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="integration" className="block text-sm font-semibold text-gray-700 mb-2">
                                Integration Time
                            </label>
                            <input
                                type="text"
                                name="integration"
                                id="integration"
                                defaultValue={image?.integration || ''}
                                placeholder="e.g., 25 hours"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Error Message Area */}
                {state?.message && (
                    <div className="px-8 pb-4">
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                            </svg>
                            {state.message}
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex items-center justify-end gap-4">
                    <Link
                        href="/admin"
                        className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-8 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isPending && (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {image ? 'Update Image' : 'Create Image'}
                    </button>
                </div>
            </div>
        </form>
    );
}
