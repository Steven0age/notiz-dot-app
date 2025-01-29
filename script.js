addEventListener("DOMContentLoaded", loadStoredNotes);

function loadStoredNotes() {
  loadFromLocalStorage();
  sortNotes();
  updateNotesList();
}

function updateNotesList() {
  const notesListElement = document.getElementById("notes-preview-container");
  notesListElement.innerHTML = "";
  notes.forEach((loadNote) => {
    const note = document.createElement("div");
    note.setAttribute("id", loadNote.id);
    note.classList.add("preview-note");

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

function convertDateTime(input) {
  const dateTime = new Date(input);
  return dateTime.toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function sortNotes() {
  notes.sort((a, b) => {
    return b.lastUpdated - a.lastUpdated;
  });
}
