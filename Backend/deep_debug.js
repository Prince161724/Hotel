const mongoose = require('mongoose');
const Hotelnames = require('./Model/HotelList');
const connectToMongo = require('./db');

async function deepDebugTest() {
    try {
        await connectToMongo();
        
        const testId = '68d8eba870dd8404ab16fd2f';
        console.log('=== DEEP DEBUG TEST ===');
        
        // Get the actual document by position
        const firstDoc = await Hotelnames.findOne();
        console.log('\nFirst document details:');
        console.log('- _id:', firstDoc._id);
        console.log('- _id toString():', firstDoc._id.toString());
        console.log('- _id type:', typeof firstDoc._id);
        console.log('- _id constructor:', firstDoc._id.constructor.name);
        console.log('- Test ID:', testId);
        console.log('- IDs match (string comparison):', firstDoc._id.toString() === testId);
        console.log('- IDs match (equals method):', firstDoc._id.equals ? firstDoc._id.equals(testId) : 'No equals method');
        
        // Try raw MongoDB query
        console.log('\n--- Testing raw MongoDB queries ---');
        
        // Method 1: Using collection directly
        const rawResult1 = await Hotelnames.collection.findOne({_id: new mongoose.Types.ObjectId(testId)});
        console.log('Raw collection query result:', rawResult1 ? 'FOUND' : 'NOT FOUND');
        
        // Method 2: Using string comparison with regex
        const regexResult = await Hotelnames.findOne({
            $expr: { $eq: [{ $toString: "$_id" }, testId] }
        });
        console.log('String comparison query result:', regexResult ? 'FOUND' : 'NOT FOUND');
        
        // Method 3: Find by exact ObjectId match
        const exactMatch = await Hotelnames.findOne({_id: firstDoc._id});
        console.log('Exact ObjectId match result:', exactMatch ? 'FOUND' : 'NOT FOUND');
        
        // Let's also check if there are any special characters or encoding issues
        console.log('\n--- Character analysis ---');
        console.log('Test ID length:', testId.length);
        console.log('Test ID chars:', testId.split('').map(c => c.charCodeAt(0)));
        console.log('Actual ID length:', firstDoc._id.toString().length);
        console.log('Actual ID chars:', firstDoc._id.toString().split('').map(c => c.charCodeAt(0)));
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.connection.close();
    }
}

deepDebugTest();