cd ~ &&
wget -O stripe.deb https://github.com/stripe/stripe-cli/releases/download/v1.7.3/stripe_1.7.3_linux_amd64.deb &&
sudo apt install -y ./stripe.deb &&
rm -rf stripe.deb