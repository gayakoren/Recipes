import { validateOrReject } from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class RcBaseEntity extends BaseEntity {
  @CreateDateColumn({ select: true, type: 'timestamptz' })
  createDate: Date;

  @DeleteDateColumn({ nullable: true, select: false, type: 'timestamptz' })
  deleteDate: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
