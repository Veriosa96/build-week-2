/* // devo inserire url
let url = window.location.search;

// creo con urlsearch per il collegamento url del risultato del quiz
const parametro = new URLSearchParams(url);

// mi prendo dall'url il vaore result
const id = parametro.get("idArtist");
 */

let id = "415";
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
          src="${artista.picture_big}"
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
              <p class="noneMobile albumName">${tracks[i].title}</p>
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

window.onload = async function () {
  artist();
  tracks();
};
