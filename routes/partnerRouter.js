const express = require("express");
const partnerRouter = express.Router();

partnerRouter
	.route("/")
	.get((req, res, next) => {
		Partner.findById(req.param.partnerId)
			.then((partner) => {
				if (partner) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(partner.comments);
				} else {
					err = new Error(`Partner ${req.params.partnerId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser, (req, res, next) => {
		Partner.findById(req.params.partnerId)
			.then((partner) => {
				if (partner) {
					partner.comments.push(req.body);
					partner
						.save()
						.then((partner) => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(partner);
						})
						.catch((err) => next(err));
				} else {
					err = new Error(`Partner ${req.params.partnerId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})

	.put(authenticate.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end(
			`PUT operation not supported on /partner/${req.params.promotionId}/comments`
		);
	})
	.delete(authenticate.verifyUser, (req, res, next) => {
		Partner.findById(req.params.partnerId)
			.then((partner) => {
				if (partner) {
					for (let i = partner.comments.length - 1; i >= 0; i--) {
						partner.comments.id(partner.comments[i]._id).remove();
					}
					partner
						.save()
						.then((partner) => {
							res.statusCode = 200;
							res.setHeader("Content-Type", "application/json");
							res.json(partner);
						})
						.catch((err) => next(err));
				} else {
					err = new Error(`Partner ${req.params.partnerId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	});

partnerRouter
	.route("/:partnerId/comments/:commentId")
	.get((req, res, next) => {
		Partner.findById(req.params.partnerId)
			.then((partner) => {
				if (partner && partner.comments.id(req.params.commentId)) {
					res.statusCode = 200;
					res.setHeader("Content-Type", "application/json");
					res.json(partner.comments.id(req.params.partnerId));
				} else if (!partner) {
					err = new Error(`Partner ${req.params.partnerId} not found`);
					err.status = 404;
					return next(err);
				} else {
					err = new Error(`Comment ${req.params.partnerId} not found`);
					err.status = 404;
					return next(err);
				}
			})
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser, (req, res) => {
		res.statusCode = 403;
		res.end(
			`POST operation not supported on /promotion/${req.params.partnerId}/comments/${req.params.commentId}`
		);
	})

	.put(authenticate.verifyUser, (req, res, next) => {
		Promotion.findById(req.params.partnerId)
			.then((partner) => {
				if (partner && partner.comments.id(req.params.commentId)) {
					if (req.body.name) {
						partner.comments.id(req.params.commentId).image = req.body.image;
					}
					if (req.body.text) {
						promotion.comments.id(req.params.commentId).text = req.body.text;
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
module.exports = partnerRouter;
