export interface Quote {
  id: number;
  text: string;
  author: string;
  category: 'inspirational' | 'bizarre';
}