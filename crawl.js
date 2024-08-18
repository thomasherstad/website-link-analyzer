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
    let urls = []
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');

    for (const anchor of anchors){
        if (anchor.hasAttribute('href')){
            let href = anchor.getAttribute('href')

            try {
                href = new URL(href, baseURL).href
                urls.push(href)
            } catch (err){
                console.log(`${err.message}: ${href}`)
            }
        }
    }

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
        console.log(`The content-type for ${url} is not text/html`)
        return
    } else {
        const htmlBody = await response.text()
        //console.log(htmlBody)
        return htmlBody
    }

}

async function crawlPage(baseURL, currentURL=baseURL, pages={}, alreadyCrawled=[]){
    let base = new URL(baseURL)
    let current = new URL(currentURL)
    
    if (base.host !== current.host) {
        return pages
    }

    const normalizedURL = normalizeURL(currentURL)

    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++
        return pages
    }

    pages[normalizedURL] = 1

    let currentHTML = ''
    try {
        currentHTML = await getHTMLFromURL(currentURL)
    } catch (err){
        console.log(`${err.message}`)
        return pages
    }

    const linksFound = getURLsFromHTML(currentHTML, baseURL)

    for (const link of linksFound) {
        pages = await crawlPage(baseURL, link, pages)

    };

    return pages;
};


module.exports = { normalizeURL, getURLsFromHTML, crawlPage};
