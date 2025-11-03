import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: false
})
export class CheckoutComponent implements OnInit {
  orderForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    notes: ''
  };

  cartItems: CartItem[] = [];

  shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', price: 0, days: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 150, days: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', price: 300, days: '1 business day' }
  ];

  selectedShipping = 'standard';
  isProcessing = false;

  constructor(private cart: CartService, private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.cartItems = this.cart.getItems();
  }

  get subtotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  get shippingCost() {
    const method = this.shippingMethods.find(m => m.id === this.selectedShipping);
    return method ? method.price : 0;
  }

  get tax() {
    return Math.round(this.subtotal * 0.12); // 12% VAT
  }

  get total() {
    return this.subtotal + this.shippingCost + this.tax;
  }

  onSubmit() {
    if (this.cartItems.length === 0) { return; }
    this.isProcessing = true;
    const customerId = 1; // demo user
    const payload = this.cartItems.map(i => ({
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
      status: 'Ordered'
    }));
    this.api.addOrderItems(payload).subscribe({
      next: () => {
        this.isProcessing = false;
        this.cart.clear();
        window.alert('Payment successful! Thank you for your order.');
        this.router.navigate(['/']);
      },
      error: () => {
        this.isProcessing = false;
        window.alert('Payment simulated locally (backend unreachable).');
        this.cart.clear();
        this.router.navigate(['/']);
      }
    });
  }

  updateQuantity(itemId: number, change: number) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (!item) { return; }
    const newQty = Math.max(1, item.quantity + change);
    item.quantity = newQty;
    this.cart.updateQuantity(itemId, newQty);
  }

  removeItem(itemId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.cart.removeItem(itemId);
  }
}
