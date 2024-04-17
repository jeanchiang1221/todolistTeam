const http = require('http');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const headers = require('./headersSetting');
const successHandle = require('./successHandle');
const postTodo = require('./postTodo');
const getTodo = require('./getTodo');
const patchTodo = require('./patchTodo');
const deleteTodo = require('./deleteTodo');

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB) // 連線資料庫
  .then(() => {
    console.log('資料庫連線成功');
  })
  .catch((error) => {
    console.log(error);
  });

const requestListener = (req, res)=>{
    if(req.url=="/todos" && req.method == "GET"){
        // getTodo.js
        getTodo(res);
    }else if(req.url=="/todos" && req.method == "POST"){
        // postTodo.js
        postTodo(res, req);
    }else if(req.url=="/todos" && req.method == "DELETE"){
        // deleteTodo.js
        deleteTodo(res);
    }else if(req.url.startsWith("/todos/") && req.method=="DELETE"){
        // deleteTodo.js
        deleteTodo(res, req);
    }else if(req.url.startsWith("/todos/") && req.method=="PATCH"){
        // patchTodo.js
        patchTodo(res, req);
    }else if(req.method == "OPTIONS"){
        successHandle(res);
    }else{
        res.writeHead(404,headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此網站路由"
        }));
        res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);