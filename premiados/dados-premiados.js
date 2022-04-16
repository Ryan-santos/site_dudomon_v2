async function fetchDados() {
    try {
        const response = await fetch('https://dados-site-dudomon.herokuapp.com/get_premiados')
        const data = await response.json()
        var dadosPremiados = data.reverse()
        imprimir(dadosPremiados)
    } catch (error) {
      console.log(error)
    }
}
fetchDados()

function imprimir(dadosPremiados) {
  let animacaoCarregamento = document.querySelector('#premiados #tela-carregando')
  animacaoCarregamento.classList.add('none')

    var table = document.querySelector('#premiados .jogadoresPremiados')
    table.innerHTML=`
    <tr>
      <th>Nick do ganhador</th>
      <th>Premiação + valor</th>
      <th>Data</th>
      <th>Meio de ganho</th>
    </tr>`

    for (var x = 0; x < dadosPremiados.length; x++) {
      table.innerHTML+=`
      <tr>
        <td>${dadosPremiados[x][0]}</td>
        <td>${dadosPremiados[x][1]}</td>
        <td>${dadosPremiados[x][2]}</td>
        <td>${dadosPremiados[x][3]}</td>
      </tr>`
  }
}