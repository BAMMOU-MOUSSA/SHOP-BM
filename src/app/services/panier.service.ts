import { Injectable } from '@angular/core';
import { LignePanier } from '../../models/lignepanier.model';
 

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  
  private detailsPanier: LignePanier[] = [];

  // Ajouter un produit au panier
  addProductToCart(product: any): void {
    const existingProduct = this.detailsPanier.find(item => item.produit.id === product.id);
    if (existingProduct) {
      existingProduct.qte++;
    } else {
      const newLignePanier = new LignePanier();
      newLignePanier.produit = product;
      newLignePanier.qte = 1;
      this.detailsPanier.push(newLignePanier);
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
}
