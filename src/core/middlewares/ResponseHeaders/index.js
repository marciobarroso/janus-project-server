export default (req, res, next) => {
	res.setHeader('Content-Type', 'application/json;charset=UTF-8');
	res.setHeader('Cache-Control', 'public');
	res.setHeader('Accept-Encoding', 'compress, gzip');
	return next();
};