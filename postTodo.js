const Todos = require('./model/todo');
const successHandle = require('./successHandle');
const errorHandle = require('./errorHandle');
const { v4: uuidv4 } = require('uuid');

function postTodo(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const title = JSON.parse(body)?.title;
      const newTodo = await Todos.create({
        title,
      });

      successHandle(res, newTodo);
    } catch (error) {
      errorHandle(res);
    }
  });
}

module.exports = postTodo;
