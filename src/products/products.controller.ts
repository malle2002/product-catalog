import { Controller, Get, Post, Req } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}
    @Get()
    async findAll(): Promise<any[]> {
        return [];
    }
    @Post()
    addNew(@Req() request: Request): string {
        return "a";
    }
}