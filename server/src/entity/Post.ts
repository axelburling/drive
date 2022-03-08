import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  url: string;

  @Column({
    name: "created_at",
    type: "varchar",
    length: "255",
    nullable: true
  })
  createdAt: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  ownerId: string;

  @Column({ type: "varchar", length: 255, nullable: true, array: true })
  viewers: string[];
}
