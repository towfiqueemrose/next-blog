// E:\blog\src\app\articles\[id]\page.tsx
import LikeButton from "@/components/Likebutton";
import { getSingleArticle } from "@/lib/actions";
import Image from "next/image";

export default async function Single_Article_Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const article = await getSingleArticle(id);

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="h1 text-center mb-8">
                {article.title}
            </h1>

            {/* Featured Image */}
            {article.image && article.image.length > 0 && (
                <div className="mt-4 relative w-full h-[300px] md:h-[400px] lg:h-[500px] mb-4">
                    <Image
                        src={article.image}
                        alt={article.title || "Article featured image"}
                        fill
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>
            )}

            {/* Like, Author Info and Date */}
            <div className="flex items-center justify-around gap-4 mb-8 border-y-2 border-logo py-4">
                <LikeButton
                    articleId={article.id}
                    initialIsLiked={article.isLiked}
                    initialLikesCount={article.likesCount}
                />
                <div className="flex gap-4">
                    {article.author?.image && article.author.image.length > 0 ? (
                        <div className="relative w-12 h-12">
                            <Image
                                src={article.author.image}
                                alt={`${article.author.name || 'Author'}'s profile picture`}
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <h3 className="h2">{article.author?.name || "Anonymous"}</h3>
                    </div>
                </div>
                {article.createdAt && (
                    <time className="h3 hidden md:block">
                        Published on {new Date(article.createdAt).toDateString()}
                    </time>
                )}
            </div>

            {/* Blog Content */}
            <div className="article">
                {article.description}
            </div>
        </article>
    );
}