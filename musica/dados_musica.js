let fichaMusica = document.querySelector('#pedir-musica #ficha-inscricao')



async function fetchDados() {

    try {

        const response = await fetch('https://dados-site-dudomon.herokuapp.com/get_pedidos_musica')

        const status = await response.json() //0 = Pedidos de música fechados / 1 = Pedidos de música aberto / 2 = Pedidos de música em espera



        if(status[0] == 1){

            imprimirFormulario()

        }else if(status[0] == 2){

            imprimirAviso(aviso=`

            <div id="aviso">

            <div id="instrucao-pagamento">

            <h1><i class="fas fa-exclamation-triangle"></i>Volte mais tarde.</h1>

            <p>Estamos com muitos pedidos de músicas no momento, aguarde mais um pouco pra pedir.</p>

            <h1><i class="fas fa-frown-open"></i></h1>

            </div>`)

        }else {

            imprimirAviso(aviso=`

            <div id="aviso">

            <div id="instrucao-pagamento">

            <h1><i class="fas fa-lock"></i>Pedidos fechados</h1>

            <p>Os pedidos de músicas ficam abertas somente quando a live está aberta e se a pessoa responsável pelos os pedidos estiver presente.</p>

            <h1><i class="fas fa-grin-wink"></i></h1>

            </div>`)

        }

    } catch (error) {

      console.log(error)

      imprimirAviso(aviso=`

        <div id="aviso">

        <div id="instrucao-pagamento">

        <h1><i class="fas fa-power-off"></i></h1>

        <p>Sever fora do ar.</p>

        <h1><i class="fas fa-frown-open"></i></h1>

        </div>`)

    }

}

fetchDados()

  

function imprimirFormulario() {

    fichaMusica.innerHTML='' // limpa primeiro

    fichaMusica.innerHTML+=`

    <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>

    <form action="https://dados-site-dudomon.herokuapp.com/post_pedidos_musica" method="post" onsubmit="enviou()" target="dummyframe">

        <h1>Seu nome</h1>

        <p>Preencha a seguir com o mesmo nome da conta que vai fazer o pagamento, para sabermos qual e seu pedido de música.</p>

        <input class="nome-time" type="text" name="nomePessoa" placeholder="Ex: Eduardo peiter" required>

        <h1>Música</h1>

        <p>Preencha a seguir com o nome da música ou com a URL da música sendo do Spotify.</p>

        <input class="nome-time" type="text" name="musica" placeholder="Ex: The Score - Revolution" required>

        <br><input class="bnt-inscricao" type="submit" value="Reservar música">

    </form>

    <!------------------------------------ Aviso quando envia o form -------------------------------------------------------------->

    <div id="aviso" class="none">

        <div id="tela-carregando"><span><div class="carregando-animacao"></div></span></div>

        <div id="instrucao-pagamento">

        <h1><i class="fas fa-clipboard-check"></i>Reserva de música enviada com sucesso!</h1>

        <p>Agora você deve efetuar o pagamento da taxa para que sua música seja tocada, escolha uma das formas de pagamento a seguir para pagar a taxa.</p>

        <p><mark>A taxa e de 2 reais.</mark></p>

        <ul class="formas-pagamento">

        <li><span><img src="../imagens/pix-logo.png" alt="pix"></span><h4>contatodudomon@gmail.com</h4></li>

        <li><span><img src="../imagens/picpay-logo.png" alt="picpay"></span><h4>@dudomon</h4></li>

        </ul>

        </div>

    </div>`

};



function imprimirAviso(aviso) {

    fichaMusica.innerHTML='' // limpa primeiro

    fichaMusica.innerHTML=aviso

}



function enviou() {

    document.querySelector('#ficha-inscricao #aviso').classList.remove('none')

    document.querySelector('#ficha-inscricao form').classList.add('none')

    

    setTimeout(function() {

      let telaCarregamentoAviso = document.querySelector('#ficha-inscricao #aviso #tela-carregando')

  

      telaCarregamentoAviso.classList.add('sumir')

      setTimeout(function() {

        telaCarregamentoAviso.classList.add('none')

      }, 1000)

    }, 1500)

}