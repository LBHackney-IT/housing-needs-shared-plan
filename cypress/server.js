const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router({});
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(8080, () => {
  console.log('JSON Server is running');
});

router.render = (req, res) => {
  console.log(req);
  if (req.body.name === 'John Cena') {
    res.status(500).end();
  }
  res.status(200).end();
};
