import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get('https://dummyjson.com/products');
  }

  getAllCategories(): Observable<any> {
    return this.http.get('https://dummyjson.com/products/categories');
  }

  getProductByCategory(category: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/category/${category}`);
  }

  searchProduct(produit: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/search?q=${produit}`);
  }
}
