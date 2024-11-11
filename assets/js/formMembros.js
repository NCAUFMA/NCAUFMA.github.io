const apiMembroUrl = "http://localhost:3000/api/submitMembro";

formMembro = document.getElementById("form_membro");

if (formMembro){
    formMembro.addEventListener("submit", (e) =>{
    e.preventDefault();
    formData = new FormData(formMembro);
    
    let objJson = {};
    
    for (var [key, value] of formData.entries()) { 
        console.log(key, value);
        objJson[key] = value;
    }

    const requestOptions = {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: formData,
    };


        fetch(apiMembroUrl, requestOptions)
        .then(response => {
                if (!response.ok){
                    throw new Error('Erro ao chamar API');
                }
                return response.json();
        })
    })
}