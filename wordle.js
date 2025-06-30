(() => {
  let allowedGuesses = [];
  let solutionWords = ["STARS", "ROVER", "ALIEN", "ORBIT", "MOONS"]; // Woorden voor woord van de dag

  const startDate = new Date(2025, 5, 30);

  function getWordOfTheDay() {
    const now = new Date();
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    return solutionWords[diffDays % solutionWords.length];
  }

  let currentRow = 0;
  const maxRows = 6;

  const input = document.getElementById("letter-input");
  const message = document.getElementById("message");
  const grid = document.getElementById("grid");

  function showMessage(msg) {
    message.textContent = msg;
    setTimeout(() => {
      if (message.textContent === msg) message.textContent = "";
    }, 2000);
  }

  function colorTiles(guess, row) {
    const tiles = [...grid.querySelectorAll(`.tile[data-row="${row}"]`)];
    const word = getWordOfTheDay();
    const wordArr = word.split("");
    const guessArr = guess.split("");

    const colorClass = new Array(5).fill("absent");
    const usedIndexes = [];

    // Groen markeren
    for (let i = 0; i < 5; i++) {
      if (guessArr[i] === wordArr[i]) {
        colorClass[i] = "correct";
        usedIndexes.push(i);
      }
    }

    // Geel markeren
    for (let i = 0; i < 5; i++) {
      if (colorClass[i] === "correct") continue;
      const letter = guessArr[i];
      let foundIndex = wordArr.findIndex(
        (l, idx) => l === letter && !usedIndexes.includes(idx)
      );
      if (foundIndex !== -1) {
        colorClass[i] = "present";
        usedIndexes.push(foundIndex);
      }
    }

    // Kleur toepassen
    for (let i = 0; i < 5; i++) {
      tiles[i].textContent = guessArr[i];
      tiles[i].classList.add(colorClass[i]);
    }
  }

  function placeGuess(guess) {
    if (guess.length !== 5) {
      showMessage("Vul een 5-letter woord in.");
      return false;
    }

    const guessLower = guess.toLowerCase();
    const wordLower = getWordOfTheDay().toLowerCase();

    if (!allowedGuesses.includes(guessLower) && guessLower !== wordLower) {
      showMessage("Woord niet in lijst.");
      return false;
    }

    colorTiles(guess, currentRow);

    if (guessLower === wordLower) {
      showMessage("Gewonnen! 🎉");
      input.disabled = true;
      return true;
    }

    currentRow++;
    if (currentRow >= maxRows) {
      showMessage(`Game over! Het woord was ${getWordOfTheDay()}`);
      input.disabled = true;
      return true;
    }

    return true;
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = input.value.toUpperCase();
      if (placeGuess(val)) {
        input.value = "";
      }
    }
  });

  // Woordenlijst laden van GitHub (dwyl repo)
  async function loadWordList() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"
      );
      const text = await response.text();
      allowedGuesses = text
        .split("\n")
        .map((w) => w.trim())
        .filter((w) => w.length === 5 && /^[a-z]+$/.test(w));

      console.log(`Woordenlijst geladen met ${allowedGuesses.length} woorden.`);
      input.disabled = false;
    } catch (e) {
      showMessage("Fout bij laden woordenlijst.");
      console.error(e);
    }
  }

  // Input uitzetten tot woorden geladen zijn
  input.disabled = true;
  loadWordList();
})();
