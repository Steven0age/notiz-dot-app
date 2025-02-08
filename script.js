let notes = null;
let currentLoadedID = null;

let notesListEl = document.getElementById("notes-preview-container");
let currentInputTitleEl = document.getElementById("note-title-input");
let currentInputContentEl = document.getElementById("note-content-input");
let previewNotesEl = document.querySelectorAll(".preview-note");
let newNoteBtnEl = document.querySelector("#new-note");
let deleteBtnEl = document.querySelector(".btn-delete");

addEventListener("DOMContentLoaded", loadStoredNotes);
deleteBtnEl.addEventListener("click", deleteNote);
newNoteBtnEl.addEventListener("click", newNote);

function loadStoredNotes() {
  loadFromLocalStorage();
  sortNotes();
  updateNotesList();
}

function sortNotes() {
  if (!notes) {
    notes = [];
  }
  notes.sort((a, b) => {
    return b.lastUpdated - a.lastUpdated;
  });
}

function updateNotesList() {
  notesListEl.innerHTML = "";
  notes.forEach((loadNote) => {
    const note = document.createElement("div");
    note.setAttribute("id", loadNote.id);
    note.classList.add("preview-note");
    note.setAttribute("onclick", `loadNoteToEdit(${loadNote.id})`);

    const headline = document.createElement("h3");
    headline.classList.add("preview-headline");
    const headlineText = document.createTextNode(loadNote.title);

    const content = document.createElement("p");
    content.classList.add("preview-content");
    const contentText = document.createTextNode(loadNote.content);

    const meta = document.createElement("p");
    meta.classList.add("preview-meta");
    const metaText = document.createTextNode(
      convertDateTime(Number(loadNote.lastUpdated))
    );

    headline.appendChild(headlineText);
    content.appendChild(contentText);
    meta.appendChild(metaText);

    note.appendChild(headline);
    note.appendChild(content);
    note.appendChild(meta);
    const allNotes = document.getElementById("notes-preview-container");
    allNotes.appendChild(note);
  });
}
