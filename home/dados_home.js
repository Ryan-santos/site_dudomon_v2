async function fetchStatusLive() {
    try {
        const responseTwitch = await fetch('https://dados-site-dudomon.herokuapp.com/status_live')
        const dadosTwitch = await responseTwitch.json()
        
        if(dadosTwitch.data.length > 0){
          if (window.matchMedia("(max-width: 600px)").matches){
            document.querySelector('#section-apresentacao #bnt-twitch div').innerHTML+=`AO VIVO`
          }else{
            if(dadosTwitch.data[0].game_name == 'League of Legends: Wild Rift'){
              document.querySelector('#section-apresentacao #bnt-twitch div').innerHTML+=`<span>AO VIVO</span>${dadosTwitch.data[0].title}<img src="../imagens/logo-lol.png" alt="LOL">`
            }else if(dadosTwitch.data[0].game_name == 'Arena of Valor'){
              document.querySelector('#section-apresentacao #bnt-twitch div').innerHTML+=`<span>AO VIVO</span>${dadosTwitch.data[0].title}<img src="../imagens/logo-aov.png" alt="AOV">`
            }else{
              document.querySelector('#section-apresentacao #bnt-twitch div').innerHTML+=`<span>AO VIVO</span>${dadosTwitch.data[0].title}`
            }
          }
        }
    } catch (error) {
      console.log(error)
    }
}
fetchStatusLive()

async function fetchNovidades() {
  try {
      const response = await fetch('http://localhost:4000/get_novidades')
      const dadosNovidades = await response.json()
      console.log(dadosNovidades)
      let lugarlistCards = document.querySelector('#list-novidades')

      for(var x in dadosNovidades){
        lugarlistCards.innerHTML+=`
        <li><a href="${dadosNovidades[x].link}"><div>
          <h1>${dadosNovidades[x].icone} ${dadosNovidades[x].titulo}</h1>
          <p>${dadosNovidades[x].descricao}</p>
        </div></a></li>`
      }
      
      loading(101, 'loading_novidades')
  } catch (error) {
    console.log(error)
  }
}fetchNovidades()

async function fetchCanalVideos() {
  try {
      const responseCanal = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=UUVHvo1-jt60-nXZ-oJM2zHg&maxResults=4&key=AIzaSyCjk5V5BUvm6hZG1WvPLKc577QehOXuFEE')
      const dadosCanal = await responseCanal.json()

      let Video1 = dadosCanal.items[0].snippet
      let Video2 = dadosCanal.items[1].snippet
      let Video3 = dadosCanal.items[2].snippet
      let Video4 = dadosCanal.items[3].snippet

      let imgErro = "../imagens/img_erro_thumbnail.png"

      function urlThumbnail1() {
        if(Video1.thumbnails.maxres !== undefined){
          return Video1.thumbnails.maxres.url
        }else{
          return imgErro
        }
      }

      function urlThumbnail2() {
        if(Video2.thumbnails.maxres !== undefined){
          return Video2.thumbnails.maxres.url
        }else{
          return imgErro
        }
      }

      function urlThumbnail3() {
        if(Video3.thumbnails.maxres != undefined){
          return Video3.thumbnails.maxres.url
        }else{
          return imgErro
        }
      }
      
      function urlThumbnail4() {
        if(Video4.thumbnails.maxres != undefined){
          return Video4.thumbnails.maxres.url
        }else{
          return imgErro
        }
      }

      var iconYoutube = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="144" height="144"
      viewBox="0 0 48 48"
      style=" fill:#000000;"><path fill="currentColor" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"></path><path fill="#FFF" d="M20 31L20 17 32 24z"></path></svg>`

      document.querySelector('#videos article #thumbnails-videos').innerHTML+=`
      <a id="pricipal" href="https://www.youtube.com/watch?v=${Video1.resourceId.videoId}&ab_channel=Dudomon" target="_black"><img src="${urlThumbnail1()}" alt="thumbnail">${iconYoutube}</a>
      <div id="extra">
      <a href="https://www.youtube.com/watch?v=${Video2.resourceId.videoId}&ab_channel=Dudomon" target="_black"><img src="${urlThumbnail2()}" alt="thumbnail">${iconYoutube}</a>
      <a href="https://www.youtube.com/watch?v=${Video3.resourceId.videoId}&ab_channel=Dudomon" target="_black"><img src="${urlThumbnail3()}" alt="thumbnail">${iconYoutube}</a>
      <a href="https://www.youtube.com/watch?v=${Video4.resourceId.videoId}&ab_channel=Dudomon" target="_black"><img src="${urlThumbnail4()}" alt="thumbnail">${iconYoutube}</a>
      </div>`
  } catch (error) {
    console.log(error)
  }
}fetchCanalVideos()

