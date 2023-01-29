import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {    
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ) {
    }

    // private coffees: Coffee[] = [
    //     {
    //         id: 1,
    //         name: "Shipwreck Roast",
    //         brand: "Buddy Brew",
    //         flavors: ['vanila', 'chocolate']
    //     }, {
    //         id: 2,
    //         name: "Shipwreck Roast 2",
    //         brand: "Nestle",
    //         flavors: ['chocolate']
    //     }
    // ];

    // findAll() {
    //     return this.coffees;
    // }

    // findOne(id: number) {
    //     const coffee = this.coffees.find(e => e.id == id);

    //     if (!coffee) {
    //         // throw new HttpException(`Coffee's is #${id} not found.`, HttpStatus.NOT_FOUND); instead of this
    //         throw new NotFoundException(`Coffee #${id} not found.`);
    //     }

    //     return coffee;
    // }

    // create(createdCoffeeDto: any) {
    //     this.coffees.push(createdCoffeeDto);
    //     return createdCoffeeDto;
    // }

    // update(id: number, updateCoffeeDto: any) {
    //     const existingCoffee = this.findOne(id);
    //     if(existingCoffee) {
    //         //
    //     }
    // }

    // remove(id: number) {
    //     const coffeeIndex = this.coffees.findIndex(e => e.id == id);
    //     if (coffeeIndex >= 0) {
    //         this.coffees.splice(coffeeIndex, 1);
    //     }
    // }


    findAll() {
        return this.coffeeRepository.find();
    }

    async findOne(id: number) {        
        let coffee = await this.coffeeRepository.findOne({where: {id}});
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return coffee;
    }

    create(createdCoffeeDto: CreateCoffeeDto) {
        const coffee = this.coffeeRepository.create(createdCoffeeDto);
        return this.coffeeRepository.save(coffee);
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto
        });
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found.`);
        }

        return this.coffeeRepository.save(coffee);
    }

    async remove(id: number) {
        const coffee = await this.coffeeRepository.findOne({where: {id}});
        return this.coffeeRepository.remove(coffee);
    }
}
