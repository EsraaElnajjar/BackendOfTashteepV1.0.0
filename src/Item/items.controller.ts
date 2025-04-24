import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';
import { ServiceResponse } from './service-response.interface'; // استيراد الواجهة الجديدة

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @Post(':projectId')
  async add(
    @Param('projectId') projectId: number,
    @Body() body: { name: string; cost: number },
  ): Promise<ServiceResponse> {  // تغيير النوع هنا ليكون ServiceResponse
    return this.itemsService.addItem(projectId, body.name, body.cost);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ServiceResponse> {  // تغيير النوع هنا ليكون ServiceResponse
    return this.itemsService.deleteItem(id);
  }

  @Get('/project/:projectId')
  async getItems(@Param('projectId') projectId: number): Promise<Item[]> {
    return this.itemsService.getItemsByProjectId(projectId);
  }

  @Get()
  async getAllItems(): Promise<Item[]> {
    return this.itemsService.getAllItems();
  }


}
