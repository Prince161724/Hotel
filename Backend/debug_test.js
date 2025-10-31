const mongoose = require('mongoose');
const Hotelnames = require('./Model/HotelList');
const connectToMongo = require('./db');

async function debugTest() {
    try {
        // Connect to database
        console.log('Connecting to database...');
        await connectToMongo();
        
        const testId = '68d8eba870dd8404ab16fd2f';
        console.log('\n=== DEBUG TEST FOR ID:', testId, '===');
        
        // Check collection name
        console.log('Collection name:', Hotelnames.collection.name);
        
        // Count total documents
        const totalCount = await Hotelnames.countDocuments();
        console.log('Total documents in collection:', totalCount);
        
        if (totalCount === 0) {
            console.log('❌ Collection is empty!');
            return;
        }
        
        // Get sample documents to see ID format
        console.log('\n--- Sample documents (first 3) ---');
        const sampleDocs = await Hotelnames.find().limit(3).select('_id name');
        sampleDocs.forEach((doc, index) => {
            console.log(`${index + 1}. ID: ${doc._id} (type: ${typeof doc._id})`);
            if (doc.name) console.log(`   Name: ${doc.name}`);
        });
        
        // Check if the ID exists at all
        console.log('\n--- Checking if ID exists ---');
        const allIds = await Hotelnames.find().select('_id').lean();
        const targetIdExists = allIds.some(doc => doc._id.toString() === testId);
        console.log(`Target ID ${testId} exists in collection: ${targetIdExists}`);
        
        if (targetIdExists) {
            console.log('✅ ID exists in database');
        } else {
            console.log('❌ ID does NOT exist in database');
            console.log('First 5 actual IDs in collection:');
            allIds.slice(0, 5).forEach((doc, i) => {
                console.log(`  ${i + 1}. ${doc._id}`);
            });
        }
        
        // Try different query methods
        console.log('\n--- Testing different query methods ---');
        
        // Method 1: Direct string
        console.log('1. Querying with string ID...');
        const result1 = await Hotelnames.findOne({_id: testId});
        console.log('   Result:', result1 ? 'FOUND' : 'NOT FOUND');
        
        // Method 2: ObjectId conversion
        console.log('2. Querying with ObjectId conversion...');
        const result2 = await Hotelnames.findOne({_id: new mongoose.Types.ObjectId(testId)});
        console.log('   Result:', result2 ? 'FOUND' : 'NOT FOUND');
        
        // Method 3: Using $in with both formats
        console.log('3. Querying with $in (both formats)...');
        const result3 = await Hotelnames.findOne({
            _id: { $in: [testId, new mongoose.Types.ObjectId(testId)] }
        });
        console.log('   Result:', result3 ? 'FOUND' : 'NOT FOUND');
        
        if (result1 || result2 || result3) {
            console.log('\n✅ SUCCESS: Found the document!');
            const foundDoc = result1 || result2 || result3;
            console.log('Document details:', {
                id: foundDoc._id,
                name: foundDoc.name || 'No name field'
            });
        } else {
            console.log('\n❌ FAILED: Could not find document with any method');
        }
        
    } catch (error) {
        console.error('❌ Error during test:', error.message);
        console.error('Full error:', error);
    } finally {
        mongoose.connection.close();
        console.log('\nDatabase connection closed.');
    }
}

debugTest();