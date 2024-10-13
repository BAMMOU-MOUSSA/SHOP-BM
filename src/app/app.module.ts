import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeProduitComponent } from './components/liste-produit/liste-produit.component';
import { PanierComponent } from './components/panier/panier.component';
import { ProducItemsComponent } from './components/produc-items/produc-items.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProduitService } from './services/produit.service';
import { PanierService } from './services/panier.service';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListeProduitComponent,
    PanierComponent,
    ProducItemsComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [ProduitService,PanierService,provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
