const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27117";
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('imports');

    const collPizze = database.collection('Pizze');
    await collPizze.insertMany([
        {name: "Margherita", price: 5.99},
        {name: "Pepperoni", price: 6.99},
        {name: "Hawaiian", price: 7.99}
    ]);

    const collCSV = database.collection('csv');
    // Query for a movie that has the title 'Back to the Future'
    const queryOfficeCode = { officeCode: '1' };
    const doc = await collCSV.findOne(queryOfficeCode);
    console.log(doc);

    var docs = await collCSV.find(queryOfficeCode).toArray();
    console.log(docs);

    const queryCountry = {country: "USA"};
    var docs = await collCSV.find(queryCountry).toArray();
    console.log(docs);

    const queryImportTime = {import_time: { $gt: "2025-02-18 10:24:00" }};
    var docs = await collCSV.find(queryImportTime).toArray();
    console.log(docs);

    var docs = await collCSV.aggregate([
        { $group: { _id: "$country", count: { $sum: 1 } } }
    ]).toArray();
    console.log(docs);

   
   

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);