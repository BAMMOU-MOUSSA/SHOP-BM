// src/app/services/panier.service.ts
import { Injectable } from '@angular/core';
import { LignePanier } from '../../models/lignepanier.model';
import { Produit } from '../../models/Produit.model';


@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private detailsPanier: LignePanier[] = [];

  // Ajouter un produit au panier
  addProductToCart(product: Produit): void {
    const existingProduct = this.detailsPanier.find(item => item.produit.id === product.id);
    if (existingProduct) {
      if (existingProduct.qte < existingProduct.produit.stock) {
        existingProduct.qte++;
      } else {
        console.error('Stock insuffisant pour le produit:', product);
      }
    } else {
      if (product.stock > 0) {
        const newLignePanier = new LignePanier();
        newLignePanier.produit = product;
        newLignePanier.qte = 1;
        this.detailsPanier.push(newLignePanier);
      } else {
        console.error('Produit en rupture de stock:', product);
      }
    }
  }

  // Obtenir tous les articles du panier
  getCartItems(): LignePanier[] {
    return this.detailsPanier;
  }

  // Calculer le total d'articles dans le panier
  get totalItemsInCart(): number {
    return this.detailsPanier.reduce((acc, item) => acc + item.qte, 0);
  }

  // Calculer le prix total du panier
  get totalPrice(): number {
    return this.detailsPanier.reduce((acc, item) => acc + (item.qte * item.produit.price), 0);
  }

  // Vider le panier
  clearCart(): void {
    this.detailsPanier = [];
  }
}
