const express = require('express');
const router = express.Router();
const swapiService = require('../service/swapiService');

router.get('/', (req, res, next) => {
  swapiService.getAllPeopleSwapiApi()
      .then(response => {
        res.send(response)
      })
      .catch(err => {
        next(err);
      });

});
router.get('/:id', (req, res, next) => {
  swapiService.getCharacterById(req.params.id)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        next(err);
      });
});


module.exports = router;
