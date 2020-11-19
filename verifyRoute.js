const path = require('path');
let route = '';

module.exports = ((pathname, callback) => new Promise((resolve) => {
  if (path.isAbsolute(pathname)) {
    route = pathname;
    resolve(route);
    return callback('la ruta ', pathname + ' es absoluta');
  }
  route = path.resolve(pathname);
  resolve(route);
  return callback('la ruta ' + pathname + ' es relativa, la nueva ruta es', route);
}));
