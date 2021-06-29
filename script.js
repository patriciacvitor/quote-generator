const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// GENERATE QUOTES FROM API

let apiQuotes = []

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
    loading()
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    // Check Quote length to determine styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote')
        console.log('oi')
    } else {
        quoteText.classList.remove('long-quote')
        console.log('lalala')
    }
    quoteText.textContent = quote.text
    
    // Check if author field is blank to replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author
    }

    // After Set Quote and Hide Loader
    complete()
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}


// Get Quotes from API
async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        // console.log(apiQuotes[12])
        newQuote()
    } catch (error) {
        // Catch Error Here
    }
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes()

// -----------------------------------------------------------------------

// // GENERATE QUOTES FROM LOCAL FILE

// // Show new Quote
// function newQuote() {
//     // Pick a random quote from apiQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    // console.log(quote)
// }

// newQuote()