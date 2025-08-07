import Product from "../models/product.model.js";
import secr from "../config/dotenv.config.js";
import { ProductUpdateValidator, ProductValidator } from "../validation/product.validator.js";
import path, { join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

export const GetProductPhoto = (req, res) => {
  const { id } = req.params;
  const filename = id;
  console.log(id);

  if (!filename)
    return res.status(400).send({ message: "No filename provided" });

  const imagePath = join(__dirname, "../upload", filename);

  if (!fs.existsSync(imagePath)) {
    return res.status(404).send({ message: "Image not found" });
  }

  res.sendFile(imagePath);
};

export const CreateProducts = async (req, res) => {
  let nline = { ...req.body, img: req.file.filename };
  let { value, error } = ProductValidator.validate(nline);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  nline = new Product(value);
  try {
    await nline.save();
    res.send(nline);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const ChangeProduct = async (req, res) => {
  let { id } = req.params;
  let { value, error } = ProductUpdateValidator.validate(req.body);
  if (error) {
  return res.status(400).send({ message: error.details[0].message });
}
  try {
    let savedproduct = await Product.findByIdAndUpdate(id, value, { new: true });
    res.send(savedproduct);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const ChangeProductPhoto = async (req, res) => {
  const { id } = req.params;
  const filename = req.file?.filename;

  if (!filename) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { img: filename },
      { new: true }
    );

    if (!updated) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send(updated);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const DeleteProduct = async (req, res) => {
  let { id } = req.params;
  try {
    let n = await Product.findByIdAndDelete(id);
    res.send(n);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
