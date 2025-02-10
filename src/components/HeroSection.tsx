
import Image from "next/image";

export default function HeroSection({ latestArticle }: any) {
  if (!latestArticle) {
    return (
      <div className="py-8">
        <h1 className="h1">Editor&apos;s Pick</h1>
        <p className="p-lg">Discover the most outstanding articles in all topics of life.</p>
        <div className="text-center py-8 h3">
          <p>No article found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="h1">Editor&apos;s Pick</h1>
      <p className="p-lg">Discover the most outstanding articles in all topics of life.</p>
      
      <div className="md:flex md:items-center relative">
        {/* Content overlap */}
        <div className="md:w-1/3 z-10 relative md:translate-x-[10%]">
          <div className="backdrop-blur-sm bg-white/80 dark:bg-exDark/80 p-6 rounded-xl shadow-lg">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm mb-4">
              {latestArticle.category?.name}
            </span>
            
            <h2 className="h2">
              {latestArticle.title}
            </h2>
            
            <div className="flex items-center gap-2">
              <Image 
                src={latestArticle.author?.image || "/avatar.svg"} 
                alt="avatar" 
                width={32} 
                height={32} 
                className="rounded-full" 
              />
              <span className="h3">{latestArticle.author?.name}</span>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 aspect-[16/9] relative rounded-3xl overflow-hidden md:-ml-[4%] mt-[-25%] md:mt-0">
          <Image 
            src={latestArticle.image || "/article.jpg"} 
            alt="hero" 
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}