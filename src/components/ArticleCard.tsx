// E:\blog\src\components\ArticleCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { formatDistance } from 'date-fns';


const ArticleCard = ({ article }: any) => {
  const timeAgo = formatDistance(new Date(article.createdAt), new Date(), {
    addSuffix: true,
  });

  return (
    <Link href={`/articles/${article.id}`} className="article-card-main">
      <div className="relative h-48 w-full">
        <Image
          src={article.image || '/article.jpg'}
          alt={article.title}
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="p-4 ">
        <h2 className="h2">
          {article.title}
        </h2>

        <div className='flex justify-between'>
          <div>
            <div className="mt-4 flex items-center">
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <Image
                  src={article.author.image || '/avatar.svg'}
                  alt={article.author.name || 'Author'}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="ml-2">
                <p className="h3">{article.author.name}</p>
                <p className='h4'>{timeAgo}</p>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center gap-2'>
              <Image src="/love-red.svg" width={25} height={25} alt="" />
            <p className='h4'>|</p>
            <p className='h4'>{article._count.likes}</p>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default ArticleCard;