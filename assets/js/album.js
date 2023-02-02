let api = "https://striveschool-api.herokuapp.com/api/deezer/album/";
let id = "12047934";

const fetchAlbum = async () => {
  let res = await fetch(api + id);
  let data = await res.json();
  console.log(data);
  return data;
};

const album = async () => {
  let albums = await fetchAlbum();
  let headAlbumPage = document.getElementById("headAlbumPage");
  headAlbumPage.innerHTML = `            
    <div class="col d-lg-flex align-items-end ">
    <div class="d-flex">
      <div class="arrowBack d-lg-none "><i class="bi bi-arrow-left"></i></div>
      <div class=" d-flex align-items-end"> <img id="imgAlbum" src="${albums.cover_medium}" alt=""></div>
    </div>
    <div class="mainAlbumPage">
      <p class="d-sm-none d-md-inline">Album</p>
      <h2 class="text-start ">${albums.title}</h2>
      <p class="detailsAlbum d-sm-none d-lg-inline"><img class="miniImgAlbum" src="${albums.artist.picture_small}" alt="">${albums.artist.name} • ${albums.realease_date}
      ${albums.realease_date} • ${albums.nb_tracks}, ${albums.tracks.data.duration}</p>
      <p class="d-sm-inline d-md-inline d-lg-none">${albums.artist.name} • ${albums.realease_date}</p>
    </div>
  </div>
  `;
};

window.onload= async ()=>{
    await album()
}