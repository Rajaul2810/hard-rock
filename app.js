const searchSongs = () =>{
     const searchText = document.getElementById('search-text').value;
     const url = `https://api.lyrics.ovh/suggest/${searchText}`
     fetch(url)
     .then(Response => Response.json())
     .then(data => allSongs(data.data));
}

const allSongs = (songs => {
    const showSong = document.getElementById('show-song');
    
    songs.forEach(song => {
        const div  = document.createElement('div');
        div.className = 'single-result row align-items-center my-3 p-3'
        div.innerHTML = ` 
    <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
          <source src="${song.preview}" type="audio/ogg">
        </audio>
     </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick ="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>   
        `;      
        showSong.append(div)
    });
})

const getLyrics = (artist, title) =>{
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
   fetch(url)
   .then(Response => Response.json())
   .then(data => displayLyric(data.lyrics));
}
const displayLyric = lyrics =>{
    const songLyrics = document.getElementById('song-lyrics');
    songLyrics.innerText = lyrics;
}