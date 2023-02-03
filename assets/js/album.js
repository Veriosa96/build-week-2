// devo inserire url
let url = new URLSearchParams(location.search);

// mi prendo dall'url il vaore result
let id = url.get("idAlbum");

let api = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const fetchAlbum = async () => {
  let res = await fetch(api + id);
  let data = await res.json();
  return data;
};

const album = async () => {
  let albums = await fetchAlbum();
  let headAlbumPage = document.getElementById("headAlbumPage");
  headAlbumPage.innerHTML = `            
    <div class="col d-lg-flex align-items-end ">
    <div class="d-flex">
      <div class="arrowBack d-lg-none me-5"><i class="bi bi-arrow-left me-3"></i></div>
      <div class="d-flex align-items-end"> <img id="imgAlbum" src="${albums.cover_medium}" alt=""></div>
    </div>
    <div class="mainAlbumPage">
      <p class="d-none d-md-inline">Album</p>
      <h2 class="text-start ">${albums.title}</h2>
      <p class="detailsAlbum d-none d-md-block"><img class="miniImgAlbum" src="${albums.artist.picture}" alt=""><span type="button" id="artist-page">${albums.artist.name}</span> •
      ${albums.release_date} • ${albums.nb_tracks} brani, ${albums.duration} sec</p>
      <div class="d-inline d-md-inline d-lg-none">
      <p class="pb-2"><img class="miniImgAlbum" src="${albums.artist.picture}" alt=""> ${albums.artist.name}</p>
      <p class="text-secondary">Album • ${albums.release_date}</p>
      </div>
    </div>
  </div>
  `;

  let idArtist = albums.artist.id;
  let artista = document.getElementById("artist-page");
  const pageArtist = () => {
    window.location.assign(`../../artist-page.html?idArtist=${idArtist}`);
  };

  artista.addEventListener("click", () => {
    pageArtist();
  });
};

const tracks = async () => {
  let traccia = await fetchAlbum();
  let tracks = traccia.tracks;
  let trackPage = tracks.data;
  let trackList = document.getElementById("trackList");
  for (let i = 0; i < 11; i++) {
    let numb = i + 1;
    let durata = [];
    durata.push(trackPage[i].duration);
    let stringDurata = durata[0].toString();
    let pippo = stringDurata.split("");
    pippo.splice(1, 0, ":");
    let finalDurata = pippo.join("");
    trackList.innerHTML += `
    <div class="d-flex justify-content-between mb-3 align-items-center">
      <div class="d-flex justify-content-between align-items-center">
        <li class="pe-3 d-none d-md-block">${numb}</li>
        <div class="songAlbumJS d-flex flex-column justify-content-center">
          <li class="playSong1 text-white fw-bold">${trackPage[i].title_short}</li>
          <li>${trackPage[i].artist.name}</li>
        </div>
      </div>
      <span class="d-none d-md-flex justify-content-between">
        <li class="rip">${trackPage[i].rank}</li>
        <li>${finalDurata}</li>
      </span>
      <i class="bi bi-three-dots-vertical fs-4 d-md-none"></i>
    </div>
`;
  }
  let playSong1 = document.querySelectorAll(".playSong1");
  for (let i = 0; i < 11; i++) {
    const footerPlayer1 = () => {
      let titolo = document.getElementById("titolo");
      titolo.innerText = `${trackPage[i].title_short}`;
      let songInfo = document.getElementById("songInfo");
      songInfo.innerHTML = `
      <div class="image-container">
        <img src="${trackPage[i].album.cover_medium}" />
      </div>
      <div class="song-description">
        <p class="title">${trackPage[i].title_short}</p>
        <p class="artist">${trackPage[i].artist.name}</p>
      </div>
`;
    };
    playSong1[i].addEventListener("click", () => {
      footerPlayer1();
    });
  }
};

// LEFT PLAYLIST

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

window.onload = async () => {
  await album();
  play();
  await tracks();
};
