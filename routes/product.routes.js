import { Router} from "express";
import { ChangeProduct, ChangeProductPhoto, CreateProducts, DeleteProduct, GetAllProducts, GetOneProducts, GetProductPhoto } from "../controller/product.controller.js";
import { upload } from "../middleware/upload.js";
import { role } from "../middleware/role.js";

const ProductRouter=Router()

ProductRouter.get("",GetAllProducts)
ProductRouter.get("/:id",role(["admin","user"]),GetOneProducts)
ProductRouter.get("/uploads/:id",GetProductPhoto)


ProductRouter.post("",role(["admin"]), upload.single("img"),CreateProducts)
ProductRouter.patch("/update/:id",role(["admin"]), upload.none(),ChangeProduct)
ProductRouter.patch("/updatephoto/:id",role(["admin"]),upload.single("img"),ChangeProductPhoto)
ProductRouter.delete("/delete/:id",role(["admin"]),DeleteProduct)


export default ProductRouter