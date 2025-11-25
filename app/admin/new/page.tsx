import ImageForm from '@/components/ImageForm';
import { createImage } from '@/lib/actions';

export default function NewImagePage() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 font-orbitron">Add New Image</h1>
                <ImageForm action={createImage} />
            </div>
        </div>
    );
}
