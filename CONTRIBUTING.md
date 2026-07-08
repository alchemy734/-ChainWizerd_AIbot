# AGRYTECHKEK Contributing Guide

We love your input! Here's how to contribute:

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork>`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Install dependencies: `pip install -r requirements.txt` (backend) or `npm install` (frontend)
5. Make your changes
6. Test your changes
7. Push and create a Pull Request

## Development Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### With Docker
```bash
docker-compose up
```

## Testing

```bash
# Backend tests
pytest tests/ -v

# Frontend tests
npm test
```

## Code Standards

- Python: PEP 8
- JavaScript: ES6+
- Add comments for complex logic
- Write tests for new features
- Keep commits clean and descriptive

## Reporting Bugs

Use GitHub Issues to report bugs with:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Your environment

## License

By contributing, you agree your contributions are under MIT License.
