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


module.exports = { normalizeURL, getURLsFromHTML };
