export type Book = {
    _id?: string;
    title?: string;
    isbn?: string;
    author?: string;
    description?: string;
    published_date?: Date;
    publisher?: string;
    updated_date?: Date;
    analysis?: string;
    se_practice?: string;
    claim?: string;
    result?: string;
    research_type?: string;
    moderation_status: "Pending" | "Approved" | "Rejected";
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
    analysis: '',
    se_practice: '',
    claim: '',
    result: '',
    research_type: '',
    moderation_status: 'Pending'
  }
