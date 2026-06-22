import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import {
  products,
  lines,
  questions,
  problemLabels,
  reviews,
  faq,
  consultations,
  type Problem,
  type Product,
} from '@/data/sebo';

const HERO = 'https://cdn.poehali.dev/projects/59aafcac-bf0d-423d-8f27-b694028f6b8b/files/dcb5a2f6-1cec-4bab-8c46-4dc1b30adf2b.jpg';

type Screen =
  | 'home'
  | 'diagnostic'
  | 'result'
  | 'catalog'
  | 'consult'
  | 'compose'
  | 'club'
  | 'reviews'
  | 'faq';

const PROMO: Record<string, number> = { SEBO10: 0.1, SEBO20: 0.2, CLUB: 0.15 };

const Index = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<Problem, number>>({
    hairloss: 0,
    dandruff: 0,
    oily: 0,
    dry: 0,
    volume: 0,
  });
  const [cart, setCart] = useState<Record<string, number>>({});
  const [promo, setPromo] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<number>(0);
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = useMemo(
    () =>
      Object.entries(cart).reduce((sum, [id, qty]) => {
        const p = products.find((x) => x.id === id);
        return sum + (p ? p.price * qty : 0);
      }, 0),
    [cart],
  );
  const total = Math.round(subtotal * (1 - appliedPromo));

  const addToCart = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const changeQty = (id: string, d: number) =>
    setCart((c) => {
      const q = (c[id] || 0) + d;
      const next = { ...c };
      if (q <= 0) delete next[id];
      else next[id] = q;
      return next;
    });

  const topProblem = (Object.entries(scores) as [Problem, number][]).sort(
    (a, b) => b[1] - a[1],
  )[0];
  const recommended = products.filter((p) =>
    p.problems.includes(topProblem?.[0]),
  );

  const answer = (problem?: Problem) => {
    if (problem) setScores((s) => ({ ...s, [problem]: s[problem] + 1 }));
    if (step + 1 < questions.length) setStep(step + 1);
    else setScreen('result');
  };

  const startDiagnostic = () => {
    setStep(0);
    setScores({ hairloss: 0, dandruff: 0, oily: 0, dry: 0, volume: 0 });
    setScreen('diagnostic');
  };

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    setAppliedPromo(PROMO[code] || 0);
  };

  const menu: { id: Screen; label: string; icon: string }[] = [
    { id: 'diagnostic', label: 'Диагностика', icon: 'Stethoscope' },
    { id: 'compose', label: 'Подбор ухода', icon: 'Sparkles' },
    { id: 'catalog', label: 'Каталог продукции', icon: 'Package' },
    { id: 'consult', label: 'Консультация', icon: 'MessageCircleHeart' },
    { id: 'reviews', label: 'Отзывы', icon: 'Star' },
    { id: 'faq', label: 'Вопросы и ответы', icon: 'HelpCircle' },
    { id: 'club', label: 'Клуб SEBO', icon: 'Crown' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md min-h-screen bg-background relative pb-10">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-background/80 backdrop-blur-md border-b border-border">
          <button
            onClick={() => setScreen('home')}
            className="font-display text-2xl font-bold tracking-tight text-primary"
          >
            Seboradin
          </button>
          <div className="flex items-center gap-3">
            <button className="h-10 w-10 rounded-full bg-secondary grid place-items-center text-secondary-foreground">
              <Icon name="User" size={20} />
            </button>
            <CartSheet
              cart={cart}
              cartCount={cartCount}
              subtotal={subtotal}
              total={total}
              promo={promo}
              setPromo={setPromo}
              applyPromo={applyPromo}
              appliedPromo={appliedPromo}
              changeQty={changeQty}
            />
          </div>
        </header>

        <main className="px-5">
          {screen === 'home' && (
            <div className="animate-fade-in">
              <section className="relative mt-4 rounded-[2rem] overflow-hidden">
                <img src={HERO} alt="Кожа головы" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-sm font-medium text-primary uppercase tracking-widest">
                    Трихология
                  </p>
                  <h1 className="font-display text-4xl font-bold leading-tight text-foreground">
                    Здоровье ваших
                    <br />
                    волос и кожи головы
                  </h1>
                </div>
              </section>

              <Button
                onClick={startDiagnostic}
                className="w-full mt-5 h-14 rounded-full text-base font-semibold shadow-lg shadow-primary/20"
              >
                <Icon name="Stethoscope" size={20} className="mr-2" />
                Пройти диагностику
              </Button>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {menu.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      if (m.id === 'diagnostic') startDiagnostic();
                      else setScreen(m.id);
                    }}
                    className="flex flex-col items-start gap-3 rounded-3xl bg-card border border-border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                  >
                    <span className="h-11 w-11 rounded-2xl bg-secondary grid place-items-center text-primary">
                      <Icon name={m.icon} size={22} />
                    </span>
                    <span className="font-medium text-sm leading-tight text-card-foreground">
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-primary p-5 text-primary-foreground">
                <p className="font-display text-2xl font-bold">Состав без секретов</p>
                <p className="text-sm opacity-90 mt-1">
                  Каждый продукт — это прозрачный разбор активных компонентов.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => setScreen('catalog')}
                  className="mt-4 rounded-full"
                >
                  Смотреть составы
                </Button>
              </div>
            </div>
          )}

          {screen === 'diagnostic' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Вопрос {step + 1} из {questions.length}
                </span>
                <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>
              <h2 className="font-display text-3xl font-semibold mt-6 leading-tight text-foreground">
                {questions[step].text}
              </h2>
              <div className="flex flex-col gap-3 mt-6">
                {questions[step].options.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => answer(o.problem)}
                    className="w-full rounded-2xl border-2 border-border bg-card p-4 text-left font-medium text-card-foreground transition hover:border-primary hover:bg-secondary active:scale-95"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {screen === 'result' && (
            <div className="animate-scale-in pt-6">
              <div className="rounded-3xl bg-accent/15 border border-accent/30 p-6 text-center">
                <span className="text-4xl">🎯</span>
                <p className="text-sm text-muted-foreground mt-2">Ваша основная проблема</p>
                <h2 className="font-display text-3xl font-bold text-foreground mt-1">
                  {problemLabels[topProblem[0]]}
                </h2>
              </div>
              <h3 className="font-display text-2xl font-semibold mt-6 text-foreground">
                Рекомендованный комплект
              </h3>
              <div className="flex flex-col gap-3 mt-3">
                {recommended.map((p) => (
                  <ProductRow key={p.id} p={p} onAdd={addToCart} onOpen={setOpenProduct} />
                ))}
              </div>
              <Button
                onClick={() => {
                  recommended.forEach((p) => addToCart(p.id));
                  setScreen('catalog');
                }}
                className="w-full mt-4 h-13 rounded-full h-14 font-semibold"
              >
                Добавить весь комплект в корзину
              </Button>
              <Button
                variant="ghost"
                onClick={() => setScreen('catalog')}
                className="w-full mt-2 rounded-full"
              >
                Изменить ассортимент вручную
              </Button>
            </div>
          )}

          {screen === 'catalog' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <h2 className="font-display text-3xl font-bold mt-3 text-foreground">
                Каталог продукции
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Линии продуктов и полный ассортимент
              </p>
              {lines.map((line) => (
                <div key={line.id} className="mb-6">
                  <div
                    className="rounded-3xl p-5 text-white mb-3"
                    style={{ backgroundColor: `hsl(${line.color})` }}
                  >
                    <span className="text-2xl">{line.emoji}</span>
                    <p className="font-display text-2xl font-bold mt-1">{line.name}</p>
                    <p className="text-sm opacity-90 mt-1">{line.description}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {products
                      .filter((p) => p.line === line.name)
                      .map((p) => (
                        <ProductRow
                          key={p.id}
                          p={p}
                          onAdd={addToCart}
                          onOpen={setOpenProduct}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {screen === 'consult' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <h2 className="font-display text-3xl font-bold mt-3 text-foreground">
                Консультация по применению
              </h2>
              <div className="flex flex-col gap-3 mt-4">
                {consultations.map((c, i) => (
                  <div key={i} className="rounded-3xl bg-card border border-border p-5">
                    <p className="font-semibold text-card-foreground">{c.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {screen === 'reviews' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <h2 className="font-display text-3xl font-bold mt-3 text-foreground">
                Отзывы на продукцию
              </h2>
              <div className="flex flex-col gap-3 mt-4">
                {reviews.map((r, i) => (
                  <div key={i} className="rounded-3xl bg-card border border-border p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-card-foreground">{r.name}</p>
                      <div className="flex gap-0.5 text-accent">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Icon key={j} name="Star" size={14} className="fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {screen === 'faq' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <h2 className="font-display text-3xl font-bold mt-3 mb-4 text-foreground">
                Вопросы и ответы
              </h2>
              <Accordion type="single" collapsible className="flex flex-col gap-2">
                {faq.map((f, i) => (
                  <AccordionItem
                    key={i}
                    value={`f${i}`}
                    className="rounded-2xl bg-card border border-border px-4"
                  >
                    <AccordionTrigger className="text-left font-medium text-card-foreground">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {screen === 'compose' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <h2 className="font-display text-3xl font-bold mt-3 text-foreground">
                Подбор ухода
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Пройдите диагностику или соберите комплект вручную
              </p>
              <Button onClick={startDiagnostic} className="w-full h-14 rounded-full font-semibold">
                <Icon name="Stethoscope" size={20} className="mr-2" />
                Пройти тест
              </Button>
              <div className="flex flex-col gap-3 mt-4">
                {products.map((p) => (
                  <ProductRow key={p.id} p={p} onAdd={addToCart} onOpen={setOpenProduct} />
                ))}
              </div>
            </div>
          )}

          {screen === 'club' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <div className="mt-4 rounded-[2rem] bg-primary p-7 text-primary-foreground text-center">
                <span className="text-5xl">👑</span>
                <h2 className="font-display text-3xl font-bold mt-3">Клуб SEBO</h2>
                <p className="text-sm opacity-90 mt-2">
                  Скидки до 20%, ранний доступ к новинкам и персональные рекомендации трихолога.
                </p>
                <ul className="text-left text-sm mt-5 space-y-2">
                  {['Промокод CLUB на 15% скидку', 'Бесплатная консультация', 'Подарки в заказах', 'Закрытые акции'].map(
                    (t) => (
                      <li key={t} className="flex items-center gap-2">
                        <Icon name="Check" size={16} /> {t}
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <Button className="w-full mt-4 h-14 rounded-full font-semibold">
                Вступить в клуб
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* Product details */}
      <Sheet open={!!openProduct} onOpenChange={(o) => !o && setOpenProduct(null)}>
        <SheetContent side="bottom" className="rounded-t-[2rem] max-w-md mx-auto max-h-[85vh] overflow-y-auto">
          {openProduct && (
            <div className="pb-4">
              <div className="h-32 rounded-3xl bg-secondary grid place-items-center text-6xl mb-4">
                {openProduct.emoji}
              </div>
              <p className="text-xs uppercase tracking-widest text-primary">
                {openProduct.line}
              </p>
              <h3 className="font-display text-3xl font-bold text-foreground">
                {openProduct.name}
              </h3>
              <p className="text-muted-foreground mt-2">{openProduct.description}</p>

              <Section title="Разбор состава" icon="FlaskConical">
                {openProduct.ingredients}
              </Section>
              <Section title="Как применять" icon="Info">
                {openProduct.usage}
              </Section>

              <div className="flex items-center justify-between mt-5">
                <span className="font-display text-3xl font-bold text-foreground">
                  {openProduct.price} ₽
                </span>
                <Button
                  onClick={() => {
                    addToCart(openProduct.id);
                    setOpenProduct(null);
                  }}
                  className="rounded-full h-12 px-6 font-semibold"
                >
                  В корзину
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

const BackBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 text-sm font-medium text-muted-foreground"
  >
    <Icon name="ChevronLeft" size={18} /> На главную
  </button>
);

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) => (
  <div className="mt-4 rounded-2xl bg-secondary/50 p-4">
    <p className="flex items-center gap-2 font-semibold text-foreground">
      <Icon name={icon} size={16} className="text-primary" /> {title}
    </p>
    <p className="text-sm text-muted-foreground mt-1">{children}</p>
  </div>
);

const ProductRow = ({
  p,
  onAdd,
  onOpen,
}: {
  p: Product;
  onAdd: (id: string) => void;
  onOpen: (p: Product) => void;
}) => (
  <div className="flex items-center gap-3 rounded-3xl bg-card border border-border p-3">
    <button
      onClick={() => onOpen(p)}
      className="h-16 w-16 shrink-0 rounded-2xl bg-secondary grid place-items-center text-3xl"
    >
      {p.emoji}
    </button>
    <button onClick={() => onOpen(p)} className="flex-1 text-left">
      <p className="text-xs text-muted-foreground">{p.type}</p>
      <p className="font-medium text-sm leading-tight text-card-foreground">{p.name}</p>
      <p className="font-display text-lg font-bold text-foreground">{p.price} ₽</p>
    </button>
    <button
      onClick={() => onAdd(p.id)}
      className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center active:scale-90 transition"
    >
      <Icon name="Plus" size={20} />
    </button>
  </div>
);

const CartSheet = ({
  cart,
  cartCount,
  subtotal,
  total,
  promo,
  setPromo,
  applyPromo,
  appliedPromo,
  changeQty,
}: {
  cart: Record<string, number>;
  cartCount: number;
  subtotal: number;
  total: number;
  promo: string;
  setPromo: (v: string) => void;
  applyPromo: () => void;
  appliedPromo: number;
  changeQty: (id: string, d: number) => void;
}) => {
  const items = Object.entries(cart);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center">
          <Icon name="ShoppingBag" size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-accent text-accent-foreground text-xs font-bold grid place-items-center">
              {cartCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Корзина</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center text-muted-foreground">
            <div className="text-center">
              <span className="text-5xl">🛍️</span>
              <p className="mt-2">Корзина пуста</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 mt-4">
              {items.map(([id, qty]) => {
                const p = products.find((x) => x.id === id)!;
                return (
                  <div
                    key={id}
                    className="flex items-center gap-3 rounded-2xl bg-secondary/40 p-3"
                  >
                    <span className="text-2xl">{p.emoji}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-tight">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.price} ₽</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(id, -1)}
                        className="h-7 w-7 rounded-full bg-card border border-border grid place-items-center"
                      >
                        <Icon name="Minus" size={14} />
                      </button>
                      <span className="w-5 text-center font-medium">{qty}</span>
                      <button
                        onClick={() => changeQty(id, 1)}
                        className="h-7 w-7 rounded-full bg-card border border-border grid place-items-center"
                      >
                        <Icon name="Plus" size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-border pt-4 mt-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Промокод (SEBO10)"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  className="rounded-full"
                />
                <Button onClick={applyPromo} variant="secondary" className="rounded-full">
                  Применить
                </Button>
              </div>
              {appliedPromo > 0 && (
                <p className="text-sm text-accent mt-2 font-medium">
                  Скидка {appliedPromo * 100}% применена ✓
                </p>
              )}
              <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                <span>Сумма</span>
                <span>{subtotal} ₽</span>
              </div>
              <div className="flex justify-between mt-1 items-end">
                <span className="font-semibold">Итого</span>
                <span className="font-display text-3xl font-bold text-primary">
                  {total} ₽
                </span>
              </div>
              <Button className="w-full mt-4 h-14 rounded-full font-semibold">
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Index;
