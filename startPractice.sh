
cd practiceCase/server 
npm install
npm run build 
nohup npm start &

cd ../client
npm install
npm run build
nohup serve build &