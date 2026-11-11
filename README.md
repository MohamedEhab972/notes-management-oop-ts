# Notes Management System — TypeScript OOP

A simple notes management system that demonstrates **Inheritance, Composition, Aggregation, Association and Generics** in TypeScript.

## Run

```bash
npm install
npm start
```

## Project Structure

```
src/
├── main.ts            # demo of every requirement
└── models/
    ├── User.ts        # base class (access modifiers + age 18–60 validation)
    ├── Admin.ts       # extends User, manageNote()
    ├── Note.ts        # preview(), author -> User
    ├── NoteBook.ts    # owns its notes: addNote(), removeNote()
    └── Storage.ts     # generic Storage<T>
```

## Part B — UML Class Diagram

`+` public · `-` private · `#` protected

```mermaid
classDiagram
    direction TB

    class User {
        +id: number
        +name: string
        +email: string
        -password: string
        #phone: string
        -_age: number
        -notebooks: NoteBook[]
        +age: number
        +checkPassword(password: string) boolean
        +addNotebook(notebook: NoteBook) void
        +removeNotebook(notebookId: number) void
        +getNotebooks() NoteBook[]
        +displayInfo() void
    }

    class Admin {
        +manageNote(notebook: NoteBook, noteId: number, action: NoteAction, newContent?: string) boolean
        +displayInfo() void
    }

    class Note {
        +id: number
        +title: string
        +content: string
        +author: User
        +userId: number
        +preview(length: number) string
    }

    class NoteBook {
        +id: number
        +name: string
        -notes: Note[]
        -nextNoteId: number
        +addNote(title: string, content: string, author: User) Note
        +removeNote(noteId: number) boolean
        +getNote(noteId: number) Note
        +getNotes() Note[]
        +clear() void
    }

    class Storage~T~ {
        -items: T[]
        +addItem(item: T) void
        +removeItem(predicate: (item: T) => boolean) number
        +getAllItems() T[]
    }

    User <|-- Admin : Inheritance
    NoteBook *-- "0..*" Note : Composition
    User "1" o-- "0..*" NoteBook : Aggregation
    Note "0..*" --> "1" User : Association (author)
```

## Relationships

| Relationship | Classes | UML symbol | Explanation |
|---|---|---|---|
| **Inheritance** | `Admin` → `User` | hollow triangle `<|--` | Admin *is a* User and inherits all its properties and methods, adding `manageNote()`. |
| **Composition** | `NoteBook` ◆— `Note` | filled diamond `*--` | NoteBook creates notes inside `addNote()` and owns them; deleting the notebook deletes its notes. A note can't exist without its notebook. |
| **Aggregation** | `User` ◇— `NoteBook` | hollow diamond `o--` | A user owns many notebooks, but notebooks are created separately and keep existing if they're removed from the user. |
| **Association** | `Note` → `User` | plain arrow `-->` | Each note references its author (`author` / `userId`); both live independently. |
| **Generics** | `Storage<T>` | — | Stores any type, e.g. `Storage<User>`, `Storage<string>`. |
