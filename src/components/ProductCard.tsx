import { Link } from 'react-router-dom';
import { formatPrice, getEffectivePrice } from '../data';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const effective = getEffectivePrice(product);
  const hasPromo = product.promoPrice != null;

  return (
    <Link
      to={`/produto/${product.slug}`}
      className="card-product group flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-gray-800">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-0 top-0 flex flex-col gap-1 p-2">
          {hasPromo && <span className="label-promo">Promo</span>}
          {product.isNew && !hasPromo && <span className="label-new">Novo</span>}
          {product.badge && !hasPromo && !product.isNew && (
            <span className="label-tag">{product.badge}</span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-brand-black/90 px-4 py-3 text-center transition-transform duration-300 group-hover:translate-y-0">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
            Ver produto
          </span>
        </div>
      </div>
      <div className={`flex flex-1 flex-col ${compact ? 'p-3' : 'p-4'}`}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-gray-500">
          {product.category}
        </span>
        <h3 className={`mt-1 font-bold text-white transition-colors group-hover:text-brand-blue ${compact ? 'text-sm' : 'text-base'}`}>
          {product.name}
        </h3>
        <div className="mt-auto pt-2 flex items-baseline gap-2">
          {product.priceOnRequest ? (
            <span className="text-lg font-bold text-white">Preco sob consulta</span>
          ) : hasPromo ? (
            <>
              <span className="text-sm font-semibold text-brand-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="text-lg font-bold text-brand-blue">
                {formatPrice(effective)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-white">
              {formatPrice(effective)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
