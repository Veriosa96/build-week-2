/* // devo inserire url
let url = window.location.search;

// creo con urlsearch per il collegamento url del risultato del quiz
const parametro = new URLSearchParams(url);

// mi prendo dall'url il vaore result
const id = parametro.get("idArtist");
 */

const aritst = async () => {
  try {
    let res = await fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/artist/415"
    );
    if (res.ok) {
      let { data: artist } = await res.json();
      console.log(artist);
    }
  } catch (error) {
    console.log(error);
  }
};
