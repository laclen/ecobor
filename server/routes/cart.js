const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

// tum sepetleri cek
router.get("/", (req, res) => {
  Cart.find()
    .then((elem) => {
      res.send(elem);
    })
    .catch((err) => res.send({ success: false, error: err }));
});

// musteri id ile kullanici sepetini cek
router.get("/:id", (req, res) => {
  const customerId = req.params.id;

  Cart.findOne({ customer: customerId })
    .then((cart) => {
      res.send({
        success: true,
        message: "Musterinin sepeti basariyla goruntulendi.",
        cart: cart,
      });
    })
    .catch((err) => res.send({ success: false, error: err }));
});

// sepete urun ekle
router.put("/", async (req, res) => {
  let msg;

  // customerId ile sepeti bul
  await Cart.findOne({ customer: req.body.customerId })
    .then(async (cart) => {
      // sepette ayni urun var mi kontrol et
      // console.log(cart.products)
      const productExists = cart.products.findIndex(
        (product) => product.productId == req.body.productId
      );

      // ayni urun varsa quantity i yeni urun sayisi kadar arttir
      if (productExists !== -1) {

        // yeni quantity'i hesapla
        const newQuantity = req.body.quantity + cart.products[productExists].quantity;

        // cart objesinin icindeki products arrayinin icinde, productId'si eslesen objeyi bulup quantitysini yenile
        Cart.updateOne(
            { _id: cart._id, "products.productId": req.body.productId },
            { $set: { "products.$.quantity" : newQuantity } },
            (err) => {console.log("err:" + err)}
        )

        msg ="urun guncellendi"
        await cart.save();

      } else {
        // ayni urun yoksa, direkt urunu ekle
        cart.products = [
          ...cart.products,
          { productId: req.body.productId, quantity: req.body.quantity },
        ];

        msg = "urun sepete eklendi";
        await cart.save();
      }
      res.send({
        success: true,
        message: msg,
        cart: cart,
      });
    })
    .catch((err) => res.send({ success: false, error: err }));
});

// sepetten urun sil
router.delete("/", async (req, res) => {
  // customerId ile sepeti bul
  await Cart.findOne({ customer: req.body.customerId })
    .then(async (cart) => {
      // sepette kaldirilmaya calisilan urun var mi kontrol et, indexini al
      const productExists = cart.products.findIndex(
        (product) => product.productId == req.body.productId
      );

      if (productExists !== -1) {
        // urun varsa ve quantity 1'den buyukse quantity 1 dusur
        const quantity = cart.products[productExists].quantity;
        if (quantity > 1) {
          cart.products[productExists].quantity -= 1;
          await cart.save();
        } else {
          console.log(productExists);
          cart.products.splice(productExists, 1);
          await cart.save();
        }
      }
      res.send({
        success: true,
        msg: "Urun basariyla sepetten kaldirildi.",
        cart: cart,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        msg: "Urun sepetten silinirken hata.",
        error: err,
      });
    });
});

// musteri id ile sepeti bosalt
router.delete("/:id", async (req, res) => {
  // customerId ile sepeti bul
  await Cart.findOne({ customer: req.params.id })
    .then(async (cart) => {
      // sepette urun var mi kontrol et
      console.log(cart);
      const productsEmpyt = cart.products.length;
      console.log(productsEmpyt);

      if (productsEmpyt <= 0) {
        res.send({
          success: false,
          message: "Sepet zaten bos.",
        });
      } else {
        // urun varsa ve quantity 1'den buyukse quantity 1 dusur
        cart.products = [];
        await cart.save();

        res.send({
          success: true,
          message: "Sepet bosaltildi.",
          cart: cart,
        });
      }
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Sepet bosaltilirken hata.",
        error: err,
      });
    });
});
module.exports = router;
