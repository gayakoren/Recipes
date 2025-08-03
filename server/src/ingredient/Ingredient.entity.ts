import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Recipe } from "../recipe/Recipe.entity"
import { RcBaseEntity } from "../baseEntity/RcBaseEntity";

@Entity()
export class Ingredient extends RcBaseEntity{
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: false })
  amount: string;

  @Column({ type: "text", nullable: false })
  unit: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, { nullable: false } )
  @JoinColumn({ name: 'recipe_uuid' })
  recipe: Recipe;
}
