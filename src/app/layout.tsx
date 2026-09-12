import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SkillForgeProvider } from '@/lib/store';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/Navbar';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SkillForge — Trusted Skill Verification Infrastructure',
  description:
    'Know what candidates can do. Not what they claim. SkillForge evaluates real-world abilities through practical assessments and generates trusted credentials that teams verify instantly.',
  keywords: [
    'skill verification',
    'practical assessment',
    'developer passport',
    'technical hiring',
    'talent intelligence',
    'confidence scoring',
    'verified credentials',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('skillforge-theme');
                  var theme = stored || 'system';
                  var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-white dark:bg-[#090D16] text-[#0A0A0A] dark:text-[#F8FAFC] font-sans selection:bg-[#635BFF]/10 selection:text-[#635BFF]"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SkillForgeProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
          </SkillForgeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
