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

/* ── Palette (VELORA × Water's Edge) ─────────────────── */
const C = {
  plum:    '#3f3740',
  slate:   '#6a8599',
  sage:    '#808b6a',
  mauve:   '#c5a290',
  blush:   '#edc8c1',
  linen:   '#ecd8d4',
  cream:   '#faf6f4',
};

const HERO = 'https://cdn.poehali.dev/projects/59aafcac-bf0d-423d-8f27-b694028f6b8b/bucket/078eb374-ae25-41b5-acea-e6598f8d00cc.JPG';
const MOODBOARD = 'https://cdn.poehali.dev/projects/59aafcac-bf0d-423d-8f27-b694028f6b8b/bucket/d885112d-f854-4172-bc9f-18059ed325d6.jpg';

type Screen = 'home' | 'diagnostic' | 'result' | 'catalog' | 'consult' | 'compose' | 'club' | 'reviews' | 'faq';
const PROMO: Record<string, number> = { SEBO10: 0.1, SEBO20: 0.2, CLUB: 0.15 };

/* ── Organic blob background ──────────────────────────── */
const Blobs = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-40 blur-3xl"
         style={{ background: C.blush }} />
    <div className="absolute top-1/3 -left-20 h-64 w-64 rounded-full opacity-25 blur-3xl"
         style={{ background: C.sage }} />
    <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full opacity-20 blur-3xl"
         style={{ background: C.slate }} />
  </div>
);

/* ── Glass card ───────────────────────────────────────── */
const Glass = ({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div
    className={`backdrop-blur-md border ${className}`}
    style={{ background: 'rgba(255,255,255,0.55)', borderColor: 'rgba(197,162,144,0.25)', ...style }}
  >
    {children}
  </div>
);

/* ── Dot motif (молекулярный акцент) ─────────────────── */
const Dots = ({ color = C.mauve }: { color?: string }) => (
  <div className="flex gap-1.5 items-center">
    {[1, 2, 3].map(i => (
      <span key={i} className="rounded-full" style={{ width: 5 + i * 2, height: 5 + i * 2, background: color, opacity: 0.4 + i * 0.15 }} />
    ))}
  </div>
);

const Index = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<Problem, number>>({ hairloss: 0, dandruff: 0, oily: 0, dry: 0, volume: 0 });
  const [cart, setCart] = useState<Record<string, number>>({});
  const [promo, setPromo] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<number>(0);
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = useMemo(() =>
    Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = products.find(x => x.id === id);
      return sum + (p ? p.price * qty : 0);
    }, 0), [cart]);
  const total = Math.round(subtotal * (1 - appliedPromo));

  const addToCart = (id: string) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const changeQty = (id: string, d: number) => setCart(c => {
    const q = (c[id] || 0) + d;
    const next = { ...c };
    if (q <= 0) delete next[id]; else next[id] = q;
    return next;
  });

  const topProblem = (Object.entries(scores) as [Problem, number][]).sort((a, b) => b[1] - a[1])[0];
  const recommended = products.filter(p => p.problems.includes(topProblem?.[0]));

  const answer = (problem?: Problem) => {
    if (problem) setScores(s => ({ ...s, [problem]: s[problem] + 1 }));
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

  const menu: { id: Screen; label: string; icon: string; sub: string }[] = [
    { id: 'diagnostic', label: 'Диагностика',    icon: 'Stethoscope',        sub: 'Тест кожи головы' },
    { id: 'compose',    label: 'Подбор ухода',   icon: 'Sparkles',           sub: 'По вашей проблеме' },
    { id: 'catalog',    label: 'Каталог',         icon: 'Package',            sub: 'Все линейки' },
    { id: 'consult',    label: 'Консультация',    icon: 'MessageCircleHeart', sub: 'Как применять' },
    { id: 'reviews',    label: 'Отзывы',          icon: 'Star',               sub: 'Реальные истории' },
    { id: 'faq',        label: 'Вопросы',         icon: 'HelpCircle',         sub: 'Частые ответы' },
    { id: 'club',       label: 'Клуб SEBO',       icon: 'Crown',              sub: 'Скидки и бонусы' },
  ];

  return (
    <div className="min-h-screen" style={{ background: C.cream }}>
      <Blobs />
      <div className="mx-auto max-w-md min-h-screen relative pb-12">

        {/* ── Top bar ── */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 backdrop-blur-xl"
                style={{ background: 'rgba(250,246,244,0.80)', borderBottom: `1px solid ${C.linen}` }}>
          <button onClick={() => setScreen('home')}
                  className="font-display text-2xl font-semibold italic tracking-tight"
                  style={{ color: C.plum }}>
            Seboradin
          </button>
          <div className="flex items-center gap-2.5">
            <button className="h-9 w-9 rounded-full grid place-items-center"
                    style={{ background: C.linen }}>
              <Icon name="User" size={18} style={{ color: C.plum }} />
            </button>
            <CartSheet cart={cart} cartCount={cartCount} subtotal={subtotal} total={total}
                       promo={promo} setPromo={setPromo} applyPromo={applyPromo}
                       appliedPromo={appliedPromo} changeQty={changeQty} />
          </div>
        </header>

        <main className="px-5">

          {/* ══ HOME ══ */}
          {screen === 'home' && (
            <div className="animate-fade-in">

              {/* Cinematic hero */}
              <section className="relative mt-4 rounded-[2rem] overflow-hidden" style={{ height: 320 }}>
                <img src={HERO} alt="Кожа головы" className="absolute inset-0 w-full h-full object-cover" />
                {/* многослойный градиент */}
                <div className="absolute inset-0"
                     style={{ background: `linear-gradient(160deg, transparent 30%, ${C.plum}cc 100%)` }} />
                {/* тонкий grain-эффект */}
                <div className="absolute inset-0 opacity-20"
                     style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundSize: '150px' }} />

                {/* Pill badge */}
                <div className="absolute top-5 left-5">
                  <Glass className="rounded-full px-3 py-1.5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.sage }} />
                    <span className="text-xs font-medium" style={{ color: C.plum }}>Трихология</span>
                  </Glass>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <Dots color={C.blush} />
                  <h1 className="font-display text-4xl font-semibold italic mt-2 leading-tight text-white">
                    Здоровье волос
                    <br />& кожи головы
                  </h1>
                  <p className="text-sm mt-1" style={{ color: `${C.linen}cc` }}>
                    Наука ухода — в вашем телефоне
                  </p>
                </div>
              </section>

              {/* CTA-кнопка */}
              <button
                onClick={startDiagnostic}
                className="w-full mt-4 h-14 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition active:scale-95 shadow-lg"
                style={{ background: C.plum, color: '#fff', boxShadow: `0 8px 30px ${C.plum}40` }}
              >
                <Icon name="Stethoscope" size={20} />
                Пройти диагностику
              </button>

              {/* Grid навигации — VELORA-стиль */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {menu.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => m.id === 'diagnostic' ? startDiagnostic() : setScreen(m.id)}
                    className="flex flex-col items-start gap-3 rounded-3xl p-4 text-left transition hover:-translate-y-0.5 active:scale-95"
                    style={{
                      background: i % 3 === 0 ? C.linen : i % 3 === 1 ? '#fff' : C.cream,
                      border: `1px solid ${C.linen}`,
                    }}
                  >
                    <span className="h-11 w-11 rounded-2xl grid place-items-center"
                          style={{ background: C.blush + '55' }}>
                      <Icon name={m.icon} size={22} style={{ color: C.plum }} />
                    </span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: C.plum }}>{m.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: C.mauve }}>{m.sub}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Атмосферный баннер — мудборд */}
              <div className="relative mt-4 rounded-3xl overflow-hidden" style={{ height: 180 }}>
                <img src={MOODBOARD} alt="SPA-эстетика" className="absolute inset-0 w-full h-full object-cover object-top" />
                <div className="absolute inset-0"
                     style={{ background: `linear-gradient(to right, ${C.plum}dd 0%, ${C.plum}66 60%, transparent 100%)` }} />
                <div className="absolute inset-0 flex items-center px-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: C.blush }}>Состав без секретов</p>
                    <p className="font-display text-2xl font-semibold italic text-white mt-1">
                      Каждый продукт —<br />прозрачная формула
                    </p>
                    <button
                      onClick={() => setScreen('catalog')}
                      className="mt-3 text-xs font-semibold px-4 py-2 rounded-full transition"
                      style={{ background: C.blush, color: C.plum }}
                    >
                      Смотреть составы →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ DIAGNOSTIC ══ */}
          {screen === 'diagnostic' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />

              {/* Progress */}
              <div className="mt-5 flex items-center justify-between text-xs" style={{ color: C.mauve }}>
                <span>Вопрос {step + 1} из {questions.length}</span>
                <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: C.linen }}>
                <div className="h-full rounded-full transition-all duration-500"
                     style={{ width: `${((step + 1) / questions.length) * 100}%`, background: `linear-gradient(90deg, ${C.mauve}, ${C.plum})` }} />
              </div>

              <Dots color={C.mauve} />
              <h2 className="font-display text-3xl font-semibold italic mt-3 leading-tight" style={{ color: C.plum }}>
                {questions[step].text}
              </h2>

              <div className="flex flex-col gap-3 mt-6">
                {questions[step].options.map((o, i) => (
                  <button
                    key={i}
                    onClick={() => answer(o.problem)}
                    className="w-full rounded-2xl p-4 text-left font-medium text-sm transition hover:-translate-y-0.5 active:scale-95"
                    style={{
                      background: '#fff',
                      border: `1.5px solid ${C.linen}`,
                      color: C.plum,
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.mauve; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.linen; }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ══ RESULT ══ */}
          {screen === 'result' && (
            <div className="animate-scale-in pt-6">
              <div className="rounded-3xl p-6 text-center"
                   style={{ background: `linear-gradient(135deg, ${C.blush}55, ${C.linen})`, border: `1px solid ${C.blush}` }}>
                <span className="text-5xl">🎯</span>
                <p className="text-xs uppercase tracking-widest font-semibold mt-3" style={{ color: C.mauve }}>Основная проблема</p>
                <h2 className="font-display text-3xl font-semibold italic mt-1" style={{ color: C.plum }}>
                  {problemLabels[topProblem[0]]}
                </h2>
              </div>

              <div className="flex items-center gap-2 mt-6 mb-3">
                <p className="font-semibold text-sm" style={{ color: C.plum }}>Рекомендованный комплект</p>
                <Dots color={C.mauve} />
              </div>

              <div className="flex flex-col gap-3">
                {recommended.map(p => (
                  <ProductRow key={p.id} p={p} onAdd={addToCart} onOpen={setOpenProduct} />
                ))}
              </div>

              <button
                onClick={() => { recommended.forEach(p => addToCart(p.id)); setScreen('catalog'); }}
                className="w-full mt-4 h-14 rounded-full font-semibold text-sm transition active:scale-95"
                style={{ background: C.plum, color: '#fff' }}
              >
                Добавить весь комплект
              </button>
              <button
                onClick={() => setScreen('catalog')}
                className="w-full mt-2 h-12 rounded-full font-medium text-sm transition"
                style={{ color: C.mauve }}
              >
                Изменить ассортимент →
              </button>
            </div>
          )}

          {/* ══ CATALOG ══ */}
          {screen === 'catalog' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <div className="flex items-center gap-2 mt-4 mb-1">
                <Dots color={C.mauve} />
              </div>
              <h2 className="font-display text-3xl font-semibold italic" style={{ color: C.plum }}>Каталог продукции</h2>
              <p className="text-xs mt-1 mb-5" style={{ color: C.mauve }}>Линейки и полный ассортимент</p>

              {lines.map(line => (
                <div key={line.id} className="mb-6">
                  <div className="rounded-3xl p-5 mb-3"
                       style={{ background: `linear-gradient(135deg, ${C.plum}, ${C.slate})`, color: '#fff' }}>
                    <span className="text-2xl">{line.emoji}</span>
                    <p className="font-display text-xl font-semibold italic mt-1">{line.name}</p>
                    <p className="text-xs mt-1 opacity-80">{line.description}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {products.filter(p => p.line === line.name).map(p => (
                      <ProductRow key={p.id} p={p} onAdd={addToCart} onOpen={setOpenProduct} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══ CONSULT ══ */}
          {screen === 'consult' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <Dots color={C.mauve} />
              <h2 className="font-display text-3xl font-semibold italic mt-2 mb-5" style={{ color: C.plum }}>Консультация</h2>
              <div className="flex flex-col gap-3">
                {consultations.map((c, i) => (
                  <Glass key={i} className="rounded-3xl p-5">
                    <p className="font-semibold text-sm" style={{ color: C.plum }}>{c.title}</p>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: C.mauve }}>{c.text}</p>
                  </Glass>
                ))}
              </div>
            </div>
          )}

          {/* ══ REVIEWS ══ */}
          {screen === 'reviews' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <Dots color={C.mauve} />
              <h2 className="font-display text-3xl font-semibold italic mt-2 mb-5" style={{ color: C.plum }}>Отзывы</h2>
              <div className="flex flex-col gap-3">
                {reviews.map((r, i) => (
                  <Glass key={i} className="rounded-3xl p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm" style={{ color: C.plum }}>{r.name}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Icon key={j} name="Star" size={13} style={{ color: C.mauve, fill: C.mauve }} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: '#666' }}>{r.text}</p>
                  </Glass>
                ))}
              </div>
            </div>
          )}

          {/* ══ FAQ ══ */}
          {screen === 'faq' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <Dots color={C.mauve} />
              <h2 className="font-display text-3xl font-semibold italic mt-2 mb-5" style={{ color: C.plum }}>Вопросы и ответы</h2>
              <Accordion type="single" collapsible className="flex flex-col gap-2">
                {faq.map((f, i) => (
                  <AccordionItem
                    key={i} value={`f${i}`}
                    className="rounded-2xl px-4"
                    style={{ background: '#fff', border: `1px solid ${C.linen}` }}
                  >
                    <AccordionTrigger className="text-left text-sm font-medium" style={{ color: C.plum }}>
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs leading-relaxed" style={{ color: C.mauve }}>
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* ══ COMPOSE ══ */}
          {screen === 'compose' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <Dots color={C.mauve} />
              <h2 className="font-display text-3xl font-semibold italic mt-2 mb-4" style={{ color: C.plum }}>Подбор ухода</h2>
              <button
                onClick={startDiagnostic}
                className="w-full h-14 rounded-full font-semibold text-sm mb-4 flex items-center justify-center gap-2"
                style={{ background: C.plum, color: '#fff' }}
              >
                <Icon name="Stethoscope" size={18} />
                Пройти тест
              </button>
              <div className="flex flex-col gap-3">
                {products.map(p => (
                  <ProductRow key={p.id} p={p} onAdd={addToCart} onOpen={setOpenProduct} />
                ))}
              </div>
            </div>
          )}

          {/* ══ CLUB ══ */}
          {screen === 'club' && (
            <div className="animate-fade-in pt-6">
              <BackBtn onClick={() => setScreen('home')} />
              <div className="mt-4 rounded-[2rem] p-8 text-center"
                   style={{ background: `linear-gradient(160deg, ${C.plum} 0%, ${C.slate} 100%)`, color: '#fff' }}>
                <span className="text-5xl">👑</span>
                <h2 className="font-display text-3xl font-semibold italic mt-3">Клуб SEBO</h2>
                <p className="text-xs mt-2 opacity-80">Скидки до 20%, ранний доступ к новинкам и персональные рекомендации трихолога.</p>
                <ul className="text-left text-xs mt-5 space-y-2.5">
                  {['Промокод CLUB на 15% скидку', 'Бесплатная консультация', 'Подарки в заказах', 'Закрытые акции'].map(t => (
                    <li key={t} className="flex items-center gap-2 opacity-90">
                      <Icon name="Check" size={14} /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="w-full mt-4 h-14 rounded-full font-semibold text-sm transition active:scale-95"
                style={{ background: C.blush, color: C.plum }}
              >
                Вступить в клуб
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ── Product Sheet ── */}
      <Sheet open={!!openProduct} onOpenChange={o => !o && setOpenProduct(null)}>
        <SheetContent side="bottom" className="rounded-t-[2rem] max-w-md mx-auto max-h-[88vh] overflow-y-auto"
                      style={{ background: C.cream, border: `1px solid ${C.linen}` }}>
          {openProduct && (
            <div className="pb-6">
              <div className="h-36 rounded-3xl grid place-items-center text-6xl mb-5"
                   style={{ background: `linear-gradient(135deg, ${C.blush}55, ${C.linen})` }}>
                {openProduct.emoji}
              </div>
              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: C.mauve }}>
                {openProduct.line}
              </p>
              <h3 className="font-display text-3xl font-semibold italic mt-1" style={{ color: C.plum }}>
                {openProduct.name}
              </h3>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: '#666' }}>{openProduct.description}</p>

              <InfoSection title="Разбор состава" icon="FlaskConical">{openProduct.ingredients}</InfoSection>
              <InfoSection title="Как применять" icon="Info">{openProduct.usage}</InfoSection>

              <div className="flex items-center justify-between mt-6">
                <span className="font-display text-3xl font-bold" style={{ color: C.plum }}>
                  {openProduct.price} ₽
                </span>
                <button
                  onClick={() => { addToCart(openProduct.id); setOpenProduct(null); }}
                  className="rounded-full h-12 px-7 font-semibold text-sm transition active:scale-95"
                  style={{ background: C.plum, color: '#fff' }}
                >
                  В корзину
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

/* ── Helpers ───────────────────────────────────────────── */

const BackBtn = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="flex items-center gap-1 text-xs font-medium" style={{ color: C.mauve }}>
    <Icon name="ChevronLeft" size={16} /> На главную
  </button>
);

const InfoSection = ({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) => (
  <div className="mt-4 rounded-2xl p-4" style={{ background: `${C.linen}55`, border: `1px solid ${C.linen}` }}>
    <p className="flex items-center gap-2 text-xs font-semibold" style={{ color: C.plum }}>
      <Icon name={icon} size={14} style={{ color: C.mauve }} /> {title}
    </p>
    <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#666' }}>{children}</p>
  </div>
);

const ProductRow = ({ p, onAdd, onOpen }: { p: Product; onAdd: (id: string) => void; onOpen: (p: Product) => void }) => (
  <div className="flex items-center gap-3 rounded-3xl p-3 transition hover:-translate-y-0.5"
       style={{ background: '#fff', border: `1px solid ${C.linen}` }}>
    <button onClick={() => onOpen(p)}
            className="h-16 w-16 shrink-0 rounded-2xl grid place-items-center text-3xl"
            style={{ background: `linear-gradient(135deg, ${C.blush}33, ${C.linen})` }}>
      {p.emoji}
    </button>
    <button onClick={() => onOpen(p)} className="flex-1 text-left">
      <p className="text-xs" style={{ color: C.mauve }}>{p.type}</p>
      <p className="font-medium text-sm leading-tight" style={{ color: C.plum }}>{p.name}</p>
      <p className="font-display text-lg font-bold mt-0.5" style={{ color: C.plum }}>{p.price} ₽</p>
    </button>
    <button
      onClick={() => onAdd(p.id)}
      className="h-10 w-10 shrink-0 rounded-full grid place-items-center transition active:scale-90"
      style={{ background: C.plum, color: '#fff' }}
    >
      <Icon name="Plus" size={18} />
    </button>
  </div>
);

const CartSheet = ({ cart, cartCount, subtotal, total, promo, setPromo, applyPromo, appliedPromo, changeQty }: {
  cart: Record<string, number>; cartCount: number; subtotal: number; total: number;
  promo: string; setPromo: (v: string) => void; applyPromo: () => void;
  appliedPromo: number; changeQty: (id: string, d: number) => void;
}) => (
  <Sheet>
    <SheetTrigger asChild>
      <button className="relative h-9 w-9 rounded-full grid place-items-center transition"
              style={{ background: C.plum, color: '#fff' }}>
        <Icon name="ShoppingBag" size={18} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4.5 min-w-4.5 px-1 rounded-full text-[10px] font-bold grid place-items-center"
                style={{ background: C.mauve, color: '#fff', minWidth: 18, height: 18 }}>
            {cartCount}
          </span>
        )}
      </button>
    </SheetTrigger>
    <SheetContent className="w-full max-w-md flex flex-col" style={{ background: C.cream, border: `1px solid ${C.linen}` }}>
      <SheetHeader>
        <SheetTitle className="font-display text-2xl font-semibold italic" style={{ color: C.plum }}>Корзина</SheetTitle>
      </SheetHeader>
      {Object.entries(cart).length === 0 ? (
        <div className="flex-1 grid place-items-center" style={{ color: C.mauve }}>
          <div className="text-center">
            <span className="text-5xl">🛍️</span>
            <p className="mt-2 text-sm">Корзина пуста</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 mt-4">
            {Object.entries(cart).map(([id, qty]) => {
              const p = products.find(x => x.id === id)!;
              return (
                <div key={id} className="flex items-center gap-3 rounded-2xl p-3"
                     style={{ background: `${C.linen}66` }}>
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="flex-1">
                    <p className="text-xs font-medium" style={{ color: C.plum }}>{p.name}</p>
                    <p className="text-xs" style={{ color: C.mauve }}>{p.price} ₽</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => changeQty(id, -1)}
                            className="h-7 w-7 rounded-full grid place-items-center"
                            style={{ background: '#fff', border: `1px solid ${C.linen}` }}>
                      <Icon name="Minus" size={12} />
                    </button>
                    <span className="w-4 text-center text-sm font-medium" style={{ color: C.plum }}>{qty}</span>
                    <button onClick={() => changeQty(id, 1)}
                            className="h-7 w-7 rounded-full grid place-items-center"
                            style={{ background: '#fff', border: `1px solid ${C.linen}` }}>
                      <Icon name="Plus" size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pt-4 mt-2" style={{ borderTop: `1px solid ${C.linen}` }}>
            <div className="flex gap-2">
              <Input placeholder="Промокод (SEBO10)" value={promo}
                     onChange={e => setPromo(e.target.value)}
                     className="rounded-full text-sm" style={{ borderColor: C.linen }} />
              <Button onClick={applyPromo} variant="secondary" className="rounded-full text-sm">
                Применить
              </Button>
            </div>
            {appliedPromo > 0 && (
              <p className="text-xs mt-2 font-medium" style={{ color: C.sage }}>
                Скидка {appliedPromo * 100}% применена ✓
              </p>
            )}
            <div className="flex justify-between mt-4 text-xs" style={{ color: C.mauve }}>
              <span>Сумма</span><span>{subtotal} ₽</span>
            </div>
            <div className="flex justify-between mt-1 items-end">
              <span className="font-semibold text-sm" style={{ color: C.plum }}>Итого</span>
              <span className="font-display text-3xl font-bold" style={{ color: C.plum }}>{total} ₽</span>
            </div>
            <button className="w-full mt-4 h-14 rounded-full font-semibold text-sm transition active:scale-95"
                    style={{ background: C.plum, color: '#fff' }}>
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </SheetContent>
  </Sheet>
);

export default Index;