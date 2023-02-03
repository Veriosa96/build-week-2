let api = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
const fetchSongs = async function (query) {
  let res = await fetch(`${api}${query}`);
  let { data: song } = await res.json();
  return song;
};

let footerSong = {};
const mainSong = async () => {
  let canzone = await fetchSongs("dumb");
  let div = document.getElementById("dataTrack");
  let favSong = canzone[2];
  div.innerHTML += `
  <img class="img py-3" src="${favSong.album.cover_medium}" style="width: 150px"/>
  <div class="mainAlbum">
    <p>${favSong.album.title}</p>
    <div class="bodyCard">
        <h1 id="albumPage1" type="button">${favSong.title}</h1>
        <p id="artistPage1" type="button">${favSong.artist.name}</p>
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

  footerSong = {
    title: favSong.title,
    artist: favSong.artist.name,
    img: favSong.album.cover_medium
  };

  /* let titolo = document.getElementById("titolo");
  titolo.innerText = `${favSong.title}`;

  let songInfo = document.getElementById("songInfo");
  songInfo.innerHTML = `
          <div class="image-container">
            <img src="${favSong.album.cover_medium}" />
          </div>
          <div class="song-description">
            <p class="title">${favSong.title}</p>
            <p class="artist">${favSong.artist.name}</p>
          </div>
`; */

  let idArtist = favSong.artist.id;
  let artista = document.getElementById("artistPage1");
  const pageArtist = () => {
    window.location.assign(`../../artist-page.html?idArtist=${idArtist}`);
  };

  artista.addEventListener("click", () => {
    pageArtist();
  });

  let idAlbum = favSong.album.id;
  let album = document.getElementById("albumPage1");
  const pageAlbum = () => {
    window.location.assign(`../../Album.html?idAlbum=${idAlbum}`);
  };
  album.addEventListener("click", () => {
    pageAlbum();
  });
  console.log(footerSong);
  return footerSong;
};

/* FIRST SECTION */
const nascondi = () => {
  let element = document.querySelectorAll(".box");
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
  let idAlbum = [];
  favSongs.forEach(({ title_short, album }) => {
    second.innerHTML += `
    <div class="card col p-0 text-truncate" id="second-section">
      <div class="d-flex align-items-center justify-content-between">
        <img src="${album.cover_small}" alt="image" class="p-0 m-0">
        <div class="card-body p-0">
          <p class="pageAlbum2 card-title ps-2">${title_short}</p>
        </div>
      </div>
    </div>
      `;
    idAlbum.push(album.id);
  });
  let album = document.querySelectorAll(".pageAlbum2");

  for (let i = 0; i < album.length; i++) {
    let pageAlbum2 = () => {
      window.location.assign(`../../Album.html?idAlbum=${idAlbum[i]}`);
    };
    album[i].addEventListener("click", pageAlbum2);
  }
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
    canzoni[18],
    canzoni[19]
  ];
  let idArtist = [];
  let idAlbum = [];
  for (let i = 0; i < albums.length; i++) {
    third.innerHTML += `
    <div class="col p-0">
    <div class="card thirdCard d-flex justify-content-between">
    <div class="d-flex flex-row d-md-block">
        <img
          src="${albums[i].album.cover_medium}"
          alt=""
        />
      <div class="cardBody p-3 text-truncate">
        <h5 class="albumPage3 text-truncate">${albums[i].album.title}</h5>
        <p class="artistPage2 text-truncate" type="button">${albums[i].artist.name}</p>
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
    idArtist.push(albums[i].artist.id);
    idAlbum.push(albums[i].album.id);
  }

  let artista = document.querySelectorAll(".artistPage2");
  for (let i = 0; i < artista.length; i++) {
    let pageArtist2 = () => {
      window.location.assign(`../../artist-page.html?idArtist=${idArtist[i]}`);
    };
    artista[i].addEventListener("click", pageArtist2);
  }

  let album = document.querySelectorAll(".albumPage3");
  for (let i = 0; i < album.length; i++) {
    let pageAlbum3 = () => {
      window.location.assign(`../../Album.html?idAlbum=${idAlbum[i]}`);
    };
    album[i].addEventListener("click", pageAlbum3);
  }
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
