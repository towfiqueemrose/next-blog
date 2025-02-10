// E:\blog\src\lib\actions.ts
"use server"

import { prisma } from "./client";
import { auth } from "@/auth";

export const fetchCategories = async () => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        articles: true,
                    },
                },
                articles: {
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
        });
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return []; // Return an empty array in case of error
    }
}

export async function getCategoryWithArticles(slug: string) {
    try {
        const category = await prisma.category.findUnique({
            where: { slug },
            select: {
                id: true,
                name: true,
                image: true,
                articles: {
                    select: {
                        id: true,
                        title: true,
                        createdAt: true,
                        image: true,
                        _count: {
                            select: {
                                likes: true,
                            }
                        },
                        author: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        }
                    }
                },
            }
        },
        );
        if (!category) {
            throw new Error("Category not found");
        }

        return category;
    } catch (error) {
        console.error("Error fetching category:", error);
        return null;
    }
}

export async function getCategory() {
    try {
        const category = await prisma.category.findMany({
            select: {
                name: true,
                id: true,
                slug: true
            }
        });

        if (!category) {
            throw new Error("Category not found");
        }
        return category;
    } catch (error) {
        console.error("Error fetching category:", error);
        return null;
    }
}

export async function getArticles() {
    try {
        const articles = await prisma.article.findMany({
            select: {
                id: true,
                title: true,
                image: true,
                createdAt: true,
                _count: {
                    select: {
                        likes: true,
                    }
                },
                author: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                id: 'asc'
            }
        });
        return articles.sort(() => Math.random() - 0.5);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return null;
    }
}

export async function getSingleArticle(id: string) {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        const article = await prisma.article.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                image: true,
                createdAt: true,
                _count: {
                    select: {
                        likes: true
                    }
                },
                author: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                likes: userId ? {
                    where: {
                        userId: userId
                    },
                    select: {
                        id: true
                    }
                } : false
            }
        });

        if (!article) return null;

        // Ensure we're returning the correct like status and count
        return {
            ...article,
            isLiked: article.likes && article.likes.length > 0,
            likesCount: article._count.likes
        };

    } catch (error) {
        console.error("Error fetching article:", error);
        return null;
    }
}

export async function toggleLike(articleId: string) {
    try {
        const session = await auth();
        
        if (!session?.user?.id) {
            throw new Error("Authentication required");
        }

        const userId = session.user.id;

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_articleId: {
                    userId,
                    articleId,
                },
            },
        });

        if (existingLike) {
            // Unlike
            await prisma.like.delete({
                where: {
                    userId_articleId: {
                        userId,
                        articleId,
                    },
                },
            });
            return { isLiked: false };
        } else {
            // Like
            await prisma.like.create({
                data: {
                    userId,
                    articleId,
                },
            });
            return { isLiked: true };
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        throw error;
    }
}
            
export async function getAuthors() {
    try {
        const authors = await prisma.user.findMany({
            where: {
                articles: {
                    some: {} // এটি চেক করে যে articles array খালি কিনা
                }
            },
            select: {
                id: true,
                name: true,
                image: true
            }
        });
        return authors;
    } catch (error) {
        console.error("Error fetching authors:", error);
        return null;
    }
}

export async function getSingleAuthorBio(id: string) {
    try {
        const authors = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                image: true,
                email: true,
            }  
        });
        return authors;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return null;
    }
}
export async function getSingleAuthorArticles(id: string) {
    try {
        const Articles = await prisma.user.findUnique({
            where: { id },
            select: {
                articles: {
                    select: {
                        id: true,
                        title: true,
                        image: true,
                        createdAt: true,
                        _count: {
                            select: {
                                likes: true
                            }
                        },
                        author: {
                            select: {
                                name: true,
                                image: true
                            }
                        },
                        category: {  // Add this field
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }  
        });
        return Articles;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return null;
    }
}


export async function getLatestArticles() {
    try {
      const newestArticle = await prisma.article.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          title: true,
          image: true,
          category: {
            select: {
              name: true,
            },
          },
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
  
      return newestArticle; // Return the result so it can be used outside the function
    } catch (error) {
      console.error('Error fetching the newest article:', error);
      throw error; 
    }
  }
