import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { ThemeSwitchProps } from '@/types/types';

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-7 w-12 items-center rounded-full 
                transition-colors duration-300 focus:outline-none
                bg-logo"
      role="switch"
      aria-checked={isDark}
    >
      {/* Switch Track */}
      <span className="sr-only">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      
      {/* Switch Thumb with Icons */}
      <span
        className={`${
          isDark ? 'translate-x-6' : 'translate-x-0.5'
        } inline-flex h-6 w-6 transform items-center justify-center rounded-full 
        bg-white shadow-sm ring-0 transition duration-300 ease-in-out`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-logo" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-logo" />
        )}
      </span>
    </button>
  );
};

export default ThemeSwitch;