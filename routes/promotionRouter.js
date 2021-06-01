const express = require("express");
const promotionRouter = express.Router();

promotionRouter
	.route("/")
	.get((req, res, next) => {
		Promotion.findById(req.param.promotionId)
			.then((promtion) => {
				if (promotion) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(promotion.comments);
				} else {
					err = new Error(`Promotion ${req.params.promotionId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser, (req, res, next) => {
		Promotion.findById(req.params.promotionId)
			.then((promotion) => {
				if (promotion) {
					promotion.comments.push(req.body);
					promotion
						.save()
						.then((promotion) => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(promotion);
						})
						.catch((err) => next(err));
				} else {
					err = new Error(`Promotion ${req.params.promotionId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})

	.put(authenticate.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end(
			`PUT operation not supported on /promotion/${req.params.promotionId}/comments`
		);
	})
	.delete(authenticate.verifyUser, (req, res, next) => {
		Promotion.findById(req.params.promotionId)
			.then((promotion) => {
				if (promotion) {
					for (let i = promotion.comments.length - 1; i >= 0; i--) {
						promotion.comments.id(promotion.comments[i]._id).remove();
					}
					promotion
						.save()
						.then((promotion) => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(promotion);
						})
						.catch((err) => next(err));
				} else {
					err = new Error(`Promotion ${req.params.promotionId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	});

promotionRouter
	.route("/:promotionId/comments/:commentId")
	.get((req, res, next) => {
		Promotion.findById(req.params.promotionId)
			.then((promotion) => {
				if (promotion && promotion.comments.id(req.params.commentId)) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(promotion.comments.id(req.params.promotionId));
				} else if (!promotion) {
					err = new Error(`Promotion ${req.params.promotionId} not found`);
					err.status = 404;
					return next(err);
				} else {
					err = new Error(`Comment ${req.params.promotionId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end(
			`POST operation not supported on /promotion/${req.params.promotionId}/comments/${req.params.commentId}`
		);
	})

	.put(authenticate.verifyUser, (req, res, next) => {
		Promotion.findById(req.params.promotionId)
			.then((promotion) => {
				if (promotion && promotion.comments.id(req.params.commentId)) {
					if (req.body.name) {
						promotion.comments.id(req.params.commentId).name = req.body.name;
					}
					if (req.body.image) {
						promotion.comments.id(req.params.commentId).text = req.body.image;
					}
					promotion
						.save()
						.then((promotion) => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(promotion);
						})
						.catch((err) => next(err));
				} else if (!promotion) {
					err = new Error(`Promotion ${req.params.promotionId} not found`);
					err.status = 404;
					return next(err);
				} else {
					err = new Error(`Comment ${req.params.commentId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})

	.delete(authenticate.verifyUser, (req, res, next) => {
		Promotion.findById(req.params.promotionId)
			.then((promotion) => {
				if (promotion && promotion.comments.id(req.params.commentId)) {
					promotion.comments.id(req.params.commentId).remove();
					promotion
						.save()
						.then((promotion) => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(promotion);
						})
						.catch((err) => next(err));
				} else if (!promotion) {
					err = new Error(`Promotion ${req.params.promotionId} not found`);
					err.status = 404;
					return next(err);
				} else {
					err = new Error(`Comment ${req.params.commentId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	});

module.exports = promotionRouter;
