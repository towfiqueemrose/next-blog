
export interface ThemeSwitchProps {
    isDark: boolean;
    toggleTheme: () => void;
  }


  export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: Date; 
    _count?: { 
        articles: number;
    };
}


export interface Categories {
   name : string;
   slug : string;
   id: string;
}

export interface ComponentProps {
  category: Categories[] | null;
}

// types.ts
export interface Author {
  id: string;
  name: string | null;
  image: string | null;
}

export interface Article {
  id: string;
  title: string;
  createdAt: Date;
  image: string;
  author: Author;
}

export interface CategoryWithArticles {
  id: string;
  name: string;
  image: string;
  articles: Article[];
}

export type SingleArticleProps = {
  singleArticle: {
      id: string;
      title: string;
      description: string;
      image: string;
      createdAt: Date;
      author: {
          name: string | null;
          image: string | null;
      };
  } | null;
};


export interface HomeArticle {
  articles: {
    id: string;
    image: string | null;
    title: string;
    category: {
      name: string;
    };
    createdAt: Date;
    author: {
      image: string | null;
      name: string | null;
    };
  }[] | null;
}

export interface PuthorProps {
  id: string;
  name: string | null;
  image: string | null;
  
}
export interface AuthorProps {
  key?: string;
  author: {
    id: string;
    image: string | null;
    name: string | null;
  };
}

export interface MyComponentProps {
  key: string;
  author: Author;
}

export interface ArticleData {
  articles: {
    id: string;
    image: string;
    title: string;
    author: {
      name: string | null;
      image: string | null;
    };
  }[];
}




export interface AuthorBio {
  author: Author; 
}




export interface LikeButtonProps {
  like: number;
  likeToggle: {
    message: string;
    liked: boolean;
  };
}