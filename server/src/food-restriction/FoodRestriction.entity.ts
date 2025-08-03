import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Recipe } from '../recipe/Recipe.entity';

@Entity()
export class FoodRestriction extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  
  @Column({ type: 'text', nullable: false })
  restriction: string;

  @ManyToMany(() => Recipe, recipe => recipe.foodRestrictions, { nullable: false })
  recipes: Recipe[];
}