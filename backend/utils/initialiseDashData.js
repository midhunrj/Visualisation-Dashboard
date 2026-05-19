
const fs=require('fs')
const path=require('path')
const { fileURLToPath } =require('url');
const Insight =require('../models/dataModel')

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const InitialiseDashboardData = async () => {
  try {
    const count = await Insight.countDocuments();

    if (count > 0) {
      console.log(`Database already contains ${count} records. Skipping import.`);
      return;
    }

    console.log('Database is empty. Importing jsondata.json...');

    const filePath = path.join(__dirname, 'jsondata.json');

    const fileData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileData);

    await Insight.insertMany(jsonData);

    console.log(`Successfully imported ${jsonData.length} records.`);
  } catch (error) {
    console.error('Error while seeding database:', error.message);
  }
};

module.exports=InitialiseDashboardData;