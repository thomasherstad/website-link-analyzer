const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function normalizeURL(url){
    const myURL = new URL(url);
    let fullPath = myURL.hostname + myURL.pathname 
    
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0,-1);
    };
    
    return fullPath
};   

function getURLsFromHTML(htmlBody, baseURL) {
    //returns an un-normalized array of urls
    const dom = new JSDOM(htmlBody);
    const urls = dom.window.document.querySelector('a').textContent;
    return urls
};

async function getHTMLFromURL(url) {
    let response
    try{
        response = await fetch(url);
    } catch (error) {
        throw new Error(`Network error: ${error.message}`)
    }
    if (response.status >= 400) {
        console.log(`There was an error getting the url, status ${response.status}`);
        return
    }
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`The content type is not text/html`)
        return
    } else {
        const htmlBody = await response.text()
        console.log(htmlBody)
    }

}

async function crawlPage(baseURL, currentURL=baseURL, pages={}){
    // Make sure the current url is on the baseURL
    let base = new URL(baseURL)
    let current = new URL(currentURL)
    console.log(`Base host: ${base.host}`)
    console.log(`Current host: ${current.host}`)
    
    if (base.host != current.host) {
        console.log('Different hosts')
        return pages
    }

    // Get a normalized version of the URL
    const normalizedURL = normalizeURL(currentURL)
    console.log(`Normalized URL: ${currentURL}`)

    // If it exists in pages for the normalized version of current, increment the count and return pages
    // Otherwise, add an entry and set the count to 1
    if (pages[normalizedURL]) {
        pages[normalizedURL]++
        return pages
    } else {
        pages[normalizedURL] = 1
    }
    
    // If we have gotten here, break out the logic for fetching the ucrrent URL and parsing 
    // the html into its own function. 
    //This will keep the crawl functionality readable and manageable.  
    //Call the new function inside crawlPage.
    const currentHTML = await getHTMLFromURL(currentURL)

    // Assuming all went well with the fetch request in the new function, 
    // get all the URLs from  the response body HTML
    const  linksFound = getURLsFromHTML(currentHTML)
    console.log(`Found these links on ${normalizedURL}: 
    ${linksFound}`)
    // Recursively crawl each URL you  found on the page and update the pages to keep an aggregate count

    //Finally return the updated pages object

}


module.exports = { normalizeURL, getURLsFromHTML, crawlPage};
