import type { IArticles } from "@/feature/article/hooks";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IArticleStore {
  article: IArticles;
  setArticle: (article: IArticles) => void;
}

const useArticleStore = create<IArticleStore>()(
  persist(
    (set) => ({
      article: {
        id: "",
        documentId: "",
        title: "",
        description: "",
        comments: "",
        cover_image_url: "",
        category: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        publishedAt: undefined,
        locale: undefined,
        localizations: [],
        user: undefined,
      },

      setArticle: (article: IArticles) =>
        set((state) => ({
          article: { ...state.article, ...article },
        })),
    }),
    {
      name: "article-storage",
    }
  )
);

export const useArticle = () => useArticleStore((state) => state.article);

export const useArticleActions = () =>
  useArticleStore((state) => state.setArticle);
