import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatService } from './cat.service';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { Public } from 'src/app.public';

@Controller('api/cats')
export class CatsController {
  constructor(private catService: CatService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catService.create(createCatDto);
  }

  @Public()
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}
