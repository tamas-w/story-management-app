import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum TaskStage {
  NEW = "new",
  IN_PROGRESS = "in progress",
  DONE = "done",
  ON_HOLD = "on hold",
  REMOVED = "removed",
}

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project: string;

  @Column()
  pic: string;

  @Column({
    type: "enum",
    enum: TaskStage,
    default: TaskStage.NEW,
  })
  task_stage: TaskStage;

  @Column()
  short_description: string;

  @Column()
  description: string;

  @Column()
  assignedTo: string;

  @CreateDateColumn({
    type: "date",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "date",
  })
  updatedAt: Date;
}
