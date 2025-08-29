let notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
let currentNote = "";

function startExercise() {
    document.getElementById("feedback").textContent = "";
    const options = document.getElementById("note-options");
    options.innerHTML = "";
    currentNote = notes[Math.floor(Math.random() * notes.length)];
    playNote(currentNote);

    notes.forEach(note => {
        const btn = document.createElement("button");
        btn.textContent = note;
        btn.onclick = () => checkAnswer(note);
        options.appendChild(btn);
    });
}

function playNote(note) {
    const synth = new Tone.Synth().toDestination();
    Tone.start().then(() => synth.triggerAttackRelease(note, "1n"));
}

function checkAnswer(selected) {
    const feedback = document.getElementById("feedback");
    if (selected === currentNote) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "Wrong! Try again.";
        feedback.style.color = "red";
    }
}
