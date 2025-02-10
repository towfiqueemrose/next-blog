import ArticleCard from "@/components/ArticleCard"
import { getCategoryWithArticles } from "@/lib/actions";
import Image from "next/image"

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const category = await getCategoryWithArticles(slug);
  
    if (!category) {
      return <div>Category not found!</div>;
    }

    return (
        <div>
            <div className="relative h-64">
                <Image 
                    src={category.image} 
                    alt={category.name} 
                    width={800} 
                    height={400} 
                    className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="h1-big">
                        {category.name}
                    </h1>
                </div>
                <h3 className="h3 text-center">{category.articles.length} Articles in this group</h3>
                <div className="article-list">
                    {category.articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </div>
    )
}