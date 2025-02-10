
import { Author } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function AuthorCard({ author }: { author: Author }) {
    return (
    <Link href={`/authors/${author.id}`} className="flex flex-col items-center gap-2 hover:scale-95 transition-transform">
      <div className="author-card">
        <Image
          src={author.image || "/avatar.svg"}
          alt={author.name || "Author"}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="h3">{author.name || "Author Name"}</h3>
    </Link>
  );
}
