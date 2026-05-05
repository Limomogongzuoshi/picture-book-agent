interface ImageGenerationRequest {
  model: string;
  prompt: string;
  size?: string;
  n?: number;
  reference_image?: string;
  reference_strength?: number;
}

interface ImageGenerationResponse {
  data: Array<{ url: string }>;
}

interface ImageModificationRequest {
  model: string;
  prompt: string;
  image: string;
  strength?: number;
  size?: string;
  n?: number;
}

export class SeedreamService {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.ARK_API_KEY || '';
    this.baseUrl = process.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3';
    this.model = process.env.SEEDREAM_MODEL || 'doubao-seedream-4-5-251128';
  }

  async generateImage(prompt: string, referenceImageUrl?: string): Promise<string> {
    try {
      const requestBody: ImageGenerationRequest = {
        model: this.model,
        prompt: prompt,
        size: '1024x1024',
        n: 1,
      };

      if (referenceImageUrl) {
        requestBody.reference_image = referenceImageUrl;
        requestBody.reference_strength = 0.8;
      }

      const response = await fetch(`${this.baseUrl}/images/generations`, {
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

      const data: ImageGenerationResponse = await response.json();
      
      if (!data.data || data.data.length === 0) {
        throw new Error('No image returned from API');
      }

      return data.data[0].url;
    } catch (error) {
      console.error('Seedream API error:', error);
      
      // 回退到占位图
      const placeholderImages = [
        "https://picsum.photos/seed/pb1/1024/1024",
        "https://picsum.photos/seed/pb2/1024/1024",
        "https://picsum.photos/seed/pb3/1024/1024",
        "https://picsum.photos/seed/pb4/1024/1024",
        "https://picsum.photos/seed/pb5/1024/1024",
        "https://picsum.photos/seed/pb6/1024/1024",
        "https://picsum.photos/seed/pb7/1024/1024",
        "https://picsum.photos/seed/pb8/1024/1024",
        "https://picsum.photos/seed/pb9/1024/1024",
        "https://picsum.photos/seed/pb10/1024/1024"
      ];
      const randomIndex = Math.floor(Math.random() * placeholderImages.length);
      return placeholderImages[randomIndex];
    }
  }

  async generateImagesParallel(prompts: string[], referenceImageUrl?: string): Promise<string[]> {
    const results = await Promise.all(
      prompts.map((prompt, index) => {
        const enhancedPrompt = referenceImageUrl 
          ? prompt 
          : `${prompt}, children's book illustration style, colorful, whimsical`;
        return this.generateImage(enhancedPrompt, referenceImageUrl);
      })
    );
    return results;
  }

  async modifyImage(originalImageUrl: string, modificationPrompt: string): Promise<string> {
    try {
      const requestBody: ImageModificationRequest = {
        model: this.model,
        prompt: modificationPrompt,
        image: originalImageUrl,
        strength: 0.7,
        size: '1024x1024',
        n: 1,
      };

      const response = await fetch(`${this.baseUrl}/images/edits`, {
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

      const data: ImageGenerationResponse = await response.json();
      
      if (!data.data || data.data.length === 0) {
        throw new Error('No image returned from API');
      }

      return data.data[0].url;
    } catch (error) {
      console.error('Seedream API error:', error);
      
      // 回退到占位图
      const seed = `modified_${Date.now()}`;
      return `https://picsum.photos/seed/${seed}/1024/1024`;
    }
  }
}
