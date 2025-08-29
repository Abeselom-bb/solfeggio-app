const intervals = {
  minor2: 1,
  major2: 2,
  minor3: 3,
  major3: 4,
  perfect4: 5,
  perfect5: 7
};

const pianoNotes = [
  "C4", "C#4", "D4", "D#4", "E4",
  "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
  "C5", "C#5", "D5", "D#5", "E5",
  "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5"
];

let currentInterval = null;
let rootNoteIndex = null;

function playNote(note, duration = "8n") {
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease(note, duration);
}

function getRandomNoteIndex() {
  return Math.floor(Math.random() * (pianoNotes.length - 7));
}

function highlightKeys(note1, note2 = null) {
  document.querySelectorAll(".key").forEach(k => k.classList.remove("active", "hidden-note"));

  const key1 = document.querySelector(`.key[data-note="${note1}"]`);
  if (key1) key1.classList.add("active");

  if (note2) {
    const key2 = document.querySelector(`.key[data-note="${note2}"]`);
    if (key2) key2.classList.add("active", "hidden-note");
  }
}

function revealSecondKey() {
  const key = document.querySelector(".key.hidden-note");
  if (key) key.classList.remove("hidden-note");
}

function createPiano() {
  const container = document.querySelector(".piano-container");
  container.innerHTML = ""; // Clear previous
  const piano = document.createElement("div");
  piano.className = "piano";
  piano.id = "piano";
  container.appendChild(piano);

  let whiteIndex = 0;

  pianoNotes.forEach(note => {
    const isSharp = note.includes("#");
    const key = document.createElement("div");
    key.className = isSharp ? "black-key key" : "white-key key";
    key.dataset.note = note;
    key.textContent = !isSharp ? note.replace("4", "").replace("5", "") : "";
    
    if (!isSharp) {
      key.style.setProperty("--i", whiteIndex++);
    } else {
      key.style.setProperty("--i", whiteIndex - 1); // align sharp with previous white
    }

    key.addEventListener("click", () => playNote(note));
    piano.appendChild(key);
  });
}

createPiano();

// Play interval
document.getElementById("playBtn").addEventListener("click", async () => {
  await Tone.start();

  const index = getRandomNoteIndex();
  rootNoteIndex = index;

  const intervalKeys = Object.keys(intervals);
  const selected = intervalKeys[Math.floor(Math.random() * intervalKeys.length)];
  currentInterval = selected;

  const note1 = pianoNotes[index];
  const note2 = pianoNotes[index + intervals[selected]];

  highlightKeys(note1, note2);
  playNote(note1);
  setTimeout(() => playNote(note2), 1000);
});

// Answer form
document.getElementById("intervalForm").addEventListener("submit", e => {
  e.preventDefault();
  const selected = document.querySelector('input[name="interval"]:checked').value;
  const feedback = document.getElementById("feedback");

  if (selected === currentInterval) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "limegreen";
  } else {
    const correctLabel = document.querySelector(`input[value="${currentInterval}"]`).parentElement.textContent.trim();
    feedback.textContent = `❌ Incorrect! It was ${correctLabel}`;
    feedback.style.color = "red";
  }

  revealSecondKey();
});
