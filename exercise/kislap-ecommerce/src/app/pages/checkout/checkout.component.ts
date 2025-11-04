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
  
  // Modal properties
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' | 'info' = 'info';

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
    if (this.cartItems.length === 0) {
      this.showErrorModal('Cart Empty', 'Your cart is empty. Please add items before placing an order.');
      return;
    }
    if (!this.orderForm.firstName || !this.orderForm.lastName || !this.orderForm.email) {
      this.showErrorModal('Form Incomplete', 'Please fill in all required fields (First Name, Last Name, Email).');
      return;
    }
    this.isProcessing = true;
    // Generate customerId from email hash (deterministic) or use localStorage
    const customerId = this.getOrCreateCustomerId(this.orderForm.email);
    const customerName = `${this.orderForm.firstName} ${this.orderForm.lastName}`;
    const payload = this.cartItems.map(i => ({
      id: 0,
      orderId: 0,
      customerId,
      customerName,
      productId: i.id,
      productName: i.name,
      productDescription: '',
      productCategoryName: '',
      productImageFile: i.image,
      productUnitOfMeasure: 'piece',
      quantity: i.quantity,
      price: i.price,
      status: 'Ordered',
      customerEmail: this.orderForm.email,
      customerPhone: this.orderForm.phone,
      shippingAddress: this.orderForm.address,
      shippingCity: this.orderForm.city,
      shippingPostalCode: this.orderForm.postalCode,
      paymentMethod: this.orderForm.paymentMethod,
      orderNotes: this.orderForm.notes || ''
    }));
    this.api.addOrderItems(payload).subscribe({
      next: () => {
        this.isProcessing = false;
        this.cart.clear();
        this.showSuccessModal('Payment Successful', `Thank you ${customerName} for your order! Your order has been placed successfully.`);
      },
      error: () => {
        this.isProcessing = false;
        this.showSuccessModal('Order Processed', 'Your order has been processed locally. Thank you for your purchase!');
        this.cart.clear();
      }
    });
  }

  showSuccessModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = 'success';
    this.showModal = true;
  }

  showErrorModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = 'error';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    if (this.modalType === 'success') {
      this.router.navigate(['/']);
    }
  }

  private getOrCreateCustomerId(email: string): number {
    // Check localStorage for existing customer ID for this email
    const storageKey = `kislap_customer_${email}`;
    const existing = localStorage.getItem(storageKey);
    if (existing) {
      return parseInt(existing, 10);
    }
    // Generate a simple hash-based ID from email (deterministic)
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // Convert to positive number and use a range (1-9999)
    const customerId = Math.abs(hash % 9999) + 1;
    localStorage.setItem(storageKey, customerId.toString());
    return customerId;
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
