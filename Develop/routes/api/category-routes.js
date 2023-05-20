const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',  (req, res) => {
  // find all categories
  // be sure to include its associated Products
try {
  const catergoryData =  Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(Category);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id',  (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catergoryData =  Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!catergoryData) {
      res.status(404).json({ message: 'No catergory found with that id!'});
      return;
    }
    res.status(200).json(catergoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/',  (req, res) => {
  // create a new category
try {
const locationData =  Category.create({
  product_id: req.body.product_id, 
});
res.status(200).json(locationData);
} catch (err) {
  res.status(400).json(err);
}
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id',  (req, res) => {
  // delete a category by its `id` value
try {
  const catergoryData =  Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!catergoryData) {
    res.status(404).json({ message: 'No category found with that id' });
    return;
  }
  res.status(200).json(catergoryData);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
