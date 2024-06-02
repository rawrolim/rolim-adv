const fs = require("fs");
const fileExist = fs.existsSync("./.env.local");

console.log('Arquivo .env existe?',fileExist)

fs.copyFileSync("./.env.local.example","./.env.local")
if(!fileExist){
    console.log('Arquivo .env gerado')
}else{
    console.log('Arquivo .env atualizado')
}
