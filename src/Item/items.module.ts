import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item } from './item.entity';
import { Project } from '../projects/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Project])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
