import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";

@Entity()
export class Replay {
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

  @ManyToOne(() => Comment, (comment) => comment.replays)
  comment: Comment;
}
