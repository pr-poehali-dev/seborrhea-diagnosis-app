import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const DOCTOR =
  'https://cdn.poehali.dev/projects/59aafcac-bf0d-423d-8f27-b694028f6b8b/files/dbc6b026-9fa1-47a4-a396-f617eb632b69.jpg';
const APP =
  'https://cdn.poehali.dev/projects/59aafcac-bf0d-423d-8f27-b694028f6b8b/files/58427fce-f0e2-4b03-871c-e02cf73ad989.jpg';
const MOODBOARD =
  'https://cdn.poehali.dev/projects/59aafcac-bf0d-423d-8f27-b694028f6b8b/bucket/9fd40e37-39d1-44aa-9abb-11e8281b0006.jpg';

const features = [
  { icon: 'IdCard',        title: 'Карточка пациента',    text: 'Вся история, фотографии и назначения в одном месте.' },
  { icon: 'Camera',        title: 'Фотофиксация',         text: 'Динамика «до / после» для наглядного контроля лечения.' },
  { icon: 'TrendingUp',    title: 'Аналитика прогресса',  text: 'Графики, метрики и отчёты по каждому пациенту.' },
  { icon: 'CalendarCheck', title: 'Расписание приёмов',   text: 'Онлайн-запись, напоминания и подтверждения визитов.' },
  { icon: 'ClipboardList', title: 'Протоколы процедур',   text: 'Готовые и авторские протоколы для стандартизации.' },
  { icon: 'ShieldCheck',   title: 'Защита данных',        text: 'Полное соответствие 152-ФЗ и медицинской тайне.' },
];

const testimonials = [
  {
    name: 'Елена Карпова',
    role: 'Трихолог, Москва',
    text: 'За три месяца работы с приложением количество повторных визитов выросло на 35%. Пациенты видят прогресс — и возвращаются.',
    initials: 'ЕК',
  },
  {
    name: 'Анна Соколова',
    role: 'Косметолог, Санкт-Петербург',
    text: 'Фотофиксация и сравнение «до/после» — это то, чего мне не хватало. Теперь я показываю результат, и доверие пациентов растёт.',
    initials: 'АС',
  },
  {
    name: 'Марина Волкова',
    role: 'Эстетическая медицина, Краснодар',
    text: 'Протоколы и карточки пациентов — экономлю больше часа в день. Приложение стало незаменимой частью моей практики.',
    initials: 'МВ',
  },
];

const Index = () => (
  <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">

    {/* ── Ambient blobs ── */}
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-30"
           style={{ background: 'radial-gradient(circle, #edc8c1, transparent 70%)' }} />
      <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full opacity-20"
           style={{ background: 'radial-gradient(circle, #808b6a, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full opacity-20"
           style={{ background: 'radial-gradient(circle, #6a8599, transparent 70%)' }} />
    </div>

    {/* ── Nav ── */}
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/50"
            style={{ background: 'rgba(252,249,248,0.85)' }}>
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <span className="h-9 w-9 rounded-xl grid place-items-center text-white"
                style={{ background: '#3f3740' }}>
            <Icon name="Activity" size={18} />
          </span>
          <span className="font-display text-2xl font-bold" style={{ color: '#3f3740' }}>
            TrichoCare
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#portal"  className="hover:text-foreground transition-colors">Портал</a>
          <a href="#features" className="hover:text-foreground transition-colors">Возможности</a>
          <a href="#voices"  className="hover:text-foreground transition-colors">Отзывы</a>
        </nav>
        <Button className="rounded-full px-6 text-sm" style={{ background: '#3f3740', color: '#fff' }}>
          Получить доступ
        </Button>
      </div>
    </header>

    {/* ── HERO: двухколоночный портал ── */}
    <section id="portal" className="mx-auto max-w-6xl px-6 pt-16 pb-6">
      <div className="grid lg:grid-cols-2 gap-10 items-stretch">

        {/* Левая колонка — врач */}
        <div className="relative rounded-[2.5rem] overflow-hidden min-h-[560px] animate-fade-in">
          <img
            src={DOCTOR}
            alt="Врач-трихолог"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* тонкий градиент снизу */}
          <div className="absolute inset-0"
               style={{ background: 'linear-gradient(to top, rgba(63,55,64,0.75) 0%, transparent 55%)' }} />

          {/* Бейдж-экспертиза */}
          <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-md"
               style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
            <Icon name="Award" size={14} />
            Для специалистов эстетической медицины
          </div>

          {/* Текст поверх фото */}
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2"
               style={{ color: '#edc8c1' }}>
              Цифровой ассистент трихолога
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] text-white">
              Экспертность
              <br />в каждом приёме
            </h1>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
              Структурируйте диагностику, консультации<br />и ведение пациентов в одном приложении.
            </p>
            <div className="flex gap-3 mt-5">
              <Button className="rounded-full h-12 px-7 font-semibold text-sm"
                      style={{ background: '#edc8c1', color: '#3f3740' }}>
                Попробовать бесплатно
              </Button>
              <Button variant="ghost" className="rounded-full h-12 px-6 text-sm text-white border border-white/30 hover:bg-white/10">
                <Icon name="Play" size={16} className="mr-2" />
                Демо
              </Button>
            </div>
          </div>
        </div>

        {/* Правая колонка — интерфейс приложения */}
        <div className="flex flex-col gap-5 animate-scale-in">

          {/* Главный скриншот */}
          <div className="relative rounded-[2rem] overflow-hidden flex-1">
            <img src={APP} alt="Интерфейс TrichoCare"
                 className="w-full h-full object-cover min-h-[300px]" />
            <div className="absolute inset-0 rounded-[2rem]"
                 style={{ boxShadow: 'inset 0 0 0 1px rgba(63,55,64,0.10)' }} />
          </div>

          {/* Три мини-карточки метрик */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: 'Users',     val: '2 200+', sub: 'специалистов' },
              { icon: 'Clock',     val: '−40%',   sub: 'времени на карты' },
              { icon: 'RefreshCw', val: '98%',    sub: 'возврат пациентов' },
            ].map(m => (
              <div key={m.val}
                   className="rounded-2xl p-4 text-center border border-border bg-card">
                <Icon name={m.icon} size={18} className="mx-auto mb-1 text-muted-foreground" />
                <p className="font-display text-2xl font-bold" style={{ color: '#3f3740' }}>{m.val}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{m.sub}</p>
              </div>
            ))}
          </div>

          {/* Доверие-плашки */}
          <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4">
            <div className="h-10 w-10 shrink-0 rounded-xl grid place-items-center"
                 style={{ background: '#edc8c1' }}>
              <Icon name="ShieldCheck" size={20} style={{ color: '#3f3740' }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Данные под защитой</p>
              <p className="text-xs text-muted-foreground">152-ФЗ · Шифрование · Медицинская тайна</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Полоска доверия ── */}
    <div className="border-y border-border/60 mt-8" style={{ background: 'rgba(255,255,255,0.6)' }}>
      <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs font-medium text-muted-foreground uppercase tracking-widest">
        {[
          { icon: 'Stethoscope', t: 'Трихология' },
          { icon: 'Sparkles',    t: 'Косметология' },
          { icon: 'Heart',       t: 'Эстетическая медицина' },
          { icon: 'Microscope',  t: 'Дерматология' },
        ].map(x => (
          <span key={x.t} className="flex items-center gap-2">
            <Icon name={x.icon} size={15} style={{ color: '#808b6a' }} />
            {x.t}
          </span>
        ))}
      </div>
    </div>

    {/* ── Возможности ── */}
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#808b6a' }}>
            Возможности
          </p>
          <h2 className="font-display text-5xl font-bold leading-tight" style={{ color: '#3f3740' }}>
            Всё для идеального
            <br />приёма
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-sm">
            Каждый инструмент создан вместе с практикующими врачами —
            без лишнего, только то, что реально экономит время.
          </p>

          {/* Цветовая палитра мудборда как декор */}
          <div className="flex gap-2 mt-8">
            {['#3f3740','#6a8599','#808b6a','#c5a290','#edc8c1','#ecd8d4'].map(c => (
              <div key={c} className="h-6 w-6 rounded-full border border-white shadow-sm"
                   style={{ background: c }} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="h-12 w-12 rounded-2xl grid place-items-center mb-4 transition-colors duration-300"
                    style={{ background: '#f5eeec' }}>
                <Icon name={f.icon} size={22} style={{ color: '#3f3740' }} />
              </span>
              <p className="font-semibold text-sm text-foreground">{f.title}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Атмосферная секция с мудбордом ── */}
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="relative rounded-[2.5rem] overflow-hidden">
        <img src={MOODBOARD} alt="Эстетика клиники" className="w-full h-72 object-cover object-top" />
        <div className="absolute inset-0"
             style={{ background: 'linear-gradient(to right, rgba(63,55,64,0.82) 0%, rgba(63,55,64,0.3) 60%, transparent 100%)' }} />
        <div className="absolute inset-0 flex items-center px-12 lg:px-16">
          <div className="max-w-md text-white">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#edc8c1' }}>
              Атмосфера практики
            </p>
            <h3 className="font-display text-4xl font-bold leading-tight">
              Приложение, которое
              <br />чувствует ваш уровень
            </h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Дизайн и логика продукта созданы для высоких стандартов
              эстетической медицины — без компромиссов.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── Отзывы ── */}
    <section id="voices" className="mx-auto max-w-6xl px-6 pb-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-center mb-2" style={{ color: '#808b6a' }}>
        Голоса специалистов
      </p>
      <h2 className="font-display text-4xl font-bold text-center mb-10" style={{ color: '#3f3740' }}>
        Врачи о TrichoCare
      </h2>
      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map(t => (
          <div key={t.name} className="rounded-3xl border border-border bg-card p-7">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={14} style={{ color: '#c5a290', fill: '#c5a290' }} />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">«{t.text}»</p>
            <div className="flex items-center gap-3 mt-5">
              <div className="h-10 w-10 rounded-full grid place-items-center text-sm font-bold text-white"
                   style={{ background: '#3f3740' }}>
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="rounded-[2.5rem] p-12 text-center text-white"
           style={{ background: 'linear-gradient(135deg, #3f3740 0%, #6a8599 100%)' }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#edc8c1' }}>
          Начать сегодня
        </p>
        <h2 className="font-display text-5xl font-bold">
          Ваша практика
          <br />заслуживает лучшего
        </h2>
        <p className="mt-4 max-w-lg mx-auto text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Присоединяйтесь к 2 200 специалистам, которые уже ведут пациентов
          профессиональнее с TrichoCare.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Button className="rounded-full h-13 px-9 h-14 text-base font-semibold"
                  style={{ background: '#edc8c1', color: '#3f3740' }}>
            Попробовать бесплатно
          </Button>
          <Button variant="ghost"
                  className="rounded-full h-14 px-8 text-base text-white border border-white/30 hover:bg-white/10">
            Связаться с нами
          </Button>
        </div>
      </div>
    </section>

    {/* ── Footer ── */}
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg grid place-items-center text-white"
                style={{ background: '#3f3740' }}>
            <Icon name="Activity" size={15} />
          </span>
          <span className="font-display text-base font-bold" style={{ color: '#3f3740' }}>TrichoCare</span>
        </div>
        <p>© 2026 TrichoCare · Для специалистов эстетической медицины</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
          <a href="#" className="hover:text-foreground transition-colors">Поддержка</a>
        </div>
      </div>
    </footer>
  </div>
);

export default Index;
