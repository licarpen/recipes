require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Recipe = require('../lib/models/Recipe');

describe('recipe routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a recipe', () => {
    return request(app)
      .post('/api/v1/recipes')
      .send({
        name: 'cookies',
        directions: [
          'preheat oven to 375',
          'mix ingredients',
          'put dough on cookie sheet',
          'bake for 10 minutes'
        ],
        ingredients: [{ name: 'flour', amount: 2, unit: 'cup' }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{ _id: expect.any(String), name: 'flour', amount: 2, unit: 'cup' }],
          __v: 0
        });
      });
  });

  it('gets all recipes', async() => {
    const recipes = await Recipe.create([
      { name: 'cookies', directions: [], ingredients: [] },
      { name: 'cake', directions: [], ingredients: [] },
      { name: 'pie', directions: [], ingredients: [] }
    ]);

    return request(app)
      .get('/api/v1/recipes')
      .then(res => {
        recipes.forEach(recipe => {
          expect(res.body).toContainEqual({
            _id: recipe._id.toString(),
            name: recipe.name
          });
        });
      });
  });

  it('gets a recipe by id', async() => {
    const recipe = await Recipe.create(
      { name: 'cookies', directions: ['preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'], ingredients: [{ name: 'flour', amount: 2, unit: 'cup' }] },
    );

    return request(app)
      .get(`/api/v1/recipes/${recipe._id}`)
      .then(res => {
        expect(res.body).toEqual({
          name: 'cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{ _id: expect.any(String), name: 'flour', amount: 2, unit: 'cup' }],
          _id: recipe._id.toString(),
          __v: 0
        });
      });
  });

  it('updates a recipe by id', async() => {
    const recipe = await Recipe.create({
      name: 'cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
      ingredients: [{ name: 'flour', amount: 2, unit: 'cup' }]
    });

    return request(app)
      .patch(`/api/v1/recipes/${recipe._id}`)
      .send({ name: 'good cookies' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'good cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{ _id: expect.any(String), name: 'flour', amount: 2, unit: 'cup' }],
          __v: 0
        });
      });
  });

  it('deletes a recipe by id', async() => {
    const recipe = await Recipe.create(
      { name: 'cookies', directions: ['preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'], ingredients: [{ name: 'flour', amount: 2, unit: 'cup' }] }
    );

    return request(app)
      .delete(`/api/v1/recipes/${recipe._id}`)
      .then(res => {
        expect(res.body).toEqual({
          name: 'cookies',
          directions: [
            'preheat oven to 375',
            'mix ingredients',
            'put dough on cookie sheet',
            'bake for 10 minutes'
          ],
          ingredients: [{ _id: expect.any(String), name: 'flour', amount: 2, unit: 'cup' }],
          _id: recipe._id.toString(),
          __v: 0
        });
      });
  });
});
