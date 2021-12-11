// Reusing MongoClient connection: https://docs.atlas.mongodb.com/best-practices-connecting-from-aws-lambda/

// Import Client
const { MongoClient } = require('mongodb')

// Create a module-scoped MongoClient promise.
// CRITICAL: You must call connect() outside the handler so that the client
// can be reused across function invocations.
let client = new MongoClient(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true });
const clientPromise = client.connect();

// Handler
module.exports.mongodb = async function(dbName = null) {
    // Get the MongoClient by calling await on the promise.
    // Because this is a promise, it will only resolve once.
    client = await clientPromise;
    const db = dbName ?? process.env.DB_NAME
    // Use the client to return the name of the connected database.
    return client.db(db);
}