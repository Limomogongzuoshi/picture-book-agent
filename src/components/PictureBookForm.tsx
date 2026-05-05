'use client';

import { useState } from 'react';

interface PictureBookFormProps {
  onGenerate: (theme: string, pages: number, title?: string) => Promise<void>;
  isGenerating: boolean;
}

export function PictureBookForm({ onGenerate, isGenerating }: PictureBookFormProps) {
  const [theme, setTheme] = useState('');
  const [pages, setPages] = useState(4);
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) return;
    await onGenerate(theme.trim(), pages, title.trim() || undefined);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📖 绘本生成智能体
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              绘本主题 *
            </label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="例如：小明和小白的冒险、海底探险、森林音乐会..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isGenerating}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              绘本标题（可选）
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：神奇的一天"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isGenerating}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              绘本页数：{pages} 页
            </label>
            <input
              type="range"
              min="2"
              max="10"
              value={pages}
              onChange={(e) => setPages(parseInt(e.target.value))}
              className="w-full"
              disabled={isGenerating}
            />
            <p className="text-sm text-gray-500 mt-1">
              支持 2-10 页，默认 4 页
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isGenerating || !theme.trim()}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isGenerating ? '🎨 正在生成绘本...' : '✨ 开始生成绘本'}
          </button>
        </form>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">工作流程</h3>
          <ol className="list-decimal list-inside space-y-1 text-blue-700 text-sm">
            <li>理解用户需求，使用 LLM 进行漫画分镜拆分</li>
            <li>生成角色卡片，作为风格参考</li>
            <li>根据分镜并行生成所有页面</li>
            <li>支持单页图片修改（图生图）</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
