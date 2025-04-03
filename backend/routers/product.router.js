const express = require('express');
const ProductRouter = express.Router();

const fileUpload = require('express-fileupload');

const ProductController = require('../controllers/product.controller')


ProductRouter.get(
    '/get-trashed',
    
    ProductController.readTrashed
)


// ProductRouter.get(
//     '/Product-exists/:name', ProductController.ProductExists
// )


ProductRouter.get(
    "/category/:category_slug",

    ProductController.readByCategory
)


ProductRouter.get(
    '/:id?', ProductController.read
)

ProductRouter.post(
    '/create',

    fileUpload({
        createParentPath: true
    }),

    ProductController.create
)

ProductRouter.delete(
    '/delete/:id',ProductController.delete
)

ProductRouter.patch(
    '/change-status/:id/:new_status', ProductController.toggleStatus
)

ProductRouter.patch(
    '/patch-restore/:id',ProductController.restore
)

ProductRouter.delete(
    '/move-to-trash/:id',
   
    ProductController.moveToTrash
)
ProductRouter.delete(
    '/delete-other-image/:product_id/:index', ProductController.deleteOtherImage
)

ProductRouter.post(
    '/upload/other-images/:product_id',
    fileUpload(
        {
            createParentPath: true
        }
    ),
    ProductController.uploadImage

)

ProductRouter.put(
    "/edit/:id",
    fileUpload(
        {
            createParentPath: true
        }
    ), ProductController.edit
)

module.exports = ProductRouter;