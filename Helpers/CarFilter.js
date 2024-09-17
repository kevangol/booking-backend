const ColorModel = new (require("../Models/ColorModel"))();
// const MakeModel = require("../Models/MakesModel")();
// const ModelModel = require("../Models/ModelsModel")();

const buildFilter = async (query) => {
	const filter = {};

	if (query.color) {
		const colorId = await ColorModel.findColor({ color: query.color }, "_id");
		if (colorId) {
			filter["colorId"] = colorId; // Use the color ID in the filter
		}
	}
	// if (query.Brand) {
	// 	const makeId = await getMakeIdByName(query.Brand);
	// 	if (makeId) {
	// 		filter["makeId"] = makeId; // Use the make ID in the filter
	// 	}
	// }
	// if (query.Models) {
	// 	const modelId = await getModelIdByName(query.Models);
	// 	if (modelId) {
	// 		filter["modelId"] = modelId; // Use the model ID in the filter
	// 	}
	// }
	// if (query["Min Price"]) {
	// 	filter["price"] = { $gte: parseFloat(query["Min Price"]) }; // Adjust the field name and operator as per your schema
	// }
	// if (query["Max Price"]) {
	// 	if (!filter["price"]) filter["price"] = {};
	// 	filter["price"]["$lte"] = parseFloat(query["Max Price"]); // Adjust the field name and operator as per your schema
	// }
	// if (query.Year) {
	// 	filter["makeYear"] = parseInt(query.Year); // Adjust the field name as per your schema
	// }
	// if (query.Seats) {
	// 	filter["seatingCapacity"] = parseInt(query.Seats); // Adjust the field name as per your schema
	// }
	// if (query.Owner) {
	// 	filter["numberOfOwner"] = parseInt(query.Owner); // Adjust the field name as per your schema
	// }
	// if (query["Fuel Type"]) {
	// 	filter["fuel"] = query["Fuel Type"]; // Adjust the field name as per your schema
	// }

	return filter;
};

module.exports = buildFilter;
