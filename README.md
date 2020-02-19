Reverse SSH Tunnel to your local PC via publically reachable host
1) Check sample app/config.json file
2) You can pass the password via command line args too, node app/index <password>
3) You can run via node cli or via pm2
4) pm2 can be configured for individual tunnelling. Check pm2.yaml
5) config.json should not have the raw password mentioned. It should be base64 encoded