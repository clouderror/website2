(() => {
let solutionWords = [
  // Januari 1-31
  "VODKA", "ALIEN", "SHOTS", "GUARD", "ASTRO", "CLAIM", "KYDDE", "JUDGE", "TRIPS", "COURT",
  "SWISH", "PICKS", "METER", "MICHA", "SHARK", "BLACK", "READS", "PZAZZ", "FUZES", "BENCH",
  "WATER", "ORBIT", "HOOPS", "FOULS", "MALTS", "STEAL", "FLAWS", "DUNKS", "MERRY", "CURRY", "SPINN",

  // Februari 32-59
  "STEAK", "RIGHT", "NEBUL", "LOVER", "BRAIN", "FADED", "TRUST", "PEACE", "GLOOM", "TURNV",
  "STEEL", "STAND", "ALLEY", "MONEY", "BONDS", "CROSS", "ONION", "DANCE", "TULLI", "FOCUS",
  "SHARP", "GIANT", "SNIPE", "HEARD", "PLAGE", "DIZZY", "CLAWS", "SWIZZ",

  // Maart 60-90
  "ROBOT", "JUMPS", "ADORN", "VENUS", "CHATS", "EARTH", "MARCH", "XYLYL", "MILED", "SHOES",
  "DRUNK", "DECAY", "FEELS", "PACED", "PICKY", "SHOWS", "MISTY", "DIKES", "DRIVE", "HERSE",
  "HOPES", "WORDS", "FLOCK", "THROW", "KANOU", "SPINS", "ROWER", "LEGOS", "CROWS", "ALIVE", "LOOPS",

  // April 91-120
  "AAAAA", "HOLES", "QUASA", "STARS", "BEERS", "COSTS", "SOLAR", "PLANE", "DRAFT", "BAILS",
  "SHOOT", "PLAYS", "FRIED", "SHIPS", "TASTE", "GLOWS", "PASTA", "IRVIN", "GREEN", "PROUD",
  "PINKS", "DICKS", "WITCH", "SPINE", "FIRST", "BUNNY", "SUNNY", "FROGS",

  // Mei 121-151
  "PLACE", "TELES", "INTER", "HAPPY", "ROVER", "HUBBY", "SHAKE", "TRIED", "PENIS", "DRIPS",
  "HOURS", "PRIZE", "DRANK", "LICKS", "SCREEN", "DEFEN", "OFFEN", "RACER", "NICER", "BRUSH",
  "PICKA", "STEAP", "BLOCK", "FUJIS", "VERSE", "BALLS", "BONER", "MOLLY", "FROST",

  // Juni 152-181
  "METAL", "GALAX", "COSMO", "PULSE", "QUARK", "LUNAR", "SOLID", "HOSES", "DRIBB", "PUPPY",
  "DUMBS", "RANCH", "FUDGE", "FREEH", "FLARE", "TREND", "HOCUS", "GLOBE", "SHELL", "VIVID",
  "FUNKY", "TIMER", "BLOCK", "JERKY", "MODEL", "GLAZE", "CHOCO", "CENTI", "BOXES", "CROSS",

  // Juli 182-212
  "CHAIN", "OVARY", "POSER", "SPACE", "SATAY", "NEXUS", "BUZZY", "SUPER", "BALLY", "DRIBS",
  "PHANT", "DEBIT", "LAUGH", "SCREW", "RAVEN", "FRAUD", "FLUFF", "RAINS", "DEFER", "OFFER",
  "FANCY", "ZONED", "BUDDY", "HUMAN", "COULD", "HEADS", "GOOPY", "LOTUS", "CHART", "BOINK",

  // Augustus 213-243 (MILES op 225)
  "CRANE", "METHO", "GALLA", "MILES", "OCTAL", "PLUSH", "LUNAS", "CABIN", "HELLO", "PIXEL",
  "POOFS", "DOUBT", "REDRY", "SCENE", "FRATS", "FREED", "THROB", "ANALS", "DUMPY", "OLIVE",
  "FOXES", "WOODS", "TRUTH", "DOPEY", "BANGS", "CHAMP", "GRAPH", "LILLY", "CLOSE", "BRICK",

  // September 244-273
  "PILOT", "SPICY", "TELLS", "SATED", "NEWER", "SLOPE", "BICEP", "QUASH", "CHONK", "PARTY",
  "PENNE", "DISCO", "LUBED", "SCORE", "RETRY", "FUCKS", "FRIES", "TUMMY", "REFER", "ORGAN",
  "THINK", "COLDS", "FANTA", "SNOWY", "CHALK", "HALLO", "GOOFY", "ROSES", "CHUNK", "BULBS",

  // Oktober 274-304
  "CONES", "OUTRO", "SQUAT", "PUMAS", "WEEDS", "SHEET", "RELAX", "COBLE", "HYENA", "BEERS",
  "PENAL", "DROOP", "REMIX", "SCOPE", "FOAMY", "FORUM", "THONG", "ZONAL", "DOZES", "OCHRE",
  "FRANK", "TOOTH", "BLINK", "SHIRT", "BROWN", "CRUMB", "GHOST", "CRIED", "CHIPS", "PIZZA",

  // November 305-334
  "PASTA", "ROCKY", "SATAY", "NAKEY", "SUEDE", "DADDY", "QUARK", "DIRTY", "COCKS", "WINES",
  "PUTTY", "DAISY", "LOVED", "SCENT", "RHYME", "TOUGH", "FROTH", "TIDES", "TRIBE", "OPIUM",
  "FJORD", "TROPE", "CLUES", "TRAIN", "CHOKE", "HYTHE", "GIRTH", "FORMS", "CIVIL", "BONDS",

  // December 335-365
  "COVER", "OASIS", "SOCKS", "SLACK", "LITER", "WRITE", "SHAPE", "COMET", "HUMID", "DROWN",
  "POSED", "DINOS", "RIFFS", "SHORE", "FETCH", "FLUID", "FLOWY", "ZONE", "DRONE", "OXIDE",
  "FISHY", "TURNS", "THING", "SHOPS", "BOLDS", "CYCLE", "GLUTE", "FORTS", "CHOSE", "BLIPS"
];



  const startDate = new Date(2025, 6, 1);

  function getWordOfTheDay() {
    const now = new Date();
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return solutionWords[0];  
    }
    return solutionWords[diffDays % solutionWords.length];
  }


  let currentRow = 0;
  const maxRows = 6;

  const input = document.getElementById("letter-input");
  const button = document.getElementById("submit-btn");
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

    for (let i = 0; i < 5; i++) {
      if (guessArr[i] === wordArr[i]) {
        colorClass[i] = "correct";
        usedIndexes.push(i);
      }
    }

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

  if (guess.length !== 5) {
    showMessage("Woord moet 5 letters hebben.");
    return false;
  }

    colorTiles(guess, currentRow);

    if (guessLower === wordLower) {
      showMessage("Gewonnen! ");
      input.disabled = true;
      button.disabled = true;
      return true;
    }

    currentRow++;
    if (currentRow >= maxRows) {
      showMessage(`Game over! Het woord was ${getWordOfTheDay()}`);
      input.disabled = true;
      button.disabled = true;
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

  button.addEventListener("click", () => {
    const val = input.value.toUpperCase();
    if (placeGuess(val)) {
      input.value = "";
    }
  });

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
      button.disabled = false;
    } catch (e) {
      showMessage("Fout bij laden woordenlijst.");
      console.error(e);
    }
  }

  input.disabled = true;
  button.disabled = true;
  loadWordList();
})();
