import AuthorCard from "@/components/AuthorCard";
import { getAuthors } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function AuthorsPage() {
const authors = await getAuthors();

  if (!authors) {
    notFound();
  }

  return (
    <div>
        <h1 className="h1 text-center">Our Authors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 lg:grid-cols-4 xl:grid-cols-5 gap-5 place-items-center max-w-7xl mx-auto px-4">
        { authors?.map((author) => (
          <AuthorCard key={author.id as string} author={author} />
        ))
      }  
        </div>
    </div>
  )
}
