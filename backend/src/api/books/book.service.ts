import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './book.schema';
import { CreateBookDto } from './create-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel
      .find({ moderation_status: { $nin: ['Pending', 'Rejected'] } })
      .exec();
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).exec();
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel({
      ...createBookDto,
      moderation_status: 'Pending',
    });
    return newBook.save();
  }

  async update(id: string, createBookDto: CreateBookDto): Promise<Book> {
    return this.bookModel
      .findByIdAndUpdate(id, createBookDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Book> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }

  async search(query: string): Promise<Book[]> {
    return this.bookModel
      .find({
        title: { $regex: query, $options: 'i' },
      })
      .exec();
  }

  async updateModerationStatus(
    id: string,
    moderationStatus: string,
  ): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(
        id,
        { moderation_status: moderationStatus },
        { new: true },
      )
      .exec();

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return updatedBook;
  }
}
