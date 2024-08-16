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


async function crawlPage(currentURL){
    let response
    try{
        response = await fetch(currentURL);
    } catch (error) {
        throw new Error(`Network error: ${error.message}`)
    }
    if (response.status >= 400) {
        throw new Error(`There was an error getting the url, status ${response.status}`);
    }
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        throw new Error(`The content type is not text/html`)
    } else {
        const htmlBody = await response.text()
        console.log(htmlBody)
    }
}


module.exports = { normalizeURL, getURLsFromHTML, crawlPage};
