import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  isbn: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  description: string;

  @Prop({ type: Date })
  published_date: Date;

  @Prop()
  publisher: string;

  @Prop({ type: Date, default: Date.now })
  updated_date: Date;

  @Prop({ default: '' })
  analysis: string;

  @Prop({ default: '' })
  se_practice: string;

  @Prop({ default: '' })
  claim: string;

  @Prop({ default: '' })
  result: string;

  @Prop({ default: '' })
  research_type: string;

  @Prop({ type: String, default: 'Pending' })
  moderation_status: 'Pending' | 'Approved' | 'Rejected';
}

export const BookSchema = SchemaFactory.createForClass(Book);
