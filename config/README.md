Step-by-step guide with commands to deploy a React frontend and a Python API with PM2 and Nginx on a DigitalOcean droplet running Ubuntu. This guide assumes you have both your React and Python API code ready.

**Step 1: Access Your DigitalOcean Droplet**

- SSH into your DigitalOcean droplet using your terminal. Replace `<your-username>` and `<your-droplet-ip>` with your actual username and droplet's IP address.

```bash
ssh <your-username>@<your-droplet-ip>
```

- Enter your password when prompted.

**Step 2: Install Required Software**

- Update the package list to ensure you have the latest information about available packages.

```bash
sudo apt update
```

- Install Git, Node.js, npm, Python, and pip if not already installed:

```bash
sudo apt install git nodejs npm python3 python3-pip
```

**Step 3: Clone Your React App Repository**

- Navigate to the directory where you want to clone your React app repository. For example, to clone it into your home directory:

```bash
cd ~
```

- Clone your React app repository using its Git URL. Replace `<react-repo-url>` with the actual URL of your repository.

```bash
git clone <react-repo-url>
```

**Step 4: Set Up and Build Your React App**

- Navigate to your React app directory.

```bash
cd <your-react-app-directory>
```

- Install the app's dependencies and build the app:

```bash
npm install
npm run build
```

**Step 5: Clone Your Python API Repository**

- Navigate to the directory where you want to clone your Python API repository. For example, to clone it into your home directory:

```bash
cd ~
```

- Clone your Python API repository using its Git URL. Replace `<python-api-repo-url>` with the actual URL of your repository.

```bash
git clone <python-api-repo-url>
```

**Step 6: Install Python API Dependencies**

- Navigate to your Python API directory.

```bash
cd <your-python-api-directory>
```

- Install the API's Python dependencies using pip. Replace `<requirements-file>` with the name of your requirements file (e.g., `requirements.txt`).

```bash
pip3 install -r <requirements-file>
```

**Step 7: Install PM2**

- Install PM2 globally on your server:

```bash
sudo npm install -g pm2
```

**Step 8: Start Your Python API with PM2**

- Start your Python API using PM2. Replace `app.py` with the name of your API entry file and `<python-api-name>` with a suitable name for your API process.

```bash
pm2 start app.py --name <python-api-name>
```

**Step 9: Configure PM2 Startup on Server Boot**

- Generate and configure a startup script for PM2 to ensure your Python API starts automatically when the server reboots:

```bash
pm2 startup systemd
```

- Run the `systemctl` command provided by PM2 to enable the startup script. Replace `your-username` with your actual username on the server.

```bash
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u your-username --hp /home/your-username
```

**Step 10: Configure Nginx to Proxy Requests to React and Python API**

- Create an Nginx server block configuration file for your React and Python API. Replace `<your-domain>` with your actual domain or droplet's IP address.

```bash
sudo nano /etc/nginx/sites-available/<your-domain>
```

- Add the following Nginx configuration, adjusting the paths and settings as needed:

```nginx
server {
    listen 80;
    server_name <your-domain>;

    location / {
        proxy_pass http://localhost:<react-app-port>;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:<python-api-port>;
        # Additional proxy settings for the Python API if needed
    }

    # Additional configuration if needed
}
```

Replace `<react-app-port>` and `<python-api-port>` with the appropriate ports for your React app and Python API.

- Save the configuration file and exit the text editor (Ctrl + X, then Y, then Enter).

**Step 11: Test Nginx Configuration and Restart Nginx**

- Check if your Nginx configuration is valid:

```bash
sudo nginx -t
```

If there are no errors, you should see a message like "syntax is okay" and "test is successful."

- Reload Nginx to apply the new configuration:

```bash
sudo systemctl restart nginx
```

**Step 12: Access Your Application**

You can now access your combined React and Python API application through Nginx at the same domain or IP address:

For example, if you're using a domain name, you can access your app in the browser using:

```
http://<your-domain>/
```

If you're using the droplet's IP address, you can access it using:

```
http://<your-droplet-ip>/
```

Your React frontend and Python API are now served through Nginx, managed by PM2, on the DigitalOcean droplet.

Make sure to replace `<your-react-app-directory>`, `<your-python-api-directory>`, `<requirements-file>`, `<python-api-name>`, `<react-app
