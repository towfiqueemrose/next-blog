"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitch from './SwitchTheme';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession()

  const [isDark, setIsDark] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(systemPrefersDark);
        document.documentElement.classList.toggle('dark', systemPrefersDark);
      }
    }
  }, []);

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <nav className="w-full bg-exLight dark:bg-exDark border-b-2 border-logo dark:border-exDark px-4 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="h-10 w-10 mr-3"
          />
          <h1 className="text-4xl font-bold text-logo hidden lg:block">NextBlog</h1>
        </Link>

        {/* Middle Section */}
        <div className="flex-1 max-w-xl mx-4">
          <div className='flex justify-around'>
            <Link href="/articles" className="h2">Articles</Link>
            <Link href="/authors" className="h2 hidden sm:block">Authors</Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <ThemeSwitch isDark={isDark} toggleTheme={toggleTheme} />


          {session?.user ? (
            <div>
              <Image
                src={session.user.image || "/avatar.svg"}
                alt={session.user.name || "user"}
                width={32}
                height={32}
                className="rounded-full"
                priority
              />
            </div>
          ) : (
            <Link href="/auth/signin" className="h3">Signin</Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;