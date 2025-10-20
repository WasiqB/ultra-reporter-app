'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const SLIDE_DURATION = 5000;

const demoSlides = [
  {
    src: '/report-1.png',
    alt: 'Dashboard Overview',
    caption: 'Powerful Analytics Dashboard',
  },
  {
    src: '/report-2.png',
    alt: 'Report Generation',
    caption: 'Automated Report Generation',
  },
  {
    src: '/report-3.png',
    alt: 'Data Insights',
    caption: 'AI-Powered Insights',
  },
];

export function DemoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % demoSlides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='relative h-full w-full'>
      {demoSlides.map((slide, index) => (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          key={slide.src}
        >
          <Image
            alt={slide.alt}
            className='rounded-lg object-cover shadow-xl'
            fill
            priority={index === 0}
            src={slide.src}
          />
          <div className='absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/60 to-transparent p-6'>
            <p className='font-medium text-white text-xl'>{slide.caption}</p>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className='-translate-x-1/2 absolute bottom-4 left-1/2 flex space-x-2'>
        {demoSlides.map((_, index) => (
          <button
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? 'w-4 bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            key={index}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
