const fs = require('fs');
const csv = require('csv-parse');
const { AXLService } = require('cisco-axl');

const CUCM_HOST = process.env.CUCM_HOST;
const CUCM_USER = process.env.CUCM_USER;
const CUCM_PASS = process.env.CUCM_PASS;
const CUCM_VERSION = process.env.CUCM_VERSION || '15.0';

const service = new AXLService(CUCM_HOST, CUCM_USER, CUCM_PASS, CUCM_VERSION);

async function processCSV(filePath) {
  const parser = fs.createReadStream(filePath).pipe(
    csv.parse({
      columns: true,
      skip_empty_lines: true
    })
  );

  for await (const record of parser) {
    try {
      const result = await service.executeOperation('updatePhone', {
        name: record.name,
        description: record.description
      });
      console.log('updatePhone UUID', result);
    } catch (error) {
      console.error(`Error processing phone ${record.name}:`, error);
    }
  }
}

processCSV('/app/data/phones.csv');
