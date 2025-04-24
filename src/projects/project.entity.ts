import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from '../Item/item.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  totalCost: number;

  @OneToMany(() => Item, item => item.project, { cascade: true })
  items: Item[];
}
