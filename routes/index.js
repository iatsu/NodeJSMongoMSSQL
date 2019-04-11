const express = require('express');
const router = express.Router();
const mainService = require('../services/main-service');
const authorize = require('../helpers/authorize');
const Role = require('../helpers/role');

/**
   * @swagger
   * /api/authenticate:
   *   post:
   *     tags:
   *      - User
   *     parameters:
   *      - in: body
   *        description: Authentication
   *        name: authentication
   *        schema:
   *          type: object
   *          properties:
   *            email:
   *              type: string
   *            password:
   *              type: string
   *     responses:
   *       200:
   *         description: Get Filtered Products
   */
  router.post('/authenticate', async (req, res, next) => {
    const authResult = await mainService.auth({ email: req.body.email, password: req.body.password });
    res.send(authResult);
  });

/**
   * @swagger
   * /api/products:
   *   get:
   *     tags:
   *      - Products
   *     responses:
   *       200:
   *         description: Get Products
   */
router.get('/products', authorize(Role.User), async (req, res, next) => { //ONLY USERS
  const products = await mainService.getProducts();
  res.send(products);
});

/**
   * @swagger
   * /api/filteredproducts:
   *   post:
   *     tags:
   *      - Products
   *     parameters:
   *      - in: body
   *        description: Product Data
   *        name: productData
   *        schema:
   *          type: object
   *          properties:
   *            productId:
   *              type: integer
   *     responses:
   *       200:
   *         description: Get Filtered Products
   */
router.post('/filteredproducts', authorize(), async (req, res, next) => { //ALL AUTHENTICATED USERS
  const filteredProducts = await mainService.getFilteredProducts(req.body.productId);
  res.send(filteredProducts);
});

/**
   * @swagger
   * /api/logs:
   *   get:
   *     tags:
   *      - Products
   *     responses:
   *       200:
   *         description: Get Logs
   */
router.get('/logs', async (req, res, next) => {
  const logs = await mainService.getLogs();
  res.send(logs);
});

module.exports = router;
