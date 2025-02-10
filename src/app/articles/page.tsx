import ArticleCard from "@/components/ArticleCard";
import { getArticles } from "@/lib/actions";


export default async function ArticlesPage() {
  const articles = await getArticles();
  if (!articles) {
    return <div>No articles found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h1 className="h1 text-center">Articles</h1>
      {/* Add articles here */}
      <div className="article-list">
      {articles && articles.map((article) => (
        <ArticleCard key={article.id as string} article={article}  />
      ))}
      </div>
    </div>
  )
}
