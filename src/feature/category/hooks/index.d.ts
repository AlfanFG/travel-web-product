export interface ICategory {
	id: string;
	documentId: string;
	name: string;
	description: string;
	createdAt: Date | undefined;
	updatedAt: Date | undefined;
	publishedAt: Date | undefined;
	locale: string | undefined;
}

export interface CategoryProps {
	name: string;
	description?: string;
}
export interface PutCategoryProps {
	documentId: string;
	data: CategoryProps;
}
