import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Minus, Plus, Trash2, ShoppingBag, ArrowLeft, X, MessageCircle, AlertCircle, Check,
} from 'lucide-react';
import { formatPrice } from '../data';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import type { CartContextValue } from '../hooks/useCart';

interface CartPageProps {
  cart: CartContextValue;
}

export default function CartPage({ cart }: CartPageProps) {
  const { items, subtotal, itemCount, updateQuantity, removeItem, clearCart } = cart;
  const [notes, setNotes] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const isEmpty = items.length === 0;

  const handleCheckout = () => {
    if (isEmpty) return;
    const url = buildWhatsAppUrl(items, subtotal, notes);
    setWhatsappUrl(url);
    setShowConfirm(true);
  };

  const openWhatsApp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setWhatsappUrl(null);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="border-b border-brand-gray-700 bg-brand-gray-900">
        <div className="container-page py-8 lg:py-10">
          <span className="label-tag mb-3">Carrinho</span>
          <h1 className="font-display text-display-3 font-black uppercase text-white">
            Seu carrinho
          </h1>
          {!isEmpty && (
            <p className="mt-2 text-sm text-brand-gray-400">
              {itemCount} {itemCount === 1 ? 'item' : 'itens'} no carrinho
            </p>
          )}
        </div>
      </div>

      <div className="container-page py-8 lg:py-12">
        {isEmpty ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gray-800">
              <ShoppingBag size={36} className="text-brand-gray-600" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold uppercase text-white">
              Seu carrinho esta vazio
            </h2>
            <p className="mt-2 max-w-sm text-sm text-brand-gray-400">
              Explore a colecao e adicione pecas para comecar seu pedido.
            </p>
            <Link to="/produtos" className="btn-primary mt-8">
              Explorar colecao
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <Link
                  to="/produtos"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-gray-400 transition-colors hover:text-white"
                >
                  <ArrowLeft size={16} />
                  Continuar comprando
                </Link>
                <button
                  onClick={clearCart}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-gray-400 transition-colors hover:text-red-400"
                >
                  <Trash2 size={14} />
                  Esvaziar carrinho
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-4 border border-brand-gray-700 bg-brand-gray-900 p-3 sm:p-4"
                  >
                    {/* Image */}
                    <Link
                      to={`/produto/${item.slug}`}
                      className="shrink-0 overflow-hidden bg-brand-gray-800"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-20 object-cover sm:h-28 sm:w-24"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/produto/${item.slug}`}
                          className="font-bold text-white transition-colors hover:text-brand-blue"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="p-1 text-brand-gray-500 transition-colors hover:text-red-400"
                          aria-label={`Remover ${item.name}`}
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-gray-400">
                        <span>Tamanho: <strong className="text-brand-gray-200">{item.size}</strong></span>
                        <span>Cor: <strong className="text-brand-gray-200">{item.color}</strong></span>
                      </div>

                      <div className="mt-auto flex items-end justify-between pt-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center border border-brand-gray-600 text-white transition-colors hover:border-brand-blue disabled:opacity-40"
                            disabled={item.quantity <= 1}
                            aria-label="Diminuir quantidade"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center border border-brand-gray-600 text-white transition-colors hover:border-brand-blue"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-xs text-brand-gray-500">
                            {formatPrice(item.price)} / un.
                          </p>
                          <p className="text-base font-bold text-white">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 border border-brand-gray-700 bg-brand-gray-900 p-6">
                <h2 className="font-display text-xl font-bold uppercase text-white">
                  Resumo do pedido
                </h2>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-gray-400">
                      Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})
                    </span>
                    <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-gray-400">Frete</span>
                    <span className="text-brand-gray-400">A combinar</span>
                  </div>
                </div>

                <div className="mt-5 border-t border-brand-gray-700 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-white">Total dos produtos</span>
                    <span className="font-display text-2xl font-black text-brand-blue">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-brand-gray-500">
                    Frete e pagamento combinados pelo WhatsApp.
                  </p>
                </div>

                {/* Notes */}
                <div className="mt-5">
                  <label
                    htmlFor="notes"
                    className="mb-2 block text-xs font-bold uppercase tracking-wide text-white"
                  >
                    Observacoes (opcional)
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Ex: tamanho alternativo, cor de preferencia, endereco..."
                    className="input-base resize-none"
                  />
                </div>

                {/* Checkout */}
                <button
                  onClick={handleCheckout}
                  className="btn-primary mt-6 w-full py-4 text-base"
                >
                  <MessageCircle size={20} />
                  Finalizar pelo WhatsApp
                </button>

                <div className="mt-4 flex items-start gap-2 text-xs text-brand-gray-500">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                  <span>
                    O carrinho nao sera esvaziado. Voce revisa e envia a mensagem no WhatsApp.
                    A confirmacao do pedido e feita manualmente pelo vendedor.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp confirm modal */}
      {showConfirm && whatsappUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 animate-fade-in"
            onClick={handleCloseConfirm}
          />
          <div className="relative w-full max-w-md border border-brand-gray-700 bg-brand-gray-900 p-6 animate-scale-in">
            <button
              onClick={handleCloseConfirm}
              className="absolute right-4 top-4 text-brand-gray-500 transition-colors hover:text-white"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/20">
              <Check size={24} className="text-brand-blue" />
            </div>

            <h2 className="mt-4 font-display text-xl font-bold uppercase text-white">
              Pedido pronto para envio
            </h2>
            <p className="mt-2 text-sm text-brand-gray-300">
              Sua mensagem foi preparada com todos os itens do pedido. Ao tocar no botao
              abaixo, o WhatsApp abrira com a mensagem pronta para voce conferir e enviar.
            </p>

            <div className="mt-4 border border-brand-gray-700 bg-brand-gray-800 p-3">
              <p className="text-xs text-brand-gray-400">Total dos produtos</p>
              <p className="font-display text-xl font-black text-brand-blue">
                {formatPrice(subtotal)}
              </p>
              <p className="mt-1 text-xs text-brand-gray-500">
                {itemCount} {itemCount === 1 ? 'item' : 'itens'}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <button onClick={openWhatsApp} className="btn-primary w-full py-3.5">
                <MessageCircle size={18} />
                Abrir WhatsApp
              </button>
              <button
                onClick={handleCloseConfirm}
                className="btn-ghost w-full"
              >
                Continuar no carrinho
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-brand-gray-500">
              Nenhum pedido e confirmado automaticamente. O carrinho nao sera esvaziado.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
