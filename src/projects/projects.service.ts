import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  createProject(name: string, totalCost: number): Promise<Project> {
    const project = this.projectRepo.create({ name, totalCost });
    return this.projectRepo.save(project);
  }

  getAllProjects(): Promise<Project[]> {
    return this.projectRepo.find();
  }
  
  getAllProjectsWithItems(): Promise<Project[]> {
    return this.projectRepo.find({
      relations: ['items'],
    });
  }
  
}
