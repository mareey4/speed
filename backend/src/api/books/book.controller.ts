import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, BookStatus } from './create-book.dto';

@Controller('api/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(@Query('query') query: string) {
    if (query) {
      return this.bookService.search(query);
    }
    return this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createBookDto: CreateBookDto) {
    return this.bookService.update(id, createBookDto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() statusUpdate: { status: BookStatus }) {
    return this.bookService.updateStatus(id, statusUpdate.status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
