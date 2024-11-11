document.addEventListener('DOMContentLoaded', function () {
    const chipContainer = document.querySelector(".chip-container");

    // Função para criar chips
    function createChip(name) {
        const chip = document.createElement("div");
        // Adiciona a classe 'chip' ao chip
        chip.classList.add("chip");

        // Cria o nome do chip
        const chipName = document.createElement("div");
        chipName.classList.add("chipText");
        chipName.textContent = name;

        // Cria o ícone de fechar
        const closeIcon = document.createElement("div");
        closeIcon.classList.add("close-icon");
        closeIcon.textContent = "x";

        // Adiciona evento de remoção ao ícone de fechar
        closeIcon.addEventListener("click", function () {
            chip.remove();
        });

        // Adiciona nome e ícone ao chip
        chip.appendChild(chipName);
        chip.appendChild(closeIcon);

        // Adiciona o chip ao container, verificando se existe
        if (chipContainer) {
            chipContainer.appendChild(chip);
        }
    }

    // Input para adicionar novos chips
    const addChipInput = document.getElementById("addChip");

    if (addChipInput) {
        addChipInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Aqui é usado 'e.preventDefault()', já que o evento foi passado como 'e'
                const name = addChipInput.value.trim();
                if (name !== "") {
                    createChip(name);
                    addChipInput.value = "";
                }
            }
        });
    }

    const apiNotUrl = "http://localhost:3000/api/submitNoticias";
    
    const formNoticias = document.getElementById("form_noticia");
    if (formNoticias) {
        formNoticias.addEventListener("submit", function(e) {
            e.preventDefault();
            const formData = new FormData(formNoticias);

            // Coleta todos os elementos com a classe 'chip'
            const chipsTags = document.querySelectorAll('.chip');
            
            // Converte os elementos para array e coleta o texto de cada chip
            chipsTags.forEach(chip => {
                let text = chip.innerText.split(/[\r\n]/g)[0]; // Regex para remover quebras de linha
                formData.append("tags", text); // Adiciona as tags ao formData
            });

            console.log(formData);

            const requestOptions = {
                method: 'POST',
                body: formData,
            };

            // Faz a requisição para a API
            fetch(apiNotUrl, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao chamar API');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Sucesso:', data);
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        });
    }
});
