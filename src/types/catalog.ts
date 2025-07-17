export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  children?: Category[];
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  categoryId: string;
  sku: string;
  stock: number;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    length: number;
  };
  tags?: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

export interface CatalogState {
  categories: Category[];
  products: Product[];
  loading: boolean;
  error: string | null;
}