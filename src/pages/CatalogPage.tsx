import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, PackageSearch } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, getEffectivePrice } from '../data';
import type { CategoryId, SortOption } from '../types';

const CATEGORY_LABELS: Record<CategoryId | 'all', string> = {
  all: 'Todos os produtos',
  camisetas: 'Camisetas',
  calcas: 'Calcas',
  acessorios: 'Acessorios',
  kits: 'Kits',
};

type FilterId = CategoryId | 'all';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('categoria') as FilterId | null;
  const buscaParam = searchParams.get('busca') ?? '';
  const [search, setSearch] = useState(buscaParam);
  const [sort, setSort] = useState<SortOption>('price-asc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSearch(buscaParam);
  }, [buscaParam]);

  const activeCategory: FilterId =
    categoryParam && (categoryParam === 'all' || CATEGORIES.some((c) => c.id === categoryParam))
      ? categoryParam
      : 'all';

  const filtered = useMemo(() => {
    let result = PRODUCTS;

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    const query = buscaParam.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      );
    }

    const sorted = [...result];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
        break;
      case 'price-desc':
        sorted.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
        break;
    }
    return sorted;
  }, [activeCategory, buscaParam, sort]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search.trim()) {
      params.set('busca', search.trim());
    } else {
      params.delete('busca');
    }
    setSearchParams(params);
  };

  const setCategory = (cat: FilterId) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') {
      params.delete('categoria');
    } else {
      params.set('categoria', cat);
    }
    setSearchParams(params);
    setShowFilters(false);
  };

  const clearSearch = () => {
    setSearch('');
    const params = new URLSearchParams(searchParams);
    params.delete('busca');
    setSearchParams(params);
  };

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="border-b border-brand-gray-700 bg-brand-gray-900">
        <div className="container-page py-8 lg:py-10">
          <span className="label-tag mb-3">Catalogo</span>
          <h1 className="font-display text-display-3 font-black uppercase text-white">
            {CATEGORY_LABELS[activeCategory]}
          </h1>
          <p className="mt-2 text-sm text-brand-gray-400">
            {filtered.length} {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-16 z-30 border-b border-brand-gray-700 bg-brand-black/95 backdrop-blur-sm lg:top-18">
        <div className="container-page py-3">
          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-500"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produto..."
                className="w-full appearance-none rounded-none border border-brand-gray-600 bg-brand-gray-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-brand-gray-500 focus:border-brand-blue focus:outline-none"
                aria-label="Buscar produto"
              />
            </form>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="hidden sm:block sm:w-auto sm:shrink-0 select-base py-2.5"
              aria-label="Ordenar por"
            >
              <option value="price-asc">Menor preco</option>
              <option value="price-desc">Maior preco</option>
              <option value="name-asc">Nome A-Z</option>
            </select>

            {/* Filter toggle (mobile) */}
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 border border-brand-gray-600 bg-brand-gray-900 px-4 py-2.5 text-sm font-semibold text-white lg:hidden"
              aria-label="Filtrar categorias"
            >
              <SlidersHorizontal size={16} />
              Filtrar
            </button>
          </div>

          {/* Active search tag */}
          {buscaParam && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-brand-gray-400">Busca:</span>
              <button
                onClick={clearSearch}
                className="inline-flex items-center gap-1 bg-brand-gray-800 px-2.5 py-1 text-xs font-semibold text-white hover:bg-brand-gray-700"
              >
                {buscaParam}
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container-page py-8">
        <div className="flex gap-8">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block w-56 shrink-0">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Categorias
            </h3>
            <ul className="space-y-1">
              {(['all', ...CATEGORIES.map((c) => c.id)] as FilterId[]).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setCategory(cat)}
                    className={`w-full px-3 py-2 text-left text-sm font-semibold transition-colors ${
                      activeCategory === cat
                        ? 'bg-brand-blue text-brand-black'
                        : 'text-brand-gray-300 hover:bg-brand-gray-800 hover:text-white'
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="mb-4 mt-8 text-xs font-bold uppercase tracking-widest text-white">
              Ordenar por
            </h3>
            <ul className="space-y-1">
              {[
                { value: 'price-asc', label: 'Menor preco' },
                { value: 'price-desc', label: 'Maior preco' },
                { value: 'name-asc', label: 'Nome A-Z' },
              ].map((opt) => (
                <li key={opt.value}>
                  <button
                    onClick={() => setSort(opt.value as SortOption)}
                    className={`w-full px-3 py-2 text-left text-sm font-semibold transition-colors ${
                      sort === opt.value
                        ? 'text-brand-blue'
                        : 'text-brand-gray-300 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {/* Mobile filter panel */}
            {showFilters && (
              <div className="mb-5 animate-slide-up border border-brand-gray-700 bg-brand-gray-900 p-4 lg:hidden">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">
                  Categorias
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(['all', ...CATEGORIES.map((c) => c.id)] as FilterId[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                        activeCategory === cat
                          ? 'bg-brand-blue text-brand-black'
                          : 'border border-brand-gray-600 text-brand-gray-300'
                      }`}
                    >
                      {CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
                <h3 className="mb-3 mt-4 text-xs font-bold uppercase tracking-widest text-white">
                  Ordenar
                </h3>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="select-base"
                  aria-label="Ordenar por"
                >
                  <option value="price-asc">Menor preco</option>
                  <option value="price-desc">Maior preco</option>
                  <option value="name-asc">Nome A-Z</option>
                </select>
              </div>
            )}

            {/* Mobile sort (always visible) */}
            <div className="mb-4 sm:hidden">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="select-base"
                aria-label="Ordenar por"
              >
                <option value="price-asc">Menor preco</option>
                <option value="price-desc">Maior preco</option>
                <option value="name-asc">Nome A-Z</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <PackageSearch size={48} className="text-brand-gray-600" />
                <h2 className="mt-4 font-display text-xl font-bold uppercase text-white">
                  Nenhum produto encontrado
                </h2>
                <p className="mt-2 max-w-sm text-sm text-brand-gray-400">
                  Tente ajustar a busca ou a categoria para encontrar o que procura.
                </p>
                <button
                  onClick={() => {
                    setSearch('');
                    const params = new URLSearchParams(searchParams);
                    params.delete('busca');
                    params.delete('categoria');
                    setSearchParams(params);
                    setShowFilters(false);
                  }}
                  className="btn-primary mt-6"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
