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
  const nextId = Math.max(notes.id);
  const currentInputTitle = document.getElementById("note-title-input").value;
  const currentInputContent =
    document.getElementById("note-content-input").value;
  if (!currentInputTitle || !currentInputContent) {
    alert("Gib bitte eine Überschrift und eine Notiz ein");
    return;
  }
  const noteObj = {
    id: nextFreeId(),
    title: currentInputTitle,
    content: currentInputContent,
    lastUpdated: Date.now(),
  };
  notes.push(noteObj);
  saveToLocalStorage();
  loadStoredNotes();
}

function nextFreeId() {
  let filteredId = notes.map((a) => {
    return a.id;
  });
  // let maxId = Math.max(...filteredId);
  // maxId += 1;

  var lowest = -1;

  console.log("filteredId = ", filteredId);
  if (filteredId.length === 0) {
    filteredId = [0];
    console.log("if 1 hat gefeuert");
  }
  console.log("filteredId = ", filteredId);

  for (i = 0; i < filteredId.length; ++i) {
    if (filteredId[i] != i) {
      lowest = i;
      console.log("if 2 hat gefeuert");
      break;
    }
  }

  if (lowest == -1) {
    lowest = filteredId[filteredId.length - 1] + 1;
    console.log("if 3 hat gefeuert");
  }
  console.log("lowest =", lowest);
  return lowest;
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
