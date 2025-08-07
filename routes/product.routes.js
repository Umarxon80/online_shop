import { Router} from "express";
import { ChangeProduct, ChangeProductPhoto, CreateProducts, DeleteProduct, GetAllProducts, GetProductPhoto } from "../controller/product.controller.js";
import { upload } from "../middleware/upload.js";

const ProductRouter=Router()

ProductRouter.get("",GetAllProducts)
ProductRouter.post("", upload.single("img"),CreateProducts)
ProductRouter.get("/uploads/:id",GetProductPhoto)
ProductRouter.patch("/update/:id", upload.none(),ChangeProduct)
ProductRouter.patch("/updatephoto/:id",upload.single("img"),ChangeProductPhoto)
ProductRouter.delete("/delete/:id",DeleteProduct)


export default ProductRouter