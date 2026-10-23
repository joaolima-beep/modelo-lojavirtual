export type CategoryId = 'camisetas' | 'calcas' | 'acessorios' | 'kits';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  price: number; // in reais, decimal
  priceOnRequest?: boolean;
  promoPrice?: number; // optional promotional price
  description: string;
  details: string[];
  images: string[];
  sizes: string[];
  colors: ColorOption[];
  popular?: boolean;
  isNew?: boolean;
  badge?: string;
}

export interface CartItem {
  key: string; // `${productId}-${size}-${color}`
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc';
