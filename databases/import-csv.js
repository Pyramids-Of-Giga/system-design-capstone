const client = require('./dbpgrnr.js');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;

function importData(csvFilePath, tableName) {
    return new Promise((resolve, reject) => {
        const copyQuery = `COPY ${tableName} FROM STDIN DELIMITER ',' CSV HEADER`;
        const fileStream = fs.createReadStream(csvFilePath);
        const dbStream = client.query(copyFrom(copyQuery));

        fileStream.on('error', (error) => {
            console.error('Error reading CSV file:', error);
            reject(error);
        });

        dbStream.on('finish', () => {
            console.log(`Data imported into ${tableName} table.`);
            resolve();
        }).on('error', (error) => {
            console.error(`Error streaming data into ${tableName} table:`, error);
            reject(error);
        });

        fileStream.pipe(dbStream);
    });
}

(async function() {
    try {
        await importData('/Users/Shared/reviews.csv', 'rnr.reviews');
        await importData('/Users/Shared/reviews_photos.csv', 'rnr.revpics');
        await importData('/Users/Shared/characteristics.csv', 'rnr.chars');
        await importData('/Users/Shared/characteristic_reviews.csv', 'rnr.revchars');
    } catch (error) {
        console.error("Error during import:", error);
    } finally {
        client.end();
    }
})();
