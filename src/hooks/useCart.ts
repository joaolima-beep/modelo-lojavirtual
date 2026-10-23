import { useCallback, useEffect, useState } from 'react';
import type { CartItem } from '../types';

const STORAGE_KEY = 'pmhouse-cart-v1';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CartItem =>
      item !== null && typeof item === 'object' &&
      ['key', 'productId', 'name', 'slug', 'image', 'size', 'color'].every(
        (field) => typeof item[field] === 'string',
      ) &&
      typeof item.price === 'number' && Number.isFinite(item.price) && item.price >= 0 &&
      Number.isSafeInteger(item.quantity) && item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [justAddedKey, setJustAddedKey] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, 'key'>) => {
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 1) return;
    const key = `${item.productId}-${item.size}-${item.color}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, ...item, key } : i,
        );
      }
      return [...prev, { ...item, key }];
    });
    setJustAddedKey(key);
    window.setTimeout(() => setJustAddedKey(null), 2000);
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (!Number.isSafeInteger(quantity) || quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, quantity } : i)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = items.reduce((sum, i) => {
    const value = Number(i.price) || 0;
    return sum + value * i.quantity;
  }, 0);

  return {
    items,
    itemCount,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    justAddedKey,
  };
}

export type CartContextValue = ReturnType<typeof useCart>;
