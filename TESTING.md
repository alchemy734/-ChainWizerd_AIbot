# AGRYTECHKEK Testing Guide

## 🧪 Complete Testing Walkthrough

This guide provides step-by-step instructions to test the AGRYTECHKEK application locally.

---

## **PART 1: SETUP & INSTALLATION**

### **Step 1.1: Clone and Navigate to Repository**

```bash
git clone https://github.com/alchemy734/-ChainWizerd_AIbot.git
cd -ChainWizerd_AIbot
```

### **Step 1.2: Setup Backend Environment**

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r ../requirements.txt
```

### **Step 1.3: Setup Frontend Environment**

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install
```

---

## **PART 2: BACKEND TESTING**

### **Option A: Run Automated Tests**

```bash
# From project root directory
cd backend

# Run all tests
pytest ../tests/test_app.py -v

# Run specific test
pytest ../tests/test_app.py::test_home -v

# Run with coverage report
pytest ../tests/test_app.py --cov=. --cov-report=html
```

**Expected Test Results:**
- ✅ test_home - 200 response with AGRYTECHKEK message
- ✅ test_health - 200 response with healthy status
- ✅ test_register - 201 response with user registration
- ✅ test_register_duplicate_email - 409 conflict response
- ✅ test_login - 200 response with access token
- ✅ test_login_invalid_credentials - 401 unauthorized response
- ✅ test_farm_manager_agent - 200 response from AI agent
- ✅ test_crop_advisor_agent - 200 response from AI agent
- ✅ test_weather_agent - 200 response from AI agent
- ✅ test_soil_expert_agent - 200 response from AI agent
- ✅ test_market_advisor_agent - 200 response from AI agent

### **Option B: Manual Backend Testing**

```bash
# Start backend server
cd backend
python app.py

# Server will run at: http://localhost:5000
```

---

## **PART 3: API ENDPOINT TESTING**

### **Test 1: Health Check**

```bash
curl -X GET http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-07-08T10:30:00.000000"
}
```

### **Test 2: Home/Welcome Endpoint**

```bash
curl -X GET http://localhost:5000/
```

**Expected Response:**
```json
{
  "message": "Welcome to AGRYTECHKEK API",
  "version": "1.0.0",
  "status": "running",
  "endpoints": {
    "auth": "/api/auth",
    "farms": "/api/farms",
    "crops": "/api/crops",
    "activities": "/api/activities",
    "products": "/api/products",
    "orders": "/api/orders",
    "agents": "/api/agents"
  }
}
```

### **Test 3: User Registration**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "farmer1",
    "email": "farmer1@example.com",
    "password": "SecurePass123!",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "farmer1",
    "email": "farmer1@example.com",
    "role": "farmer"
  }
}
```

**Save the access_token for next tests!**

### **Test 4: User Login**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "farmer1@example.com",
    "password": "SecurePass123!"
  }'
```

**Expected Response (200):**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "farmer1",
    "email": "farmer1@example.com",
    "role": "farmer"
  }
}
```

### **Test 5: Get User Profile**

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response (200):**
```json
{
  "id": 1,
  "username": "farmer1",
  "email": "farmer1@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "farmer",
  "created_at": "2026-07-08T10:30:00.000000"
}
```

### **Test 6: Create Farm**

```bash
curl -X POST http://localhost:5000/api/farms \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "name": "Green Valley Farm",
    "location": "Nairobi, Kenya",
    "total_area": 50.5
  }'
```

**Expected Response (201):**
```json
{
  "message": "Farm created successfully",
  "farm": {
    "id": 1,
    "name": "Green Valley Farm",
    "location": "Nairobi, Kenya",
    "total_area": 50.5
  }
}
```

### **Test 7: Get User Farms**

```bash
curl -X GET http://localhost:5000/api/farms \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response (200):**
```json
{
  "farms": [
    {
      "id": 1,
      "name": "Green Valley Farm",
      "location": "Nairobi, Kenya",
      "total_area": 50.5,
      "created_at": "2026-07-08T10:30:00.000000"
    }
  ]
}
```

### **Test 8: Farm Manager AI Agent**

```bash
curl -X POST http://localhost:5000/api/agents/farm-manager \
  -H "Content-Type: application/json" \
  -d '{
    "farm_id": 1
  }'
```

**Expected Response (200):**
```json
{
  "agent": "Farm Manager",
  "response": "Analyzing farm operations...",
  "recommendations": [
    "Optimize irrigation",
    "Monitor soil health",
    "Plan crop rotation"
  ]
}
```

### **Test 9: Crop Advisor AI Agent**

```bash
curl -X POST http://localhost:5000/api/agents/crop-advisor \
  -H "Content-Type: application/json" \
  -d '{
    "crop_name": "Maize"
  }'
```

**Expected Response (200):**
```json
{
  "agent": "Crop Advisor",
  "crop": "Maize",
  "recommendations": {
    "watering": "Daily in morning",
    "fertilizing": "Every 2 weeks",
    "harvesting": "90 days from planting"
  }
}
```

### **Test 10: Weather Agent**

```bash
curl -X GET http://localhost:5000/api/agents/weather
```

**Expected Response (200):**
```json
{
  "agent": "Weather Agent",
  "weather": {
    "temperature": 25,
    "humidity": 65,
    "rainfall": 0,
    "alerts": [
      "High UV index"
    ]
  }
}
```

### **Test 11: Soil Expert Agent**

```bash
curl -X POST http://localhost:5000/api/agents/soil-expert \
  -H "Content-Type: application/json" \
  -d '{
    "soil_ph": 6.5
  }'
```

**Expected Response (200):**
```json
{
  "agent": "Soil Expert",
  "analysis": {
    "ph_status": "optimal",
    "moisture": "adequate",
    "recommendations": [
      "Add compost",
      "Test nutrients"
    ]
  }
}
```

### **Test 12: Market Advisor Agent**

```bash
curl -X GET http://localhost:5000/api/agents/market-advisor
```

**Expected Response (200):**
```json
{
  "agent": "Market Advisor",
  "trending": [
    "Organic vegetables",
    "Honey",
    "Free-range eggs"
  ],
  "price_trends": {
    "tomato": "up 5%",
    "maize": "stable"
  }
}
```

---

## **PART 4: FRONTEND TESTING**

### **Step 1: Start Frontend Development Server**

```bash
cd frontend
npm start
```

The frontend will open at `http://localhost:3000`

### **Step 2: Test UI Components**

1. **Homepage** - Verify hero section and feature cards display
2. **Navigation** - Check navbar links work
3. **Responsive Design** - Test on mobile (browser dev tools)
4. **Page Load** - Verify no console errors

---

## **PART 5: DOCKER TESTING**

### **Option 1: Run Full Stack with Docker Compose**

```bash
# From project root
docker-compose up

# Services running at:
# Backend: http://localhost:5000
# Frontend: http://localhost:3000
# Database: localhost:5432
# Redis: localhost:6379
```

### **Option 2: Test Individual Containers**

```bash
# Build images
docker-compose build

# Run services
docker-compose up

# Check logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down
```

---

## **PART 6: INTEGRATION TESTING FLOW**

### **Complete User Journey Test:**

1. **Register** → User creates account
2. **Login** → User logs in
3. **Get Profile** → Verify user data
4. **Create Farm** → Add a farm
5. **Get Farms** → List all farms
6. **Test AI Agents** → Get recommendations from each agent
7. **Verify Responses** → Check all responses are correct

---

## **PART 7: ERROR HANDLING TESTS**

### **Test Invalid Credentials**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "wrong@example.com",
    "password": "wrongpass"
  }'
```

**Expected:** 401 Unauthorized

### **Test Missing Fields**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser"
  }'
```

**Expected:** 400 Bad Request

### **Test Invalid Endpoint**

```bash
curl -X GET http://localhost:5000/api/nonexistent
```

**Expected:** 404 Not Found

---

## **PART 8: PERFORMANCE TESTING**

### **Load Testing with Apache Bench**

```bash
# Test backend health endpoint
ab -n 1000 -c 10 http://localhost:5000/api/health

# Output shows:
# Requests per second
# Mean time per request
# Failed requests
```

---

## **✅ TESTING CHECKLIST**

- [ ] All unit tests pass (pytest)
- [ ] Health check endpoint responds
- [ ] User registration works
- [ ] User login returns token
- [ ] Farm creation successful
- [ ] All 5 AI agents respond correctly
- [ ] Error handling works (401, 404, 400)
- [ ] Frontend loads without errors
- [ ] Docker containers run successfully
- [ ] API responses are in correct JSON format

---

## **📊 TEST RESULTS SUMMARY**

**Total Tests:** 11
**Status:** ✅ All passing (Expected)

| Test | Status | Expected Code |
|------|--------|---------------|
| Home Endpoint | ✅ | 200 |
| Health Check | ✅ | 200 |
| User Registration | ✅ | 201 |
| Duplicate Email | ✅ | 409 |
| User Login | ✅ | 200 |
| Invalid Login | ✅ | 401 |
| Farm Manager Agent | ✅ | 200 |
| Crop Advisor Agent | ✅ | 200 |
| Weather Agent | ✅ | 200 |
| Soil Expert Agent | ✅ | 200 |
| Market Advisor Agent | ✅ | 200 |

---

## **🔧 Troubleshooting**

### **Issue: Port 5000 already in use**
```bash
# On Linux/Mac
lsof -i :5000
kill -9 <PID>

# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### **Issue: Database connection error**
- Ensure PostgreSQL is running
- Check `.env` file credentials
- Or use SQLite (default)

### **Issue: Module not found**
```bash
pip install -r requirements.txt
```

### **Issue: Port 3000 in use**
```bash
# Kill process on port 3000
# Linux/Mac: lsof -i :3000
# Windows: netstat -ano | findstr :3000
```

---

## **✨ CONGRATULATIONS!**

Your AGRYTECHKEK project is now fully tested and ready for production deployment! 🎉

For more information, see:
- README.md - Project overview
- CONTRIBUTING.md - How to contribute
- CHANGELOG.md - Version history
