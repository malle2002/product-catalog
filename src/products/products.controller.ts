import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Req } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Role } from "src/enums/roles.enum";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./product.entity";
import { Roles } from "src/auth/roles.decorator";

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService){}
    @Get()
    async findAll(): Promise<Product[]> {
        try {
            return await this.productService.findAll()
        } catch (error) {
            throw new BadRequestException();
        }
    }
    @Post('createProduct')
    @Roles(Role.User)
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }
    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string) {
        return this.productService.findOneById(id);
    }
}