let terms = [];  // Array to store terms and definitions from the JSON file

// Fetch the terms from the JSON file and initialize the website
fetch('terms.json')
    .then(response => response.json())
    .then(data => {
        terms = data;

        // If on index.html or home page, load Word of the Day and set up search
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            loadWordOfTheDay();    // Load Word of the Day after fetching terms
        }

        // If on terms.html, display all terms
        if (window.location.pathname.includes('terms.html')) {
            displayTerms();        // Display all terms on the terms.html page
        }

        // Setup the search functionality (for both pages)
        document.getElementById('searchBar').addEventListener('input', updateAutocomplete);
        document.getElementById('searchButton').addEventListener('click', searchTerm);
    })
    .catch(error => {
        console.error('Error fetching terms:', error);
        document.getElementById('dailyWord').textContent = "Error loading terms.";
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
    const randomIndex = Math.floor(Math.random() * terms.length);
    const wordOfTheDay = terms[randomIndex];
    document.getElementById('dailyWord').innerHTML = 
        `<strong style="font-size: 1.5em; color: #2a9d8f;">${wordOfTheDay.term}:</strong> ${wordOfTheDay.definition}`;
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

// Function to search for a term and display it (for both pages)
function searchTerm() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const container = document.getElementById('termsContainer');
    container.innerHTML = '';  // Clear the list

    const filteredTerms = terms.filter(term => term.term.toLowerCase() === query);
    
    if (filteredTerms.length === 0) {
        container.innerHTML = '<li>No Results. Hmm, Check your spelling.</li>';
    } else {
        filteredTerms.forEach(term => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${term.term}:</strong> ${term.definition}`;
            container.appendChild(li);
        });
    }
}
