let votacaoNum = 0

async function fetchDados() {
    try {
        const response = await fetch('https://dados-site-dudomon.herokuapp.com/get_votacao')
        const dadosVotacao = await response.json()

        let statusVotacao = dadosVotacao[0]
        votacaoNum = dadosVotacao[1]
        let duracaoIn = dadosVotacao[2] /// duracao inicial
        let duracaoAt = dadosVotacao[3] /// dutacao atual que foi pega do sever
        let linha = dadosVotacao[4]
        let personagens = dadosVotacao[5]

        let status = document.querySelector('#status-votaco')
        if(statusVotacao == 1){
            status.classList.remove('none')
            status.innerHTML='<div>Votação aberta</div>'
            validarNumVotacao()
            imprimir(linha, personagens, duracaoAt) 
        }else{
            status.classList.remove('none')
            status.innerHTML='<div>Votação fechada</div>'
            imprimirAvisos(aviso = `
            <h1><i class="fas fa-lock"></i></h1>
            <h1>Votação fechada.</h1>`)
        }

        setTimeout(function() {
            let telaCarregamento = document.querySelector('#votacao #tela-carregando')
            telaCarregamento.classList.add('sumir')
            setTimeout(function() {
              telaCarregamento.classList.add('none')
            }, 1000)
        }, 400)
    } catch (error) {
      console.log(error)
      let telaCarregamento = document.querySelector('#votacao #tela-carregando')
      telaCarregamento.classList.add('none')
      imprimirAvisos(aviso = `
        <h1><i class="fas fa-power-off"></i></h1>
        <p>Sever fora do ar.</p>`)
    }
}
fetchDados()

//////////////////////////////////////// validacocao se ja votou nessa votacao
function validarNumVotacao() {
    if(Number(localStorage.getItem('numVotocao')) == votacaoNum){
        imprimirAvisos(aviso = `
        <h1><i class="fas fa-lock"></i></h1>
        <p>Você ja votou, aguarde a proxima votação.</p>`)
    }
}

//////////////////////////////////////// imprime o status, linha, conometro, personagens e starta o conometro
function imprimir(linha, personagens, duracaoAt) {
    let tituloTop = document.querySelector('#votacao .titulo-top')  
    tituloTop.innerHTML=`
    <h1 class="titulo"><img src="../imagens/icones-lenes-gadosCup/${linha}.svg" alt="">${linha}</h1>  
    <h1 class="titulo"><i class="fas fa-clock"></i><span id="timer">--:--</span></h1>`

    let ul = document.querySelector('#votacao #area-votar')
    ul.innerHTML = ""
  
    for (var x = 0; x < personagens.length; x++) {
        if(personagens[x][2] == 0) {
            //Passa caso esse personagen ja foi jogado em live
        }else{
            ul.innerHTML+=`<li><button onclick="votar(personagen='${personagens[x][0]}', urlImg='${personagens[x][1]}')"><img src="${personagens[x][1]}"><h2>${personagens[x][0]}</h2></button></li>`
        } 
    }
    startTimer(duracaoAt)
};

//////////////////////////////// faz o temer rodar de acordo com os minutos recebidos
function startTimer(duracaoAt) {
    let timer = duracaoAt, minutes, seconds;
    const Interval = setInterval(rodaTimer, 1000);

    function rodaTimer() {
      minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.querySelector('#votacao #timer').innerText = `${minutes}:${seconds}`;
        if (--timer < 0) {
            clearInterval(Interval)
            imprimirAvisos(aviso =`
            <h1><i class="fas fa-lock"></i></h1>
            <p>Votação encerrada.</p>`)
            setTimeout(function() {
                location.reload()
            }, 10000)
        }  
    }
}

var  escolhaDeVoto = []
//////////////////////////////////// define o voto e pede para confirmar
function votar(personagen, urlImg) {
    escolhaDeVoto = [personagen, urlImg]
    imprimirAvisos(aviso =`
    <h1>Seu voto é: <span>${escolhaDeVoto[0]}</span> ?</h1>
    <div class="bnts">
        <button onclick="confimarVoto(opcao = true)">Sim</button>
        <button onclick="confimarVoto(opcao = false)">Não</button>  
    </div>`)
    document.querySelector('#votacao #tela-aviso .bnts button').focus()
}

//////////////////////////////////// true envia voto false tira a confirmacao da tela 
function confimarVoto(opcao) {
    if(opcao == true){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://dados-site-dudomon.herokuapp.com/post_voto", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(`campeao=${escolhaDeVoto[0]}&URLimg=${escolhaDeVoto[1]}`);

        localStorage.setItem('numVotocao', votacaoNum);

        imprimirAvisos(aviso =`
        <h1><i class="fas fa-vote-yea"></i>Voto enviado!</h1>
        <p>Obrigado por votar, em breve o resultado aparecera na live.</p>
        <div id="tela-carregando"><span><div class="carregando-animacao"></div></span></div>`)
        
        setTimeout(function() {
            let telaCarregamentoAviso = document.querySelector('#votacao #tela-aviso #tela-carregando')
        
            telaCarregamentoAviso.classList.add('sumir')
            setTimeout(function() {
                telaCarregamentoAviso.classList.add('none')
            }, 1000)
          }, 600)
    }else {
        document.querySelector('#votacao #tela-aviso').classList.add('none')
    }
}

function imprimirAvisos(aviso) {
    let telaAviso = document.querySelector('#votacao #tela-aviso .container-aviso')
    telaAviso.innerHTML = ""
    document.querySelector('#votacao #tela-aviso').classList.remove('none')
    telaAviso.innerHTML = aviso
}