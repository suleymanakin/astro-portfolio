import ImageForm from '@/components/ImageForm';
import { updateImage } from '@/lib/actions';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditImagePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const image = await prisma.image.findUnique({
        where: { id },
    });

    if (!image) {
        notFound();
    }

    const updateImageWithId = updateImage.bind(null, image.id);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 font-orbitron">Edit Image</h1>
                <ImageForm image={image} action={updateImageWithId} />
            </div>
        </div>
    );
}
