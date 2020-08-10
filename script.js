const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn  = document.getElementById('twitter');
const newQuoteBtn  = document.getElementById('new-quote');
const loader = document.getElementById('loader')

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false
}

// Get Quotes (get API from remote serve)
async function getQuote() {
    showLoadingSpinner();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();

        // if author are unknown or blank

        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        }    
        // Reduce font-size of long quotes 
        if (data.quoteText.length > 100) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        // stop the loader and show text
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
    }
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `
    https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    // Open in new tab
    window.open(twitterURL, '_blank')
}

// Add event listener to buttons
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load new quote
getQuote();