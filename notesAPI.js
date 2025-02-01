let notes = "";
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

// Add get data from current note - DONE
// Add info to Array - DONE
// add array to local storrage

function saveNote() {
  const nextId = nextFreeID();
  const currentInputTitle = document.getElementById("note-title-input").value;
  const currentInputContent =
    document.getElementById("note-content-input").value;
  if (!currentInputTitle || !currentInputContent) {
    alert("Gib bitte eine Überschrift und eine Notiz ein");
    return;
  }
  const noteObj = {
    id: nextId,
    title: currentInputTitle,
    content: currentInputContent,
    lastUpdated: Date.now(),
  };
  notes.push(noteObj);
  saveToLocalStorage();
  loadStoredNotes();
}

function nextFreeID() {
  let lowestFreeID = -1;

  const existingIDs = notes.map((note) => note.id);

  if (existingIDs.length === 0) {
    lowestFreeID = 1;
    return lowestFreeID;
  }

  existingIDs.sort((a, b) => {
    return a - b;
  });

  for (i = 0; i < existingIDs.length; ++i) {
    if (existingIDs[i] != i + 1) {
      lowestFreeID = i + 1;
      break;
    }
  }

  if (lowestFreeID == -1) {
    lowestFreeID = existingIDs[existingIDs.length - 1] + 1;
  }

  return lowestFreeID;
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
