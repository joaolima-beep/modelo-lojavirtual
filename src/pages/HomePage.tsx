import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data';

const HERO_IMAGE = 'https://images.pexels.com/photos/3598015/pexels-photo-3598015.jpeg?auto=compress&cs=tinysrgb&w=1400';

export default function HomePage() {
  const popular = PRODUCTS.filter((p) => p.popular).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="relative min-h-[78vh] lg:min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <source media="(min-width: 1024px)" srcSet="/hero-desktop.png" />
          <img
            src={HERO_IMAGE}
            alt="Modelo com look streetwear urbano"
            className="h-full w-full object-cover lg:object-right"
          />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/70 to-brand-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
        </div>

        <div className="container-page relative z-10">
          <div className="max-w-2xl">
            <span className="label-tag mb-5">Colecao 2026</span>
            <h1 className="font-display text-display-1 font-black uppercase text-white text-balance">
              Seu estilo.<br />Suas regras.
            </h1>
            <p className="mt-5 max-w-md text-base text-brand-gray-200 sm:text-lg">
              Streetwear urbano com identidade propria. Pecas encorpadas, caimento
              marcante e atitude para quem dita suas proprias regras.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/produtos" className="btn-primary">
                Explorar colecao
                <ArrowRight size={18} />
              </Link>
              <Link to="/produtos?categoria=camisetas" className="btn-outline">
                Ver camisetas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="border-b border-brand-gray-700 bg-brand-gray-900">
        <div className="container-page">
          <div className="grid grid-cols-1 divide-y divide-brand-gray-700 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex items-center gap-3 py-5 px-2 sm:px-6">
              <Truck size={24} className="text-brand-blue shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">Envios para todo o Brasil</p>
                <p className="text-xs text-brand-gray-400">Consulte frete e prazo pelo WhatsApp</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-5 px-2 sm:px-6">
              <ShieldCheck size={24} className="text-brand-blue shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">Qualidade garantida</p>
                <p className="text-xs text-brand-gray-400">Materiais selecionados</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-5 px-2 sm:px-6">
              <RotateCcw size={24} className="text-brand-blue shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">Pedido pelo WhatsApp</p>
                <p className="text-xs text-brand-gray-400">Atendimento direto com o vendedor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-page py-14 lg:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="label-tag mb-3">Categorias</span>
            <h2 className="font-display text-display-3 font-black uppercase text-white">
              Explore por categoria
            </h2>
          </div>
          <Link to="/produtos" className="btn-ghost hidden sm:flex items-center gap-1">
            Ver tudo
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/produtos?categoria=${cat.slug}`}
              className="group relative aspect-[4/5] overflow-hidden bg-brand-gray-800 sm:aspect-[3/4]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-xl font-black uppercase text-white sm:text-2xl">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-brand-gray-200 line-clamp-2">{cat.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-brand-blue opacity-0 transition-opacity group-hover:opacity-100">
                  Ver produtos
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR */}
      <section className="bg-brand-gray-900 py-14 lg:py-20">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="label-tag mb-3">Mais procurados</span>
              <h2 className="font-display text-display-3 font-black uppercase text-white">
                Mais procurados
              </h2>
            </div>
            <Link to="/produtos" className="btn-ghost hidden sm:flex items-center gap-1">
              Ver tudo
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-page py-14 lg:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="label-tag mb-3">Lancamentos</span>
            <h2 className="font-display text-display-3 font-black uppercase text-white">
              Recem-chegados
            </h2>
          </div>
          <Link to="/produtos" className="btn-ghost hidden sm:flex items-center gap-1">
            Ver tudo
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
