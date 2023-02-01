/* // devo inserire url
let url = window.location.search;

// creo con urlsearch per il collegamento url del risultato del quiz
const parametro = new URLSearchParams(url);

// mi prendo dall'url il vaore result
const id = parametro.get("idArtist");
 */

/*
const aritst = async () => {
  try {
    let res = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/artist/415"
    );
    if (res.ok) {
      let data = await res.json();
      let track = data.data;
      // let artist = track.contributors[0];
      let bodyCard = document.getElementById("cardPageArtist");
      console.log(data);

      bodyCard.innerHTML = `
        <div class="card border-0 text-bg-dark p-0">
        <img id="cardOverlay"
          src="${track.picture_big}"
          class="card-img rounded-0" alt="..." />
        <div class="card-img-overlay d-flex flex-column justify-content-between justify-content-md-end textBox">
          <div class="arrow arrowMobile d-flex justify-content-center align-items-center">
            <i class="bi bi-chevron-left"></i>
          </div>
          <p class="hiddenMobile">
            <i class="bi bi-patch-check-fill me-2 hiddenMobile"></i><small>Artista verificato</small>
          </p>
          <h5 class="card-title">${track.name}</h5>
          <p class="card-text downMobile">
            <small>3.433.168 ascoltatori mensili</small>
          </p>
        </div>
      </div>
        
        `;
    }
  } catch (error) {
    console.log(error);
  }
};

aritst();

*/
