const express = require("express");
const { check, validationResult } = require("express-validator");
const Product = require("../models/Product");

const router = express.Router();

const validate = [
  check("price").isNumeric().withMessage("Fiyat bir sayi olmali"),
  check("stock").isNumeric().withMessage("Stok sayisi bir sayi olmali"),
];

// urun ekleme
router.post("/ekle", validate, (req, res) => {
  // girilen verileri dogrula
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  // girilen verilerden yeni urunu olustur
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    stock: req.body.stock,
  });

  // urunu veritabanina kaydet ve kaydedilen verileri yayinla
  product
    .save()
    .then((result) => {
      res.send({
        success: true,
        message: "Urun basariyla eklendi",
        data: result,
      });
    })
    .catch((error) => console.log(error));
});

// tum urunleri cek
router.get("/", (req, res) => {
  Product.find()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => console.log(err));
});

// id ile urun cek
router.get("/:id", (req, res) => {
  // url'den id cek
  const productId = req.params.id;

  // urunu bul ve yayinla
  Product.findById(productId)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => console.log(err));
});

// urun guncelle
router.put("/:id", async (req, res) => {
  // url'den id cek
  const productId = req.params.id;

  // request 'i cek
  const request = req.body;

  // name guncelle
  if ("name" in request) {
    await Product.findByIdAndUpdate(productId, { name: req.body.name })
      .then((product) => {
        product.save();
        return product;
      })
      .catch((err) =>
        res.send({ success: false, message: "Isim guncellenemedi", error: err })
      );
  }

  // price guncelle
  if ("price" in request) {
    await Product.findByIdAndUpdate(productId, { price: req.body.price })
      .then((product) => {
        product.save();
        return product;
      })
      .catch((err) =>
        res.send({
          success: false,
          message: "Fiyat guncellenemedi",
          error: err,
        })
      );
  }

  // image guncelle
  if ("image" in request) {
    await Product.findByIdAndUpdate(productId, { image: req.body.image })
      .then((product) => {
        product.save();
        return product;
      })
      .catch((err) => res.send({
        success: false,
        message: "Resim guncellenemedi",
        error: err,
      }));
  }

  // description guncelle
  if ("description" in request) {
    await Product.findByIdAndUpdate(productId, {
      description: req.body.description,
    })
      .then((product) => {
        product.save();
        return product;
      })
      .catch((err) => res.send({
        success: false,
        message: "Aciklama guncellenemedi",
        error: err,
      }));
  }

  // stock guncelle
  if ("stock" in request) {
    await Product.findByIdAndUpdate(productId, { stock: req.body.stock })
      .then((product) => {
        product.save();
        return product;
      })
      .catch((err) => res.send({
        success: false,
        message: "Stok guncellenemedi",
        error: err,
      }));
  }

  // guncellenmis urunu yayinla
  Product.findById(productId)
    .then((product) => {
      res.send({
        success: true,
        message: "Urun basariyla guncellendi",
        product: product,
      });
    })
    .catch((err) => console.log(err));
});

// urun sil
router.delete("/:id", (req, res) => {
  const productId = req.params.id;

  Product.findByIdAndRemove(productId)
    .then((product) => {
      res.send({
        success: true,
        message: "Urun basariyla silindi",
        product: product,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
