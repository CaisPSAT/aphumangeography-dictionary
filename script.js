let terms = [];  // This will hold the terms and definitions from the JSON file

// Fetch the terms from the JSON file
fetch('terms.json')
    .then(response => response.json())
    .then(data => {
        terms = data;
        loadWordOfTheDay();
        displayTerms();
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
    container.innerHTML = '';
    filteredTerms.forEach(term => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${term.term}:</strong> ${term.definition}`;
        container.appendChild(li);
    });
}

// Function to load the Word of the Day
function loadWordOfTheDay() {
    const randomIndex = Math.floor(Math.random() * terms.length);
    const wordOfTheDay = terms[randomIndex];
    document.getElementById('dailyWord').innerHTML = `<strong>${wordOfTheDay.term}:</strong> ${wordOfTheDay.definition}`;
}
