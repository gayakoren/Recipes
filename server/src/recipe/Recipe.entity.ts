import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { FoodType } from "../food-type/FoodType.entity"
import { FoodRestriction } from "../food-restriction/FoodRestriction.entity"
import { Ingredient } from "../ingredient/Ingredient.entity"
import { Instruction } from "../instruction/Instruction.entity"
import { DifficultyLevel } from "@shared/enums/difficultyLevel.enum"
import { Kosher } from "@shared/enums/Kosher.enum"
import { RcBaseEntity } from "../baseEntity/RcBaseEntity"

@Entity()
export class Recipe extends RcBaseEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "smallint", nullable: false })
  workingTime: number;

  @Column({ type: "smallint", nullable: false })
  makingTime: number;

  @Column({
    type: "enum",
    enum: DifficultyLevel,
    nullable: false,
  })
  difficultyLevel: DifficultyLevel;

  @Column({
    type: "enum",
    enum: Kosher,
    nullable: false,
  })
  kosher: Kosher;

  @Column({ type: "text", nullable: true })
  pictureUrl: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    cascade: true,
  })
  ingredients: Ingredient[];

  @OneToMany(() => Instruction, (instruction) => instruction.recipe, {
    cascade: true,
  })
  instructions: Instruction[];

  @ManyToMany(() => FoodType, (foodType) => foodType.recipes, {
    nullable: false,
  })
  @JoinTable()
  foodTypes: FoodType[];

  @ManyToMany(
    () => FoodRestriction,
    (foodRestriction) => foodRestriction.recipes,
    { nullable: false }
  )
  @JoinTable()
  foodRestrictions: FoodRestriction[];
}
