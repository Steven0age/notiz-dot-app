const notes = [
  {
    id: 1,
    title: "Testnotiz 1",
    content: "ich darf nicht vergessen, leckeren Tee einkaufen zu gehen",
    lastUpdated: "1735744224000",
  },
  {
    id: 2,
    title: "Testnotiz 2",
    content: "Wäsche waschen - erst Weißwäsche und ggf. noch die Bunte",
    lastUpdated: "1735833600000",
  },
  {
    id: 3,
    title: "Testnotiz 3",
    content: "Einkaufen: Milch, Eier, Sahne, Mehl, Bier, Bier, Bier",
    lastUpdated: "1735826400000",
  },
];

addEventListener("DOMContentLoaded", loadStoredNotes);

function loadStoredNotes() {
  sortNotes();

  notes.forEach((loadNote) => {
    const note = document.createElement("div");
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
    console.log(note);
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
