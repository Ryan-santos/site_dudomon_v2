
function avisoInscricao() {
  document.querySelector('#ficha-inscricao #aviso').classList.remove('none')
  document.querySelector('#ficha-inscricao form').classList.add('none')

  window.location.href = "#ficha-inscricao"
  
  setTimeout(function() {
    let telaCarregamentoAviso = document.querySelector('#ficha-inscricao #aviso #tela-carregando')

    telaCarregamentoAviso.classList.add('sumir')
    setTimeout(function() {
      telaCarregamentoAviso.classList.add('none')
      window.location.href = "#ficha-inscricao"
    }, 1000)
  }, 1500)
};


async function fetchDadosTimes() {
  try {
      const response = await fetch('https://dados-site-dudomon.herokuapp.com/get_time_gc')
      const dadosTimesGadosCup = await response.json()
      imprimirtimes(dadosTimesGadosCup)
      inscricaoFechada(dadosTimesGadosCup)
  } catch (error) {
    console.log(error)
  }
}

fetchDadosTimes()

function imprimirtimes(dadosTimesGadosCup) {
    var div = document.querySelector('#times-gc .container-times')
    div.innerHTML = ""

    if (dadosTimesGadosCup == undefined) {
      div.innerHTML="<p><mark>Nenhum time confirmado para a Gado's Cup no momento !</mark></p>"
    }

    for (var x = 0; x < dadosTimesGadosCup.length; x++) {
      div.innerHTML+=`
      <ul>
        <li><h2>${dadosTimesGadosCup[x][0]}</h2></li>
        <li><span><img src="../imagens/icones-lenes-gadosCup/JG.svg"></span><div><p>${dadosTimesGadosCup[x][1]}</p></div></li>
        <li><span><img src="../imagens/icones-lenes-gadosCup/TOP.svg"></span><div><p>${dadosTimesGadosCup[x][2]}</p></div></li>
        <li><span><img src="../imagens/icones-lenes-gadosCup/MID.svg"></span><div><p>${dadosTimesGadosCup[x][3]}</p></div></li>
        <li><span><img src="../imagens/icones-lenes-gadosCup/ADC.svg"></span><div><p>${dadosTimesGadosCup[x][4]}</p></div></li>
        <li><span><img src="../imagens/icones-lenes-gadosCup/SUP.svg"></span><div><p>${dadosTimesGadosCup[x][5]}</p></div></li>
        <li><span><img src="../imagens/icones-lenes-gadosCup/RESERVA.svg"></span><div><p>${dadosTimesGadosCup[x][6]}</p></div></li>
      </ul>`
  }

};

function inscricaoFechada(dadosTimesGadosCup) {
  if (dadosTimesGadosCup.length >= 8){
    document.querySelector('#ficha-inscricao').innerHTML=`
    <div class="encerrada-inscricao">
      <i class="fas fa-frown"></i>
      <h1>Que pena, infelizmente as inscrições ja se encerraram.</h1>
    </div>`
  }
}