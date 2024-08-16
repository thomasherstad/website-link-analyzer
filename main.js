const { crawlPage } = require('./crawl');

async function main() {
    const argAmount = process.argv.length;
    
    if (argAmount < 3) {
        throw new Error('Not enough arguments');
    } else if (argAmount > 5) {
        throw new Error('Too many arguments');
    }
    
    const baseURL = process.argv[2]
    let currentURL = baseURL
    let pages = {}
    if (process.argv[3]){
        currentURL =  process.argv[3];
    }
    if (process.argv[4]){
        pages =  process.argv[4]
    }
    console.log(`Crawling at url ${baseURL}`);
    await crawlPage(baseURL, currentURL, pages)
};


main()