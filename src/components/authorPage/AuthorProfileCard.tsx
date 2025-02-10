// E:\blog\src\components\authorPage\AuthorProfileCard.tsx
import { Author } from "@/types/types";
import Image from "next/image";

const AuthorProfileCard = ({ author }: { author: Author }) => { // Changed 'authors' to 'author'
  return (
    <div className="auther-profile-card">
        <div className="flex items-start gap-8">
          <Image 
            src={author.image || "/avatar.svg"} 
            alt={`${author.name || 'Author'}'s profile picture`}
            width={150}
            height={150}
            className="w-[160px] h-[160px] rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-1">
              <h2 className="h2">{author.name}</h2>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check text-blue-500"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>            
            </div>
            <p className="p-sm">
              {/* You might want to add a bio field to your Author type and database */}
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro autem totam iure quibusdam asperiores numquam quae animi assumenda necessitatibus consectetur.
            </p>
          </div>
        </div>
      </div>
  );
};

export default AuthorProfileCard;