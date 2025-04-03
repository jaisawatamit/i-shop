import { axiosInstance } from "./healper"

const getProductByCategory = (category_slug) => {
    return axiosInstance.get(`/product/category/${category_slug}`)
        .then(
            (responce) => {
                return responce.data.Products
            }
        ).catch(
            (error) => {
                return [];
            }
        )
}

const getCategories = () => {
    return axiosInstance.get(`/category`)
        .then(
            (responce) => {
                return responce.data.Categories
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const getCategoryById = (id) => {
    return axiosInstance.get(`/category/${id}`)
        .then(
            (responce) => {
                return responce.data.Category
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const getTrashedCaterogy = () => {
    return axiosInstance.get("/category/get-trashed")
        .then(
            (responce) => {
                return responce.data.Categories
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const getColors = () => {
    return axiosInstance.get(`/color`)
        .then(
            (responce) => {
                return responce.data.Colors
            }
        ).catch(
            (error) => {
                return []
            }
        )
}


const getColorById = (id) => {
    return axiosInstance.get(`/color/${id}`)
        .then(
            (responce) => {
                return responce.data.Color
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const getTrashedColor = () => {
    return axiosInstance.get("/color/get-trashed")
        .then(
            (responce) => {
                return responce.data.Colors
            }
        ).catch(
            (error) => {
                return []
            }
        )
}
const getTrashedProduct = () => {
    return axiosInstance.get("/product/get-trashed")
        .then(
            (responce) => {
                return responce.data.Products
            }
        ).catch(
            (error) => {
                return []
            }
        )
}


const getProducts = (category = null, range = null, color = null, price_sort = null, page = null, limit = null,) => {
    // console.log("Page number",page)
    const serachQuery = new URLSearchParams();
    if (category != null) {
        serachQuery.append("category_slug", category);
    }
    if (page != null) {
        serachQuery.append("page", page);
    }
    if (limit != null) {
        serachQuery.append("limit", limit);
    }

    if (range != null) {
        if (range.min < range.max) {
            serachQuery.append('min', range.min);
            serachQuery.append('max', range.max);
        }
    }

    if (color) {
        serachQuery.append('color', color)
    }
    if (price_sort != null) {
        serachQuery.apppend("price_sort", price_sort);
    }
    return axiosInstance.get(`/product?${serachQuery.toString()}`)
        .then(
            (responce) => {
                return responce.data
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const getProductsById = (id) => {
    return axiosInstance.get(`/product/${id}`)
        .then(
            (responce) => {
                return responce.data.Product
            }
        ).catch(
            (error) => {
                return []
            }
        )
}


const getOrders = (page = null, limit = null) => {
    const serachQuery = new URLSearchParams();
    console.log("Page is", page)
    console.log("Limit is", limit)
    if (page != null) {
        serachQuery.append("page", page);
    }
    if (limit != null) {
        serachQuery.append("limit", limit);
    }
    return axiosInstance.get(`/order?${serachQuery.toString()}`)
        .then(
            (responce) => {
                return responce.data
            }
        ).catch(
            (error) => {
                return []
            }
        )
}

const getUsers = () => {
    return axiosInstance.get("/user") // Ensure this matches the backend route ("/")
        .then((response) => response.data.data) // Extract the `data` field from the response
        .catch((error) => {
            console.error("Error fetching users:", error);
            throw error; // Re-throw the error to handle it in the component
        });
};












export { getCategories, getOrders, getUsers, getProductByCategory, getTrashedProduct, getTrashedColor, getColorById, getTrashedCaterogy, getCategoryById, getProducts, getProductsById, getColors }