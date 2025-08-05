import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from '../recipe/Recipe.entity';

@Entity()
export class FoodType extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  
  @Column({ type: 'text', nullable: false })
  type: string;

  @Column({ type: "text", nullable: true })
  pictureUrl: string;

  @ManyToMany(() => Recipe, recipe => recipe.foodTypes, { nullable: false })
  recipes: Recipe[];
}