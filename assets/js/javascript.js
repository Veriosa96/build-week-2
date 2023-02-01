let api = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const fetchSongs = async function (query) {
  let res = await fetch(`${api}${query}`);
  let { data: song } = await res.json();
  return song;
};

const mainSong = async () => {
  let canzone = await fetchSongs("dumb");
  let div = document.getElementById("dataTrack");
  let favSong = canzone[2];
  div.innerHTML += `
  <img class="img py-3" src="${favSong.album.cover_medium}" style="width: 150px"/>
  <div class="mainAlbum">
    <p>${favSong.album.title}</p>
    <div class="bodyCard">
        <h1>${favSong.title}</h1>
        <p>${favSong.artist.name}</p>
        <p>Ascolta il nuovo singolo di</p>
        <div class="buttonCard">
            <ul>
                <li class="firstButton">Play</li>
                <li class="secondButton">Salva</li>
                <i class="bi bi-three-dots"></i>
            </ul>
        </div>
    </div>
  </div>
  `;
  let idArtist = favSong.artist.id;
  let idAlbum = favSong.album.id;
  console.log("idArtist", idArtist);
  console.log("idAlbum", idAlbum);

  return idArtist, idAlbum;
};

/* FIRST SECTION */
const nascondi = () => {
  let element = document.querySelectorAll(".box");
  console.log(element);
  element[0].classList.toggle("d-none");
};

let bottone = document.getElementById("hidden");

bottone.addEventListener("click", () => {
  nascondi();
});

/* SECOND SECTION */
const secondSection = async () => {
  let canzoni = await fetchSongs("song");
  let second = document.getElementById("second");
  let favSongs = [
    canzoni[6],
    canzoni[1],
    canzoni[2],
    canzoni[3],
    canzoni[4],
    canzoni[5]
  ];
  favSongs.forEach(({ title_short, album, artist }) => {
    second.innerHTML += `<div class="card col" id="second-section">
      <img src="${album.cover_small}" alt="image">
      <div class="card-body">
        <p class="card-title">${title_short}</p>
      </div>`;
    let idArtist = artist.id;
    let idAlbum = album.id;
  });
};

/* THIRD SECTION */
const thirdSection = async () => {
  let canzoni = await fetchSongs("album");
  let third = document.getElementById("thirdJs");
  let albums = [
    canzoni[1],
    canzoni[2],
    canzoni[3],
    canzoni[6],
    canzoni[10],
    canzoni[11],
    canzoni[13],
    canzoni[14],
    canzoni[16],
    canzoni[17]
  ];
  albums.forEach(({ artist, album }) => {
    third.innerHTML += `

    <div class="col p-0">
    <div class="card thirdCard d-flex justify-content-between">
    <div class="d-flex flex-row d-md-block">
      <div class="img pt-1 d-flex justify-content-center">
        <img
          src="${album.cover_medium}"
          alt=""
        />
      </div>
      <div class="cardBody p-3">
        <h5>${album.title}</h5>
        <p>${artist.name}</p>
      </div>
    </div>
    <div
      class="albumCardFooter pt-3 d-flex justify-content-between align-items-center d-md-none"
    >
      <div>
        <i class="bi bi-heart-fill text-success"></i>
        <i class="bi bi-three-dots-vertical px-3"></i>
      </div>
      <div class="d-flex align-items-center">
        <p class="px-3">16 brani</p>
        <div
          class="palyAlbum rounded-circle d-flex align-items-center justify-content-center"
        >
          <i class="bi bi-play-fill text-light"></i>
        </div>
      </div>
    </div>
  </div>
  </div>

    `;
  });
};

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

window.onload = async function () {
  await mainSong();
  await secondSection();
  await thirdSection();
  play();
};
