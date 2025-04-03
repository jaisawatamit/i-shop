const { getRandomFileName } = require("../helper");
const CategoryModel = require("../models/category.model");
const ProductModel = require("../models/product.model");
const ColorModel = require("../models/color.model");
const fs = require('fs');



const ProductController = {

    delete(req, res) {
        try {
              const { id } = req.params;
              ProductModel.deleteOne({ _id: id })
                    .then(
                          () => {
                                res.send(
                                      {
                                            message: "Product deleted",
                                            flag: 1
                                      }
                                )
                          }
                    )
                    .catch(
                          () => {
                                res.send(
                                      {
                                            message: "Product deleted",
                                            flag: 1
                                      }
                                )
                          }
                    )


        } catch (error) {
              // console.log(err.message);
              res.send(
                    {
                          message: "Internal server error",
                          // error: error.message,
                          flag: 0
                    }
              )
        }
  },
    async readTrashed(req, res) {
        try {
            const Products = await ProductModel.find({ deletedAt: { $ne: null } }).sort({ deletedAt: -1 });
            res.send({
                flag: 1,
                Products
            })

        } catch (error) {
            res.send(
                {
                    Message: "Internal Server error",
                    flag: 0
                }
            )
        }
    },
    restore(req, res) {
        try {
            const { id } = req.params;
            ProductModel.updateOne({ _id: id }, { deletedAt: null })
                .then(
                    () => {
                        res.send(
                            {
                                message: "Category restored",
                                flag: 1
                            }
                        )
                    }
                ).catch(
                    () => {
                        res.send(
                            {
                                message: "Category not restored",
                                flag: 0
                            }
                        )
                    }
                )


        } catch (error) {
            // console.log(error.message)
            res.send(
                {
                    message: "Internal server error",
                    // error: error.message,
                    flag: 0
                }
            )
        }
    },
    async moveToTrash(req, res) {
        try {
            const { id } = req.params;
            await ProductModel.updateOne(
                { _id: id },
                {
                    deletedAt: new Date().toISOString()
                }
            )
            res.send(
                {
                    message: "move to trashed",
                    flag: 1
                }
            )
        }

        catch (error) {
            console.error(error.message);
            res.send(
                {
                    Message: "Internal Server error",
                    // error: error.message,
                    flag: 0
                }
            )
        }
    },

    async toggleStatus(req, res) {
        try {
            const { id, new_status } = req.params;
            await ProductModel.updateOne(
                {
                    id
                },
                {
                    status: new_status
                }

            )
            res.send({
                message: "Status Updated",
                flag: 1
            })


        } catch (error) {

            // console.log(error.message);
            res.send(
                {
                    Message: "Internal Server error",
                    // error: error.message,
                    flag: 0

                }
            )
        }
    },

    async readByCategory(req, res) {
        try {
            const category_slug = req.params.category_slug;
            const category = await CategoryModel.findOne({ slug: category_slug });
            if (category) {
                const Products = await ProductModel.find({ category: category._id });
                res.send({
                    Products,
                    flag: 1
                })
            } else {
                res.send({
                    message: "invailed category",
                    products: [],
                    flag: 0
                })
            }
        } catch (error) {
            console.error("Error in readByCategory:", error);
            res.send(
                {
                    flag: 0,
                    error: error.message,
                    message: "internal server problam"
                }
            )
        }
    },

    async edit(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductModel.findById(id);
            if (!product) return res.send({ message: "invaild product id", falg: 0 })
            const image = req.files?.image ?? null;
            const data = {
                name: req.body.name,
                slug: req.body.slug,
                category: req.body.category,
                colors: JSON.parse(req.body.colors),
                original_price: req.body.original_price,
                discounted_price: req.body.discounted_price,
                discount_percent: req.body.discount_percent
            }
            if (image) {
                const imageName = getRandomFileName(image.name);
                const destination = "./public/images/product/" + imageName;
                await image.mv(destination);
                data.main_image = imageName;
            }
            await ProductModel.updateOne({ _id: id }, data);
            if (image) await fs.unlinkSync("./public/images/product/" + product.main_image);
            res.send({ message: "product updated", flag: 1 })
        } catch (error) {
            console.log(error);
            res.send({
                message: "internal  problam",
                error: error.message,
                flag: 0
            })
        }
    },

    async deleteOtherImage(req, res) {
        try {
            const { product_id, index } = req.params;
            const Product = await ProductModel.findById(product_id);
            const other_images = Product.other_images;
            const image_name = other_images[index];
            await fs.unlinkSync("./public/images/product/other-images/" + image_name);
            other_images.splice(index, 1);
            Product.other_images = other_images;
            await Product.save();
            res.send(
                {
                    flag: 1,
                    message: "images deleted",
                    other_images
                }
            )
        } catch (error) {
            console.log(error)
            res.send(
                {
                    flag: 0,
                    error: error.message,
                    message: "internal server problam"
                }
            )
        }
    },

    async uploadImage(req, res) {
        try {
            const { product_id } = req.params;
            const other_images = req.files.other_images;
            const otherImagesNames = [];
            for (let otherImage of other_images) {
                const file_name = getRandomFileName(otherImage.name);
                const destination = "./public/images/product/other-images/" + file_name;
                await otherImage.mv(destination)
                otherImagesNames.push(file_name);
            }
            const product = await ProductModel.findById(product_id);
            const product_other_images = product.other_images;
            const updates_names = [...product_other_images, ...otherImagesNames];
            product.other_images = updates_names;
            await product.save();
            res.send({ flag: 1, message: "Images Uploaded", other_images: updates_names })
        } catch (error) {
            console.log(error)
            res.send({
                message: "inetrnal server problam ",
                error: error.message,
                flag: 0
            })
        }
    },
    async read(req, res) {
        const search_query = req.query;
        let skip = 0;
        let limit = Number(search_query.limit) || 4;
        let page = Number(search_query.page) || 0;
        // console.log("Search qurey is page",search_query.page, search_query.limit )
        if (search_query.page) {
            skip = limit * (page - 1)
        }
        const filterQuery = { deletedAt: null };
        if (search_query.category_slug) {
            const category = await CategoryModel.findOne({ slug: search_query.category_slug });
            if (category) {
                filterQuery['category'] = category._id;
            }
        }
        if (search_query.min && search_query.max) {
            filterQuery['discounted_price'] = {
                $gte: Number(search_query.min),
                $lte: Number(search_query.max)
            }
        }
        //    console.log(search_query.color);
        if (search_query.color) {
            const colorIds = [];
            const allPromises = search_query.color.split(",").map(
                async (color_slug) => {
                    const colorData = await ColorModel.findOne({ slug: color_slug })
                    // console.log(colorData);
                    if (colorData) {
                        colorIds.push(colorData._id);
                    }
                }
            )
            await Promise.all(allPromises);
            filterQuery['colors'] = { $in: colorIds };
        }
        try {
            const { id } = req.params;
            if (id) {
                const Product = await ProductModel.findById(id).populate(['category', 'colors']);
                res.send({ Product, flag: 1 })
            } else {
                const total_product = await ProductModel.find({ deletedAt: null }).countDocuments();
                console.log(total_product);

                const Products = await ProductModel.find(filterQuery).populate(['category', 'colors']).skip(skip).limit(limit);
                res.send({ Products, flag: 1, total_product, skip, limit })
            }
        } catch (error) {
            // console.log(error);`
            res.send({
                message: "inetrnal server problam ",
                // error: error.message,
                flag: 0
            })
        }
    },
    create(req, res) {
        try {
            const image = req.files.image;
            const data = {
                name: req.body.name,
                slug: req.body.slug,
                category: req.body.category,
                colors: JSON.parse(req.body.colors),
                original_price: req.body.original_price,
                discounted_price: req.body.discounted_price,
                discount_percent: req.body.discount_percent,
                main_image: image.name,
            }

            const file_name = getRandomFileName(image.name);
            // const file_name = image.name;
            const destination = "./public/images/product/" + file_name;
            image.mv(
                destination,
                (error) => {
                    if (error) {
                        res.send({
                            message: "file upload failed",
                            // error: error.message,
                            flag: 0
                        })
                    } else {
                        data.main_image = file_name;
                        const Product = new ProductModel(data);
                        Product.save()
                            .then(() => {
                                res.send({
                                    message: "product created",
                                    flag: 1
                                })
                            }).catch((error) => {
                                console.log(error);
                                res.send({
                                    message: "product creation failed",
                                    error: error.message,
                                    flag: 0
                                })
                            })
                    }
                }
            )
        } catch (error) {
            // console.log(error)
            res.send({
                message: "internal server error",
                // error: error.message,
                flag: 0
            })
        }
    }
}


module.exports = ProductController;