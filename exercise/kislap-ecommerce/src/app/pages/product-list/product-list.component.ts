import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: false
})
export class ProductListComponent implements OnInit {
  constructor(private router: Router, private cart: CartService, private api: ApiService) {}

  products: any[] = [
    { id: 1, name: 'Kislap Glow Serum', price: 899, originalPrice: 1199, image: 'https://via.placeholder.com/300x300/E91E63/FFFFFF?text=Glow+Serum', description: 'Hybrid makeup-skincare serum for that perfect Filipino glow', category: 'Skincare', rating: 4.8, reviews: 124, badge: 'Best Seller', inStock: true },
    { id: 2, name: 'Kislap Foundation', price: 1299, originalPrice: null, image: 'https://via.placeholder.com/300x300/F8BBD9/FFFFFF?text=Foundation', description: 'Full coverage foundation with skincare benefits', category: 'Foundation', rating: 4.6, reviews: 89, badge: 'New', inStock: true },
    { id: 3, name: 'Kislap Lip Tint', price: 599, originalPrice: 799, image: 'https://via.placeholder.com/300x300/FCE4EC/FFFFFF?text=Lip+Tint', description: 'Long-lasting lip tint with moisturizing properties', category: 'Lip', rating: 4.9, reviews: 156, badge: 'Popular', inStock: true },
    { id: 4, name: 'Kislap Eye Cream', price: 799, originalPrice: null, image: 'https://via.placeholder.com/300x300/F3E5F5/FFFFFF?text=Eye+Cream', description: 'Anti-aging eye cream with subtle shimmer', category: 'Eye Care', rating: 4.7, reviews: 67, badge: 'Limited', inStock: false },
    { id: 5, name: 'Kislap Blush', price: 699, originalPrice: null, image: 'https://via.placeholder.com/300x300/F48FB1/FFFFFF?text=Blush', description: 'Natural-looking blush with skincare benefits', category: 'Cheek', rating: 4.5, reviews: 98, badge: null, inStock: true },
    { id: 6, name: 'Kislap Moisturizer', price: 999, originalPrice: 1299, image: 'https://via.placeholder.com/300x300/E91E63/FFFFFF?text=Moisturizer', description: 'Daily moisturizer with subtle highlighting properties', category: 'Skincare', rating: 4.8, reviews: 203, badge: 'Best Seller', inStock: true },
    { id: 7, name: 'Kislap Sunscreen SPF50', price: 499, originalPrice: null, image: 'https://via.placeholder.com/300x300/E91E63/FFFFFF?text=Sunscreen', description: 'Broad-spectrum SPF50 sunscreen with lightweight formula', category: 'Skincare', rating: 4.7, reviews: 45, badge: null, inStock: true },
    { id: 8, name: 'Kislap Night Repair Serum', price: 1099, originalPrice: null, image: 'https://via.placeholder.com/300x300/E91E63/FFFFFF?text=Night+Serum', description: 'Night repair serum for deep hydration and repair', category: 'Serum', rating: 4.8, reviews: 76, badge: null, inStock: true }
  ];
  categories: string[] = ['All', 'Skincare', 'Foundation', 'Lip', 'Eye Care', 'Cheek', 'Serum'];
  selectedCategory = 'All';
  sortBy = 'name';
  searchTerm = '';

  filteredProducts = this.products;

  ngOnInit(): void {
    this.filteredProducts = [...this.products];
    this.sortProducts();
    // Try to load from backend; fallback to hardcoded if unreachable
    this.api.getProductCategories().subscribe({
      next: (categories: any[]) => {
        const flattened: any[] = [];
        const cats = new Set<string>();
        categories.forEach((c: any) => {
          if (c.categoryName) { cats.add(c.categoryName); }
          (c.products || []).forEach((p: any) => {
            flattened.push({
              id: p.id,
              name: p.name,
              price: parseFloat(p.price) || 0,
              originalPrice: null,
              image: p.imageFile || 'https://via.placeholder.com/300x300/E0E0E0/000000?text=Product',
              description: p.description,
              category: p.categoryName,
              rating: 5,
              reviews: 0,
              badge: null,
              inStock: true
            });
          });
        });
        if (flattened.length) {
          this.products = flattened;
          this.filteredProducts = [...this.products];
          this.categories = ['All', ...Array.from(cats)];
          this.sortProducts();
        }
      },
      error: () => {}
    });
  }

  addToCart(product: any) {
    if (!product?.inStock) { return; }
    this.cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    // Stay on the list so users can add multiple items; header count updates live
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  onSortChange(sortBy: string) {
    this.sortBy = sortBy;
    this.sortProducts();
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    this.sortProducts();
  }

  sortProducts() {
    this.filteredProducts.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }
}
