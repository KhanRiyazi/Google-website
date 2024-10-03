// script.js
async function fetchMeaning(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
        throw new Error('Word not found');
    }
    return await response.json();
}

function displayMeaning(data) {
    const meaningContainer = document.getElementById("meaning");
    meaningContainer.innerHTML = ''; // Clear previous meaning

    data.forEach(entry => {
        const title = document.createElement("h3");
        title.textContent = entry.word;
        meaningContainer.appendChild(title);

        entry.meanings.forEach(meaning => {
            const partOfSpeech = document.createElement("strong");
            partOfSpeech.textContent = `${meaning.partOfSpeech}: `;
            meaningContainer.appendChild(partOfSpeech);

            meaning.definitions.forEach(definition => {
                const def = document.createElement("p");
                def.textContent = definition.definition;
                meaningContainer.appendChild(def);
            });
        });
    });

    meaningContainer.classList.remove('hidden');
    document.getElementById("backHome").classList.remove('hidden'); // Show the back button
}

async function search() {
    const searchBar = document.getElementById("searchBar");
    const word = searchBar.value.trim();

    if (word) {
        try {
            const data = await fetchMeaning(word);
            displayMeaning(data);
        } catch (error) {
            const meaningContainer = document.getElementById("meaning");
            meaningContainer.innerHTML = `<p>${error.message}</p>`;
            meaningContainer.classList.remove('hidden');
            document.getElementById("backHome").classList.remove('hidden'); // Show the back button
        }
    } else {
        alert('Please enter a word to search');
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        search();
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("open");
}

function goHome() {
    // Reload the page to go back to the home interface
    location.reload();
}
