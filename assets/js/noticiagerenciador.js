async function getNoticias() {
  const response = await fetch("http://localhost:3000/api/getNoticias");
  try {
      if (!response.ok) {
          throw new Error('Erro ao obter notícias: ' + response.status);
      }

      const json = await response.json().then(result => {
          let tableBody = document.getElementById("tableBodyNoticias");

          let contador = 1;
          let objData = result['message'];
          var tableRows = document.getElementById("sortableTable").rows.length;

          if (tableRows === 1) {
              for (const [key, value] of Object.entries(objData)) {
                  createNewTDNoticia(contador, value.titulo, value.tags, tableBody);
                  contador++;
              }
          }
      }).catch(console.error);

  } catch (error) {
      console.log(error);
  }
}


if (window.location.pathname === "/gerenciador/noticias/") {
  getNoticias();
}


function createNewTDNoticia(contador, titulo, tags, tableBody) {
  let tr = document.createElement('tr');
  tr.classList.add('dadopesquisado');
  // Coluna de ID
  let tdId = document.createElement('td');
  tdId.innerText = contador;

  // Coluna de Título
  let tdTitulo = document.createElement('td');
  tdTitulo.textContent = titulo;

  // Coluna de Tags
  let tdTag = document.createElement('td');
  tags.forEach(element => {
      tdTag.innerText += element + " | ";
  });

  // Coluna de Ações
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
  tr.appendChild(tdTitulo);
  tr.appendChild(tdTag);
  tr.appendChild(tdIcon);

  // Adicionando a linha ao corpo da tabela
  tableBody.appendChild(tr);
}
