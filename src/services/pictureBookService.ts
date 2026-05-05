import { PictureBook, StoryboardPanel, GenerateRequest, GenerateResponse, ModifyImageRequest } from "@/types";
import { LLMService } from "./llmService";
import { SeedreamService } from "./seedreamService";

export class PictureBookService {
  private llmService: LLMService;
  private seedreamService: SeedreamService;
  private pictureBooks: Map<string, PictureBook>;

  constructor() {
    this.llmService = new LLMService();
    this.seedreamService = new SeedreamService();
    this.pictureBooks = new Map();
  }

  async generatePictureBook(request: GenerateRequest): Promise<GenerateResponse> {
    try {
      const { theme, pages = 4, title } = request;
      const actualPages = Math.max(2, Math.min(10, pages));
      
      const storyboards = await this.llmService.splitStoryboards(theme, actualPages);
      
      const characters = await this.llmService.generateCharacters(theme);
      
      const characterCardPrompt = await this.llmService.generateCharacterCardPrompt(characters, theme);
      const characterCardUrl = await this.seedreamService.generateImage(characterCardPrompt);
      
      const pagePrompts = await Promise.all(
        storyboards.map(sb => this.llmService.generatePagePrompt(sb, theme))
      );
      
      const imageUrls = await this.seedreamService.generateImagesParallel(pagePrompts, characterCardUrl);
      
      storyboards.forEach((sb, index) => {
        sb.imageUrl = imageUrls[index];
      });
      
      const pictureBook: PictureBook = {
        id: `pb_${Date.now()}`,
        title: title || `${theme}的故事`,
        theme,
        pages: actualPages,
        storyboards,
        characterCardUrl,
        characters,
        createdAt: new Date()
      };
      
      this.pictureBooks.set(pictureBook.id, pictureBook);
      
      return { success: true, pictureBook };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '生成绘本时发生未知错误' 
      };
    }
  }

  async modifyImage(request: ModifyImageRequest): Promise<GenerateResponse> {
    try {
      const { pictureBookId, pageNumber, modificationPrompt, originalImageUrl } = request;
      const pictureBook = this.pictureBooks.get(pictureBookId);
      
      if (!pictureBook) {
        return { success: false, error: '未找到对应的绘本' };
      }
      
      const storyboard = pictureBook.storyboards.find(sb => sb.page === pageNumber);
      if (!storyboard) {
        return { success: false, error: '未找到对应的页面' };
      }
      
      const newImageUrl = await this.seedreamService.modifyImage(originalImageUrl, modificationPrompt);
      storyboard.imageUrl = newImageUrl;
      
      this.pictureBooks.set(pictureBookId, pictureBook);
      
      return { success: true, pictureBook };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '修改图片时发生未知错误' 
      };
    }
  }

  getPictureBook(id: string): PictureBook | undefined {
    return this.pictureBooks.get(id);
  }
}
