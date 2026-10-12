const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");
const header = document.querySelector("header");

burger.addEventListener("click", burgerClick);

function burgerClick() {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
  header.classList.toggle("active");
}

/* *************** plus minus tingen *************** */
const minus = document.querySelector("#minus");
const plus = document.querySelector("#plus");
const antal = document.querySelector("#antal");

if (minus && plus && antal) {
  let billetter = 1;

  plus.addEventListener("click", () => {
    if (billetter < 6) {
      billetter++;
      antal.textContent = billetter;
    }
  });

  minus.addEventListener("click", () => {
    if (billetter > 1) {
      billetter--;
      antal.textContent = billetter;
    }
  });
}

/* *************** SÆDEVALG *************** */

const saedeGrid = document.querySelector("#saede-grid");

if (saedeGrid) {
  const optagedeSaeder = [20, 21, 55, 56, 57, 58, 67, 68, 77, 78, 79];

  const valgteSaeder = new Set();

  // Opret 80 sæder (5 rækker med 16 sæder)
  for (let i = 1; i <= 80; i++) {
    const saede = document.createElement("button");

    saede.type = "button";
    saede.classList.add("saede");
    saede.setAttribute("aria-label", `Sæde ${i}`);
    saede.setAttribute("aria-pressed", "false");

    if (optagedeSaeder.includes(i)) {
      saede.classList.add("optaget");
      saede.disabled = true;
    } else {
      saede.classList.add("ledig");

      saede.addEventListener("click", () => {
        const maksSaeder = Number(antal.textContent);

        if (valgteSaeder.has(i)) {
          valgteSaeder.delete(i);
          saede.classList.remove("valgt");
          saede.classList.add("ledig");
          saede.setAttribute("aria-pressed", "false");
        } else if (valgteSaeder.size < maksSaeder) {
          valgteSaeder.add(i);
          saede.classList.remove("ledig");
          saede.classList.add("valgt");
          saede.setAttribute("aria-pressed", "true");
        }
      });
    }

    saedeGrid.appendChild(saede);
  }
}

/* *************** GENRE FILTER *************** */

const genreKnap = document.querySelector("#genre-knap");
const genreListe = document.querySelector("#genre-liste");
const alleKnap = document.querySelector(".filter-alle");

if (genreKnap && genreListe && alleKnap) {
  genreKnap.addEventListener("click", () => {
    genreListe.hidden = !genreListe.hidden;
    genreKnap.setAttribute("aria-expanded", String(!genreListe.hidden));
  });

  genreListe.querySelectorAll("button").forEach((knap) => {
    knap.addEventListener("click", () => {
      genreKnap.querySelector("span").textContent = "⌄";
      genreKnap.firstChild.textContent = knap.dataset.genre.toUpperCase() + " ";

      alleKnap.classList.remove("aktiv");
      genreListe.hidden = true;
      genreKnap.setAttribute("aria-expanded", "false");
    });
  });

  alleKnap.addEventListener("click", () => {
    alleKnap.classList.add("aktiv");
    genreKnap.firstChild.textContent = "GENRE ";
    genreListe.hidden = true;
    genreKnap.setAttribute("aria-expanded", "false");
  });
}
/* *************** GENREFILTER DESKTOP *************** */

const desktopGenrer = document.querySelectorAll(".filter-desktop button");

desktopGenrer.forEach((knap) => {
  knap.addEventListener("click", () => {
    desktopGenrer.forEach((genre) => {
      genre.classList.remove("aktiv");
    });

    knap.classList.add("aktiv");
  });
});

const genreKnapper = document.querySelectorAll(".filter-desktop button");
const filmKort = document.querySelectorAll(".film-kort");

genreKnapper.forEach((knap) => {
  knap.addEventListener("click", () => {
    const genre = knap.dataset.genre;

    genreKnapper.forEach((k) => k.classList.remove("aktiv"));
    knap.classList.add("aktiv");

    filmKort.forEach((film) => {
      if (genre === "Alle" || film.dataset.genre === genre) {
        film.style.display = "";
      } else {
        film.style.display = "none";
      }
    });
  });
});
