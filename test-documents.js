const mongoose = require('mongoose');
const { Document } = require('./src/app/modules/Document/document.model');

// Test connection
async function testDocuments() {
    try {
        // Connect to MongoDB (update connection string as needed)
        await mongoose.connect('mongodb://localhost:27017/edits-submitter');
        console.log('Connected to MongoDB');

        // Test creating a document
        const testDocument = new Document({
            applicationId: new mongoose.Types.ObjectId(),
            fileName: 'test-document.pdf',
            originalName: 'test-document.pdf',
            filePath: '/test/path/test-document.pdf',
            fileSize: 1024,
            mimeType: 'application/pdf',
            documentType: 'DOH-4220',
            documentCategory: 'identity',
            uploadedBy: 'test-user',
            description: 'Test document',
            isRequired: true,
            status: 'pending'
        });

        await testDocument.save();
        console.log('Test document created successfully');

        // Test finding documents
        const documents = await Document.find({});
        console.log(`Found ${documents.length} documents`);

        // Clean up test document
        await Document.findByIdAndDelete(testDocument._id);
        console.log('Test document cleaned up');

        console.log('Documents system test completed successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run test if this file is executed directly
if (require.main === module) {
    testDocuments();
}

module.exports = { testDocuments };
