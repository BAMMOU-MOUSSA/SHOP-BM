export class Produit {
    constructor(
      public id: number,
      public nom: string,         
      public images: string,     
      public title : String,
      public price: number,         
      public categorie: string,    
      public description: string,
      public stock : number
    ) {}
  }