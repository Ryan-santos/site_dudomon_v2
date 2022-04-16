let inserirMenu = document.querySelector('#menus').innerHTML+=`
<nav id="menu_navegacao">
    <section class="max-width-tela container-nav-1">
      <h1>Dudomon</h1>
      <ul>
        <li><a href="../home">Home</a></li>
        <li><a href="../gadosCup/">Gado's Cup</a></li>
        <li><a href="../semtime/">Sem time </a></li>
        <li><a href="../rifa/">Rifa</a></li>
        <li><button onclick="ativaMenuMais()"><i class="fas fa-ellipsis-v"></i></button></li>
      </ul>
    </section>
  </nav>
  <nav id="mais_menu">
    <div class="max-width-tela container-mais-nav-1">
      <div class="div-top"><h1>Dudomon</h1><button onclick="ativaMenuMais()"><i class="fas fa-times"></i> Fechar</button></div>
      <ul>
        <li><a href="../"><div><i class="fas fa-home"></i>Home</div></a></li>
        <li><a href="../gadosCup/"><div><i class="fas fa-trophy"></i> Gado's Cup</div></a></li>
        <li><a href="../semtime/"><div><i class="fas fa-users"></i> Sem time </div></a></li>
        <li><a href="../rifa/"><div><i class="fas fa-ticket-alt"></i> Rifa</div></a></li>
        <!-- <li><a href="../subwars/"><div><i class="fas fa-medal"></i> SubWars</div></a></li> -->
        <li><a href="../premiados/"><div><i class="fas fa-gift"></i> Premiados</div></a></li>
        <li><a href="../votacao"><div><i class="fas fa-vote-yea"></i> Votação</div></a></li>
        <li><a href="../musica"><div><i class="fas fa-music"></i> Música</div></a></li>
      </ul>
    </div>
  </nav>
  <div class="blur none" onclick="ativaMenuMais()"></div>`
///////////////////////////////////////////////////////////////////////////////////////////////////////

let inserirFooter = document.querySelector('#rodape').innerHTML+=`
<article class="max-width-tela container-footer">
    <h1>Dudomon</h1>
    <p class="texto_rodape">Me siga para ficar por dentro de todas as novidades do mundo do Moba Mobile!</p>
    <ul>
        <li><a href="https://twitch.app.link/dudomon" target="_black"><div><i class="fab fa-twitch"></i></div></a></li>
        <li><a href="https://www.youtube.com/c/dudomon/videos" target="_black"><div><i class="fab fa-youtube"></i></div></a></li>
        <li><a href="https://www.instagram.com/dudomon" target="_black"><div><i class="fab fa-instagram"></i></div></a></li>
        <li><a href="https://twitter.com/dudomon" target="_black"><div><i class="fab fa-twitter"></i></div></a></li>
        <li><a href="https://www.tiktok.com/@dudomonoficial" target="_black"><div><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="tiktok" class="svg-inline--fa fa-tiktok" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.25V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.2 121.2 0 0 0 1.86 22.17h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.14z"></path></svg></div></a></li>
    </ul>
    <a class="fim" href="http://ryan-santos.epizy.com/" target="_black">- Desenvolvido por Ryan Santos -</a>
</article>`
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.onscroll = function(){
    var top = window.pageYOffset || document.documentElement.scrollTop
    var nav = document.getElementById('menu_navegacao')
    if( top > 600 ) {
    nav.classList.add("active");
    }else{
    nav.classList.remove("active");
    }
}

let blur = document.querySelector('.blur')
function ativaMenuMais() {
    let menuMais = document.querySelector('#mais_menu')
    let tagI = document.querySelector('#menu_navegacao .container-nav-1 li button')
    

    if(menuMais.classList == 'ativadoMenu'){
        menuMais.classList.remove('ativadoMenu')
        tagI.innerHTML=`<i class="fas fa-ellipsis-v">`
        blur.classList.add('none')
        document.querySelector('html').removeAttribute("style")
    }else{
        menuMais.classList.add('ativadoMenu')
        tagI.innerHTML=`<i class="fas fa-times">`
        document.querySelector('html').style.overflow = 'hidden'
        blur.classList.remove('none')
    }
}

let linkMenus = document.querySelectorAll('#menu_navegacao li a, #mais_menu li a')
for (var x = 0; x < linkMenus.length; x++){
    let strigLink = linkMenus[x].innerText.toLowerCase().replace(/ |'|~|/g, "").replace(/ç/g, "c").replace(/ã/g, "a").replace(/ú/g, "u")
    let locationString = String(window.location.pathname).toLowerCase()
    if(locationString.indexOf(strigLink) > -1){
      linkMenus[x].classList.add('active')
      linkMenus[x].onclick = function(){ return false }
    }
}

function loading(funcao, id) {
  let telaLoading = document.querySelector('#'+id+'')
  if(funcao == 101){ // desativa tela de carregamento
    setTimeout(function() {
      telaLoading.classList.add('desativado')
    }, 500)
  }else if (funcao == 202){ // ativa tela de carregamento
    setTimeout(function() {
      telaLoading.classList.add('ativada')
    }, 500)
  }
}

loading(101, 'loading_site')

