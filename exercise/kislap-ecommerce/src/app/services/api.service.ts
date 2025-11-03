import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getProductCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/products`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/products/${id}`);
  }

  getMenus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/menu`);
  }

  // Orders / Cart
  getCart(customerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/orderitem/${customerId}`, { params: { status: 0 } as any });
  }

  getOrders(customerId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/orderitem/${customerId}`, { params: { status: 1 } as any });
  }

  addOrderItems(items: any[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/orderitems`, items);
  }
}


