import { User } from "./User";

/**
 * Association: every Note references its author (a User).
 * Both objects exist independently; the note just "knows" who wrote it.
 */
export class Note {
  public readonly id: number;
  public title: string;
  public content: string;
  public readonly author: User;

  constructor(id: number, title: string, content: string, author: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
  }

  /** userId as required in the assignment -> reference to the author */
  get userId(): number {
    return this.author.id;
  }

  preview(length = 20): string {
    return this.content.length > length
      ? `${this.content.slice(0, length)}...`
      : this.content;
  }
}
