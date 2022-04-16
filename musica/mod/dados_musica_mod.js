let telaCarregamento = document.querySelector('#tela-carregando')

let audio = new Audio('sons/som.mp3');

function somAtivado() {
    document.querySelector('#bnt-ativa-som').innerHTML=`<i class="fas fa-volume-up"></i>`
    audio.play()
}

let numDePedidos = 0

async function fetchDados(opc) {
    try {
        const response = await fetch('https://dados-site-dudomon-mod.herokuapp.com/get_pedidos_musica')
        const dadosPedidos = await response.json()

        let status = dadosPedidos[0]
        let pedidos = dadosPedidos[1]

        let acoesStatus = document.querySelectorAll('#acoes .acoes-status input')
        if(status >= 0 && status <= 2){ 
            acoesStatus[status].checked = true
        }

        if(pedidos != null || opc == true){
            imprimirPedidos(pedidos)
            if(numDePedidos < pedidos.length){ // toca o som quando tem pedido novo
                audio.play()
                numDePedidos = pedidos.length
            }
        }

        if(opc == true){// so pra limpar a lista
            numDePedidos = 0
            imprimirPedidos()
        }

        document.querySelector('#tela-carregando p').innerHTML=`CARREGANDO . . .`

        setTimeout(function() {
            telaCarregamento.classList.add('sumir')
            setTimeout(function() {
              telaCarregamento.classList.add('none')
            }, 1000)
        }, 2000)
    } catch (error) {
        console.log(error)
        document.querySelector('#tela-carregando p').innerHTML=`<i class="fas fa-power-off"></i> Server fora do ar`
    }
}fetchDados()

    function imprimirPedidos(pedidos) {
        let vagaPedidos = document.querySelector('#pedidos #container-pedidos')
        let vagaPedidosPagos = document.querySelector('#pagos #container-pedidos')
        let vagaPedidosUsados = document.querySelector('#usados #container-pedidos')

        vagaPedidos.innerHTML=''
        vagaPedidosPagos.innerHTML=''
        vagaPedidosUsados.innerHTML=''

        for (var x = 0; x < pedidos.length; x++){
            if(pedidos[x][2] == 1){
                vagaPedidosPagos.innerHTML+=`<li><div><h2>${pedidos[x][0]}</h2></div><div><p>${pedidos[x][1]}</p></div><div><button onclick="enviarAcoes(0, acaoList=true, listLugar=${x+1}, listDado=2)"><i class="fas fa-compact-disc"></i></button></div></li>`
            }else if(pedidos[x][2] == 2){
                vagaPedidosUsados.innerHTML+=`<li><div><h2>${pedidos[x][0]}</h2></div><div><p>${pedidos[x][1]}</p></div><div><button></button></div></li>`
            }else{
                vagaPedidos.innerHTML+=`<li><div><h2>${pedidos[x][0]}</h2></div><div><p>${pedidos[x][1]}</p></div><div><button onclick="enviarAcoes(0, acaoList=true, listLugar=${x+1}, listDado=1)"><i class="fas fa-search-dollar"></i></button></div></li>`
            }
        }
    }

    function enviarAcoes(acao, acaoList, listLugar, listDado) {
        let senha = document.querySelector('#acoes #senha')

        if(senha.value.length <= 0){
            alert('Para fazer as ações de moderador e necessário digitar a senha. ^_^')
            senha.focus()
        }else {
            telaCarregamento.className = '' // ativa a tela de carregamento

            let formEnviaAcoes = document.querySelector('#envia-acoes #container-acoes')
            let bntForm =  document.querySelector('#envia-acoes #bnt-envia')

            if(acaoList == true){
                formEnviaAcoes.innerHTML=`
                <input type="text" name="chave" value="${senha.value}">
                <input type="text" name="listLugar" value="${listLugar}">
                <input type="text" name="listDado" value="${listDado}">` 
                bntForm.click()
            }else{
                formEnviaAcoes.innerHTML=`
                <input type="text" name="chave" value="${senha.value}">
                <input type="text" name="acao" value="${acao}">`
                bntForm.click()
            }

            if(acao == 'clear'){
                setTimeout(function() {
                    fetchDados(true)
                 }, 1000) 
            }else{
                setTimeout(function() {
                    fetchDados()
                }, 1000)  
            }

            
        }
    }

    const Interval = setInterval(fetchDados, 5000);
