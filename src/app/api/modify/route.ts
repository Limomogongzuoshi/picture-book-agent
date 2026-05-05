import { NextResponse } from 'next/server';
import { PictureBookService } from '@/services/pictureBookService';

const pictureBookService = new PictureBookService();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await pictureBookService.modifyImage(body);
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '服务器内部错误' },
      { status: 500 }
    );
  }
}
