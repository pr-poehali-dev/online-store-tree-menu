import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-black">FreshMarket</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Каталог</a>
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

      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-light text-black mb-6">
              Свежие продукты<br />каждый день
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Доставляем качественные продукты прямо к вашему столу. 
              Отборные фрукты, овощи и деликатесы от лучших поставщиков.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline">
                Узнать о доставке
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-light text-black mb-4">Популярные продукты</h3>
            <p className="text-gray-600">Самые востребованные товары нашего магазина</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Авокадо Хасс",
                description: "Спелые авокадо из Мексики",
                price: "149 ₽",
                originalPrice: "199 ₽",
                image: "/img/1ca7ac3a-5025-4aa7-b33b-75b0a4513050.jpg"
              },
              {
                title: "Лосось норвежский",
                description: "Свежий лосось премиум класса",
                price: "890 ₽",
                image: "/img/4929f61e-93a1-43f8-8fd7-902c5ff988c9.jpg"
              },
              {
                title: "Манго спелое",
                description: "Сладкие манго из Таиланда",
                price: "89 ₽",
                image: "/img/9dc2a841-50ea-4eaa-9cf3-f6fa6204c27e.jpg"
              },
              {
                title: "Сыр Пармезан",
                description: "Выдержанный пармезан 24 месяца",
                price: "1290 ₽",
                image: "/placeholder.svg"
              }
            ].map((product, index) => (
              <Card key={index} className="border-gray-100 hover:shadow-md transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-lg font-medium text-black mb-2">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-black">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" variant="outline">
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={24} className="text-white" />
              </div>
              <h4 className="text-xl font-medium text-black mb-2">Быстрая доставка</h4>
              <p className="text-gray-600">Доставляем заказы в течение 2-3 часов по Москве</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShieldCheck" size={24} className="text-white" />
              </div>
              <h4 className="text-xl font-medium text-black mb-2">Качество</h4>
              <p className="text-gray-600">Только свежие продукты от проверенных поставщиков</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" size={24} className="text-white" />
              </div>
              <h4 className="text-xl font-medium text-black mb-2">Удобная оплата</h4>
              <p className="text-gray-600">Принимаем карты, наличные и электронные платежи</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-xl font-semibold mb-4">FreshMarket</h5>
              <p className="text-gray-300 text-sm">
                Свежие продукты высокого качества с доставкой по всей Москве
              </p>
            </div>
            <div>
              <h6 className="font-medium mb-4">Каталог</h6>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Фрукты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Овощи</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Мясо и рыба</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Молочные продукты</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium mb-4">Компания</h6>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium mb-4">Контакты</h6>
              <div className="space-y-2 text-sm text-gray-300">
                <p>+7 (495) 123-45-67</p>
                <p>info@freshmarket.ru</p>
                <div className="flex space-x-4 mt-4">
                  <Icon name="Instagram" size={20} className="text-gray-300 hover:text-white cursor-pointer" />
                  <Icon name="Facebook" size={20} className="text-gray-300 hover:text-white cursor-pointer" />
                  <Icon name="Twitter" size={20} className="text-gray-300 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 FreshMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}