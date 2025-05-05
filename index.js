const fs = require('fs');
const csv = require('csv-parse');
const axlService = require('cisco-axl');
const path = require('path');

const CUCM_HOST = process.env.CUCM_HOST;
const CUCM_USER = process.env.CUCM_USER;
const CUCM_PASS = process.env.CUCM_PASS;
const CUCM_VERSION = process.env.CUCM_VERSION || '15.0';

if (!CUCM_HOST || !CUCM_USER || !CUCM_PASS) {
    console.error('Missing required environment variables (CUCM_HOST, CUCM_USER, CUCM_PASS)');
    process.exit(1);
}

const service = new axlService(CUCM_HOST, CUCM_USER, CUCM_PASS, CUCM_VERSION);

async function processCSV(filePath) {
    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            process.exit(1);
        }

        // Check if it's a directory
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            console.error(`Error: ${filePath} is a directory, expected a CSV file`);
            process.exit(1);
        }

        const parser = fs.createReadStream(filePath).pipe(
            csv.parse({
                columns: true,
                skip_empty_lines: true
            })
        );

        for await (const record of parser) {
            try {
                if (!record.pattern || !record.description || !record.alertingname || !record.routepartitionname) {
                    console.error('Missing required fields in CSV row:', record);
                    continue;
                }

                const result = await service.executeOperation('updateLine', {
                    pattern: record.pattern,
                    routePartitionName: record.routepartitionname,
                    description: record.description,
                    alertingName: record.alertingname,
                    asciiAlertingName: record.alertingname
                });                    
                console.log(`updateLine performed on ${record.pattern}. Resulting UUID:`, result);
            } catch (error) {
                console.error(`Error processing pattern ${record.pattern}:`, error);
            }
        }
    } catch (error) {
        console.error('Error processing CSV:', error);
        process.exit(1);
    }
}

const csvPath = path.join('/app/data', 'phones.csv');
console.log('Looking for CSV file at:', csvPath);
processCSV(csvPath);
