import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'float', nullable: false })
  temperature: number;

  @CreateDateColumn({ type: 'date' })
  date: Date;
}
