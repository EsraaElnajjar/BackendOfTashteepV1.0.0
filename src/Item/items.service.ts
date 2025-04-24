import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { Project } from '../projects/project.entity';
import { ServiceResponse } from './service-response.interface';  // استيراد الواجهة الجديدة

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  // دالة لإضافة بند جديد للمشروع مع التحقق من التكلفة المتبقية
  async addItem(projectId: number, itemName: string, itemCost: number): Promise<ServiceResponse> {
    // الحصول على المشروع بناءً على المعرف
    const project = await this.projectsRepository.findOne({ where: { id: projectId } });

    if (!project) {
      return { success: false, message: 'المشروع غير موجود' };
    }

    // حساب التكلفة المتبقية للمشروع
    const totalItemCost = await this.itemsRepository
      .createQueryBuilder('item')
      .select('SUM(item.cost)', 'total')
      .where('item.projectId = :projectId', { projectId })
      .getRawOne(); // الحصول على المجموع

    const totalCost = totalItemCost?.total ? parseFloat(totalItemCost.total) : 0; // التأكد من أن القيمة ليست null

    const remainingCost = project.totalCost - totalCost;

    // التحقق إذا كانت تكلفة البند تتجاوز التكلفة المتبقية
    if (itemCost > remainingCost) {
      return { success: false, message: `تكلفة البند (${itemName}) تتجاوز التكلفة المتبقية للمشروع بقيمة ${remainingCost}` };
    }

    // إذا كانت التكلفة مقبولة، نقوم بإنشاء البند الجديد
    const newItem = this.itemsRepository.create({
      name: itemName,
      cost: itemCost,
      project: project,
    });

    const savedItem = await this.itemsRepository.save(newItem);
    return { success: true, message: 'تم إضافة البند بنجاح', item: savedItem };
  }

  // دالة لحذف بند بناءً على معرفه
  async deleteItem(itemId: number): Promise<ServiceResponse> {
    const item = await this.itemsRepository.findOne({ where: { id: itemId } });

    if (!item) {
      return { success: false, message: 'البند غير موجود' };
    }

    await this.itemsRepository.remove(item);
    return { success: true, message: 'تم حذف البند بنجاح' };
  }

  // دالة للحصول على جميع البنود الخاصة بمشروع
  async getItemsByProjectId(projectId: number): Promise<Item[]> {
    return this.itemsRepository.find({ where: { project: { id: projectId } } });
  }

  async getAllItems(): Promise<Item[]> {
    return this.itemsRepository.find(); // هترجع كل البنود من قاعدة البيانات
  }
}
