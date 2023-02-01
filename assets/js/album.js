// devo inserire url
let url = window.location.search;

// creo con urlsearch per il collegamento url del risultato del quiz
const parametro = new URLSearchParams(url);

// mi prendo dall'url il vaore result
const id = parametro.get("idAlbum");
