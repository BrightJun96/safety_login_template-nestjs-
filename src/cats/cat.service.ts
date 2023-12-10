import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat.interface';

@Injectable()
export class CatService {
  private readonly cats: Cat[] = [
    { name: '파이', age: 12, breed: 'no' },
    { name: '베리', age: 4, breed: 'no' },
    { name: '토리', age: 1, breed: 'no' },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
