import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Replay } from "./Replay";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  profile: string;

  @Column()
  content: string;

  @Column({
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
  })
  date: string;

  @Column({ default: 0, nullable: true })
  upvote: number;

  @OneToMany(() => Replay, (replay) => replay.comment, { cascade: true })
  replays: Replay[];
}
