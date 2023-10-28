from node:14
workdir /app
copy package.json ./
copy . .
run npm install
run npm install mysql
run npm install express
expose 3000
cmd ["npm","start"]
