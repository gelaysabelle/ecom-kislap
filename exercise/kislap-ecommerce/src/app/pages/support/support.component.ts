import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
  standalone: false
})
export class SupportComponent {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  };

  faqs = [
    {
      question: 'What makes Kislap products different from regular makeup?',
      answer: 'Kislap products are hybrid makeup-skincare products specifically formulated for Filipino skin. They provide coverage while delivering skincare benefits like hydration, sun protection, and anti-aging properties.'
    },
    {
      question: 'Are Kislap products suitable for sensitive skin?',
      answer: 'Yes! All Kislap products are dermatologist-tested and formulated with gentle, non-comedogenic ingredients. However, we recommend doing a patch test before first use if you have extremely sensitive skin.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days, express shipping takes 2-3 business days, and overnight shipping takes 1 business day. We ship nationwide across the Philippines.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unopened products. If you\'re not satisfied with your purchase, you can return it within 30 days for a full refund or exchange.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within the Philippines. We\'re working on expanding our shipping to other countries soon!'
    },
    {
      question: 'How do I choose the right shade?',
      answer: 'We provide detailed shade guides and virtual try-on tools on our website. You can also contact our beauty consultants for personalized shade matching assistance.'
    }
    ,
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit/debit cards, GCash, and Cash on Delivery (COD) for select areas. Choose your preferred method at checkout.'
    },
    {
      question: 'How much is shipping?',
      answer: 'Standard shipping is free for orders ₱1,000 and up, otherwise a small fee applies. Express (₱150) and Overnight (₱300) options are also available.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes. You will receive a tracking link via email/SMS once your order is dispatched. You can also check status from the “Track Your Order” link on this page.'
    },
    {
      question: 'Can I change or cancel my order after placing it?',
      answer: 'We process orders quickly. If you need changes, contact us within 1 hour of purchase and we’ll do our best to help. Shipped orders can no longer be modified.'
    },
    {
      question: 'Do you charge VAT?',
      answer: 'All displayed prices include 12% VAT. No hidden fees at checkout, aside from optional express/overnight shipping.'
    },
    {
      question: 'What if an item arrives damaged or incorrect?',
      answer: 'Please contact support within 7 days with your order number and photos. We’ll arrange a replacement or refund according to our returns policy.'
    },
    {
      question: 'Are your products cruelty-free and vegan?',
      answer: 'Kislap is cruelty-free. Many items are vegan; check each product page for a full ingredients list and certifications.'
    },
    {
      question: 'Do you offer discounts or promos?',
      answer: 'Yes! Subscribe to our newsletter and follow our social media for exclusive bundles, seasonal promos, and early access drops.'
    }
  ];

  contactInfo = {
    email: 'support@kislap.com',
    phone: '+63 2 1234 5678',
    address: '123 Beauty Street, Makati City, Metro Manila, Philippines',
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM\nSunday: Closed'
  };

  categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'product', label: 'Product Question' },
    { value: 'order', label: 'Order Support' },
    { value: 'shipping', label: 'Shipping & Delivery' },
    { value: 'return', label: 'Returns & Exchanges' },
    { value: 'technical', label: 'Technical Support' }
  ];

  onSubmit() {
    console.log('Contact form submitted:', this.contactForm);
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    this.contactForm = { name: '', email: '', subject: '', message: '', category: 'general' };
  }

  toggleFaq(event: Event) {
    const button = event.target as HTMLElement;
    const faqItem = button.closest('.faq-item');
    if (faqItem) {
      faqItem.classList.toggle('active');
    }
  }
}
