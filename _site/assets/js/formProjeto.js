document.addEventListener('DOMContentLoaded', function () {
    const chipContainer = document.querySelector(".chip-container");

    // Função para criar chips
    function createChip(name) {
        const chip = document.createElement("div");
        chip.classList.add("chip");

        // Nome do chip
        const chipName = document.createElement("div");
        chipName.classList.add("chipText");
        chipName.textContent = name;

        // Ícone de fechar
        const closeIcon = document.createElement("div");
        closeIcon.classList.add("close-icon");
        closeIcon.textContent = "x";

        // Evento para remover o chip ao clicar no ícone de fechar
        closeIcon.addEventListener("click", function () {
            chip.remove();
        });

        // Adiciona o nome e o ícone ao chip
        chip.appendChild(chipName);
        chip.appendChild(closeIcon);

        // Adiciona o chip ao container
        if (chipContainer) {
            chipContainer.appendChild(chip);
        }
    }

    // Input para adicionar novos chips
    const addChipInput = document.getElementById("addChip");

    if (addChipInput) {
        addChipInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Usando 'e.preventDefault()', não 'event.preventDefault()'
                const name = addChipInput.value.trim();
                if (name !== "") {
                    createChip(name);
                    addChipInput.value = "";
                }
            }
        });
    }

    const apiProjUrl = "http://localhost:3000/api/submitProjeto";
    const formProjeto = document.getElementById("form_projeto");
    const inputFoto = document.getElementById("filefoto");

    if (formProjeto) {
        formProjeto.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(formProjeto);

            // Coleta todos os elementos com a classe 'chip'
            const chips = document.querySelectorAll('.chip');

            // Adiciona cada chip ao formData
            chips.forEach(chip => {
                let text = chip.innerText.split(/[\r\n]/g)[0]; // Regex para remover quebras de linha
                formData.append("chip", text); // Adiciona os chips ao formData
            });

            // Configurações da requisição POST
            const requestOptions = {
                method: 'POST',
                body: formData,
            };

            // Faz a requisição para a API
            fetch(apiProjUrl, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao chamar API');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Sucesso:', data);

                    // Limpa o formulário
                    formProjeto.reset(); // Limpa todos os campos do formulário

                    // Remove todos os chips
                    const chipContainer = document.querySelector(".chip-container");
                    chipContainer.innerHTML = ''; // Limpa todos os chips

                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        });
    }
});
