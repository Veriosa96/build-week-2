let api = "https://striveschool-api.herokuapp.com/api/deezer/album/";
let id = "12047934";

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
      <p class="detailsAlbum d-none d-lg-inline"><img class="miniImgAlbum" src="${albums.artist.picture_small}" alt="">${albums.artist.name} •
      ${albums.release_date} • ${albums.nb_tracks}, ${albums.duration} sec</p>
      <div class="d-inline d-md-inline d-lg-none">
      <p>${albums.artist.name}</p>
      <p>Album • ${albums.release_date}</p>
      </div>
    </div>
  </div>
  `;
};

const tracks = async () => {
  let traccia = await fetchAlbum();
  let tracks = traccia.tracks;
  let trackPage = tracks.data;
  console.log(trackPage);
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
    <div class="d-flex justify-content-between mb-2">
      <div class="d-flex justify-content-between align-items-center">
        <li class="pe-3">${numb}</li>
        <div class="d-flex flex-column justify-content-center">
          <li class="text-white fw-bold">${trackPage[i].title_short}</li>
          <li>${trackPage[i].artist.name}</li>
        </div>
      </div>
      <span class="d-flex justify-content-between">
        <li class="rip">${trackPage[i].rank}</li>
        <li>${finalDurata}</li>
      </span>
    </div>

`;
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
