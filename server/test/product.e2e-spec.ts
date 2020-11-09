import { HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { CreateProductDTO } from '../src/product/dto/create-product.dto';
import { ProductStatus } from '../src/product/interfaces/product.interface';
import axios from 'axios';
import { app, database } from './constants';

describe('ProductController (e2e)', () => {
  beforeAll(async () => {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async (done) => {
    await mongoose.disconnect(done);
  });

  const product: CreateProductDTO = {
    title: 'Product Title',
    description: 'Product Description',
    quantity: 10,
    price: 500,
    status: ProductStatus.Public,
  };

  let productId: string;

  it('should list all products', () => {
    return request(app)
      .get('/product')
      .expect(({ body }) => {
        expect(body).toEqual([]);
      })
      .expect(HttpStatus.OK);
  });

  it('should create product', () => {
    return request(app)
      .post('/product')
      .field('title', product.title)
      .field('description', product.description)
      .field('quantity', product.quantity)
      .field('price', product.price)
      .field('status', product.status)
      .attach('file', 'test/test-image.png')
      .expect(({ body }) => {
        expect(body.id).toBeDefined();
        productId = body.id;
        expect(body.title).toEqual(product.title);
        expect(body.description).toEqual(product.description);
        expect(body.image).toBeDefined();
        expect(body.quantity).toEqual(product.quantity);
        expect(body.price).toEqual(product.price);
        expect(body.status).toEqual(product.status);
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should read product', () => {
    return request(app)
      .get(`/product/${productId}`)
      .expect(({ body }) => {
        expect(body.title).toEqual(product.title);
        expect(body.description).toEqual(product.description);
        expect(body.image).toBeDefined();
        expect(body.quantity).toEqual(product.quantity);
        expect(body.price).toEqual(product.price);
        expect(body.status).toEqual(product.status);
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
      })
      .expect(HttpStatus.OK);
  });

  it('should update product', () => {
    const editedProduct = {
      title: 'Edited Product Title',
      description: 'Edited Product Description',
    };

    return request(app)
      .patch(`/product/${productId}`)
      .send(editedProduct)
      .expect(({ body }) => {
        expect(body.title).toEqual(editedProduct.title);
        expect(body.description).toEqual(editedProduct.description);
        expect(body.image).toBeDefined();
        expect(body.quantity).toEqual(product.quantity);
        expect(body.price).toEqual(product.price);
        expect(body.status).toEqual(product.status);
        expect(body.createdAt).toBeDefined();
        expect(body.updatedAt).toBeDefined();
      });
  });

  it('should delete product', async () => {
    await axios.delete(`${app}/product/${productId}`);

    return request(app)
      .get(`/product/${productId}`)
      .expect(HttpStatus.NOT_FOUND);
  });
});
