import { ProductCategory } from 'src/enums/product-category.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ProductCategory,
  })
  category: ProductCategory;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  retailer: string;

  @Column()
  description: string;

  @Column()
  dateCreated: Date

  constructor(name: string, price: number, quantity:number, retailer: string, category: string | undefined, description: string){
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.retailer = retailer;
    this.description = description;
    this.category = category
    ? this.mapToProductCategory(category)
    : ProductCategory.OTHER;
    this.dateCreated = new Date();
  }
  private mapToProductCategory(category: string): ProductCategory {
    if (Object.values(ProductCategory).includes(category as ProductCategory)) {
      return category as ProductCategory;
    }
    throw new Error(`Invalid category: ${category}`);
  }
}
