import { NoteBook } from "./NoteBook";

/**
 * Base class - User
 * Aggregation: a User HAS many NoteBooks, but notebooks are created outside
 * and passed in, so they can live on without the user (hollow diamond).
 */
export class User {
  public readonly id: number;
  public name: string;
  public email: string;
  private password: string;
  protected phone: string;
  private _age!: number;
  private notebooks: NoteBook[] = [];

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age; // goes through the setter -> validated
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value < 18 || value > 60) {
      throw new RangeError(`Age must be between 18 and 60, received ${value}`);
    }
    this._age = value;
  }

  checkPassword(password: string): boolean {
    return this.password === password;
  }

  // ---------- Aggregation with NoteBook ----------
  addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }

  removeNotebook(notebookId: number): void {
    this.notebooks = this.notebooks.filter((nb) => nb.id !== notebookId);
  }

  getNotebooks(): readonly NoteBook[] {
    return this.notebooks;
  }

  displayInfo(): void {
    console.log(
      `[${this.constructor.name}] #${this.id} | ${this.name} | ${this.email} | ${this.phone} | age ${this.age} | notebooks: ${this.notebooks.length}`,
    );
  }
}
