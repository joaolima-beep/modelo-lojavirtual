import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X, Home, Shirt, Package, ArrowRight } from 'lucide-react';

interface HeaderProps {
  itemCount: number;
}

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/produtos', label: 'Todos os produtos' },
  { to: '/produtos?categoria=camisetas', label: 'Camisetas' },
  { to: '/produtos?categoria=calcas', label: 'Calcas' },
  { to: '/produtos?categoria=acessorios', label: 'Acessorios' },
  { to: '/produtos?categoria=kits', label: 'Kits' },
];

const MOBILE_SECTIONS = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/produtos', label: 'Todos os produtos', icon: Package },
  { to: '/produtos?categoria=camisetas', label: 'Camisetas', icon: Shirt },
  { to: '/produtos?categoria=calcas', label: 'Calcas', icon: Package },
  { to: '/produtos?categoria=acessorios', label: 'Acessorios', icon: Package },
  { to: '/produtos?categoria=kits', label: 'Kits', icon: Package },
];

export default function Header({ itemCount }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/produtos?busca=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-brand-black/95 backdrop-blur-sm border-b border-brand-gray-700">
        <div className="container-page">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-18">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 text-white"
              aria-label="Abrir menu"
            >
              <Menu size={22} strokeWidth={2} />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="font-display text-xl font-black uppercase tracking-tight text-white sm:text-2xl"
              aria-label="PM House - Inicio"
            >
              PM<span className="text-brand-blue">HOUSE</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="link-nav">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                className="p-2 text-white transition-colors hover:text-brand-blue"
                aria-label="Buscar produtos"
              >
                <Search size={20} strokeWidth={2} />
              </button>
              <Link
                to="/carrinho"
                className="relative p-2 text-white transition-colors hover:text-brand-blue"
                aria-label={`Carrinho com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
              >
                <ShoppingBag size={20} strokeWidth={2} />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-blue px-1 text-[10px] font-bold text-brand-black">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search dropdown */}
          {searchOpen && (
            <div className="absolute inset-x-0 top-full border-b border-brand-gray-700 bg-brand-gray-900 animate-fade-in">
              <div className="container-page py-4">
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nome do produto..."
                    className="input-base min-w-0 flex-1"
                    aria-label="Buscar produto"
                  />
                  <button type="submit" className="btn-primary px-6 py-3.5">
                    <Search size={18} />
                    <span className="hidden sm:inline">Buscar</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-brand-gray-900 animate-slide-in flex flex-col">
            <div className="flex items-center justify-between border-b border-brand-gray-700 px-5 py-4">
              <span className="font-display text-lg font-black uppercase text-white">
                PM<span className="text-brand-blue">HOUSE</span>
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white"
                aria-label="Fechar menu"
              >
                <X size={22} strokeWidth={2} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {MOBILE_SECTIONS.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-3 px-5 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-gray-800 hover:text-brand-blue"
                >
                  <Icon size={18} className="text-brand-gray-500" />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-brand-gray-700 p-5">
              <Link to="/produtos" className="btn-primary w-full">
                Explorar colecao
                <ArrowRight size={16} />
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
