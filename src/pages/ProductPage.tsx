import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag, Check, AlertCircle, Truck, RotateCcw, ArrowLeft,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts, getEffectivePrice, formatPrice, STORE_CONFIG } from '../data';
import type { CartContextValue } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import NotFound from '../components/NotFound';

interface ProductPageProps {
  cart: CartContextValue;
}

export default function ProductPage({ cart }: ProductPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = useMemo(() => (slug ? getProductBySlug(slug) : undefined), [slug]);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showCartLink, setShowCartLink] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setSelectedSize(null);
    setSelectedColor(null);
    setQuantity(1);
    setError(null);
    setShowCartLink(false);
  }, [slug]);

  if (!product) {
    return <NotFound title="Produto nao encontrado" message="Este produto nao existe ou foi removido da loja." />;
  }

  const effective = getEffectivePrice(product);
  const hasPromo = product.promoPrice != null;
  const hasSizes = product.sizes.length > 1;
  const hasColors = product.colors.length > 1;
  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    setError(null);

    if (product.priceOnRequest) {
      const message = encodeURIComponent(`Ola! Gostaria de saber o preco e a disponibilidade do ${product.name}.`);
      window.open(`https://wa.me/${STORE_CONFIG.whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer');
      return;
    }

    if (hasSizes && !selectedSize) {
      setError('Selecione um tamanho antes de adicionar ao carrinho.');
      return;
    }
    if (hasColors && !selectedColor) {
      setError('Selecione uma cor antes de adicionar ao carrinho.');
      return;
    }

    cart.addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: effective,
      size: selectedSize ?? product.sizes[0],
      color: selectedColor ?? product.colors[0].name,
      quantity,
    });
    setShowCartLink(true);
  };

  const justAdded = cart.justAddedKey === `${product.id}-${selectedSize ?? product.sizes[0]}-${selectedColor ?? product.colors[0]?.name}`;

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="border-b border-brand-gray-700 bg-brand-gray-900">
        <div className="container-page py-3">
          <div className="flex items-center gap-2 text-xs text-brand-gray-400">
            <Link to="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link to="/produtos" className="hover:text-white">Produtos</Link>
            <span>/</span>
            <Link to={`/produtos?categoria=${product.category}`} className="hover:text-white capitalize">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container-page py-8 lg:py-12">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden bg-brand-gray-800">
              <img
                src={product.images[activeImage]}
                alt={`${product.name} - foto ${activeImage + 1}`}
                className="h-full w-full object-cover animate-fade-in"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-brand-black/60 p-2 text-white transition-colors hover:bg-brand-black/80"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImage((i) => (i + 1) % product.images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-black/60 p-2 text-white transition-colors hover:bg-brand-black/80"
                    aria-label="Proxima imagem"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              {hasPromo && <span className="absolute left-3 top-3 label-promo">Promo</span>}
              {product.isNew && !hasPromo && <span className="absolute left-3 top-3 label-new">Novo</span>}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-16 overflow-hidden bg-brand-gray-800 transition-all ${
                      activeImage === i ? 'ring-2 ring-brand-blue' : 'ring-1 ring-brand-gray-700'
                    }`}
                    aria-label={`Ver foto ${i + 1}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gray-500">
              {product.category}
            </span>
            <h1 className="mt-2 font-display text-display-3 font-black uppercase text-white">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              {product.priceOnRequest ? (
                <span className="text-3xl font-black text-white">Preco sob consulta</span>
              ) : hasPromo ? (
                <>
                  <span className="text-lg font-semibold text-brand-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-3xl font-black text-brand-blue">
                    {formatPrice(effective)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-black text-white">{formatPrice(effective)}</span>
              )}
            </div>

            {/* Description */}
            <p className="mt-5 text-base leading-relaxed text-brand-gray-300">
              {product.description}
            </p>

            {/* Details */}
            <ul className="mt-5 space-y-2 border-y border-brand-gray-700 py-5">
              {product.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-brand-gray-300">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-blue" />
                  {d}
                </li>
              ))}
            </ul>

            {/* Size selector */}
            {hasSizes && (
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wide text-white">
                    Tamanho
                  </span>
                  {selectedSize && (
                    <span className="text-xs text-brand-gray-400">Selecionado: {selectedSize}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setError(null);
                      }}
                      className={`min-w-12 px-4 py-2.5 text-sm font-bold transition-all ${
                        selectedSize === size
                          ? 'bg-brand-blue text-brand-black'
                          : 'border border-brand-gray-600 text-white hover:border-brand-blue'
                      }`}
                      aria-label={`Tamanho ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector */}
            {hasColors && (
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wide text-white">
                    Cor
                  </span>
                  {selectedColor && (
                    <span className="text-xs text-brand-gray-400">Selecionado: {selectedColor}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color.name);
                        setError(null);
                      }}
                      className={`flex items-center gap-2 border px-3 py-2 text-xs font-bold transition-all ${
                        selectedColor === color.name
                          ? 'border-brand-blue bg-brand-gray-800 text-white'
                          : 'border-brand-gray-600 text-brand-gray-300 hover:border-brand-blue'
                      }`}
                      aria-label={`Cor ${color.name}`}
                    >
                      <span
                        className="h-5 w-5 rounded-full border border-brand-gray-600"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            {!product.priceOnRequest && <div className="mt-5">
              <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-white">
                Quantidade
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-11 w-11 items-center justify-center border border-brand-gray-600 text-white transition-colors hover:border-brand-blue disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Diminuir quantidade"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center text-lg font-bold text-white" aria-live="polite">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  className="flex h-11 w-11 items-center justify-center border border-brand-gray-600 text-white transition-colors hover:border-brand-blue"
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            }

            {/* Error */}
            {error && (
              <div className="mt-4 flex items-center gap-2 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Add to cart */}
            <div className="mt-6">
              <button
                onClick={handleAddToCart}
                className="btn-primary w-full py-4 text-base"
              >
                {justAdded ? (
                  <>
                    <Check size={20} />
                    Adicionado!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    {product.priceOnRequest ? 'Consultar pelo WhatsApp' : 'Adicionar ao carrinho'}
                  </>
                )}
              </button>
              {showCartLink && (
                <Link
                  to="/carrinho"
                  className="btn-outline mt-3 w-full"
                >
                  Ir para o carrinho
                </Link>
              )}
            </div>

            {/* Shipping info */}
            <div className="mt-8 space-y-3 border-t border-brand-gray-700 pt-6">
              <div className="flex items-start gap-3">
                <Truck size={18} className="mt-0.5 shrink-0 text-brand-blue" />
                <div>
                  <p className="text-sm font-semibold text-white">Entrega</p>
                  <p className="text-xs text-brand-gray-400">{STORE_CONFIG.shippingInfo}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw size={18} className="mt-0.5 shrink-0 text-brand-blue" />
                <div>
                  <p className="text-sm font-semibold text-white">Pedido pelo WhatsApp</p>
                  <p className="text-xs text-brand-gray-400">
                    Voce revisa o pedido e envia a mensagem pelo WhatsApp. A confirmacao e feita
                    manualmente pelo vendedor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="mb-6 font-display text-display-3 font-black uppercase text-white">
              Produtos relacionados
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
