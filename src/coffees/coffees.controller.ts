import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService) {};

  // @Get()
  // findAll() {
  //     return "this request is handle for fetching all coffees..";
  // }

  // @Get()
  // findAll(@Res() response) {
  //     return response.status(200).send("this request is handle for fetching all coffees..");
  // }

//   @Get()
//   findAll(@Query() paginationQuery) {
//     let { limit, offset, message } = paginationQuery;
//     return `this is query string request limit is ${limit} and offset is ${offset} and message is ${message}`;
//   }

//   @Get('/flavor')
//   findByFlavour() {
//     return 'this request is handle for fetching all coffees by flavor..';
//   }

  // for get all params
  // @Get(":id")
  // findOne(@Param() params) {
  //     return `this request find the id and use inside the function, (Id is #${params.id})`;
  // }

  // for get specific param
//   @Get(':id')
//   findOne(@Param('id') id: number) {
//     return `this request find the id and use inside the function, (Id is #${id})`;
//   }

  // get all params
  // @Post()
  // create(@Body() body) {
  //     return body;
  // }

  // // get all specific param
  // @Post()
  // create(@Body('name') body) {
  //     return body;
  // }

  // get all params with custom status code
//   @Post()
//   @HttpCode(HttpStatus.GONE)
//   create(@Body() body) {
//     return body;
//   }

//   @Patch(':id')
//   update(@Param('id') id: number, @Body('name') name) {
//     return `this request is for patch request the id is ${id} and body is ${name}`;
//   }

//   @Delete(':id')
//   remove(@Param('id') id: number) {
//     return `this request is for delete the id is ${id}`;
//   }


    // Using services

    @Get()
    findAll() {
        return this.coffeeService.findAll();
    }

    @Get(":id")
    findOne(@Param('id') id: number) {
        return this.coffeeService.findOne(id);
    }

    @Post()
    create(@Body() createCoffeeBody: CreateCoffeeDto) {
        return this.coffeeService.create(createCoffeeBody);
    }

    @Patch(":id")
    update(@Param('id') id: number, @Body() updateCoffeeBody: UpdateCoffeeDto) {
        return this.coffeeService.update(id, updateCoffeeBody);
    }

    @Delete(":id")
    remove(@Param('id') id: number) {
        return this.coffeeService.remove(id);
    }
}

