import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { InvoiceItem } from './invoice-item.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
        @InjectRepository(InvoiceItem) private itemRepo: Repository<InvoiceItem>,
        private jwtService: JwtService
    ) { }

    async createInvoice(dto: CreateInvoiceDto) {
      
    
        const items = dto.items.map(item => {
            const total = item.quantity * item.price;
            return { ...item, total };
        });
    
        const invoiceTotal = items.reduce((sum, item) => sum + item.total, 0);
    
        const invoice = this.invoiceRepo.create({
            projectName: dto.projectName,
            itemName: dto.itemName,
            invoiceType: dto.invoiceType,
            invoiceImage: dto.invoiceImage,
            items,
            total: invoiceTotal,
            createdBy:dto.createdBy, // هنا بنخزن اسم الأدمن
            date: dto.date ?? new Date(),
        });
    
        return this.invoiceRepo.save(invoice);
    }
    

    async deleteInvoice(id: number) {
        return this.invoiceRepo.delete(id);
    }

    async getAllInvoices() {
        return this.invoiceRepo.find({ relations: ['items'] });
    }
}
