export interface Quote {
  id: number;
  text: string;
  author: string;
  character?: string;
  category: 'inspirational' | 'bizarre';
}