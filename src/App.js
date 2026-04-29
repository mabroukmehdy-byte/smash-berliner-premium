import { useEffect, useMemo, useState } from 'react';
import Marquee from 'react-fast-marquee';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Flame,
  Beef,
  Menu as MenuIcon,
  X,
  Camera,
  Globe,
} from 'lucide-react';

const NAV = [
  { id: 'carte', label: 'La Carte' },
  { id: 'histoire', label: 'Notre Histoire' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'avis', label: 'Avis' },
  { id: 'horaires', label: 'Horaires' },
  { id: 'trouver', label: 'Nous Trouver' },
];

const SIGNATURES = [
  {
    name: 'Le Berliner Smash',
    desc: 'Double steak smash 100% pur boeuf, cheddar fondu, oignons confits, sauce maison, bun brioche.',
    price: '12,90EUR',
    tag: 'Signature',
    img: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  },
  {
    name: 'Doner Berlinois',
    desc: 'Veau et agneau marines, grille a la broche, pain pide croustillant, crudites, sauce blanche + harissa.',
    price: '11,50EUR',
    tag: 'Berlin Style',
    img: 'https://images.unsplash.com/photo-1699728088614-7d1d4277414b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  },
  {
    name: 'Triple Trouble',
    desc: 'Trois steaks smashes, triple cheddar, bacon croustillant, sauce ketchup-moutarde fumee.',
    price: '15,90EUR',
    tag: 'XXL',
    img: 'https://images.pexels.com/photos/20722029/pexels-photo-20722029.jpeg?auto=compress&w=1000',
  },
  {
    name: 'Frites Maison',
    desc: 'Pommes de terre fraiches, double cuisson, fleur de sel. Servies brulantes.',
    price: '4,50EUR',
    tag: 'Fait Maison',
    img: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000',
  },
];

const REVIEWS = [
  {
    name: 'Camille R.',
    when: 'il y a 2 semaines',
    text: 'Le meilleur smash burger que j\'ai mange en France. Croustillant dehors, juteux dedans.',
  },
  {
    name: 'Karim B.',
    when: 'il y a 1 mois',
    text: 'Enfin un vrai doner comme a Kreuzberg. Le pain pide et la sauce blanche maison sont incroyables.',
  },
  {
    name: 'Sophie & Tom',
    when: 'il y a 3 semaines',
    text: 'Adresse qui merite le detour. Equipe rapide, portions genereuses et frites maison ultra nettes.',
  },
];

const HIGHLIGHTS = ['Viande fraiche du jour', 'Cuisson minute a la plancha', 'Click & collect rapide', 'Recettes signature'];

const HOURS = [
  ['Lundi', 'Ferme'],
  ['Mardi', '11h30-14h  |  18h-22h'],
  ['Mercredi', '11h30-14h  |  18h-22h'],
  ['Jeudi', '11h30-14h  |  18h-22h'],
  ['Vendredi', '11h30-14h  |  18h-23h'],
  ['Samedi', '11h30-14h  |  18h-23h'],
  ['Dimanche', '18h-22h'],
];

const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1300', span: 'md:col-span-7 md:row-span-2', alt: 'Smash burger signature', h: 'h-[260px] sm:h-[320px] md:h-full', pos: 'object-center' },
  { url: 'https://images.unsplash.com/photo-1699728088614-7d1d4277414b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1100', span: 'md:col-span-5', alt: 'Doner berlinois', h: 'h-[210px] sm:h-[240px] md:h-full', pos: 'object-center' },
  { url: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?crop=entropy&cs=srgb&fm=jpg&q=85&w=1100', span: 'md:col-span-5', alt: 'Frites maison', h: 'h-[170px] sm:h-[190px] md:h-full', pos: 'object-center' },
  { url: 'https://images.unsplash.com/photo-1550317138-10000687a72b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', span: 'md:col-span-5', alt: 'Cheeseburger', h: 'h-[220px] sm:h-[250px] md:h-full', pos: 'object-center' },
  { url: 'https://images.pexels.com/photos/20722029/pexels-photo-20722029.jpeg?auto=compress&w=1200', span: 'md:col-span-7', alt: 'Burger XXL', h: 'h-[240px] sm:h-[280px] md:h-full', pos: 'object-top' },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav() {
  const [open, setOpen] = useState(false);

  const jump = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bone)]/95 backdrop-blur border-b-2 border-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => jump('haut')} className="font-display text-2xl md:text-3xl tracking-wide">
          SMASH<span className="text-[var(--ketchup)]">.</span>BERLINER
        </button>

        <ul className="hidden md:flex items-center gap-7 text-sm font-bold uppercase tracking-wider">
          {NAV.map((item) => (
            <li key={item.id}>
              <button onClick={() => jump(item.id)} className="hover:text-[var(--ketchup)] transition-colors">
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <a href="tel:+33238479119" className="hidden md:inline-flex btn-primary !py-2 !px-4 text-sm">
          <Phone size={16} /> Commander
        </a>

        <button className="md:hidden p-2 brutal-border bg-white" aria-label="menu" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t-2 border-[var(--ink)] bg-[var(--bone)]">
          <ul className="px-4 py-4 space-y-3 font-bold uppercase">
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => jump(item.id)}
                  className="w-full text-left py-2 border-b border-[var(--ink)]/20"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <a href="tel:+33238479119" className="btn-primary w-full justify-center !py-3">
                <Phone size={16} /> Commander
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="haut" className="relative overflow-hidden border-b-2 border-[var(--ink)]">
      <div className="grain" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 reveal">
          <span className="tag-pill">
            <MapPin size={12} className="inline -mt-0.5 mr-1" />
            Meung-sur-Loire · 45130
          </span>
          <h1 className="font-display text-[15vw] md:text-[9.5vw] leading-[0.85] mt-4">
            SMASH.
            <br />
            <span className="text-[var(--ketchup)]">BERLINER.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl text-[var(--ink-2)] font-medium">
            La rencontre du <strong>smash burger</strong> et du <strong>doner berlinois</strong>. Viande ecrasee minute,
            pains chauds, sauces maison.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="tel:+33238479119" className="btn-primary">
              <Phone size={18} /> Commander · 02 38 47 91 19
            </a>
            <a href="#carte" className="btn-secondary">
              Voir la carte <ChevronRight size={18} />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-[var(--ketchup)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="font-bold">4,7/5</span>
            <span className="text-[var(--ink-2)]">· avis Google clients reguliers</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {HIGHLIGHTS.map((item) => (
              <span key={item} className="px-3 py-1 text-xs font-bold uppercase tracking-wider brutal-border bg-white">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 relative reveal">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?crop=entropy&cs=srgb&fm=jpg&q=85&w=950"
              alt="Smash burger signature"
              className="w-full h-[300px] sm:h-[360px] md:h-[440px] object-cover brutal-border brutal-shadow"
            />
            <div className="hidden md:block absolute -bottom-8 -left-10 rotate-[-6deg]">
              <img
                src="https://images.unsplash.com/photo-1699728088614-7d1d4277414b?crop=entropy&cs=srgb&fm=jpg&q=85&w=450"
                alt="Doner"
                className="w-32 h-32 lg:w-40 lg:h-40 object-cover brutal-border brutal-shadow-sm"
              />
            </div>
            <div className="absolute -top-5 -right-5 bg-[var(--mustard)] brutal-border brutal-shadow-sm px-4 py-2 rotate-[6deg] font-display text-2xl">
              100% PUR BOEUF
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const items = useMemo(
    () => ['100% PUR BOEUF', 'DONER BERLIN', 'FRITES MAISON', 'PAIN BRIOCHE', 'SAUCE BLANCHE MAISON', 'CLICK & COLLECT'],
    [],
  );

  return (
    <div className="bg-[var(--mustard)] border-b-2 border-[var(--ink)]">
      <Marquee gradient={false} speed={60} className="py-4">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="font-display text-3xl md:text-4xl mx-8 flex items-center gap-8">
            {item}
            <Flame size={28} className="text-[var(--ketchup)]" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function MenuSection() {
  return (
    <section id="carte" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 reveal">
          <div>
            <span className="tag-pill">La Carte</span>
            <h2 className="font-display text-5xl md:text-7xl mt-3">
              CE QU'ON SMASH<span className="text-[var(--ketchup)]">.</span>
            </h2>
          </div>
          <p className="max-w-md text-[var(--ink-2)]">
            Carte courte et exigeante. Produits frais, sauces maison, preparation minute.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {SIGNATURES.map((item) => (
            <article key={item.name} className="reveal bg-white brutal-border brutal-shadow overflow-hidden flex flex-col">
              <div className="relative h-44 sm:h-48 overflow-hidden border-b-2 border-[var(--ink)]">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <span className="absolute top-3 left-3 tag-pill bg-[var(--ketchup)] !text-white">{item.tag}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-3xl">{item.name}</h3>
                  <span className="font-display text-2xl text-[var(--ketchup)]">{item.price}</span>
                </div>
                <p className="mt-2 text-[var(--ink-2)]">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4 reveal">
          <a href="tel:+33238479119" className="btn-primary">
            <Phone size={18} /> Passer commande
          </a>
          <a href="#trouver" className="btn-secondary">
            Venir sur place <ChevronRight size={18} />
          </a>
          <span className="text-sm text-[var(--ink-2)] self-center">Allergenes disponibles sur demande.</span>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="histoire" className="bg-[var(--ink)] text-[var(--bone)] border-y-2 border-[var(--ink)] relative overflow-hidden">
      <div className="grain" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center relative">
        <div className="md:col-span-6 reveal">
          <span className="tag-pill !bg-[var(--ketchup)] !text-white">Notre Histoire</span>
          <h2 className="font-display text-5xl md:text-7xl mt-3 leading-[0.9]">
            DEUX RUES.
            <br />
            <span className="text-[var(--mustard)]">UNE OBSESSION.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--bone)]/80">
            On est partis d\'une question simple: pourquoi choisir entre un smash burger croustillant et un doner bien
            grille? On fait les deux, proprement, sans raccourci.
          </p>
          <p className="mt-4 text-[var(--bone)]/70">
            Cuisine ouverte, flux rapide le midi, service chaleureux le soir. Le coeur du projet: regularite et gout.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="border-2 border-[var(--bone)]/30 p-4">
              <Beef className="text-[var(--mustard)] mb-2" />
              <div className="font-display text-3xl">100%</div>
              <div className="text-xs uppercase tracking-wider text-[var(--bone)]/70">Boeuf frais</div>
            </div>
            <div className="border-2 border-[var(--bone)]/30 p-4">
              <Flame className="text-[var(--mustard)] mb-2" />
              <div className="font-display text-3xl">2x</div>
              <div className="text-xs uppercase tracking-wider text-[var(--bone)]/70">Cuisson / jour</div>
            </div>
            <div className="border-2 border-[var(--bone)]/30 p-4">
              <Clock className="text-[var(--mustard)] mb-2" />
              <div className="font-display text-3xl">0</div>
              <div className="text-xs uppercase tracking-wider text-[var(--bone)]/70">Surgeles</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 relative reveal">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
            alt="Equipe en cuisine"
            className="w-full h-[320px] sm:h-[380px] md:h-[440px] object-cover brutal-border"
            style={{ borderColor: 'var(--bone)' }}
          />
          <div className="absolute -bottom-6 -left-6 bg-[var(--mustard)] text-[var(--ink)] p-5 brutal-border max-w-xs">
            <p className="font-display text-2xl leading-tight">On cuisine comme si vous etiez chez nous.</p>
            <p className="text-sm mt-2 font-bold">- L'equipe Smash Berliner</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section id="galerie" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-10">
          <span className="tag-pill">Galerie</span>
          <h2 className="font-display text-5xl md:text-7xl mt-3">
            CE QU'ON SERT<span className="text-[var(--ketchup)]">.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[150px] lg:auto-rows-[180px] gap-4 md:gap-6">
          {GALLERY.map((item) => (
            <div key={item.url} className={`reveal relative overflow-hidden brutal-border ${item.span}`}>
              <img
                src={item.url}
                alt={item.alt}
                className={`w-full ${item.h} ${item.pos} md:h-full object-cover transition-transform duration-700 hover:scale-105`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="avis" className="bg-[var(--bone-2)] border-y-2 border-[var(--ink)] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="tag-pill">Avis Clients</span>
            <h2 className="font-display text-5xl md:text-7xl mt-3">
              ILS ONT GOUTE<span className="text-[var(--ketchup)]">.</span>
            </h2>
          </div>
          <p className="text-[var(--ink-2)] font-medium">Moyenne observee: 4,7/5</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <article key={review.name} className="reveal bg-white brutal-border p-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <strong>{review.name}</strong>
                <span className="text-xs text-[var(--ink-2)]">{review.when}</span>
              </div>
              <div className="flex items-center gap-1 text-[var(--ketchup)] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[var(--ink-2)]">{review.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HoursAndLocation() {
  return (
    <>
      <section id="horaires" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-start">
          <div className="reveal">
            <span className="tag-pill">Horaires</span>
            <h2 className="font-display text-5xl md:text-7xl mt-3">
              ON VOUS ATTEND<span className="text-[var(--ketchup)]">.</span>
            </h2>
            <p className="mt-4 text-[var(--ink-2)]">Service rapide le midi, ambiance street-food le soir.</p>
          </div>

          <div className="reveal bg-white brutal-border brutal-shadow p-6 space-y-3">
            {HOURS.map(([day, time]) => (
              <div key={day} className="flex justify-between gap-3 border-b border-[var(--ink)]/20 pb-2">
                <span className="font-bold">{day}</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trouver" className="bg-[var(--ink)] text-[var(--bone)] py-20 border-y-2 border-[var(--ink)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="reveal">
            <span className="tag-pill !bg-[var(--mustard)] !text-[var(--ink)]">Nous Trouver</span>
            <h2 className="font-display text-5xl md:text-7xl mt-3 leading-[0.9]">
              2 RUE DE BLOIS
              <br />
              <span className="text-[var(--mustard)]">45130.</span>
            </h2>
            <p className="mt-6 inline-flex items-center gap-2">
              <MapPin size={16} /> Meung-sur-Loire
            </p>
            <p className="mt-2 inline-flex items-center gap-2">
              <Phone size={16} /> +33 2 38 47 91 19
            </p>
            <p className="mt-2 inline-flex items-center gap-2">
              <Clock size={16} /> Ouvert du mardi au dimanche
            </p>
            <a
              href="https://maps.google.com/?q=2+Rue+de+Blois+45130+Meung-sur-Loire"
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-6"
            >
              <MapPin size={18} /> Itineraire Google Maps
            </a>
          </div>

          <iframe
            className="reveal w-full h-[360px] brutal-border bg-white"
            title="Carte Smash Berliner"
            loading="lazy"
            src="https://maps.google.com/maps?q=2%20Rue%20de%20Blois%2045130%20Meung-sur-Loire&t=&z=15&ie=UTF8&iwloc=&output=embed"
          />
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <p className="font-display text-3xl">
            SMASH<span className="text-[var(--ketchup)]">.</span>BERLINER
          </p>
          <p className="text-sm text-[var(--ink-2)]">2 Rue de Blois, 45130 Meung-sur-Loire</p>
        </div>
        <p className="text-sm font-bold">02 38 47 91 19</p>
        <div className="flex gap-3">
          <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="brutal-border p-2 bg-white">
            <Camera size={18} />
          </a>
          <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" className="brutal-border p-2 bg-white">
            <Globe size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useReveal();

  return (
    <div>
      <Nav />
      <Hero />
      <MarqueeStrip />
      <MenuSection />
      <AboutSection />
      <GallerySection />
      <ReviewsSection />
      <HoursAndLocation />
      <Footer />
    </div>
  );
}
