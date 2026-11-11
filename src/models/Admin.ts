import { User } from "./User";
import { NoteBook } from "./NoteBook";

export type NoteAction = "update" | "delete";

/**
 * Inheritance: Admin IS-A User and gets all of its properties/methods,
 * plus the ability to manage notes in any notebook.
 */
export class Admin extends User {
  manageNote(
    notebook: NoteBook,
    noteId: number,
    action: NoteAction,
    newContent?: string,
  ): boolean {
    const note = notebook.getNote(noteId);
    if (!note) {
      console.log(`Admin ${this.name}: note #${noteId} not found`);
      return false;
    }

    if (action === "delete") {
      notebook.removeNote(noteId);
      console.log(`Admin ${this.name}: deleted note #${noteId}`);
    } else {
      note.content = newContent ?? note.content;
      console.log(`Admin ${this.name}: updated note #${noteId}`);
    }
    return true;
  }

  // Override to show that admins print a role tag + protected phone access
  override displayInfo(): void {
    super.displayInfo();
    console.log(`  -> role: ADMIN (contact: ${this.phone})`);
  }
}
