'use client';

import { useState } from 'react';
import { Image as ImageType } from '@prisma/client';

export default function GalleryGrid({ images }: { images: ImageType[] }) {
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className="relative overflow-hidden group image-card bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-[3/4] border border-solid border-white/20 bg-white/5 cursor-pointer"
                        style={{
                            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, transparent 50%), url("${image.imageUrl}")`,
                        }}
                        onClick={() => setSelectedImage(image)}
                    >
                        <p className="text-white text-base font-bold leading-tight line-clamp-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                            {image.title}
                        </p>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md" onClick={() => setSelectedImage(null)}>
                    <div
                        className="flex flex-col md:flex-row max-w-6xl w-full h-full md:h-auto md:max-h-[90vh] bg-white/5 border border-white/20 rounded-xl backdrop-blur-lg overflow-hidden relative m-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-[#25d1f4] z-10"
                            onClick={() => setSelectedImage(null)}
                        >
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>
                        <div className="w-full md:w-2/3 h-1/2 md:h-auto bg-black flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={selectedImage.imageUrl}
                                alt={selectedImage.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col gap-6 overflow-y-auto">
                            <div>
                                <h3 className="text-white text-3xl font-bold font-orbitron leading-tight">{selectedImage.title}</h3>
                                <p className="text-gray-300 mt-2 text-sm">{selectedImage.description}</p>
                            </div>

                            <div className="border-t border-white/20 pt-6">
                                <h4 className="text-lg font-bold font-orbitron text-white mb-4">Acquisition Details</h4>
                                {selectedImage.camera && (
                                    <div className="flex items-start gap-3 text-sm mb-3">
                                        <span className="material-symbols-outlined text-xl text-[#25d1f4] mt-0.5">photo_camera</span>
                                        <span className="text-gray-300"><strong>Camera:</strong> {selectedImage.camera}</span>
                                    </div>
                                )}
                                {selectedImage.telescope && (
                                    <div className="flex items-start gap-3 text-sm mb-3">
                                        <span className="material-symbols-outlined text-xl text-[#25d1f4] mt-0.5">camera</span>
                                        <span className="text-gray-300"><strong>Telescope:</strong> {selectedImage.telescope}</span>
                                    </div>
                                )}
                                {selectedImage.mount && (
                                    <div className="flex items-start gap-3 text-sm mb-3">
                                        <span className="material-symbols-outlined text-xl text-[#25d1f4] mt-0.5">satellite_alt</span>
                                        <span className="text-gray-300"><strong>Mount:</strong> {selectedImage.mount}</span>
                                    </div>
                                )}
                                {selectedImage.integration && (
                                    <div className="flex items-start gap-3 text-sm">
                                        <span className="material-symbols-outlined text-xl text-[#25d1f4] mt-0.5">timer</span>
                                        <span className="text-gray-300"><strong>Integration:</strong> {selectedImage.integration}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
