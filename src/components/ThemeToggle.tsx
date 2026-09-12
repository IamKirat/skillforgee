'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check, ChevronDown } from 'lucide-react';
import { useTheme, Theme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showDropdown?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showDropdown = true,
}) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Current theme icon
  const renderCurrentIcon = () => {
    if (!mounted) {
      return <Sun size={15} className="text-[#6B7280] dark:text-[#94A3B8]" />;
    }
    if (theme === 'system') {
      return <Laptop size={15} className="text-[#635BFF]" />;
    }
    if (resolvedTheme === 'dark') {
      return <Moon size={15} className="text-indigo-400" />;
    }
    return <Sun size={15} className="text-amber-500" />;
  };

  const options: { value: Theme; label: string; description: string; icon: React.ReactNode }[] = [
    {
      value: 'light',
      label: 'Light',
      description: 'Clean high-contrast daytime mode',
      icon: <Sun size={15} className="text-amber-500" />,
    },
    {
      value: 'dark',
      label: 'Dark',
      description: 'Deep sleek developer mode',
      icon: <Moon size={15} className="text-indigo-400" />,
    },
    {
      value: 'system',
      label: 'System',
      description: 'Synchronize with your OS preference',
      icon: <Laptop size={15} className="text-[#635BFF]" />,
    },
  ];

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0F172A] hover:bg-white dark:hover:bg-[#1E293B] text-[#0A0A0A] dark:text-[#F8FAFC] transition-all duration-300 shadow-2xs hover:shadow-subtle cursor-pointer select-none"
        aria-label={`Current theme: ${theme}. Click to change theme`}
        aria-expanded={isOpen}
      >
        <span className="flex items-center justify-center w-4 h-4 transition-transform duration-300">
          {renderCurrentIcon()}
        </span>
        <span className="text-xs font-semibold capitalize hidden md:inline text-[#0A0A0A] dark:text-[#F8FAFC] font-mono">
          {mounted ? theme : 'Theme'}
        </span>
        <ChevronDown
          size={12}
          className={`text-[#6B7280] dark:text-[#94A3B8] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && showDropdown && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full mt-1.5 w-60 p-1.5 rounded-2xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] shadow-floating z-50 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="px-2.5 py-1.5 mb-1 border-b border-[#F1F5F9] dark:border-[#1E293B]">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#6B7280] dark:text-[#94A3B8] font-bold">
              Theme Preference
            </p>
          </div>

          <div className="space-y-0.5">
            {options.map(opt => {
              const isSelected = mounted && theme === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setTheme(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#635BFF]/10 dark:bg-[#635BFF]/20 text-[#635BFF] dark:text-[#818CF8]'
                      : 'hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] text-[#0A0A0A] dark:text-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                        isSelected
                          ? 'bg-white dark:bg-[#0A0F1D] shadow-2xs'
                          : 'bg-[#F1F5F9] dark:bg-[#1E293B]'
                      }`}
                    >
                      {opt.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">{opt.label}</p>
                      <p className="text-[10px] text-[#6B7280] dark:text-[#94A3B8]">
                        {opt.description}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#635BFF] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
