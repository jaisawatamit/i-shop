const CategoryModel = require('../models/category.model');
const ProductModel = require('../models/product.model')

const CategoryController = {
      async CategoryExists(req, res) {

            try {
                  const { name } = req.params;
                  const Category = await CategoryModel.findOne({ name });
                  if (Category) {
                        res.send(
                              {
                                    flag: 0,
                              }
                        )
                  } else {
                        res.send(
                              {
                                    flag: 1,
                              }
                        )
                  }
            } catch (error) {
                  res.send(
                        {
                              Message: "Internal Server error",
                              flag: 0
                        }
                  )
            }
      },



      async read(req, res) {
            try {
                  const { id } = req.params;
                  if (id) {
                        const Category = await CategoryModel.findById(id);
                        res.send({
                              flag: 1,
                              Category
                        })

                  } else {
                        const Categories = await CategoryModel.find({ deletedAt: null }).sort({ createdAt: -1 });
                        const data = []
                        const start = new Date().getTime();
                        const allPromises = Categories.map(
                              async (cat) => {
                                    const ProductCount = await ProductModel.find({category: cat._id}).countDocuments(); 
                                    data.push({
                                          ...cat.toJSON(),
                                          ProductCount
                                    })
                              }
                        )
                        await Promise.all(allPromises);
                        res.send({
                              flag: 1,
                              Categories:data
                        })
                  }


            } catch (error) {
                  res.send(
                        {
                              Message: "Internal Server error",
                              error:error.message,
                              flag: 0

                        }
                  )
            }

      },
      async readTrashed(req, res) {
            try {

                  const Categories = await CategoryModel.find({ deletedAt: { $ne: null } }).sort({ deletedAt: -1 });
                  res.send({
                        flag: 1,
                        Categories
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
      async create(req, res) {
            try {
                  const { name, slug } = req.body;
                  const CategoryExists = await CategoryModel.findOne({ name: name });
                  if (CategoryExists) {
                        res.send(
                              {
                                    message: "category alrady exist",
                                    flag: 0
                              }
                        )

                  } else {
                        const Category = new CategoryModel({ name, slug });
                        Category.save()
                              .then(
                                    (sucess) => {
                                          res.send(
                                                {
                                                      message: "category Created",
                                                      flag: 1
                                                }
                                          )
                                    }
                              ).catch(
                                    (error) => {
                                          res.send(
                                                {
                                                      message: "unable to created",
                                                      flag: 0
                                                }
                                          )
                                    }
                              )


                  }
            } catch (error) {
                  console.log(error.message);
                  res.send(
                        {
                              Message: "Internal Server error",
                              flag: 0

                        }
                  )
            }
      },

      async update(req, res) {
            try {
                  const data = req.body;
                  const { id } = req.params;
                  const Category = await CategoryModel.findByIdAndUpdate({ _id: id }, { name: data.name, slug: data.slug });
                  if (Category) {
                        res.send(
                              {
                                    message: "Category Updated",
                                    flag: 1
                              }
                        )
                  } else {
                        res.send(
                              {
                                    message: "Category not Updated",
                                    flag: 0
                              }
                        )
                  }
            } catch (error) {
                  res.send(
                        {
                              message: "Internal server error",
                              flag: 0
                        }
                  )
            }
      },

      restore(req, res) {
            try {
                  const { id } = req.params;
                  CategoryModel.updateOne({ _id: id }, { deletedAt: null })
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


      delete(req, res) {
            try {
                  const { id } = req.params;
                  CategoryModel.deleteOne({ _id: id })
                        .then(
                              () => {
                                    res.send(
                                          {
                                                message: "Category deleted",
                                                flag: 1
                                          }
                                    )
                              }
                        )
                        .catch(
                              () => {
                                    res.send(
                                          {
                                                message: "Category deleted",
                                                flag: 1
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
      async toggleStatus(req, res) {
            try {
                  const { id, new_status } = req.params;
                  await CategoryModel.updateOne(
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
      async moveToTrash(req, res) {
            try {
                  const { id } = req.params;
                  await CategoryModel.updateOne(
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
      }

}

module.exports = CategoryController;