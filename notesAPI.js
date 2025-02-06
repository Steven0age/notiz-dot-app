let notes = null;
let currentLoadedID = null;
// const notes = [
//   {
//     id: 1,
//     title: "Testnotiz 1",
//     content: "ich darf nicht vergessen, leckeren Tee einkaufen zu gehen",
//     lastUpdated: "1735744224000",
//   },
//   {
//     id: 2,
//     title: "Testnotiz 2",
//     content: "Wäsche waschen - erst Weißwäsche und ggf. noch die Bunte",
//     lastUpdated: "1735833600000",
//   },
//   {
//     id: 3,
//     title: "Testnotiz 3",
//     content: "Einkaufen: Milch, Eier, Sahne, Mehl, Bier, Bier, Bier",
//     lastUpdated: "1735826400000",
//   },
// ];
// let notes = "";

function saveNote() {
  const currentInputTitle = document.getElementById("note-title-input").value;
  const currentInputContent =
    document.getElementById("note-content-input").value;

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
  let currentID = notes.findIndex((index) => index.id == currentLoadedID);
  console.log("currentLoadedID =", currentLoadedID);
  console.log("currentID =", currentID);

  let removeSelectedClass = document.querySelectorAll(".preview-note");
  removeSelectedClass.forEach((note) => {
    note.classList.remove("note-selected");
  });

  let changeClass = document.getElementById(id);
  changeClass.classList.add("note-selected");

  // console.log("currentLoadedID hat jetzt den Wert", currentLoadedID);

  let loadingTitle = document.getElementById("note-title-input");

  let loadingContent = document.getElementById("note-content-input");

  let loadNeededNote = notes.filter((array) => {
    return array.id === currentLoadedID;
  });

  loadingTitle.value = loadNeededNote[0].title;
  loadingContent.value = loadNeededNote[0].content;
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

function saveToLocalStorage() {
  const JSONNotes = JSON.stringify(notes);
  localStorage.setItem("savedNotes", JSONNotes);
}

function loadFromLocalStorage() {
  const loadNotes = localStorage.getItem("savedNotes");
  var unJSONNotes = JSON.parse(loadNotes);
  notes = unJSONNotes;
}

let newNoteBtnEl = document.querySelector("#new-note");
newNoteBtnEl.addEventListener("click", newNote);

function newNote() {
  let inputTitleEl = document.getElementById("note-title-input");
  let inputContentEl = document.getElementById("note-content-input");

  inputTitleEl.value = "";
  inputContentEl.value = "";
  currentLoadedID = "";

  let removeSelectedClass = document.querySelectorAll(".preview-note");
  removeSelectedClass.forEach((note) => {
    note.classList.remove("note-selected");
  });
}

let deleteBtnEl = document
  .querySelector(".btn-delete")
  .addEventListener("click", deleteNote);

function deleteNote() {
  // console.log("notes am Anfang von deleteNote =", notes);
  // // console.log("notes BEFORE reload form localStorage =", notes);

  // // const loadNotes = localStorage.getItem("savedNotes");
  // // var unJSONNotes = JSON.parse(loadNotes);
  // // notes = unJSONNotes;

  // // console.log("notes AFTER reload form localStorage =", notes);

  let deleteIndex = -1;
  deleteIndex = notes.findIndex((index) => index.id == currentLoadedID);

  // console.log("notes ; before if =", notes);
  // console.log("currentLoadedID ; before if =", currentLoadedID);
  // console.log("deleteIndex, before if =", deleteIndex);

  if (!currentLoadedID || deleteIndex < 0) return;

  // console.log("currentLoadedID ; after if=", currentLoadedID);
  // console.log("notes before pop ; after id=", notes);
  // console.log("deleteIndex ; after if =", deleteIndex);

  // console.log("zu löschende Notiz=", notes[deleteIndex]);
  // // console.log("pop notes =", notes.pop(Number(deleteIndex)));
  notes.splice(deleteIndex, 1);

  // console.log("notes ; after pop =", notes);

  deleteIndex = -1;

  // console.log("deleteIndex ; after reset=", deleteIndex);
  // console.log("notes after pop =", notes);
  // console.log("deleteIndex =", deleteIndex);
  // console.log("currentLoadedID =", currentLoadedID);

  saveToLocalStorage();
  loadStoredNotes();
  newNote();

  // find loaded note
  // pop it
  // loadStoredNotes erneut ausführen
  // if (keine note geladen) return
}
