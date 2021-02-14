curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh

nvm install node

node -v
npm -v

sudo apt-get update 
sudo apt-get install -y mongodb
# sudo systemctl status mongodb