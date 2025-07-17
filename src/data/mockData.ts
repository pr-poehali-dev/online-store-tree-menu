import { Category, Product } from '@/types/catalog';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Фрукты',
    slug: 'fruits',
    description: 'Свежие фрукты со всего мира',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Экзотические фрукты',
    slug: 'exotic-fruits',
    description: 'Редкие и экзотические фрукты',
    parentId: '1',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: 'Местные фрукты',
    slug: 'local-fruits',
    description: 'Фрукты местного производства',
    parentId: '1',
    sortOrder: 2,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    name: 'Овощи',
    slug: 'vegetables',
    description: 'Свежие овощи каждый день',
    sortOrder: 2,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '5',
    name: 'Листовые овощи',
    slug: 'leafy-vegetables',
    description: 'Салаты, шпинат, руккола',
    parentId: '4',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '6',
    name: 'Мясо и рыба',
    slug: 'meat-fish',
    description: 'Свежее мясо и рыба премиум качества',
    sortOrder: 3,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '7',
    name: 'Рыба',
    slug: 'fish',
    description: 'Свежая рыба и морепродукты',
    parentId: '6',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '8',
    name: 'Молочные продукты',
    slug: 'dairy',
    description: 'Молоко, сыры, творог',
    sortOrder: 4,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '9',
    name: 'Сыры',
    slug: 'cheese',
    description: 'Разнообразные сыры со всего мира',
    parentId: '8',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Авокадо Хасс',
    slug: 'avocado-hass',
    description: 'Спелые авокадо из Мексики. Идеальны для салатов и тостов.',
    price: 149,
    originalPrice: 199,
    image: '/img/1ca7ac3a-5025-4aa7-b33b-75b0a4513050.jpg',
    categoryId: '2',
    sku: 'AV001',
    stock: 50,
    weight: 200,
    tags: ['экзотические', 'полезные'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Лосось норвежский',
    slug: 'salmon-norwegian',
    description: 'Свежий лосось премиум класса из Норвегии.',
    price: 890,
    image: '/img/4929f61e-93a1-43f8-8fd7-902c5ff988c9.jpg',
    categoryId: '7',
    sku: 'SA001',
    stock: 20,
    weight: 500,
    tags: ['премиум', 'свежий'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: 'Манго спелое',
    slug: 'mango-ripe',
    description: 'Сладкие манго из Таиланда. Богаты витаминами.',
    price: 89,
    image: '/img/9dc2a841-50ea-4eaa-9cf3-f6fa6204c27e.jpg',
    categoryId: '2',
    sku: 'MG001',
    stock: 30,
    weight: 300,
    tags: ['сладкие', 'витамины'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    name: 'Сыр Пармезан',
    slug: 'parmesan-cheese',
    description: 'Выдержанный пармезан 24 месяца из Италии.',
    price: 1290,
    image: '/placeholder.svg',
    categoryId: '9',
    sku: 'CH001',
    stock: 15,
    weight: 250,
    tags: ['итальянский', 'выдержанный'],
    isActive: true,
    isFeatured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '5',
    name: 'Руккола',
    slug: 'arugula',
    description: 'Свежая руккола для салатов с пикантным вкусом.',
    price: 129,
    image: '/placeholder.svg',
    categoryId: '5',
    sku: 'RU001',
    stock: 25,
    weight: 100,
    tags: ['листовые', 'салат'],
    isActive: true,
    isFeatured: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '6',
    name: 'Яблоки Антоновка',
    slug: 'antonovka-apples',
    description: 'Классические русские яблоки с кисло-сладким вкусом.',
    price: 79,
    image: '/placeholder.svg',
    categoryId: '3',
    sku: 'AP001',
    stock: 100,
    weight: 150,
    tags: ['местные', 'классические'],
    isActive: true,
    isFeatured: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export function buildCategoryTree(categories: Category[]): Category[] {
  const categoryMap = new Map<string, Category>();
  const rootCategories: Category[] = [];

  categories.forEach(category => {
    categoryMap.set(category.id, { ...category, children: [] });
  });

  categories.forEach(category => {
    const categoryWithChildren = categoryMap.get(category.id)!;
    
    if (category.parentId) {
      const parent = categoryMap.get(category.parentId);
      if (parent) {
        parent.children!.push(categoryWithChildren);
      }
    } else {
      rootCategories.push(categoryWithChildren);
    }
  });

  return rootCategories.sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCategoryPath(categoryId: string, categories: Category[]): Category[] {
  const path: Category[] = [];
  let currentCategory = categories.find(c => c.id === categoryId);
  
  while (currentCategory) {
    path.unshift(currentCategory);
    currentCategory = categories.find(c => c.id === currentCategory!.parentId);
  }
  
  return path;
}

export function getProductsByCategory(categoryId: string, products: Product[], categories: Category[]): Product[] {
  const categoryIds = new Set<string>();
  
  function addCategoryAndChildren(id: string) {
    categoryIds.add(id);
    const children = categories.filter(c => c.parentId === id);
    children.forEach(child => addCategoryAndChildren(child.id));
  }
  
  addCategoryAndChildren(categoryId);
  
  return products.filter(p => categoryIds.has(p.categoryId));
}