import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() body: { name: string; totalCost: number }): Promise<Project> {
    return this.projectsService.createProject(body.name, body.totalCost);
  }

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.getAllProjects();
  }

  @Get('with-items')
  getAllProjectsWithItems(): Promise<Project[]> {
    return this.projectsService.getAllProjectsWithItems();
  }
}
