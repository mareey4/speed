import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto } from './create-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return new this.bookModel(createBookDto).save();
  }

  async update(id: string, createBookDto: CreateBookDto): Promise<Book> {
    return this.bookModel
      .findByIdAndUpdate(id, createBookDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Book> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
