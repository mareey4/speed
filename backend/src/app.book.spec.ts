import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './api/books/book.controller';
import { BookService } from './api/books/book.service';

describe('BookController', () => {
  let controller: BookController;

  // Mock BookService with a findAll method
  const mockBookService = {
    findAll: jest.fn().mockResolvedValue(['book1']), // Mock implementation that resolves to ['book1']
  };

  beforeEach(async () => {
    // Create a testing module for the BookController
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController], // Register BookController
      providers: [
        { provide: BookService, useValue: mockBookService }, // Provide the mocked BookService
      ],
    }).compile();

    // Get an instance of the BookController from the testing module
    controller = module.get<BookController>(BookController);
  });

  it('should return an array of books', async () => {
    // Call the findAll method on the controller and assert the result
    expect(await controller.findAll()).toEqual(['book1']);
  });
});
