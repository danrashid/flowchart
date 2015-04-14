var express = require('express'),
  router = express.Router();

router.get('/', function(req, res, next) {
  var charts = [];

  res.render('index', {
    title: 'Flowcharts',
    charts: charts
  });
});

router.get('/create', function(req, res, next) {
  res.render('create', {
    title: 'Create a flowchart'
  });
});

module.exports = router;
