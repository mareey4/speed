export enum BookStatus {
  Analyzed = "Analyzed",
  Submitted = "Submitted",
  Accepted = "Accepted", 
  Rejected = "Rejected"    
}

export class CreateBookDto {
  title: string;
  isbn: string;
  author: string;
  description: string;
  published_date: Date;
  publisher: string;
  updated_date: Date;
  status: BookStatus;
  analysis: string;
  
  constructor() {
    this.status = BookStatus.Submitted; 
  }
  
}
