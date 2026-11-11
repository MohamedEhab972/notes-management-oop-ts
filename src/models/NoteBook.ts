import { Note } from "./Note";
import { User } from "./User";

/**
 * Composition: the NoteBook CREATES and OWNS its notes.
 * Notes are built inside addNote() and are never handed in from outside,
 * so when a notebook is destroyed its notes are destroyed with it (filled diamond).
 */
export class NoteBook {
  public readonly id: number;
  public name: string;
  private notes: Note[] = [];
  private nextNoteId = 1;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  addNote(title: string, content: string, author: User): Note {
    const note = new Note(this.nextNoteId++, title, content, author);
    this.notes.push(note);
    return note;
  }

  removeNote(noteId: number): boolean {
    const before = this.notes.length;
    this.notes = this.notes.filter((n) => n.id !== noteId);
    return this.notes.length < before;
  }

  getNote(noteId: number): Note | undefined {
    return this.notes.find((n) => n.id === noteId);
  }

  getNotes(): readonly Note[] {
    return this.notes;
  }

  /** Destroying the notebook destroys all of its notes (composition). */
  clear(): void {
    this.notes = [];
  }
}
