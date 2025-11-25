import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { deleteImage, handleSignOut } from '@/lib/actions';

export default async function AdminPage() {
    const images = await prisma.image.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 font-orbitron">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <Link
                            href="/"
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                            target="_blank"
                        >
                            View Site
                        </Link>
                        <form action={handleSignOut}>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Gallery Images</h2>
                        <Link
                            href="/admin/new"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">add</span>
                            Add New Image
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-3 px-4 text-gray-600 font-medium">Image</th>
                                    <th className="py-3 px-4 text-gray-600 font-medium">Title</th>
                                    <th className="py-3 px-4 text-gray-600 font-medium">Description</th>
                                    <th className="py-3 px-4 text-gray-600 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {images.map((image: { id: string; title: string; imageUrl: string; description: string }) => (
                                    <tr key={image.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={image.imageUrl}
                                                alt={image.title}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-gray-800 font-medium">{image.title}</td>
                                        <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{image.description}</td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/${image.id}/edit`}
                                                    className="text-blue-500 hover:text-blue-700 p-2"
                                                >
                                                    <span className="material-symbols-outlined">edit</span>
                                                </Link>
                                                <form action={deleteImage.bind(null, image.id)}>
                                                    <button className="text-red-500 hover:text-red-700 p-2">
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {images.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-500">
                                            No images found. Add one to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
