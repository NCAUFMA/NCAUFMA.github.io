async function getLaboratorios() {
  const response = await fetch("http://localhost:3000/api/getLaboratorios");
  try {
      if (!response.ok) {
          throw new Error('Erro ao obter laboratórios: ' + response.status);
      }

      const json = await response.json().then(result => {
          let tableBody = document.getElementById("tableBodyLaboratorios");

          let contador = 1;
          let objData = result['message'];
          var tableRows = document.getElementById("sortableTable").rows.length;

          if (tableRows === 1) {
              for (const [key, value] of Object.entries(objData)) {
                  createNewTDLaboratorio(contador, value.nome, value.imagem, tableBody);
                  contador++;
              }
          }
      }).catch(console.error);

  } catch (error) {
      console.log(error);
  }
}


if (window.location.pathname === "/gerenciador/laboratorios/") {
  getLaboratorios();
}


function createNewTDLaboratorio(contador, nome, imagemUrl, tableBody) {
  let tr = document.createElement('tr');
  tr.classList.add('dadopesquisado');
  // Coluna de ID
  let tdId = document.createElement('td');
  tdId.innerText = contador;

  // Coluna Nome
  let tdNome = document.createElement('td');
  tdNome.innerText = nome;

  // Coluna Imagem
  let tdImagem = document.createElement('td');
  let img = document.createElement('img');
  img.src = imagemUrl;
  img.alt = `Imagem de ${nome}`;
  img.style.width = "100px"; // Ajuste o tamanho da imagem conforme necessário
  tdImagem.appendChild(img);

  // Coluna Ações
  let tdIcon = document.createElement('td');



  let buttonEdit = document.createElement('button');
  buttonEdit.className = 'action-button edit';
  buttonEdit.innerText = '✏️';

  let buttonDelete = document.createElement('button');
  buttonDelete.className = 'action-button delete';
  buttonDelete.innerText = '🗑️';

  tdIcon.appendChild(buttonEdit);
  tdIcon.appendChild(buttonDelete);

  // Adicionando as colunas na linha da tabela
  tr.appendChild(tdId);
  tr.appendChild(tdNome);
  tr.appendChild(tdImagem);
  tr.appendChild(tdIcon);

  // Adicionando a linha ao corpo da tabela
  tableBody.appendChild(tr);
}
