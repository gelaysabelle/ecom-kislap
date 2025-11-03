import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'kislap_cart_items_v1';
  private readonly countSubject = new BehaviorSubject<number>(0);

  private read(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) as CartItem[] : [];
    } catch {
      return [];
    }
  }

  private write(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.updateCount(items);
  }

  getItems(): CartItem[] {
    return this.read();
  }

  getCount$(): Observable<number> {
    if (this.countSubject.value === 0) {
      this.updateCount(this.read());
    }
    return this.countSubject.asObservable();
  }

  addItem(item: CartItem): void {
    const items = this.read();
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.push({ ...item });
    }
    this.write(items);
    // Best-effort sync to backend cart (status 0) with a demo customerId
    this.syncItemsToBackend([{ ...item, quantity: existing ? existing.quantity : item.quantity }], 'Created');
  }

  updateQuantity(id: number, quantity: number): void {
    const items = this.read();
    const item = items.find(i => i.id === id);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.write(items);
    }
  }

  removeItem(id: number): void {
    const items = this.read().filter(i => i.id !== id);
    this.write(items);
  }

  clear(): void {
    this.write([]);
  }

  private updateCount(items: CartItem[]): void {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    this.countSubject.next(count);
  }

  constructor(private api: ApiService) {}

  private syncItemsToBackend(items: CartItem[], status: 'Created' | 'Ordered'): void {
    const customerId = 1; // demo user
    const payload = items.map(i => ({
      id: 0,
      orderId: 0,
      customerId,
      customerName: 'Guest',
      productId: i.id,
      productName: i.name,
      productDescription: '',
      productCategoryName: '',
      productImageFile: i.image,
      productUnitOfMeasure: 'piece',
      quantity: i.quantity,
      price: i.price,
      status
    }));
    this.api.addOrderItems(payload).subscribe({ next: () => {}, error: () => {} });
  }
}


