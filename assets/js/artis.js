// devo inserire url
let url = new URLSearchParams(location.search);

// mi prendo dall'url il vaore result
let id = url.get("idArtist");
console.log(id);

let api = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
let endpoint = "/top?limit=50";
const fetchArtist = async () => {
  let res = await fetch(api + id);
  let artist = await res.json();
  return artist;
};

let artist = async () => {
  let artista = await fetchArtist();
  let bodyCard = document.getElementById("cardPageArtist");
  bodyCard.innerHTML = `
        <div class="card border-0 text-bg-dark p-0">
        <img id="cardOverlay"
          src="${artista.picture_xl}"
          class="card-img rounded-0" alt="..." />
        <div class="card-img-overlay d-flex flex-column justify-content-between justify-content-md-end textBox">
          <div class="arrow arrowMobile d-flex justify-content-center align-items-center">
            <i class="bi bi-chevron-left d-flex d-md-none"></i>
          </div>
          <p class="hiddenMobile">
            <i class="bi bi-patch-check-fill me-2 hiddenMobile"></i><small>Artista verificato</small>
          </p>
          <h5 class="card-title">${artista.name}</h5>
          <p class="card-text downMobile">
            <small>${artista.nb_fan} ascoltatori mensili</small>
          </p>
        </div>
      </div>
        `;
};

let tracks = async () => {
  try {
    let res = await fetch(api + id + endpoint);
    if (res.ok) {
      let data = await res.json();
      let tracks = data.data;
      let div = document.getElementById("cardPageTracks");
      for (let i = 0; i < tracks.length; i++) {
        let numb = i + 1;
        let durata = [];
        durata.push(tracks[i].duration);
        let stringDurata = durata[0].toString();
        let pippo = stringDurata.split("");
        pippo.splice(1, 0, ":");
        let finalDurata = pippo.join("");

        console.log(finalDurata);
        div.innerHTML += `
        <div class="d-flex mt-2 justify-content-between align-items-center hoverArtist">
          <div class="left d-flex align-items-center">
            <p class="me-3 numbRanks">${numb}</p>
            <img id="smallCover" src="${tracks[i].album.cover_small}" alt=""
                class="me-3" />
            <div>
              <p class="noneMobile albumName">${tracks[i].title_short}</p>
              <p class="noneDesktop">276.968.994</p>
            </div>
          </div>
          <div class="center">
            <p>${tracks[i].rank}</p>
          </div>
          <div class="right">
            <p class="">${finalDurata}</p>
            <i class="bi bi-three-dots"></i>
          </div>
        </div>
        `;
      }
    }
  } catch (error) {
    console.log("error");
  }
};

// PLAYLIST LEFT SIDE

let playList = [
  "Hit italiane",
  "Top 10",
  "Sanremo 2022",
  "Alta rotazione",
  "Novità pop",
  "Internazionali",
  "Codda con sorriso",
  "No stress",
  "ASMR",
  "Cardio"
];

const play = () => {
  let div = document.getElementById("playlist");
  playList.forEach((e) => {
    div.innerHTML += `<li class="list-group-item py-1">${e}</li>`;
  });
};

// TURN BACK FUNCTION

const arrowBack = document.getElementById("leftArrowBack");

arrowBack.addEventListener("click", () => {
  window.location.assign("home.html");
});

window.onload = async function () {
  await artist();
  await tracks();
  await play();
};
