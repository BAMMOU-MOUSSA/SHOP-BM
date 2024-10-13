import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../../models/Produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'https://dummyjson.com/products';
  private categoriesUrl = 'https://dummyjson.com/products/categories';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<{ products: Produit[] }> {
    return this.http.get<{ products: Produit[] }>(this.apiUrl);
  }

  getAllCategories(): Observable<any> {
    return this.http.get('https://dummyjson.com/products/categories');
  }

  searchProduct(term: string): Observable<{ products: Produit[] }> {
    return this.http.get<{ products: Produit[] }>(`https://dummyjson.com/products/search?q=${term}`);
  }
}
