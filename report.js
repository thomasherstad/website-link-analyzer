function sortObject(obj){
    const pagesArray = Object.entries(pages)
    let sortedObject
    return sortedObject
}

function printReport(pages) {
    console.log('-------')
    console.log('REPORT')
    console.log('-------')
    
    //TODO
    //const sortedPages = sortObject(pages)

    for ([key, value] of Object.entries(pages)){
        console.log(`Found ${value} links to ${key}`)
    }
    
}


module.exports = { printReport };