import { Character, StoryboardPanel } from "@/types";

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class LLMService {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.ARK_API_KEY || '';
    this.baseUrl = process.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3';
    this.model = process.env.LLM_MODEL || 'doubao-pro-32k';
  }

  private async callLLM(messages: ChatMessage[]): Promise<string> {
    try {
      const requestBody: ChatCompletionRequest = {
        model: this.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
      };

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data: ChatCompletionResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('LLM API error:', error);
      throw error;
    }
  }

  async splitStoryboards(theme: string, pages: number): Promise<StoryboardPanel[]> {
    try {
      const systemPrompt = `你是一个儿童绘本分镜师。请为给定的主题创建${pages}页的绘本分镜。
返回格式必须是纯JSON数组，每个元素包含：
- page: 页码（从1开始）
- description: 该页的详细画面描述，适合图像生成

只返回JSON，不要有其他文字。`;

      const userPrompt = `主题：${theme}
请创建${pages}页的儿童绘本分镜，确保故事连贯有趣，画面描述详细具体。`;

      const response = await this.callLLM([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]);

      const parsed = JSON.parse(response);
      return parsed;
    } catch (error) {
      console.error('Failed to generate storyboards, using fallback:', error);
      
      const storyboards: StoryboardPanel[] = [];
      const sceneTemplates = [
        "场景开始，介绍主要角色和背景环境",
        "角色遇到了一个有趣的事件或挑战",
        "角色努力解决问题或经历冒险",
        "故事达到高潮，角色取得突破",
        "温馨的结局，角色们幸福地生活着"
      ];

      for (let i = 0; i < pages; i++) {
        storyboards.push({
          page: i + 1,
          description: `${theme} - 第${i + 1}页：${sceneTemplates[i % sceneTemplates.length]}，儿童绘本风格，色彩明亮，温馨可爱`
        });
      }
      
      return storyboards;
    }
  }

  async generateCharacters(theme: string): Promise<Character[]> {
    try {
      const systemPrompt = `你是一个儿童绘本角色设计师。请为给定的主题创建2-4个可爱的角色。
返回格式必须是纯JSON数组，每个元素包含：
- name: 角色名字
- description: 角色详细描述（外貌、性格等）

只返回JSON，不要有其他文字。`;

      const userPrompt = `主题：${theme}
请为这个儿童绘本主题设计合适的可爱角色。`;

      const response = await this.callLLM([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]);

      const parsed = JSON.parse(response);
      return parsed;
    } catch (error) {
      console.error('Failed to generate characters, using fallback:', error);
      
      return [
        { name: "小明", description: "一个可爱的小男孩，6岁，棕色头发，喜欢穿蓝色衣服" },
        { name: "小白", description: "一只白色的小狗，毛茸茸的，很聪明" }
      ];
    }
  }

  async generateCharacterCardPrompt(characters: Character[], theme: string): Promise<string> {
    const characterDescriptions = characters.map(c => `${c.name}: ${c.description}`).join('; ');
    return `角色设计卡片，包含以下角色：${characterDescriptions}。主题：${theme}。儿童绘本风格，色彩明亮，可爱温馨，完整展示所有角色的正面形象，作为统一风格参考`;
  }

  async generatePagePrompt(storyboard: StoryboardPanel, theme: string): Promise<string> {
    return `${storyboard.description}。主题：${theme}。儿童绘本风格，色彩明亮，温馨可爱，保持角色一致性`;
  }
}
