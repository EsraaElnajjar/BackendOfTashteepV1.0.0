// create-invoice.dto.ts
import { CreateInvoiceItemDto } from './create-invoice-item.dto';
import { Type } from 'class-transformer';
import { IsOptional, IsDate } from 'class-validator';
export class CreateInvoiceDto {
    projectName: string;
    itemName: string;
    invoiceType: string;
    invoiceImage?: string;
    items: CreateInvoiceItemDto[];
    createdBy:string;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date?: Date;
}


