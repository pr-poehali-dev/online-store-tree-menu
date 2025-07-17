import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Icon from '@/components/ui/icon';
import { mockCategories, mockProducts, buildCategoryTree, getCategoryPath, getProductsByCategory } from '@/data/mockData';
import { Category, Product } from '@/types/catalog';

export default function Catalog() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const categoryTree = useMemo(() => buildCategoryTree(mockCategories), []);
  const categoryPath = useMemo(() => 
    selectedCategoryId ? getCategoryPath(selectedCategoryId, mockCategories) : [], 
    [selectedCategoryId]
  );
  const filteredProducts = useMemo(() => 
    selectedCategoryId ? getProductsByCategory(selectedCategoryId, mockProducts, mockCategories) : mockProducts.filter(p => p.isFeatured),
    [selectedCategoryId]
  );

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategoryTree = (categories: Category[], level = 0) => {
    return categories.map(category => (
      <div key={category.id} style={{ marginLeft: level * 16 }}>
        <div className="flex items-center gap-2 py-1">
          {category.children && category.children.length > 0 && (
            <Collapsible open={expandedCategories.has(category.id)}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCategory(category.id)}
                  className="h-6 w-6 p-0"
                >
                  <Icon 
                    name={expandedCategories.has(category.id) ? "ChevronDown" : "ChevronRight"} 
                    size={14} 
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="ml-4">
                  {renderCategoryTree(category.children, level + 1)}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
          <Button
            variant={selectedCategoryId === category.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategoryId(category.id)}
            className="text-sm font-normal justify-start"
          >
            {category.name}
          </Button>
        </div>
        {expandedCategories.has(category.id) && category.children && category.children.length > 0 && (
          <div className="ml-4">
            {renderCategoryTree(category.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" asChild>
                <a href="/" className="text-xl font-semibold text-black">FreshMarket</a>
              </Button>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="/catalog" className="text-black font-medium">Каталог</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Доставка</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">О нас</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="User" size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Icon name="ShoppingCart" size={20} />
                <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        {categoryPath.length > 0 && (
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="/catalog" 
                    onClick={() => setSelectedCategoryId(null)}
                    className="cursor-pointer"
                  >
                    Каталог
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {categoryPath.map((category, index) => (
                  <div key={category.id} className="flex items-center">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {index === categoryPath.length - 1 ? (
                        <BreadcrumbPage>{category.name}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink 
                          onClick={() => setSelectedCategoryId(category.id)}
                          className="cursor-pointer"
                        >
                          {category.name}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-black mb-4">Категории</h3>
                <div className="space-y-1">
                  <Button
                    variant={selectedCategoryId === null ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedCategoryId(null)}
                    className="w-full justify-start"
                  >
                    Все товары
                  </Button>
                  {renderCategoryTree(categoryTree)}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-black">
                {selectedCategoryId 
                  ? categoryPath[categoryPath.length - 1]?.name 
                  : 'Рекомендуемые товары'
                }
              </h2>
              <div className="text-sm text-gray-600">
                {filteredProducts.length} товаров
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="border-gray-100 hover:shadow-md transition-shadow">
                    <CardHeader className="p-0">
                      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-lg font-medium text-black mb-2">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mb-4">
                        {product.description}
                      </CardDescription>
                      <div className="flex items-center gap-2 mb-4">
                        {product.tags?.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-black">{product.price} ₽</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.originalPrice} ₽
                            </span>
                          )}
                        </div>
                        <Button size="sm" variant="outline">
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Артикул: {product.sku} | В наличии: {product.stock} шт
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Package" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-black mb-2">Товары не найдены</h3>
                <p className="text-gray-600">В данной категории пока нет товаров</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}