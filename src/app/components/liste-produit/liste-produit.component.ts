import { Component } from '@angular/core';
import { Produit } from '../../../models/Produit.model';
import { LignePanier } from '../../../models/lignepanier.model';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})
export class ListeProduitComponent {

  detailsPanier: LignePanier[] = [];
  displayPanier: boolean = false;
  displayHome: boolean = true;
 

  produits: Produit[] = [
    new Produit(1, 'Laptop', 'https://thumb.ac-illust.com/a2/a2dee65bfe54b47c98ad9b8c9ee16133_w.jpeg', 'High-Performance Laptop', 1500, 'Electronics', 'A fast and reliable laptop.', 20),
    new Produit(2, 'Smartphone', 'https://m.media-amazon.com/images/I/716OmvUFy1L._AC_SL1500_.jpg', 'Latest Smartphone', 1000, 'Electronics', 'A sleek smartphone with modern features.', 50),
    new Produit(3, 'Headphones', 'https://i5.walmartimages.com/seo/onn-Wireless-Bluetooth-on-Ear-Headphones-Blue-New_08381ccb-2735-41ff-ac15-9a395d11c6f0.f18e7638c1241cc4cfa547d45de86bf6.jpeg', 'Wireless Headphones', 200, 'Audio', 'Noise-cancelling wireless headphones.', 100),
    new Produit(4, 'Smartwatch', 'https://i5.walmartimages.com/asr/dda6bc1f-d282-4cf9-ad29-e827222bc4d5.8d402328f4d54e2b9a252879ec51fb79.jpeg', 'Smartwatch with GPS', 300, 'Wearables', 'A stylish smartwatch with fitness tracking features.', 30),
    new Produit(5, 'Camera', 'https://pro.sony/s3/2017/09/05105006/Studio-and-Broadcast-Cameras.jpg', 'DSLR Camera', 1200, 'Photography', 'Professional DSLR camera for high-quality images.', 15)
  ];

  produitsFiltres: Produit[] = [...this.produits]; // Liste des produits filtrés à afficher
  
  
  get totalItemsInCart(): number {
    return this.detailsPanier.reduce((acc, item) => acc + item.qte, 0); // Compte le total d'articles dans le panier
  }
  

  onProductAdded($event: Produit) {
    const existingProduct = this.detailsPanier.find(i => i.produit.id === $event.id);
    if (existingProduct) {
      existingProduct.qte++;
    } else {
      const newLignePanier = new LignePanier();
      newLignePanier.produit = $event;
      newLignePanier.qte = 1;
      this.detailsPanier.push(newLignePanier);
    }
    console.log(this.detailsPanier);
  }

  showPanier($event: boolean) {
    this.displayPanier = $event;
    this.displayHome = !this.displayPanier;  // Cacher la page Home quand le panier est affiché
  }

  showHome($event: boolean) {
    this.displayHome = $event;
    this.displayPanier = !this.displayHome;  // Cacher le panier quand la page Home est affichée
    this.produitsFiltres = [...this.produits]; // Réinitialiser la liste pour afficher tous les produits
  }

  showHomeAfterShopping() {
    this.displayPanier = false;
    this.displayHome = true;  // Afficher la page Home quand on continue les achats
    this.produitsFiltres = [...this.produits]; // Afficher tous les produits après avoir quitté le panier
  }

  // Filtrer les produits par catégorie
  onCategorySelected(categorie: string) {
    if (categorie === 'All') {
      this.produitsFiltres = [...this.produits];
    } else {
      this.produitsFiltres = this.produits.filter(p => p.categorie === categorie);
    }
  }
}
