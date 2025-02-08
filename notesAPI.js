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

function nextFreeID() {
  let lowestUnusedNumber = -1;

  const existingIDs = notes.map((note) => note.id);

  if (existingIDs.length === 0) {
    lowestUnusedNumber = 1;
    return lowestUnusedNumber;
  }

  existingIDs.sort((a, b) => a - b);

  for (let i = 0; i < existingIDs.length; ++i) {
    if (existingIDs[i] != i + 1) {
      lowestUnusedNumber = i + 1;
      break;
    }
  }

  if (lowestUnusedNumber == -1) {
    lowestUnusedNumber = existingIDs[existingIDs.length - 1] + 1;
  }

  return lowestUnusedNumber;
}
