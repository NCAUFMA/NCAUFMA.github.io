async function getMembros() {
  const response = await fetch("http://localhost:3000/api/getMembros");
  try {
      if (!response.ok) {
          throw new Error('Erro ao obter membros: ' + response.status);
      }

      const json = await response.json().then(result => {
          let tableBody = document.getElementById("tableBodyMembros");

          let contador = 1;
          let objData = result['message'];
          var tableRows = document.getElementById("sortableTable").rows.length;

          if (tableRows === 1) {
              for (const [key, value] of Object.entries(objData)) {
                  createNewTDMembro(contador, value.nome, value.cargo, value.afiliacao, tableBody);
                  contador++;
              }
          }
      }).catch(console.error);

  } catch (error) {
      console.log(error);
  }
}


if (window.location.pathname === "/gerenciador/membros/") {
  getMembros();
}


function createNewTDMembro(contador, nome, cargo, afiliacao, tableBody) {
  let tr = document.createElement('tr');
  tr.classList.add('dadopesquisado');

  // Coluna de ID
  let tdId = document.createElement('td');
  tdId.innerText = contador;

  // Coluna Nome
  let tdNome = document.createElement('td');
  tdNome.innerText = nome;

  // Coluna Cargo
  let tdCargo = document.createElement('td');
  tdCargo.textContent = cargo;

  // Coluna Afiliação
  let tdAfiliacao = document.createElement('td');
  tdAfiliacao.textContent = afiliacao;

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
  tr.appendChild(tdCargo);
  tr.appendChild(tdAfiliacao);
  tr.appendChild(tdIcon);

  // Adicionando a linha ao corpo da tabela
  tableBody.appendChild(tr);
}
