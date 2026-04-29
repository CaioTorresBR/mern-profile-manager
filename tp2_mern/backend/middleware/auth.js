// Inspired in the document mern2
const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ error: "Token missing" });
		}

		const token = authHeader.split(" ")[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.auth = {
			userId: decoded.userId,
			isAdmin: decoded.isAdmin,
		};

		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
}

// admin only
function isAdmin(req, res, next) {
	if (!req.auth.isAdmin) {
		return res.status(403).json({ error: "Admin only" });
	}
	next();
}

// owner OR admin
function isOwnerOrAdmin(req, res, next) {
	if (
		req.auth.isAdmin ||
		req.auth.userId === req.params.id
	) {
		return next();
	}

	return res.status(403).json({
		error: "Not allowed",
	});
}

module.exports = {
	authenticate,
	isAdmin,
	isOwnerOrAdmin,
};