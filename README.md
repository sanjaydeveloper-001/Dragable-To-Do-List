# **Draggable To-Do App**

A fully interactive, responsive, and accessible **drag-and-drop task board** built using **React (no UI frameworks, no DnD libraries)**.
This project completes all requirements defined in the **Meteoros Sensing Internship Assignment – Draggable To-Do App** .

---

## 🚀 **Live Demo**

🔗 **Demo URL:** *Add your Netlify / Vercel link here*

---

## 📦 **Features**

This app satisfies **every checklist item** from the assignment PDF :

### **Board Layout**

* Three required columns: **To Do**, **In Progress**, **Done**
* Correct order and design (matching spec)
* Mobile responsive: columns stack vertically (<768px)

### **Task Management**

* **Create** task (title required, description optional)
* **Edit** task (edit modal)
* **Delete** task with confirmation modal

### **Drag & Drop (Manual Implementation)**

* Reorder tasks within the same column
* Move tasks across columns
* Native drag events only — **no drag libraries**
* Visual feedback:

  * Dragging highlight
  * Placeholder slot
  * Drop target highlight

### **Persistence**

* Tasks saved in **localStorage**
* Restored on page refresh (columns, ordering, and updates)

### **Responsiveness**

* Fully usable on small screens
* No horizontal scrolling

### **Accessibility**

(As recommended in the PDF — partially implemented)

* Focusable tasks (`tabIndex=0`)
* Keyboard movement:

  * **Ctrl + ArrowRight** → move to next column
  * **Ctrl + ArrowLeft** → move to previous column
* Visible focus ring

---

## 🛠️ **Tech Stack**

* **React**
* No UI libraries (Tailwind, Bootstrap, MUI)
* No drag-and-drop libraries
  (*Only `react` and `react-dom` are used as allowed* )

---

## 📁 **Project Structure**

```
src/
│── App.jsx
│── App.css
│── Board.jsx
│── Column.jsx
│── TaskItem.jsx
│── TaskEdit.jsx
│── AddTaskForm.jsx
│── TaskContext.jsx
└── main.jsx
```

---

## ⚙️ **How to Run Locally**

### **1. Clone the repository**

```sh
git clone <your-repo-url>
cd <folder>
```

### **2. Install dependencies**

```sh
npm install
```

### **3. Start development server**

```sh
npm run dev
```

The app runs on:

```
http://localhost:5173/
```

### **4. Build for production**

```sh
npm run build
```

---

## 🧠 **Architecture & Design Decisions**

### **State Management — React Context**

All task/drag operations are stored in a centralized context:

* tasks
* reorderTasks()
* moveTask()
* addTask()
* editTask()
* deleteTask()

This keeps the architecture clean and predictable.

### **Drag & Drop**

Implemented using:

* `dragstart`
* `dragover`
* `dragleave`
* `drop`

No libraries — **manual DOM-based DnD** as required .

### **Persistence**

localStorage key:

```
task-board-tasks
```

Saved:

* columns
* ordering
* task fields

### **UI Design**

All styles handcrafted with raw CSS and follow **exact design tokens**:

* primary color: `#4F46E5`
* page background: `#F8FAFB`
* shadows, spacing, breakpoints, and typography strictly match the spec .

### **Accessibility**

* Every task is keyboard focusable
* Movement shortcuts implemented
* Visible focus-ring for inputs and buttons

---

## ⚠️ **Known Issues**

(Not required but recommended in assignment)

* Keyboard movement works, but ARIA live announcements are not yet implemented.
* Modals do not fully trap focus.
* Drag preview may differ slightly across browsers.
* Animations for reordering are minimal.



(Referencing: *Meteoros Sensing Private Limited — Front-End Internship Assignment* )
