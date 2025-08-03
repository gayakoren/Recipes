import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm"
import { Recipe } from "../recipe/Recipe.entity"
import { RcBaseEntity } from "../baseEntity/RcBaseEntity";

@Entity()
@Unique(['recipe', 'step']) 
export class Instruction extends RcBaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "smallint", nullable: false })
  step: number;

  @Column({ type: "text", nullable: false })
  description: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.instructions, { nullable: false } )
  @JoinColumn({ name: 'recipe_uuid' }) 
  recipe: Recipe;
}
