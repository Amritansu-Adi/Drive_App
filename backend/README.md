# Image Directory Backend - Modular Structure

## Project Structure

```
backend/
├── config/
│   ├── database.js      # MongoDB connection configuration
│   ├── cloudinary.js    # Cloudinary configuration
│   └── multer.js        # File upload configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── folderController.js   # Folder management logic
│   └── imageController.js    # Image management logic
├── middleware/
│   └── auth.js          # Authentication middleware
├── models/
│   ├── User.js          # User schema
│   ├── Folder.js        # Folder schema
│   └── Image.js         # Image schema
├── routes/
│   ├── auth.js          # Authentication routes
│   ├── folders.js       # Folder routes
│   └── images.js        # Image routes
├── utils/
│   └── folderUtils.js   # Utility functions for folder operations
├── app.js               # Express app configuration
├── server.js            # Server startup file
├── .env                 # Environment variables
└── package.json         # Dependencies and scripts
```

## Features

- **Modular Architecture**: Separated concerns into different modules
- **MVC Pattern**: Controllers handle business logic, models define data structure
- **Middleware**: Reusable authentication middleware
- **Configuration**: Centralized configuration for external services
- **Error Handling**: Consistent error handling across all endpoints
- **RESTful API**: Clean and intuitive API endpoints

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Start the production server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Folders
- `POST /api/folders` - Create a new folder
- `GET /api/folders?parent=<folderId>` - Get folder contents

### Images
- `POST /api/images/upload` - Upload an image
- `GET /api/images/search?q=<query>` - Search images

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT token generation |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `PORT` | Server port (default: 5000) |