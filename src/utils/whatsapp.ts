import { STORE_CONFIG, formatPrice } from '../data';
import type { CartItem } from '../types';

/**
 * Monta a mensagem de WhatsApp para finalizacao do pedido.
 * Retorna a URL completa no formato https://wa.me/NUMERO?text=MENSAGEM
 */
export function buildWhatsAppUrl(items: CartItem[], subtotal: number, notes?: string): string {
  const lines: string[] = [];

  lines.push('Ola! Gostaria de fazer um pedido na PM HOUSE.');
  lines.push('');

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`   Tamanho: ${item.size}`);
    lines.push(`   Cor: ${item.color}`);
    lines.push(`   Quantidade: ${item.quantity}`);
    lines.push(`   Preco unitario: ${formatPrice(item.price)}`);
    lines.push(`   Subtotal: ${formatPrice(item.price * item.quantity)}`);
    lines.push('');
  });

  lines.push(`Total dos produtos: ${formatPrice(subtotal)}`);
  lines.push('');

  if (notes && notes.trim()) {
    lines.push(`Observacoes: ${notes.trim()}`);
    lines.push('');
  }

  lines.push('Gostaria de confirmar a disponibilidade e combinar a entrega e o pagamento.');

  const message = lines.join('\n');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${STORE_CONFIG.whatsapp}?text=${encoded}`;
}
