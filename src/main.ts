import { User } from "./models/User";
import { Admin } from "./models/Admin";
import { NoteBook } from "./models/NoteBook";
import { Storage } from "./models/Storage";

console.log("===== 1. User (access modifiers + age validation) =====");
const mohamed = new User(1, "Mohamed", "mohamed@mail.com", "123456", "01000000000", 25);
mohamed.displayInfo();
try {
  new User(2, "Kid", "kid@mail.com", "pass", "0111", 15);
} catch (err) {
  console.log("Validation error:", (err as Error).message);
}

console.log("\n===== 2. Inheritance (Admin extends User) =====");
const admin = new Admin(99, "Admin", "admin@mail.com", "admin", "01200000000", 40);
admin.displayInfo();

console.log("\n===== 4. Composition (NoteBook owns its Notes) =====");
const work = new NoteBook(1, "Work");
const n1 = work.addNote("Meeting", "Discuss the new sprint plan with the backend team", mohamed);
work.addNote("Todo", "Finish OOP assignment", mohamed);
console.log(`Notebook "${work.name}" has ${work.getNotes().length} notes`);

console.log("\n===== 3 & 6. Note preview + Association (author) =====");
console.log(`preview(): "${n1.preview()}"`);
console.log(`author: ${n1.author.name} (userId = ${n1.userId})`);

console.log("\n===== 5. Aggregation (User has many NoteBooks) =====");
const personal = new NoteBook(2, "Personal");
mohamed.addNotebook(work);
mohamed.addNotebook(personal);
console.log(`${mohamed.name} notebooks:`, mohamed.getNotebooks().map((nb) => nb.name));
mohamed.removeNotebook(personal.id);
console.log(`After removing, "${personal.name}" notebook still exists independently: id=${personal.id}`);

console.log("\n===== Admin manages notes =====");
admin.manageNote(work, 1, "update", "Sprint plan updated by admin");
console.log(`Note #1 content now: "${work.getNote(1)?.content}"`);
admin.manageNote(work, 2, "delete");
console.log(`Notes left in "${work.name}": ${work.getNotes().length}`);

console.log("\n===== 7. Generics (Storage<T>) =====");
const userStorage = new Storage<User>();
userStorage.addItem(mohamed);
userStorage.addItem(admin);
console.log("Users:", userStorage.getAllItems().map((u) => u.name));
userStorage.removeItem((u) => u.id === 99);
console.log("After remove:", userStorage.getAllItems().map((u) => u.name));

const tags = new Storage<string>();
tags.addItem("urgent");
tags.addItem("backend");
console.log("Tags:", tags.getAllItems());
