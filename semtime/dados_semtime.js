async function fetchDados() {
    try {
        const response = await fetch('https://dados-site-dudomon.herokuapp.com/get_sem_time')
        const dadosSemTime = await response.json()
        document.querySelector('#lista-semtime #container-semtime').innerHTML=''
        imprimirtimes(dadosSemTime)
    } catch (error) {
      console.log(error)
    }
}
fetchDados()
  
function imprimirtimes(dadosSemTime) {
    for (var x = 0; x < dadosSemTime.length; x++) {
      document.querySelector('#lista-semtime #container-semtime').innerHTML+=`
      <li>
      <h1>${dadosSemTime[x][0]}</h1>
      <p><mark>Posiçao:</mark> ${dadosSemTime[x][1]}</p>
      <p><mark>Elo:</mark> ${dadosSemTime[x][2]}</p>
      <a href="https://api.whatsapp.com/send?phone=55${dadosSemTime[x][3].replace(/ |\(|\)|-/g, "")}" target="_black"><span>Chamar</span></a>
      </li>`
    }
};

function enviou() {
  document.querySelector('#ficha-inscricao #aviso').classList.remove('none')
  document.querySelector('#ficha-inscricao form').classList.add('none')
  
  setTimeout(function() {
    let telaCarregamentoAviso = document.querySelector('#ficha-inscricao #aviso #tela-carregando')

    telaCarregamentoAviso.classList.add('sumir')
    setTimeout(function() {
      telaCarregamentoAviso.classList.add('none')
      window.location.href = "#ficha-inscricao"
    }, 1000)
  }, 1500)
}