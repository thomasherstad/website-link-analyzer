const { crawlPage } = require('./crawl');

async function main() {
    const argAmount = process.argv.length;
    
    if (argAmount < 3) {
        throw new Error('Not enough arguments');
    } else if (argAmount > 5) {
        throw new Error('Too many arguments');
    }
    
    const baseURL = process.argv[2]
    console.log(`Crawling at url ${baseURL}`);
    pages = await crawlPage(baseURL)
    console.log(pages)
};


main()