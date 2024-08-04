export interface Post {
    id: number;
    title: string;
    content: string;
    writer: string;
    favoriteCount: number;
    commentCount: number;
    isBest: boolean;
  }