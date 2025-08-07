import { Router} from "express";
import { ChangeProduct, ChangeProductPhoto, CreateProducts, DeleteProduct, GetAllProducts, GetOneProducts, GetProductPhoto } from "../controller/product.controller.js";
import { upload } from "../middleware/upload.js";
import { role } from "../middleware/role.js";

const ProductRouter=Router()

ProductRouter.get("/uploads/:id",GetProductPhoto)
ProductRouter.get("",GetAllProducts)


ProductRouter.post("",role(["admin"]), upload.single("img"),CreateProducts)
ProductRouter.patch("/:id",role(["admin"]), upload.none(),ChangeProduct)
ProductRouter.patch("/photo/:id",role(["admin"]),upload.single("img"),ChangeProductPhoto)
ProductRouter.delete("/:id",role(["admin"]),DeleteProduct)

ProductRouter.get("/:id",role(["admin","user"]),GetOneProducts)

export default ProductRouter