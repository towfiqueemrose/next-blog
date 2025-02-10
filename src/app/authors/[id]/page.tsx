//src/app/authors\[id]\page.tsx
import ArticleCard from '@/components/ArticleCard'
import AuthorProfileCard from '@/components/authorPage/AuthorProfileCard'
import { getSingleAuthorArticles, getSingleAuthorBio } from '@/lib/actions';
import { notFound } from 'next/navigation';

export default async function SingleAuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const [author, articles] = await Promise.all([
    getSingleAuthorBio(id),
    getSingleAuthorArticles(id)
  ]);

  if (!author) {
    notFound();
  }
  if (!articles) {
    notFound();
  }

  return (
    <div>
      <AuthorProfileCard author={author} />
      <div className="mt-16">
        <h1 className='h1 text-center'>Author&#39;s Articles</h1>
      </div>    
      <div className="article-list">
        {Array.isArray(articles) ? (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : articles.articles?.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}