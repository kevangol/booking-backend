const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true,
		},
		image: {
			type: String,
			default: "https://via.placeholder.com/150/771796",
		},
		isCommingSoon: {
			type: Boolean,
			default: false,
		},
		isLocked: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		slug: { type: String, required: true, unique: true }, // SEO-friendly URL slug
		metaDescription: { type: String, maxlength: 160 }, // Meta description for SEO
		keywords: [String], // Array of SEO keywords
		canonicalUrl: { type: String, default: "https://www.six.ind.in/" }, // Canonical URL to avoid duplicate content
		content: { type: String, required: true }, // Main content for the page
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

module.exports = mongoose.model("categories", CategorySchema);
