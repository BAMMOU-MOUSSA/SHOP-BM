import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Input() panier!: boolean;
  @Output() panierSelected = new EventEmitter<boolean>();

  @Input() productItms!: boolean;
  @Output() homeSelected = new EventEmitter<boolean>();

  afficherPanier() {
    // Quand "Mon Panier" est cliqué, afficher le panier et cacher les produits
    this.panierSelected.emit(true);  // On affiche le panier
    this.homeSelected.emit(false);   // On cache les produits
  }

  afficherHome() {
    // Quand "Home" est cliqué, afficher les produits et cacher le panier
    this.panierSelected.emit(false);  // On cache le panier
    this.homeSelected.emit(true);     // On affiche les produits
  }
}
