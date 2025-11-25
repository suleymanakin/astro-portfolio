import Header from '@/components/Header';
import GalleryGrid from '@/components/GalleryGrid';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const images = await prisma.image.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <Header />

      <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 py-5">
        <div className="flex flex-col max-w-7xl w-full flex-1 mx-auto">

          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center text-center py-24 sm:py-32 md:py-48 min-h-[calc(100vh-120px)]">
            <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tighter font-orbitron">
              Cosmic Perspectives
            </h1>
            <h2 className="text-gray-300 text-lg sm:text-xl md:text-2xl font-normal leading-normal max-w-3xl mt-6">
              An immersive journey through the cosmos, captured one photon at a time.
            </h2>
            <Link
              href="#gallery"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 mt-10 bg-[#25d1f4] text-[#050510] text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
            >
              <span className="truncate">Explore Gallery</span>
            </Link>
          </div>

          {/* Gallery Section */}
          <section id="gallery" className="py-16">
            <h2 className="text-white text-3xl md:text-4xl font-bold font-orbitron leading-tight tracking-tight px-4 pb-8">The Gallery</h2>
            <GalleryGrid images={images} />
          </section>

          {/* About Section */}
          <section id="about" className="py-16">
            <div className="flex flex-col md:flex-row gap-12 items-center bg-white/5 border border-solid border-white/20 rounded-xl p-8 md:p-12 backdrop-blur-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-48 h-48 rounded-full object-cover border-2 border-white/30"
                alt="Portrait of a photographer looking up at the night sky."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPPT3YjVchJ_H234QjSv_Rccaaro5Xoy5eGZVyVzvtwmcDErku-nBTJo30qlEXFO0bhXMzuxbZwEmI5euOP40g-dIR2BBfwNbOd0I_Q7-cpEXhdjNfGb2ncWe88du69JwCh_0gQDDKFbD-8ZXr2bCD1ua75Z9rYH49p82KNpGbzCmecSufEuGAOeyLOh8tJEmPoqVKofdxrqNjGPfGGUdxaFCiDlqs380ofn9LePg38wOoRIFtaEyVVmkbfouS9Wd2dRV75pdsRgMB"
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-white text-3xl md:text-4xl font-bold font-orbitron leading-tight tracking-tight mb-4">About Me</h2>
                <p className="text-gray-300 leading-relaxed">
                  I am a passionate astrophotographer dedicated to capturing the breathtaking beauty of the night sky. From distant galaxies to colorful nebulae, my work is a testament to the wonders that lie beyond our world. Each image is a result of countless hours of patience, dedication, and a profound love for the cosmos. Join me on this visual journey through space and time.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
