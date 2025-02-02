let notes;
let currentLoadedID = "";
console.log("🌍 Vor Funktionsaufruf: currentLoadedID =", currentLoadedID);

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
      title: currentInputTitle,
      content: currentInputContent,
      lastUpdated: Date.now(),
    };

    notes.push(noteObj);
  } else {
    var arrayIndex;
    notes.forEach((value, index) => {
      if (notes[index].id == currentLoadedID) {
        arrayIndex = index;
      }
    });

    noteObj = {
      id: currentLoadedID,
      title: currentInputTitle,
      content: currentInputContent,
      lastUpdated: Date.now(),
    };

    notes.splice(arrayIndex, 1, noteObj);
  }

  saveToLocalStorage();
  loadStoredNotes();
  currentLoadedID = "";
}

function loadNoteToEdit(id) {
  currentLoadedID = id;

  console.log("currentLoadedID hat jetzt den Wert", currentLoadedID);

  let loadingTitle = document.getElementById("note-title-input");

  let loadingContent = document.getElementById("note-content-input");

  let loadNeededNote = notes.filter((array) => {
    return array.id === currentLoadedID;
  });

  loadingTitle.value = loadNeededNote[0].title;
  loadingContent.value = loadNeededNote[0].content;

  console.log(
    "currentLoadedID hat am Ende der Funktion den Wert",
    currentLoadedID
  );
}

// gib eine if Bedingung dazu, die entweder
// A) wenn keine ID gegeben, eine neue Notiz anlegt, oder
// B) wenn ID angegeben, die Notiz mit bestehender/ausgewählter ID findet und überschreibt.

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
