import pytest
from backend.app import app, db

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.session.remove()
        db.drop_all()

def test_home(client):
    response = client.get('/')
    assert response.status_code == 200
    assert b'AGRYTECHKEK' in response.data
    assert b'running' in response.data

def test_health(client):
    response = client.get('/api/health')
    assert response.status_code == 200
    assert b'healthy' in response.data

def test_register(client):
    response = client.post('/api/auth/register', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'password123',
        'first_name': 'Test',
        'last_name': 'User'
    })
    assert response.status_code == 201
    assert b'User registered successfully' in response.data

def test_register_duplicate_email(client):
    client.post('/api/auth/register', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'password123'
    })
    
    response = client.post('/api/auth/register', json={
        'username': 'testuser2',
        'email': 'test@example.com',
        'password': 'password123'
    })
    assert response.status_code == 409

def test_login(client):
    client.post('/api/auth/register', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'password123'
    })
    
    response = client.post('/api/auth/login', json={
        'email': 'test@example.com',
        'password': 'password123'
    })
    assert response.status_code == 200
    assert b'access_token' in response.data

def test_login_invalid_credentials(client):
    response = client.post('/api/auth/login', json={
        'email': 'nonexistent@example.com',
        'password': 'wrongpassword'
    })
    assert response.status_code == 401

def test_farm_manager_agent(client):
    response = client.post('/api/agents/farm-manager', json={
        'farm_id': 1
    })
    assert response.status_code == 200
    assert b'Farm Manager' in response.data

def test_crop_advisor_agent(client):
    response = client.post('/api/agents/crop-advisor', json={
        'crop_name': 'Maize'
    })
    assert response.status_code == 200
    assert b'Crop Advisor' in response.data

def test_weather_agent(client):
    response = client.get('/api/agents/weather')
    assert response.status_code == 200
    assert b'Weather Agent' in response.data

def test_soil_expert_agent(client):
    response = client.post('/api/agents/soil-expert', json={
        'soil_ph': 6.5
    })
    assert response.status_code == 200
    assert b'Soil Expert' in response.data

def test_market_advisor_agent(client):
    response = client.get('/api/agents/market-advisor')
    assert response.status_code == 200
    assert b'Market Advisor' in response.data
