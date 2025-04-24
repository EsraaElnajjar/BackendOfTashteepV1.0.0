import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  cost: number;

  @ManyToOne(() => Project, project => project.items, { onDelete: 'CASCADE' })
  project: Project;
}
