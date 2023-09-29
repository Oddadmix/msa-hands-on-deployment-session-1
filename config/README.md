#Step-by-step guide with commands to deploy a React frontend and a Python API, both using PM2 and Nginx, on a DigitalOcean droplet running Ubuntu:

```bash
# Step 1: Access Your DigitalOcean Droplet
ssh root@<your-droplet-ip> -i msa-key

# Step 2: Install Required Software
sudo apt update
sudo apt install git python3 python3-pip

# Install Nodejs 18
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=18
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update
sudo apt-get install nodejs -y
node -v

# Step 3: Clone Your React App Repository
cd /opt/
git clone https://github.com/Oddadmix/msa-hands-on-deployment-session-1.git

# Step 4: Set Up and Build Your React App
cd /opt/msa-hands-on-deployment-session-1/ui
npm install
npm run build

# Step 5: Configure Your Python API
cd /opt/msa-hands-on-deployment-session-1/api
pip3 install -r requirements.txt

# Step 7: Install PM2
sudo npm install -g pm2

# Step 8: Start Your Python API with PM2
pm2 start main.py --name api --interpreter python3

pm2 list

# Step 09: Configure PM2 Startup on Server Boot
pm2 startup systemd

# Step 10: Install Nginx
sudo apt install nginx

# Step 11: Configure Nginx to Proxy Requests to React and Python API
cd /etc/nginx/conf.d/
cp /opt/msa-hands-on-deployment-session-1/config/nginx.conf .
# Add Nginx configuration (see previous response for details)

# Step 12: Test Nginx Configuration and Restart Nginx
sudo nginx -t
sudo systemctl restart nginx

# Step 13: Access Your Combined Application
http://<ip>/
http://<ip>/api/predict?text=I%20am%20happy

```
