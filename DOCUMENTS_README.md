# Documents Management System

This system allows users to upload, manage, and track documents for Medicaid applications.

## Features

- **Document Upload**: Upload PDF documents with metadata
- **Document Management**: View, download, and delete documents
- **Status Tracking**: Track document approval status (pending, approved, rejected)
- **Document Categories**: Organize documents by type and category
- **File Validation**: Only PDF files are accepted
- **File Size Limits**: Maximum 10MB per file

## API Endpoints

### Documents
- `GET /api/documents/application/:applicationId` - Get all documents for an application
- `GET /api/documents/application/:applicationId/stats` - Get document statistics
- `GET /api/documents/:documentId` - Get a specific document
- `GET /api/documents/:documentId/download` - Download a document
- `POST /api/documents/application/:applicationId/upload` - Upload a new document
- `PATCH /api/documents/:documentId` - Update document metadata
- `PATCH /api/documents/:documentId/status` - Update document status
- `DELETE /api/documents/:documentId` - Delete a document

## Document Types

The system supports various document types based on WMS codes:

- **DOH 4220** - Access NY Healthcare
- **LDSS 486T** - Medical Report for Determination of Disability
- **LDSS 1151** - Disability Interview
- **LDSS 2921** - Common Application
- **LDSS 4060** - Declaration of Citizenship
- **MAP 25A** - History Sheet
- And many more...

## Document Categories

- Identity Documents
- Income Documents
- Residence Documents
- Medical Documents
- Other Documents

## File Storage

Documents are stored in the following structure:
```
uploads/
  documents/
    {applicationId}/
      {timestamp}-{originalName}.pdf
```

## Frontend Integration

The documents page is accessible at `/application/documents` and provides:

- Document upload form
- Document list with status management
- Download and delete functionality
- Statistics dashboard
- Status updates

## Security Features

- File type validation (PDF only)
- File size limits
- Secure file storage
- User authentication required
- Cleanup of temporary files

## Usage Example

1. Navigate to an application
2. Click on "Documents" in the sidebar
3. Click "Upload New Document"
4. Select document type and category
5. Choose a PDF file
6. Add description (optional)
7. Mark as required if needed
8. Click "Upload Document"

## Error Handling

The system includes comprehensive error handling for:
- File upload failures
- Invalid file types
- Missing required fields
- File not found errors
- Database errors

## Dependencies

- Multer for file uploads
- Mongoose for database operations
- Express for API endpoints
- File system operations for storage
