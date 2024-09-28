let terms = [];  // Array to store terms and definitions from the JSON file

// Fetch the terms from the JSON file and initialize the website
fetch('terms.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch terms.json');
        }
        return response.json();
    })
    .then(data => {
        terms = data;

        // Log to check if terms are loaded
        console.log('Terms loaded:', terms);

        // Load Word of the Day or display terms depending on the page
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            loadWordOfTheDay();
        }

        if (window.location.pathname.includes('terms.html')) {
            displayTerms();
        }

        if (window.location.pathname.includes('search.html')) {
            loadSearchResult();
        }

        // Setup search functionality
        const searchBar = document.getElementById('searchBar');
        const searchButton = document.getElementById('searchButton');

        if (searchBar) {
            searchBar.addEventListener('input', updateAutocomplete);
        }

        if (searchButton) {
            searchButton.addEventListener('click', redirectToSearch);
        }
    })
    .catch(error => {
        console.error('Error fetching terms:', error);
        if (document.getElementById('dailyWord')) {
            document.getElementById('dailyWord').textContent = "Error loading terms.";
        }
    });

// Function to display all terms (for terms.html)
function displayTerms() {
    const container = document.getElementById('termsContainer');
    container.innerHTML = '';  // Clear the list first
    terms.forEach(term => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${term.term}:</strong> ${term.definition}`;
        container.appendChild(li);
    });
}

// Function to load the Word of the Day (for index.html)
function loadWordOfTheDay() {
    console.log('Loading Word of the Day...');
    if (terms.length > 0) {
        const randomIndex = Math.floor(Math.random() * terms.length);
        const wordOfTheDay = terms[randomIndex];
        console.log('Selected word:', wordOfTheDay); // Log the selected word
        document.getElementById('dailyWord').innerHTML = 
            `<strong style="font-size: 1.5em; color: #2a9d8f;">${wordOfTheDay.term}:</strong> ${wordOfTheDay.definition}`;
    } else {
        console.error('No terms available.');
        document.getElementById('dailyWord').textContent = "No terms available.";
    }
}


// Function to update autocomplete suggestions based on input
function updateAutocomplete() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const datalist = document.getElementById('suggestions');
    datalist.innerHTML = ''; // Clear previous suggestions

    const matchingTerms = terms.filter(term => term.term.toLowerCase().includes(query));
    
    if (matchingTerms.length === 0) {
        const option = document.createElement('option');
        option.value = "No Results. Hmm, Check your spelling.";
        datalist.appendChild(option);
    } else {
        matchingTerms.forEach(term => {
            const option = document.createElement('option');
            option.value = term.term;  // Suggest only the term
            datalist.appendChild(option);
        });
    }
}

// Redirect to search result page
function redirectToSearch() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    localStorage.setItem('searchQuery', query);  // Store the search query for later use
    window.location.href = 'search.html';  // Redirect to search.html
}

// Load the search result on search.html page
function loadSearchResult() {
    const query = localStorage.getItem('searchQuery');  // Retrieve the stored search query
    const resultContainer = document.getElementById('searchResult');
    resultContainer.innerHTML = '';  // Clear previous result

    const filteredTerms = terms.filter(term => term.term.toLowerCase() === query);

    if (filteredTerms.length === 0) {
        resultContainer.innerHTML = 'No Results. Hmm, Check your spelling.';
    } else {
        filteredTerms.forEach(term => {
            resultContainer.innerHTML = `<strong>${term.term}:</strong> ${term.definition}`;
        });
    }
}
