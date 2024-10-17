import { Controller, Get, Post, Req } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Role } from "src/enums/roles.enum";
import { Roles } from "src/auth/roles.decorator";

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}
    @Get()
    async findAll(): Promise<any[]> {
        return [];
    }
    @Post()
    @Roles(Role.Admin)
    create(@Req() request: Request): string {
        return "a";
    }
}