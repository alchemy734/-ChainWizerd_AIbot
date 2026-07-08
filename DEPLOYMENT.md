# Deployment Guide

## 🚀 Deploying AGRYTECHKEK to Production

This guide covers deploying AGRYTECHKEK to various cloud platforms.

---

## **Option 1: Deploy to Heroku**

### **Step 1: Install Heroku CLI**

```bash
# On Mac
brew tap heroku/brew && brew install heroku

# On Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

### **Step 2: Login to Heroku**

```bash
heroku login
```

### **Step 3: Create Heroku App**

```bash
heroku create agrytechkek
```

### **Step 4: Create Procfile**

```bash
# In project root, create Procfile
echo "web: gunicorn backend.app:app" > Procfile
```

### **Step 5: Set Environment Variables**

```bash
heroku config:set JWT_SECRET_KEY=your-secret-key
heroku config:set DATABASE_URL=postgresql://...
```

### **Step 6: Deploy**

```bash
git push heroku main
heroku open
```

---

## **Option 2: Deploy to AWS EC2**

### **Step 1: Launch EC2 Instance**

- Go to AWS Console
- Select Ubuntu 20.04 LTS
- Create security group (allow ports 80, 443, 5000, 3000)

### **Step 2: Connect to Instance**

```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

### **Step 3: Install Dependencies**

```bash
sudo apt update
sudo apt install python3-pip python3-venv nodejs npm postgresql
```

### **Step 4: Clone Repository**

```bash
git clone https://github.com/alchemy734/-ChainWizerd_AIbot.git
cd -ChainWizerd_AIbot
```

### **Step 5: Setup Backend**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r ../requirements.txt
pip install gunicorn
```

### **Step 6: Setup Nginx**

```bash
sudo apt install nginx

# Create config file
sudo nano /etc/nginx/sites-available/agrytechkek
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://127.0.0.1:5000;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}
```

### **Step 7: Start Services**

```bash
# Backend
cd backend
gunicorn -w 4 -b 127.0.0.1:5000 app:app

# Frontend (new terminal)
cd frontend
npm run build
npm start
```

---

## **Option 3: Deploy to DigitalOcean with Docker**

### **Step 1: Create Droplet**

- Size: 4GB RAM minimum
- Image: Ubuntu 20.04
- Enable IPv6

### **Step 2: Install Docker**

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### **Step 3: Clone and Deploy**

```bash
git clone https://github.com/alchemy734/-ChainWizerd_AIbot.git
cd -ChainWizerd_AIbot
docker-compose -f docker-compose.prod.yml up -d
```

### **Step 4: Setup SSL with Let's Encrypt**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d your-domain.com
```

---

## **Option 4: Deploy to Azure**

### **Step 1: Create Resource Group**

```bash
az group create --name agrytechkek --location eastus
```

### **Step 2: Create App Service**

```bash
az appservice plan create \
  --name agrytechkek-plan \
  --resource-group agrytechkek \
  --sku B2 --is-linux

az webapp create \
  --resource-group agrytechkek \
  --plan agrytechkek-plan \
  --name agrytechkek \
  --runtime "PYTHON|3.9"
```

### **Step 3: Deploy Code**

```bash
az webapp deployment source config-zip \
  --resource-group agrytechkek \
  --name agrytechkek \
  --src app.zip
```

---

## **Option 5: Deploy to Google Cloud Platform**

### **Step 1: Create Cloud Run Service**

```bash
gcloud run deploy agrytechkek \
  --source . \
  --platform managed \
  --region us-central1
```

### **Step 2: Set Environment Variables**

```bash
gcloud run services update agrytechkek \
  --update-env-vars JWT_SECRET_KEY=your-key
```

---

## **Production Checklist**

- [ ] SSL/HTTPS enabled
- [ ] Environment variables configured
- [ ] Database backups enabled
- [ ] Logging configured
- [ ] Monitoring setup
- [ ] Error tracking (Sentry)
- [ ] CDN configured
- [ ] Rate limiting enabled
- [ ] API keys secured
- [ ] Database optimized
- [ ] Images compressed
- [ ] Caching configured

---

## **Domain Setup**

### **Add Custom Domain**

1. Get your app's IP or CNAME
2. Update DNS records:
   - A record: point to app IP
   - CNAME: point to app domain
3. Wait for DNS propagation (5-48 hours)

---

## **Monitoring & Maintenance**

### **Setup Monitoring**

```bash
# Install monitoring agent
pip install newrelic
newrelic-admin generate-config YOUR_LICENSE_KEY newrelic.ini
```

### **Backup Database**

```bash
# PostgreSQL backup
pg_dump dbname > backup.sql

# Restore
psql dbname < backup.sql
```

### **View Logs**

```bash
# Heroku
heroku logs --tail

# AWS
tail -f /var/log/app.log

# Docker
docker-compose logs -f backend
```

---

## **Scaling**

### **Horizontal Scaling (Add more servers)**

- Load balancer (Nginx, HAProxy)
- Multiple app instances
- Database replication

### **Vertical Scaling (Bigger server)**

- Increase server resources
- Upgrade database tier
- More RAM/CPU

---

## **Security Best Practices**

1. **Change default passwords**
2. **Enable 2FA for admin**
3. **Use HTTPS only**
4. **Implement rate limiting**
5. **Regular security updates**
6. **Database encryption**
7. **API key rotation**
8. **Input validation**
9. **CORS configuration**
10. **Regular backups**

---

## **Troubleshooting**

### **502 Bad Gateway**
- Check backend service is running
- Check port forwarding
- Review logs

### **High Memory Usage**
- Check for memory leaks
- Increase server resources
- Optimize database queries

### **Slow Response Times**
- Enable caching
- Optimize database queries
- Use CDN for static files
- Check for N+1 queries

---

**Your AGRYTECHKEK app is now ready for production! 🎉**
