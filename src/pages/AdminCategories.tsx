import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { mockCategories, buildCategoryTree } from '@/data/mockData';
import { Category } from '@/types/catalog';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: '',
    sortOrder: 0,
    isActive: true
  });

  const categoryTree = buildCategoryTree(categories);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      parentId: category.parentId || '',
      sortOrder: category.sortOrder,
      isActive: category.isActive
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      parentId: '',
      sortOrder: 0,
      isActive: true
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData, updatedAt: new Date() }
          : cat
      ));
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setCategories([...categories, newCategory]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[а-я]/g, (char) => {
        const translit: { [key: string]: string } = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
          'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
          'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
          'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
          'ь': '', 'ы': 'y', 'ъ': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        return translit[char] || char;
      })
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const renderCategoryRow = (category: Category, level = 0) => {
    const indent = level * 24;
    return (
      <TableRow key={category.id}>
        <TableCell style={{ paddingLeft: `${16 + indent}px` }}>
          <div className="flex items-center gap-2">
            {level > 0 && <Icon name="CornerDownRight" size={16} className="text-gray-400" />}
            {category.name}
          </div>
        </TableCell>
        <TableCell>{category.slug}</TableCell>
        <TableCell>
          <Badge variant={category.isActive ? "default" : "secondary"}>
            {category.isActive ? 'Активна' : 'Неактивна'}
          </Badge>
        </TableCell>
        <TableCell>{category.sortOrder}</TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleEdit(category)}
            >
              <Icon name="Edit" size={16} />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Icon name="Trash2" size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Удалить категорию</AlertDialogTitle>
                  <AlertDialogDescription>
                    Вы уверены, что хотите удалить категорию "{category.name}"? 
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(category.id)}>
                    Удалить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const flattenCategories = (categories: Category[]): Category[] => {
    const result: Category[] = [];
    const processCategory = (category: Category, level: number) => {
      result.push({ ...category, sortOrder: level });
      if (category.children) {
        category.children.forEach(child => processCategory(child, level + 1));
      }
    };
    categories.forEach(cat => processCategory(cat, 0));
    return result;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Button variant="ghost" asChild>
                <a href="/" className="text-xl font-semibold text-black">FreshMarket</a>
              </Button>
              <nav className="hidden md:flex space-x-6">
                <a href="/admin/categories" className="text-black font-medium">Категории</a>
                <a href="/admin/products" className="text-gray-600 hover:text-black transition-colors">Товары</a>
              </nav>
            </div>
            <Badge variant="secondary">Админ-панель</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light text-black">Управление категориями</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleCreate}>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить категорию
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? 'Редактировать категорию' : 'Создать категорию'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Название</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      setFormData({
                        ...formData,
                        name,
                        slug: generateSlug(name)
                      });
                    }}
                    placeholder="Введите название категории"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL (slug)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="url-категории"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Описание категории"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="parent">Родительская категория</Label>
                  <Select 
                    value={formData.parentId} 
                    onValueChange={(value) => setFormData({...formData, parentId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите родительскую категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Корневая категория</SelectItem>
                      {categories.filter(cat => cat.id !== editingCategory?.id).map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sortOrder">Порядок сортировки</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value)})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                  />
                  <Label htmlFor="isActive">Активная категория</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleSave}>
                    {editingCategory ? 'Сохранить' : 'Создать'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Список категорий</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Порядок</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flattenCategories(categoryTree).map(category => 
                  renderCategoryRow(category, category.sortOrder)
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}