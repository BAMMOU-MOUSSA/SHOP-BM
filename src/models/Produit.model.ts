export class Produit {
    constructor(
      public id: number,
      public name: string,         
      public images: string[],     
      public title : String,
      public price: number,         
      public category: string,    
      public description: string,
      public stock : number
    ) {}
  }