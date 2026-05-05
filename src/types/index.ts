export interface StoryboardPanel {
  page: number;
  description: string;
  imageUrl?: string;
}

export interface Character {
  name: string;
  description: string;
}

export interface PictureBook {
  id: string;
  title: string;
  theme: string;
  pages: number;
  storyboards: StoryboardPanel[];
  characterCardUrl?: string;
  characters: Character[];
  createdAt: Date;
}

export interface GenerateRequest {
  theme: string;
  pages?: number;
  title?: string;
}

export interface GenerateResponse {
  success: boolean;
  pictureBook?: PictureBook;
  error?: string;
}

export interface ModifyImageRequest {
  pictureBookId: string;
  pageNumber: number;
  modificationPrompt: string;
  originalImageUrl: string;
}
