export interface CategoryData {
  id?: number;
  nombre: string;
  descripcion: string;
  fecha_creacion?: string;
}

export interface CategoriesResponse {
  success: boolean;
  status: number;
  message: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCategories: number;
    categoriesPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  categories: CategoryData[];
}

export interface CategoryResponse {
  success: boolean;
  status: number;
  message: string;
  category: CategoryData;
}
