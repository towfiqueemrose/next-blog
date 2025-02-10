"use client";


import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Category } from "@/types/types";

export default function Topics({ categories }: { categories: Category[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
      <div className="component-bg-deep">
        <h1 className='h1'>Topics</h1>

        <div className="relative">
          <button 
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-opacity ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex mt-8 gap-8 scrollbar-hide overflow-x-auto pb-4 scroll-smooth"
          >
            {categories.map((category) => (
              <Link 
                href={`/category/${category.slug}`}
                key={category.id}
                className="flex-shrink-0 w-[200px] hover:scale-95 transition-transform"
              >
                <Image 
                  src={category.image || "/topic.png"}
                  alt="topic" 
                  width={200} 
                  height={200}
                  className="topic-img mb-6" 
                />
                <h3 className="h3 text-center">{category.name}</h3>
                <h4 className="h4 text-center">{category._count?.articles} articles</h4>
              </Link>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-opacity ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
  );
}
