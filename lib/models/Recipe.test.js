const mongoose = require('mongoose');
const Recipe = require('./Recipe');

describe('Recipe model', () => {
  it('has a required name', () => {
    const recipe = new Recipe();
    const { errors } = recipe.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('ingredient amount is a positive value', () => {
    const recipe = new Recipe({
      ingredients: [{ amount: -3 }]
    });
    console.log(recipe.ingredients[0].amount);
    const { errors } = recipe.ingredients[0].validateSync();
    expect(errors.amount.message).toEqual('Path `amount` (-3) is less than minimum allowed value (0).');
  });

  it('has a name and directions field', () => {
    const recipe = new Recipe({
      name: 'Cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
      ingredients: [{ name: 'flour', amount: 2, unit: 'cup' }]
    });

    expect(recipe.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Cookies',
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ],
      ingredients: [{ _id: expect.any(mongoose.Types.ObjectId), name: 'flour', amount: 2, unit: 'cup' }]
    });
  });
});
