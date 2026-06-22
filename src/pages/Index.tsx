import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO =
  'https://cdn.poehali.dev/projects/59aafcac-bf0d-423d-8f27-b694028f6b8b/files/a2da72b2-4089-4a32-a57c-33d99630af63.jpg';
const DASH =
  'https://cdn.poehali.dev/projects/59aafcac-bf0d-423d-8f27-b694028f6b8b/files/871520ca-68ac-4f9c-803c-f47e34c235e0.jpg';

const features = [
  {
    icon: 'IdCard',
    title: 'Карточка пациента',
    text: 'Вся история обращений, диагнозы и назначения — в одном защищённом месте.',
  },
  {
    icon: 'Camera',
    title: 'Фотофиксация',
    text: 'Снимки кожи головы и лица с привязкой к дате. Сравнение «до и после» в один тап.',
  },
  {
    icon: 'TrendingUp',
    title: 'Динамика лечения',
    text: 'Наглядные графики прогресса. Пациент видит результат — доверие растёт.',
  },
  {
    icon: 'CalendarCheck',
    title: 'Календарь приёмов',
    text: 'Расписание, напоминания и подтверждения визитов без лишней рутины.',
  },
  {
    icon: 'ClipboardList',
    title: 'Протоколы процедур',
    text: 'Готовые и авторские протоколы. Стандартизируйте качество приёма.',
  },
  {
    icon: 'ChartPie',
    title: 'Аналитика практики',
    text: 'Метрики по пациентам, эффективности лечения и загрузке кабинета.',
  },
];

const stats = [
  { value: '−40%', label: 'времени на ведение карт' },
  { value: '2 200+', label: 'специалистов' },
  { value: '98%', label: 'возврат пациентов' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-[24rem] w-[24rem] rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-xl bg-primary grid place-items-center text-primary-foreground">
              <Icon name="Activity" size={20} />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight">TrichoCare</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="story-link">Возможности</a>
            <a href="#dashboard" className="story-link">Интерфейс</a>
            <a href="#cta" className="story-link">Доступ</a>
          </nav>
          <Button className="rounded-full px-6">Демо</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
            <Icon name="Stethoscope" size={14} />
            Для врачей и косметологов
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.05] mt-6">
            Цифровой ассистент
            <br />
            <span className="text-primary">трихолога</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-5 max-w-md leading-relaxed">
            Приложение, которое структурирует диагностику, консультации и ведение
            пациентов. Больше экспертности — меньше рутины.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Button className="rounded-full px-8 h-14 text-base shadow-xl shadow-primary/20">
              Попробовать бесплатно
            </Button>
            <Button variant="outline" className="rounded-full h-14 px-7 text-base">
              <Icon name="Play" size={18} className="mr-2" />
              Смотреть демо
            </Button>
          </div>
          <div className="flex gap-8 mt-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[8rem]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-scale-in">
          <div className="absolute inset-0 rounded-[2.5rem] bg-primary/15 blur-2xl scale-95" />
          <img
            src={HERO}
            alt="Приложение TrichoCare в кабинете трихолога"
            className="relative rounded-[2.5rem] border border-border shadow-2xl w-full object-cover aspect-[4/5]"
          />
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-card border border-border shadow-xl px-5 py-4 flex items-center gap-3 animate-fade-in">
            <span className="h-10 w-10 rounded-xl bg-accent/20 grid place-items-center text-accent">
              <Icon name="ShieldCheck" size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">Данные защищены</p>
              <p className="text-xs text-muted-foreground">152-ФЗ • шифрование</p>
            </div>
          </div>
        </div>
      </section>

      {/* trust strip */}
      <div className="border-y border-border/60 bg-card/40">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Icon name="Award" size={16} className="text-primary" /> Рекомендовано экспертами</span>
          <span className="flex items-center gap-2"><Icon name="Lock" size={16} className="text-primary" /> Соответствие 152-ФЗ</span>
          <span className="flex items-center gap-2"><Icon name="Cloud" size={16} className="text-primary" /> Доступ с любого устройства</span>
          <span className="flex items-center gap-2"><Icon name="Headphones" size={16} className="text-primary" /> Поддержка 24/7</span>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Возможности</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Всё для приёма в одном приложении
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl bg-card border border-border p-7 transition hover:-translate-y-1 hover:shadow-xl hover:border-primary/40"
            >
              <span className="h-14 w-14 rounded-2xl bg-secondary grid place-items-center text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name={f.icon} size={26} />
              </span>
              <h3 className="font-display text-2xl font-semibold mt-5">{f.title}</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard showcase */}
      <section id="dashboard" className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-[2.5rem] bg-primary text-primary-foreground overflow-hidden grid lg:grid-cols-2 items-center">
          <div className="p-10 md:p-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
              Интерфейс
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 leading-tight">
              Спроектировано для медицинской практики
            </h2>
            <ul className="mt-7 space-y-4">
              {[
                'Сравнение «до и после» по фотографиям',
                'Графики динамики лечения для пациента',
                'Шаблоны протоколов и рекомендаций',
                'Единый календарь приёмов и напоминаний',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-primary-foreground/15 grid place-items-center">
                    <Icon name="Check" size={14} />
                  </span>
                  <span className="text-primary-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="rounded-full mt-8 h-12 px-7">
              Запросить демонстрацию
            </Button>
          </div>
          <div className="relative h-full min-h-[20rem] p-8 lg:p-0">
            <img
              src={DASH}
              alt="Интерфейс приложения TrichoCare"
              className="lg:absolute lg:inset-0 h-full w-full object-cover rounded-3xl lg:rounded-none"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto">
          Повысьте экспертность вашей практики
        </h2>
        <p className="text-lg text-muted-foreground mt-5 max-w-lg mx-auto">
          Присоединяйтесь к специалистам, которые уже ведут пациентов профессиональнее.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
          <Button className="rounded-full h-14 px-9 text-base shadow-xl shadow-primary/20">
            Начать бесплатно
          </Button>
          <Button variant="outline" className="rounded-full h-14 px-8 text-base">
            Связаться с нами
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-lg bg-primary grid place-items-center text-primary-foreground">
              <Icon name="Activity" size={16} />
            </span>
            <span className="font-display text-lg font-bold text-foreground">TrichoCare</span>
          </div>
          <p>© 2026 TrichoCare. Для специалистов эстетической медицины.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
