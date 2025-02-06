addEventListener("DOMContentLoaded", loadStoredNotes);
deleteBtnEl.addEventListener("click", deleteNote);
newNoteBtnEl.addEventListener("click", newNote);

function saveToLocalStorage() {
  const JSONNotes = JSON.stringify(notes);
  localStorage.setItem("savedNotes", JSONNotes);
}

function loadFromLocalStorage() {
  const loadNotes = localStorage.getItem("savedNotes");
  var unJSONNotes = JSON.parse(loadNotes);
  notes = unJSONNotes;
}

function saveNote() {
  const currentInputTitle = currentInputTitleEl.value;
  const currentInputContent = currentInputContentEl.value;

  if (!currentInputTitle || !currentInputContent) {
    alert("Gib bitte eine Überschrift und eine Notiz ein");
    return;
  }

  let noteObj;
  if (!currentLoadedID) {
    noteObj = {
      id: nextFreeID(),
      title: String(currentInputTitle),
      content: String(currentInputContent),
      lastUpdated: Date.now(),
    };

    notes.push(noteObj);
    currentLoadedID = noteObj.id;
  } else {
    var arrayIndex;
    notes.forEach((value, index) => {
      if (notes[index].id == currentLoadedID) {
        arrayIndex = index;
      }
    });

    noteObj = {
      id: currentLoadedID,
      title: String(currentInputTitle),
      content: String(currentInputContent),
      lastUpdated: Date.now(),
    };

    notes.splice(arrayIndex, 1, noteObj);
  }

  saveToLocalStorage();
  loadStoredNotes();
  loadNoteToEdit(currentLoadedID);
}

function loadNoteToEdit(id) {
  currentLoadedID = id;
  let previewNotesEl = document.querySelectorAll(".preview-note");
  previewNotesEl.forEach((note) => {
    note.classList.remove("note-selected");
  });

  let changeClass = document.getElementById(id);
  changeClass.classList.add("note-selected");

  let loadNeededNote = notes.filter((array) => {
    return array.id === currentLoadedID;
  });

  currentInputTitleEl.value = loadNeededNote[0].title;
  currentInputContentEl.value = loadNeededNote[0].content;
}

function newNote() {
  currentInputTitleEl.value = "";
  currentInputContentEl.value = "";
  currentLoadedID = "";

  let previewNotesEl = document.querySelectorAll(".preview-note");
  previewNotesEl.forEach((note) => {
    note.classList.remove("note-selected");
  });
}

function deleteNote() {
  let deleteIndex = -1;
  deleteIndex = notes.findIndex((index) => index.id == currentLoadedID);

  if (!currentLoadedID || deleteIndex < 0) return;

  notes.splice(deleteIndex, 1);

  saveToLocalStorage();
  loadStoredNotes();
  newNote();
}
