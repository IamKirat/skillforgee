'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login?tab=signup');
  }, [router]);

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-[#090D16]">
      <div className="flex items-center gap-3 text-xs text-[#6B7280] dark:text-[#94A3B8]">
        <span className="w-4 h-4 border-2 border-[#635BFF] border-t-transparent rounded-full animate-spin" />
        <span>Loading registration portal...</span>
      </div>
    </div>
  );
}
