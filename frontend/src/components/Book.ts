export enum BookStatus {
  Analyzed = "Analyzed",
  Submitted = "Submitted",
  Accepted = "Accepted",  
  Rejected = "Rejected"    
}

export type Book = {
  _id?: string;
  title?: string;
  isbn?: string;
  author?: string;
  description?: string;
  published_date?: Date;
  publisher?: string;
  updated_date?: Date;
  status?: BookStatus;
  analysis?: string; 
};

export const DefaultEmptyBook: Book = {
  _id: undefined,
  title: '',
  isbn: '',
  author: '',
  description: '',
  published_date: undefined,
  publisher: '',
  updated_date: undefined,
  status: BookStatus.Submitted,
  analysis: ''
};