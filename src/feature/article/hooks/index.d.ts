import type { ICategory } from "@/feature/category/hooks";

export interface IArticles {
  id: string;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  publishedAt: Date | undefined;
  locale: string | undefined;
  user: IUserProfile;
  category: ICategory | undefined;
  comments: IComment;
  localizations: [];
}

export interface PostArticlesProps {
  data: ArticlesProps;
}

export interface PutArticlesProps {
  data: ArticlesProps;
  documentId: string;
}

export interface ArticlesProps {
  title: string;
  description: string;
  cover_image_url: string;
  category: string;
}
