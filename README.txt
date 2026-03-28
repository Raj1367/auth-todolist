#read only this key
chmod 400 /Users/rajmhatre/.ssh/todolist-key-pair.pem

# run instance: (ec2-user@Public IPv4 address)
ssh -i "/Users/rajmhatre/.ssh/todolist-key-pair.pem" ec2-user@65.2.167.214 


Install Docker:
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -aG docker ec2-user

Install docker compose:
sudo mkdir -p /usr/local/lib/docker/cli-plugins
sudo curl -SL https://github.com/docker/compose/releases/download/v2.29.2/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
docker compose version

Install git:
sudo dnf install -y git

nano client/.env
VITE_API_URL=http://65.2.167.214:5000/api

docker compose build
docker compose up -d
docker compose ps
docker compose logs -f backend


7. Verify Deployment
•
•
Frontend: http://<EC2_PUBLIC_IP>/
API (Backend): http://<EC2_PUBLIC_IP>:5000/api/health
✅ If API calls fail → check client .env and rebuild frontend:
docker compose up -d --build frontend
✅ Summary: - AWS EC2 = cloud VM. - Setup Ubuntu instance, install Docker + Compose + Git. - Clone ME