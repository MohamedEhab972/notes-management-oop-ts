/**
 * Generics: Storage<T> can hold any type of data
 * (users, notes, notebooks, numbers, strings, ...).
 */
export class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  /** Removes every item matching the predicate, returns how many were removed. */
  removeItem(predicate: (item: T) => boolean): number {
    const before = this.items.length;
    this.items = this.items.filter((item) => !predicate(item));
    return before - this.items.length;
  }

  getAllItems(): T[] {
    return [...this.items];
  }
}
