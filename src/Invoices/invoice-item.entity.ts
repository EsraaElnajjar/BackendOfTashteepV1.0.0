// invoice-item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity()
export class InvoiceItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Invoice, invoice => invoice.items, { onDelete: 'CASCADE' })
    invoice: Invoice;

    @Column()
    productName: string;

    @Column('int')
    quantity: number;

    @Column('float')
    price: number;

    @Column('float')
    total: number;

    @Column({ nullable: true })
    description: string;

}
