function search() {
    const userMessage = document.getElementById('search').value;
    document.getElementById('search').value = ''
    console.log(userMessage)
    document.getElementById('search_button').innerHTML = `<i class="fa-solid fa-arrow-up fa-spin"></i>`
    const ansDiv = document.getElementById('ans');

    const qsDiv = document.createElement('div');
    qsDiv.classList.add('userDiv');

    qsDiv.innerText += userMessage
    qsDiv.style.marginTop = '10px'
    ansDiv.appendChild(qsDiv)

    // api1
    // const url = 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions';
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json',
    //         'X-RapidAPI-Key': '84ede7503bmsh482b8f109fdf27fp1ca99cjsn8570f7da1a4b',
    //         'X-RapidAPI-Host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com'
    //     },
    //     body: JSON.stringify({
    //         messages: [
    //             {
    //                 role: 'user',
    //                 content: userMessage
    //             }
    //         ],
    //         model: 'gpt-4-turbo-2024-04-09',
    //         max_tokens: 100,
    //         temperature: 0.9
    //     })
    // };

    // api2
    // const url = 'https://chat-gpt26.p.rapidapi.com/';
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json',
    //         'Content-Type': 'application/json',
    //         'X-RapidAPI-Key': '977d4c608fmsha4d445e30a329c3p1748a0jsn15cd50c3f5ce',
    //         'X-RapidAPI-Host': 'chat-gpt26.p.rapidapi.com'
    //     },
    //     body: JSON.stringify({
    //         model: 'gpt-3.5-turbo',
    //         messages: [
    //             {
    //                 role: 'user',
    //                 content: userMessage
    //             }
    //         ]
    //     })
    // };

    // api3
    const url = 'https://chatgpt-api8.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '977d4c608fmsha4d445e30a329c3p1748a0jsn15cd50c3f5ce',
            'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
        },
        body: JSON.stringify([
            {
                content: 'Hello! I\'m an AI assistant bot based on ChatGPT 3. How may I help you?',
                role: 'system'
            },
            {
                content: userMessage,
                role: 'user'
            }
        ])
    };

    // api4
    // const url = 'https://simple-chatgpt-api.p.rapidapi.com/ask';
    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json',
    //         'X-RapidAPI-Key': '84ede7503bmsh482b8f109fdf27fp1ca99cjsn8570f7da1a4b',
    //         'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com'
    //     },
    //     body: JSON.stringify({
    //         question: userMessage
    //     })
    // };

    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        // console.log(data)

        // for api1 and api2
        // const newDataDiv = document.createElement('div');
        // newDataDiv.innerText += data.choices[0].message.content;
        // newDataDiv.style.marginTop = '10px'
        // ansDiv.appendChild(newDataDiv);

        // for api3
        const newDataDiv = document.createElement('div');
        newDataDiv.innerText = data.text;
        ansDiv.appendChild(newDataDiv);

        // for api4
        // const newDataDiv = document.createElement('div');
        // newDataDiv.innerText = data.answer;
        // newDataDiv.style.marginTop = '10px';
        // ansDiv.appendChild(newDataDiv);
        
        document.getElementById('search_button').innerHTML = `<i class="fa-solid fa-arrow-up"></i>`
    })
}

function clearchat() {
    document.getElementById('ans').innerText = '';
    document.getElementById('search').value = '';
}

document.addEventListener('keydown' , function(e) {
    if(e.key == 'Enter'){
        search();
    }
})