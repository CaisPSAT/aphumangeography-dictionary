let terms = [];  // Array to store terms and definitions from the JSON file

// Fetch the terms from the JSON file and initialize the website
fetch('terms.json')
    .then(response => response.json())
    .then(data => {
        terms = data;
        loadWordOfTheDay();    // Load Word of the Day after fetching terms
        displayTerms();        // Display all terms after fetching
    })
    .catch(error => {
        console.error('Error fetching terms:', error);
        document.getElementById('dailyWord').textContent = "Error loading terms.";
    });

// Function to display all terms
function displayTerms() {
    const container = document.getElementById('termsContainer');
    container.innerHTML = '';
    terms.forEach(term => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${term.term}:</strong> ${term.definition}`;
        container.appendChild(li);
    });
}

// Function to search for a term
function searchTerm() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filteredTerms = terms.filter(term => term.term.toLowerCase().includes(query));
    
    const container = document.getElementById('termsContainer');
    container.innerHTML = '';  // Clear the list first
    if (filteredTerms.length > 0) {
        filteredTerms.forEach(term => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${term.term}:</strong> ${term.definition}`;
            container.appendChild(li);
        });
    } else {
        container.innerHTML = '<li>No results found.</li>';
    }
}

// Function to load the Word of the Day
function loadWordOfTheDay() {
    const randomIndex = Math.floor(Math.random() * terms.length);
    const wordOfTheDay = terms[randomIndex];
    document.getElementById('dailyWord').innerHTML = 
        `<strong style="font-size: 1.5em; color: #2a9d8f;">${wordOfTheDay.term}:</strong> ${wordOfTheDay.definition}`;
}

// Add event listener to the search button to trigger the search
document.getElementById('searchButton').addEventListener('click', searchTerm);

// Add event listener to handle real-time search while typing (optional)
document.getElementById('searchBar').addEventListener('input', searchTerm);
