const express = require('express');
const ColorController = require('../controllers/color.controller');
const ColorRouter = express.Router();

ColorRouter.get(
    '/get-trashed', ColorController.readTrashed
)

// ColorRouter.get(
//     '/color-exists/:name', ColorController.ColorExists
// )

ColorRouter.get(
    '/:id?',
    ColorController.getData
);


ColorRouter.post(
    '/create', ColorController.create
)

ColorRouter.put(
    '/update/:id', ColorController.update 
)

ColorRouter.patch(
    '/change-status/:id/:new_status', ColorController.toggleStatus  
)

ColorRouter.patch(
    '/patch-restore/:id',ColorController.restore
)

ColorRouter.delete(
    '/delete/:id',ColorController.delete
)
ColorRouter.delete(
    '/move-to-trash/:id',ColorController.moveToTrash
)

module.exports = ColorRouter;