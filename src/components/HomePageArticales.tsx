import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import { HomeArticle } from "@/types/types";

const HomePageArticles = ({ articles }: HomeArticle) => {
  if (!articles) {
    return <div>No articles found.</div>;
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="h1">Articles 🎈</h1>
        <Link href="/articles" className="see-all">
          See all <ChevronsRight className="mt-1" />
        </Link>
      </div>

      <p className="p-lg">Discover the most outstanding articles in all topics of life.</p>

      <div className="flex flex-col mt-6 md:flex-row gap-6">
        {/* Left large card */}
        <Link
          href={articles[0]?.id ? `/articles/${articles[0].id}` : "#"}
          className="home-card-left"
        >
          <div className="relative">
            <Image
              src={articles[0].image || "/article.jpg"}
              alt={articles[0].title}
              width={800}
              height={400}
              className="w-full h-64 object-cover"
            />
            <span className="absolute top-4 left-4 px-3 py-1 bg-white text-red-500 rounded-full text-sm font-medium">
              {articles[0].category.name} {/* Access category.name */}
            </span>
          </div>

          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src={articles[0].author?.image || "/avatar.svg"}
                alt="Author"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="h3">{articles[0].author?.name}</h3>
                <p className="text-sm text-gray-400">
                  {new Date(articles[0].createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <h2 className="h2">{articles[0].title}</h2>

          </div>
        </Link>

        {/* Right side cards */}
        <div className="w-full md:w-1/2 flex flex-col gap-7">
          {articles.slice(1, 3).map((article) => (
            <Link href={`/articles/${article.id}`} key={article.id} className="home-card-right">
              <div className="p-6 flex-1">
                <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4">
                  {article.category.name} {/* Access category.name */}
                </span>

                <h2 className="h2">{article.title}</h2>

                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src={article.author?.image || ""}
                    alt="Author"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h3 className="h3">{article.author?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                
              </div>

              <div className="relative w-40 md:w-48">
                <Image
                  src={article.image || ""}
                  alt="Article thumbnail"
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageArticles;