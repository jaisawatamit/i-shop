const ColorModel = require("../models/color.model");

const ColorController = {
      async getData(req, res) {
            const { id } = req.params;
            try {
                  if (id) {
                        const color = await ColorModel.findById(id);
                        if (color) {
                              res.send({ Color: color, flag: 1 });
                        } else {
                              res.send({ message: 'Color not found', flag: 0 });
                        }
                  } else {
                        const colors = await ColorModel.find({ deletedAt: null }).sort({ createdAt: -1 });
                        res.send({ Colors: colors, flag: 1 });
                  }
            } catch (err) {
                  res.send({ message: 'Internal server error', flag: 0 });
            }
      },

      async ColorExists(req, res) {
            const { name } = req.params;
            try {
                  if (name) {
                        const Color = await ColorModel.findOne({ name: name });
                        if (Color) {
                              res.send({ message: "color alrady exists", flag: 0 });
                        } else {

                              res.send({ message: "", flag: 1 });
                        }
                  }
            } catch (err) {
                  res.send({ message: 'Error checking existence', flag: 0 });
            }
      },

      async create(req, res) {
            try {
                  const data = req.body;
                  const newColor = new ColorModel(data);
                  await newColor.save();
                  res.send({ message: 'Color created successfully', flag: 1 });
            } catch (error) {
                  console.log(error.message);
                  res.send(
                        {
                              message: 'Failed to create color',
                              error: error.message,
                              flag: 0
                        }
                  );
            }
      },

      async update(req, res) {
            try {
                  const updatedColor = await ColorModel.findByIdAndUpdate(req.params.id, req.body);
                  if (updatedColor) {
                        res.send({ message: 'Color updated successfully', flag: 1 });
                  } else {
                        res.send({ message: 'Color not found', flag: 0 });
                  }
            } catch (err) {
                  res.send({ message: 'Failed to update color', flag: 0 });
            }
      },

      async readTrashed(req, res) {
            try {
                  const Colors = await ColorModel.find({ deletedAt: { $ne: null } }).sort({ deletedAt: -1 });
                  res.send({
                        flag: 1,
                        Colors
                  })



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
      delete(req, res) {
            try {
                  const { id } = req.params;
                  ColorModel.deleteOne({ _id: id })
                        .then(
                              () => {
                                    res.send(
                                          {
                                                message: "Color deleted",
                                                flag: 1
                                          }
                                    )
                              }
                        )
                        .catch(
                              () => {
                                    res.send(
                                          {
                                                message: "Color deleted",
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

      async moveToTrash(req, res) {
            try {
                  const { id } = req.params;
                  await ColorModel.updateOne(
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
                  res.send(
                        {
                              Message: "Internal Server error",
                              flag: 0
                        }
                  )
            }
      },

      async toggleStatus(req, res) {
            try {
                  const { id, new_status } = req.params;
                  await ColorModel.updateOne(
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


      restore(req, res) {
            try {
                  const { id } = req.params;
                  ColorModel.updateOne({ _id: id }, { deletedAt: null })
                        .then(
                              () => {
                                    res.send(
                                          {
                                                message: "Color restored",
                                                flag: 1
                                          }
                                    )
                              }
                        ).catch(
                              () => {
                                    res.send(
                                          {
                                                message: "Color not restored",
                                                flag: 0
                                          }
                                    )
                              }
                        )


            } catch (error) {
                  res.send(
                        {
                              message: "Internal server error",
                              flag: 0
                        }
                  )
            }
      },
};

module.exports = ColorController;

