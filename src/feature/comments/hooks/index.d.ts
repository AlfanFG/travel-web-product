import type { IUserProfile } from "@/stores/profileStore";

export interface IComment {
  id: string;
  documentId: string;
  content: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  publishedAt: Date | undefined;
  user: IUserProfile;
  locale: string | undefined;
}

export interface CommentProps {
  content: string;
  article: string;
}
export interface putCommentProps {
  documentId: string;
  data: { content: string };
}
