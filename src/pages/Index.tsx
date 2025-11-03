import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  color: string;
  size: string;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Beauty Serum',
    price: 2499,
    category: 'Косметика',
    image: 'https://cdn.poehali.dev/projects/5e83ee42-da38-4b03-9a27-374e8a69af60/files/99d87dc2-bec8-4f85-af57-4151923c3692.jpg',
    color: 'Фиолетовый',
    size: '50мл',
    inStock: true,
  },
  {
    id: 2,
    name: 'Wireless Headphones Pro',
    price: 8999,
    category: 'Электроника',
    image: 'https://cdn.poehali.dev/projects/5e83ee42-da38-4b03-9a27-374e8a69af60/files/041c4c46-876b-498e-90cf-7847b01ea0f3.jpg',
    color: 'Оранжевый',
    size: 'Universal',
    inStock: true,
  },
  {
    id: 3,
    name: 'Sport Sneakers Limited',
    price: 5499,
    category: 'Обувь',
    image: 'https://cdn.poehali.dev/projects/5e83ee42-da38-4b03-9a27-374e8a69af60/files/340814d0-74a2-4f5f-9948-e3af50624b1a.jpg',
    color: 'Розовый',
    size: '42',
    inStock: true,
  },
  {
    id: 4,
    name: 'Organic Face Cream',
    price: 1899,
    category: 'Косметика',
    image: 'https://cdn.poehali.dev/projects/5e83ee42-da38-4b03-9a27-374e8a69af60/files/99d87dc2-bec8-4f85-af57-4151923c3692.jpg',
    color: 'Белый',
    size: '100мл',
    inStock: false,
  },
  {
    id: 5,
    name: 'Smart Watch Elite',
    price: 12999,
    category: 'Электроника',
    image: 'https://cdn.poehali.dev/projects/5e83ee42-da38-4b03-9a27-374e8a69af60/files/041c4c46-876b-498e-90cf-7847b01ea0f3.jpg',
    color: 'Черный',
    size: 'Universal',
    inStock: true,
  },
  {
    id: 6,
    name: 'Running Shoes Max',
    price: 6799,
    category: 'Обувь',
    image: 'https://cdn.poehali.dev/projects/5e83ee42-da38-4b03-9a27-374e8a69af60/files/340814d0-74a2-4f5f-9948-e3af50624b1a.jpg',
    color: 'Синий',
    size: '40',
    inStock: true,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [priceRange, setPriceRange] = useState<number[]>([0, 15000]);
  const [selectedColor, setSelectedColor] = useState<string>('Все');
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const categories = ['Все', 'Косметика', 'Электроника', 'Обувь'];
  const colors = ['Все', 'Фиолетовый', 'Оранжевый', 'Розовый', 'Белый', 'Черный', 'Синий'];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesColor = selectedColor === 'Все' || product.color === selectedColor;
      return matchesSearch && matchesCategory && matchesPrice && matchesColor;
    });
  }, [searchQuery, selectedCategory, priceRange, selectedColor]);

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Хай Молли
            </h1>
            <nav className="hidden md:flex gap-6">
              <button onClick={() => setActiveSection('home')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
              <button onClick={() => setActiveSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => setActiveSection('about')} className="text-sm font-medium hover:text-primary transition-colors">О нас</button>
              <button onClick={() => setActiveSection('delivery')} className="text-sm font-medium hover:text-primary transition-colors">Доставка</button>
              <button onClick={() => setActiveSection('blog')} className="text-sm font-medium hover:text-primary transition-colors">Блог</button>
              <button onClick={() => setActiveSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">Контакты</button>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-secondary">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item) => {
                        const product = products.find((p) => p.id === item.id);
                        if (!product) return null;
                        return (
                          <div key={item.id} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">Количество: {item.quantity}</p>
                              <p className="font-bold text-primary mt-1">{product.price * item.quantity} ₽</p>
                            </div>
                          </div>
                        );
                      })}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span className="text-primary">{cartTotal} ₽</span>
                        </div>
                        <Button className="w-full mt-4" size="lg">Оформить заказ</Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {activeSection === 'home' && (
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
                Креативный шопинг <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  нового уровня
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Откройте мир уникальных товаров с интеллектуальной системой поиска и фильтрации
              </p>
              <Button size="lg" className="text-lg px-8" onClick={() => setActiveSection('catalog')}>
                Перейти в каталог
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>
          </div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
        </section>
      )}

      {activeSection === 'catalog' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Каталог товаров</h2>
            
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Icon name="Search" size={20} />
                    Поиск
                  </h3>
                  <Input
                    placeholder="Найти товар..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </Card>

                <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Icon name="Layers" size={20} />
                    Категория
                  </h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                          selectedCategory === cat
                            ? 'bg-primary text-white font-medium'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Icon name="DollarSign" size={20} />
                    Цена
                  </h3>
                  <div className="space-y-4">
                    <Slider
                      min={0}
                      max={15000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span>{priceRange[0]} ₽</span>
                      <span>{priceRange[1]} ₽</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-100">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Icon name="Palette" size={20} />
                    Цвет
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          selectedColor === color
                            ? 'bg-secondary text-white font-medium'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    Найдено товаров: <span className="font-bold text-foreground">{filteredProducts.length}</span>
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <Card
                      key={product.id}
                      className="group overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:shadow-xl animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {!product.inStock && (
                          <Badge className="absolute top-2 right-2 bg-destructive">Нет в наличии</Badge>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-2">{product.category}</Badge>
                        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                        </div>
                        <div className="flex gap-2 text-sm text-muted-foreground mb-4">
                          <span>Цвет: {product.color}</span>
                          <span>•</span>
                          <span>{product.size}</span>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => addToCart(product.id)}
                          disabled={!product.inStock}
                        >
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-20">
                    <Icon name="PackageX" size={64} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Товары не найдены</h3>
                    <p className="text-muted-foreground">Попробуйте изменить параметры фильтрации</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">О компании</h2>
            <Card className="p-8">
              <p className="text-lg leading-relaxed mb-4">
                <strong>ООО "Хай Молли"</strong> — это современный интернет-магазин с уникальным подходом к онлайн-шопингу.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Мы создали креативное пространство, где каждый найдёт что-то особенное. Наша миссия — сделать покупки простыми, быстрыми и приятными благодаря интеллектуальной системе поиска.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Мы тщательно отбираем товары и работаем только с проверенными поставщиками, чтобы гарантировать высокое качество каждой покупки.
              </p>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'delivery' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Доставка и оплата</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <Icon name="Truck" size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Доставка</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Курьером по Москве — 300 ₽</li>
                  <li>• Бесплатно от 3000 ₽</li>
                  <li>• Доставка по России — СДЭК</li>
                  <li>• Самовывоз из пункта выдачи</li>
                </ul>
              </Card>
              <Card className="p-6">
                <Icon name="CreditCard" size={32} className="text-secondary mb-4" />
                <h3 className="text-xl font-bold mb-3">Оплата</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Банковские карты онлайн</li>
                  <li>• Оплата при получении</li>
                  <li>• Электронные кошельки</li>
                  <li>• Банковский перевод</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'blog' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Блог</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                  <CardContent className="p-6">
                    <Badge className="mb-2">Новости</Badge>
                    <h3 className="font-bold text-lg mb-2">Статья блога #{i}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Интересная информация о наших товарах и новинках магазина...
                    </p>
                    <Button variant="outline" size="sm">Читать далее</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center">Контакты</h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Адрес</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@himolly.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Режим работы</h3>
                    <p className="text-muted-foreground">Пн-Пт: 10:00 - 20:00<br />Сб-Вс: 11:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      <footer className="bg-foreground/5 border-t mt-20 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Хай Молли
          </h3>
          <p className="text-muted-foreground mb-4">
            Креативный интернет-магазин для современных покупателей
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 ООО "Хай Молли". Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
