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
  let noteObj;
  if (!currentLoadedID) {
    noteObj = {
      id: nextFreeID(),
      title: String(currentInputTitleEl.value),
      content: String(currentInputContentEl.value),
      lastUpdated: Date.now(),
    };

    notes.push(noteObj);
    currentLoadedID = noteObj.id;
  } else {
    let arrayIndex;
    notes.forEach((value, index) => {
      if (notes[index].id == currentLoadedID) {
        arrayIndex = index;
      }
    });

    noteObj = {
      id: currentLoadedID,
      title: String(currentInputTitleEl.value),
      content: String(currentInputContentEl.value),
      lastUpdated: Date.now(),
    };

    notes.splice(arrayIndex, 1, noteObj);
  }
}

function deleteNote() {
  let deleteIndex = -1;
  deleteIndex = notes.findIndex((index) => index.id == currentLoadedID);

  if (!currentLoadedID || deleteIndex < 0) return;

  notes.splice(deleteIndex, 1);
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
