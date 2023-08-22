const fs = require("fs");

function getProductsFromTSV() {

    const results = [];

    try {
        const csvData = fs.readFileSync('input.tsv', 'utf-8');
        const rows = csvData.split('\n');

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].trim();
            if (row) {
                const columns = row.split('\t');

                // const boardGameObject = {
                //     id: parseInt(columns[0]),
                //     price: parseFloat(columns[1]),
                //     publisher: columns[2],
                //     genre: columns[3],
                //     playerCount: parseInt(columns[4]),
                //     playTime: parseInt(columns[5]),
                //     title: columns[6],
                //     description: columns[7],
                //     images: [`${columns[8]}`, `${columns[9]}`, `${columns[10]}`],
                //     releasedYear: parseInt(columns[11]),
                // };
                // results.push(boardGameObject);

                const puzzleObject = {
                    id: parseInt(columns[0]),
                    price: parseFloat(columns[1]),
                    publisher: columns[2],
                    title: columns[3],
                    description: parseInt(columns[4]),
                    images: [`${columns[5]}`, `${columns[6]}`, `${columns[7]}`],
                    releasedYear: parseInt(columns[11]),
                    complexity: columns[8],
                    pieceCount: parseInt(columns[9])
                };
                results.push(puzzleObject);

                // const rolePlayBookObject = {
                //     id: parseInt(columns[0]),
                //     price: parseFloat(columns[1]),
                //     publisher: columns[2],
                //     title: columns[3],
                //     description: columns[4],
                //     images: [`${columns[5]}`, `${columns[6]}`, `${columns[7]}`],
                //     releasedYear: parseInt(columns[8]),
                //     pageCount: parseInt(columns[9])
                // };
                // results.push(rolePlayBookObject);
            }
        }

        // Now 'results' contains an array of objects representing the CSV data
    } catch (error) {
        console.error('Error reading or processing the TSV file:', error);
    }

    return results;

}

module.exports = getProductsFromTSV;