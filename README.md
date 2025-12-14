# 🚀 Gas Distributor - Indian LPG Management System

[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Ready-green.svg)](https://mongodb.com)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org)

A comprehensive **LPG (Liquefied Petroleum Gas) cylinder distribution and tracking system** designed specifically for the Indian market. Built with modern web technologies, this full-stack application streamlines gas cylinder requests, token management, delivery tracking, and multi-outlet inventory management across major Indian cities.

## 🌟 Key Highlights

- **🇮🇳 Indian Market Focused**: Tailored for Indian gas distribution with authentic pricing, locations, and standards
- **🏙️ Pan-India Coverage**: 8 major metropolitan cities with 32+ gas agencies
- **💰 Real Pricing**: Indian Rupee (INR) pricing reflecting current market rates
- **📱 Mobile-First**: Responsive design optimized for Indian mobile users
- **🔒 Enterprise Security**: JWT authentication, rate limiting, and comprehensive validation
- **🐳 Production Ready**: Complete Docker containerization for easy deployment

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 👥 User Management System
- **Multi-Role Architecture**: Super Admin, Regional Admin, Outlet Manager, Consumer
- **Secure Authentication**: JWT-based login with role-based access control
- **Indian Demographics**: Support for Indian names, addresses, and phone formats
- **Profile Management**: Complete user profile with contact information

### 🏪 Outlet & Inventory Management
- **Multi-City Coverage**: Delhi, Mumbai, Bangalore, Chennai, Kolkata, Pune, Hyderabad, Ahmedabad
- **Regional Distribution**: 4 outlets per city (Central, East, West, South zones)
- **Stock Monitoring**: Real-time inventory tracking with automated alerts
- **Admin Dashboard**: Comprehensive outlet management interface

### 🛒 Gas Cylinder Management
- **Indian Standards**: 3Kg to 47.5Kg cylinders (Domestic & Commercial)
- **Market Pricing**: ₹350 - ₹3800 reflecting current Indian market rates
- **Token System**: QR code-based token generation for secure delivery
- **Request Lifecycle**: Complete tracking from request to delivery

### 📊 Analytics & Reporting
- **Real-time Dashboard**: Live metrics and performance indicators
- **Sales Analytics**: Revenue tracking and trend analysis
- **Inventory Reports**: Stock levels and reorder alerts
- **Delivery Tracking**: End-to-end fulfillment monitoring

### 🔔 Notification System
- **SMS Integration**: Automated notifications for order updates
- **Email Alerts**: System notifications and reports
- **Push Notifications**: Real-time updates for mobile users
- **Status Updates**: Automated communication throughout delivery cycle

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js 18+ with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **Validation**: Joi schema validation
- **Logging**: Winston structured logging
- **Security**: Helmet, CORS, rate limiting
- **Testing**: Jest with Supertest

### Frontend
- **Framework**: React 18 with Vite build tool
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context API
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors
- **Forms**: Controlled components with validation

### DevOps & Deployment
- **Containerization**: Docker & Docker Compose
- **Orchestration**: Docker Compose for multi-service setup
- **Environment**: Multi-stage configuration
- **Monitoring**: Health checks and logging
- **CI/CD Ready**: GitHub Actions compatible

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/thinksaga/gas-distributor.git
   cd gas-distributor
   ```

2. **Environment Setup**
   ```bash
   # Copy environment template
   cp backend/config/env.example.js backend/config/env.js
   
   # Edit with your configuration
   nano backend/config/env.js
   ```

3. **Launch with Docker**
   ```bash
   # Build and start all services
   docker-compose up --build
   
   # Or run in background
   docker-compose up -d --build
   ```

4. **Access the Application**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:5000
   - **MongoDB**: localhost:27017

### Local Development

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Database Seeding**
   ```bash
   cd backend
   npm run seed
   ```

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/login
User authentication with JWT token generation.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "role": "consumer"
  }
}
```

#### POST /api/auth/register
New user registration with role assignment.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "role": "consumer",
  "city": "Delhi",
  "state": "Delhi"
}
```

### Product Management

#### GET /api/products
Retrieve all available gas products.

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": "prod_001",
      "name": "5Kg Domestic Cylinder",
      "price": 950,
      "weight": 5,
      "type": "domestic"
    }
  ]
}
```

#### POST /api/products
Create new gas product (Admin only).

### Request Management

#### POST /api/requests
Submit new gas cylinder request.

**Request Body:**
```json
{
  "productId": "prod_001",
  "quantity": 1,
  "deliveryAddress": "123 Main St, Delhi",
  "preferredTime": "2024-01-15T10:00:00Z"
}
```

#### GET /api/requests/:id
Get request details with tracking information.

### Outlet Management

#### GET /api/outlets
List all gas outlets by city.

**Query Parameters:**
- `city`: Filter by city name
- `state`: Filter by state

#### POST /api/outlets
Create new outlet (Admin only).

## 🗄 Database Schema

### User Collection
```javascript
{
  name: String,
  email: String,
  password: String,
  phone: String,
  role: String, // consumer, outlet_manager, regional_admin, super_admin
  city: String,
  state: String,
  isActive: Boolean,
  createdAt: Date
}
```

### Product Collection
```javascript
{
  name: String,
  price: Number, // INR
  weight: Number, // Kg
  type: String, // domestic, commercial
  description: String,
  isAvailable: Boolean,
  createdAt: Date
}
```

### Request Collection
```javascript
{
  userId: ObjectId,
  productId: ObjectId,
  outletId: ObjectId,
  quantity: Number,
  status: String, // pending, confirmed, delivered, cancelled
  deliveryAddress: String,
  token: String, // QR code token
  createdAt: Date,
  updatedAt: Date
}
```

### Outlet Collection
```javascript
{
  name: String,
  city: String,
  state: String,
  zone: String, // Central, East, West, South
  address: String,
  phone: String,
  managerId: ObjectId,
  stock: [{
    productId: ObjectId,
    quantity: Number
  }],
  isActive: Boolean
}
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Frontend Testing
```bash
cd frontend
npm test              # Run component tests
npm run test:e2e      # End-to-end tests
```

### API Testing
```bash
# Using curl
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🚢 Deployment

### Docker Production Deployment
```bash
# Build for production
docker-compose -f docker-compose.prod.yml up --build

# Scale services
docker-compose up -d --scale backend=3
```

### Environment Variables
```bash
# Backend
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongo:27017/gasdistributor
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# Frontend
VITE_API_URL=https://api.yourdomain.com
VITE_APP_ENV=production
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
    }
    
    location / {
        proxy_pass http://localhost:5173;
        proxy_set_header Host $host;
    }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commits
- Maintain code coverage > 80%

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Indian gas distribution industry standards
- Open source community contributions
- Modern web development best practices

---

**Built with ❤️ for India's gas distribution network**
