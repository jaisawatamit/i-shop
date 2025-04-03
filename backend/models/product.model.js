const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            maxLentgh: 100,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            maxLentgh: 100,
            required: true,
            unique: true
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: "Category"
        },
        colors: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Color"
            }
        ],
        original_price: {
            type: Number,
            required: true,
            min: 1
        },
        discounted_price: {
            type: Number,
            default:0
        },
        discount_percent: {
            type: String,
            
        },
        stock: {
            type: Boolean,
            default: true

        },
        main_image: {
            type: String,

        },
        other_images: [
            { type: String, default: null }

        ],
        description: {
            type: String,

        },
        status: {
            type: Boolean,
            default: true
        },
        deletedAt:{
            type: Date,
            default:null
        }
    },
    {
        timestamps: true
    }
);

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;