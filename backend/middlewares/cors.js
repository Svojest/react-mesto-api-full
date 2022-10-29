const allowedCors = [
  'http://svojest.mesto.nomoredomains.icu',
  'http://localhost:7777',

];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса
  const { method } = req; // Сохраняем тип запроса (HTTP-метод)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestsHeaders = req.headers['access-control-request-headers'];
  // Проверяем, есть ли источник запроса среди разрешенных
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // Разрешаем кросс-доменные запросы перечисленных типов
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestsHeaders);
    return res.end();
  }
  return next();
};
