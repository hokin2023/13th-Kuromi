const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async  (req, res) => {
  // find all categories
  // be sure to include its associated Products
try {
  const catergoryData =  await Category.findAll({
    attributes: ['id', 'category_name'],
    include: [{ model: Product, 
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }],
  });
  res.status(200).json(catergoryData);
} catch (err) {
  res.status(500).json(err);
}
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catergoryData =  await Category.findByPk(req.params.id, {
      
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

// router.post('/', (req, res) => {
//   // create a new category
//   Category.create({
//       category_name: req.body.category_name
//   })
//       .then(dbCategoryData => res.json(dbCategoryData))
//       .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//       });
// });

router.post('/', async (req, res) => {
  // create a new category
try {
const locationData = await Category.create({
  category_name: req.body.category_name,
});
res.status(200).json(locationData);
} catch (err) {
  res.status(400).json(err);
}
});

// router.put('/:id', (req, res) => {
//   // update a category by its `id` value
//  try {
//   const updateCat = Category.updapte(req.body, {
//     where: {
//       id: req.params.id
//     }
//   })
//   res.status(200).json(updateCat);
//  } catch (err) {
//   res.status(400).json(err);
// }
  

// });
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
      where: {
          id: req.params.id
      }
  })
      .then(dbCategoryData => {
          if (!dbCategoryData[0]) {
              res.status(404).json({ message: 'No Category found with this id' });
              return;
          }
          res.json(dbCategoryData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
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
