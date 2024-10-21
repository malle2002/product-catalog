
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCategory } from 'src/enums/product-category.enum';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOneById(id: string): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id });
  }

  findByCategory(category:string): Promise<Product | null> {
    const productCategory = this.mapToProductCategory(category);

    return this.productsRepository.findOneBy({ category: productCategory });
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }

  async create(createProductDto: CreateProductDto): Promise<Product>{
    const newProduct = new Product(
      createProductDto.name,
      createProductDto.price,
      createProductDto.quantity,
      createProductDto.retailer,
      createProductDto.category,
      createProductDto.description
    );
    const product = await this.productsRepository.create(newProduct);
    await this.productsRepository.save(product);
    return product;
  }
  private mapToProductCategory(category: string): ProductCategory {
    if (Object.values(ProductCategory).includes(category as ProductCategory)) {
      return category as ProductCategory;
    }
    throw new Error(`Invalid category: ${category}`);
  }
}