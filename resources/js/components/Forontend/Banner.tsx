
import { IfrontBanner } from '@/types/frontend';
import { Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type BannerProps = {
  banners: IfrontBanner[];
};

export default function Banner({ banners }: BannerProps) {
const bannerList = banners.data;
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % bannerList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerList]);

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-center py-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-20"></div>
      <span className="text-white font-medium text-sm md:text-base transition-opacity duration-500 inline-flex items-center">
        <Sparkles className="w-4 h-4 mr-1" />
        {bannerList[currentMessage]?.title}
      </span>
    </div>
  );
}