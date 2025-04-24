// invoice.controller.ts
import { Controller, Post, Body, Delete, Param, Get, Req,Headers } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoices')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) { }

    @Post('/create')
    create(@Body() dto: CreateInvoiceDto) {
        return this.invoiceService.createInvoice(dto);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.invoiceService.deleteInvoice(id);
    }

    @Get()
    findAll() {
        return this.invoiceService.getAllInvoices();
    }
}
