'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PictureBook } from '@/types';
import { PictureBookForm } from '@/components/PictureBookForm';
import { PictureBookViewer } from '@/components/PictureBookViewer';

export default function Home() {
  const [pictureBook, setPictureBook] = useState<PictureBook | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (theme: string, pages: number, title?: string) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme, pages, title }),
      });
      
      const result = await response.json();
      
      if (result.success && result.pictureBook) {
        setPictureBook(result.pictureBook);
      } else {
        setError(result.error || '生成绘本失败');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleModifyImage = async (pageNumber: number, modificationPrompt: string) => {
    if (!pictureBook) return;
    
    const storyboard = pictureBook.storyboards.find(sb => sb.page === pageNumber);
    if (!storyboard?.imageUrl) return;
    
    try {
      const response = await fetch('/api/modify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pictureBookId: pictureBook.id,
          pageNumber,
          modificationPrompt,
          originalImageUrl: storyboard.imageUrl,
        }),
      });
      
      const result = await response.json();
      
      if (result.success && result.pictureBook) {
        setPictureBook(result.pictureBook);
      } else {
        setError(result.error || '修改图片失败');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        {!pictureBook ? (
          <PictureBookForm 
            onGenerate={handleGenerate} 
            isGenerating={isGenerating}
          />
        ) : (
          <PictureBookViewer 
            pictureBook={pictureBook} 
            onModifyImage={handleModifyImage}
          />
        )}
        
        {error && (
          <div className="max-w-2xl mx-auto mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {pictureBook && (
          <div className="max-w-2xl mx-auto mt-6 text-center">
            <button
              onClick={() => setPictureBook(null)}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              生成新的绘本
            </button>
          </div>
        )}
        
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <Link href="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl hover:shadow-lg hover:shadow-slate-500/25 transition-all hover:-translate-y-1">
            <span>✨</span>
            <span>查看产品经理个人主页</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
