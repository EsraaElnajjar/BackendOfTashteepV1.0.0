// create-invoice-item.dto.ts
export class CreateInvoiceItemDto {
    productName: string;
    quantity: number;
    price: number;
    description?: string;
}
