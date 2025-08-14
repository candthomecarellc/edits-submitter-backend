const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/v1';

async function testDocumentsAPI() {
    try {
        console.log('Testing Documents API...');
        
        // Test 1: Check if documents endpoint is accessible
        console.log('\n1. Testing documents endpoint accessibility...');
        try {
            const response = await axios.get(`${BASE_URL}/documents/application/test123`);
            console.log('✅ Documents endpoint accessible');
            console.log('Response:', response.data);
        } catch (error) {
            console.log('❌ Documents endpoint error:', error.response?.status, error.response?.data);
        }
        
        // Test 2: Check if stats endpoint is accessible
        console.log('\n2. Testing stats endpoint...');
        try {
            const response = await axios.get(`${BASE_URL}/documents/application/test123/stats`);
            console.log('✅ Stats endpoint accessible');
            console.log('Response:', response.data);
        } catch (error) {
            console.log('❌ Stats endpoint error:', error.response?.status, error.response?.data);
        }
        
        // Test 3: Check if the server is running
        console.log('\n3. Testing server connectivity...');
        try {
            const response = await axios.get(`${BASE_URL}/users`);
            console.log('✅ Server is running and accessible');
        } catch (error) {
            console.log('❌ Server connectivity error:', error.message);
        }
        
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

// Run test if this file is executed directly
if (require.main === module) {
    testDocumentsAPI();
}

module.exports = { testDocumentsAPI };
