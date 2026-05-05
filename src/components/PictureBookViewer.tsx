'use client';

import { PictureBook } from '@/types';
import { useState } from 'react';

interface PictureBookViewerProps {
  pictureBook: PictureBook;
  onModifyImage: (pageNumber: number, modificationPrompt: string) => Promise<void>;
}

export function PictureBookViewer({ pictureBook, onModifyImage }: PictureBookViewerProps) {
  const [modifyingPage, setModifyingPage] = useState<number | null>(null);
  const [modificationPrompt, setModificationPrompt] = useState('');
  const [isModifying, setIsModifying] = useState(false);

  const handleModifyClick = (pageNumber: number) => {
    setModifyingPage(pageNumber);
  };

  const handleModifySubmit = async () => {
    if (!modifyingPage || !modificationPrompt) return;
    
    const storyboard = pictureBook.storyboards.find(sb => sb.page === modifyingPage);
    if (!storyboard?.imageUrl) return;
    
    setIsModifying(true);
    try {
      await onModifyImage(modifyingPage, modificationPrompt);
      setModifyingPage(null);
      setModificationPrompt('');
    } catch (error) {
      console.error('修改失败:', error);
    } finally {
      setIsModifying(false);
    }
  };

  const renderMarkdown = () => {
    let md = `# ${pictureBook.title}\n\n`;
    
    if (pictureBook.characterCardUrl) {
      md += `## 角色卡片\n\n![角色卡片](${pictureBook.characterCardUrl})\n\n`;
    }
    
    pictureBook.storyboards.forEach(sb => {
      md += `## 第 ${sb.page} 页\n\n`;
      md += `${sb.description}\n\n`;
      if (sb.imageUrl) {
        md += `![第 ${sb.page} 页](${sb.imageUrl})\n\n`;
      }
    });
    
    return md;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{pictureBook.title}</h1>
        <p className="text-gray-600 mb-6">主题: {pictureBook.theme}</p>
        
        {pictureBook.characterCardUrl && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">角色卡片</h2>
            <img 
              src={pictureBook.characterCardUrl} 
              alt="角色卡片" 
              className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
            />
          </div>
        )}
        
        <div className="space-y-8">
          {pictureBook.storyboards.map((storyboard) => (
            <div key={storyboard.page} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">第 {storyboard.page} 页</h3>
              <p className="text-gray-700 mb-4">{storyboard.description}</p>
              {storyboard.imageUrl && (
                <div className="mb-4">
                  <img 
                    src={storyboard.imageUrl} 
                    alt={`第 ${storyboard.page} 页`} 
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}
              
              {modifyingPage === storyboard.page ? (
                <div className="mt-4">
                  <textarea
                    value={modificationPrompt}
                    onChange={(e) => setModificationPrompt(e.target.value)}
                    placeholder="描述你想要如何修改这张图片..."
                    className="w-full p-3 border rounded-lg mb-2"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleModifySubmit}
                      disabled={isModifying}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                    >
                      {isModifying ? '修改中...' : '确认修改'}
                    </button>
                    <button
                      onClick={() => setModifyingPage(null)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleModifyClick(storyboard.page)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  修改此页图片
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Markdown 格式预览</h3>
          <pre className="text-sm whitespace-pre-wrap">{renderMarkdown()}</pre>
        </div>
      </div>
    </div>
  );
}
