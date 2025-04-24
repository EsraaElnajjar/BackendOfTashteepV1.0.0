// invoice.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projectName: string;

    @Column()
    itemName: string;

    @Column()
    invoiceType: string;  // مصنعية - خامات

    @Column({ nullable: true })
    invoiceImage: string;

    @OneToMany(() => InvoiceItem, item => item.invoice, { cascade: true })
    items: InvoiceItem[];

    @Column('float')
    total: number;

    @Column()
    createdBy: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;


}
