const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ColorSchema = new Schema(
    {
        name: {
            type: String,
            maxLength: 20,
            required: true,
            unique: true
        },
        code: {
            type: String,
            maxLength: 7,
            required: true,
            unique: true
        },
        color_view: {
            type: String,
            required: true, // Makes the field mandatory
            default: "Default view"
        },
        status: {
            type: Boolean,
            default: true
        },
        deletedAt: {
            type: Date,
            default: null
        },
        slug: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);
const ColorModel = mongoose.model("Color", ColorSchema);

module.exports = ColorModel


// const mongoose = require('mongoose');

// const ColorSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     slug: { type: String, required: true, unique: true },
//     code: { type: String, required: true },
//     productCount: { type: Number, default: 0 },
// });

// // Check if the model is already defined
// const ColorModel = mongoose.models.Color || mongoose.model('Color', ColorSchema);

// module.exports = ColorModel;
