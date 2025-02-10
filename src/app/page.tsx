import BecomeAnAuthor from '@/components/BecomeAnAuthor'
import HeroSection from '@/components/HeroSection'
import HomePageArticales from '@/components/HomePageArticales'
import Topics from '@/components/Topics'
import { fetchCategories, getArticles, getLatestArticles } from '@/lib/actions'
import React from 'react'

export default async function HomePage() {
  const categories = await fetchCategories();
  const articles = await getArticles();
  const latestArticle = await getLatestArticles();

  return (
    <div>
      <HeroSection latestArticle={latestArticle}/>
      <Topics categories={categories} />
      <HomePageArticales articles={articles}/>
      <BecomeAnAuthor />
    </div>
  )
}
