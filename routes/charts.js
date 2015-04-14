var express = require('express'),
  router = express.Router(),
  model = require('../models/charts');

router.get('/', function(req, res, next) {
  var charts = [];

  model.getAll(function (charts) {
    res.render('index', {
      title: 'Flowcharts',
      charts: charts
    });
  });
});

router.get('/create', function(req, res, next) {
  res.render('create', {
    title: 'Create a flowchart'
  });
});

router.post('/create', function(req, res, next) {
  model.create(req, function (chart) {
    res.redirect('/charts/' + chart._id);
  });
});

router.get('/:id', function(req, res, next) {
  model.get(req, function (chart) {
    if (!chart) {
      return res.status(404).send('Sorry, we cannot find that!');
    }

    res.render('edit', {
      title: chart.name,
      chart: chart
    });
  });
});

router.post('/:id', function(req, res, next) {
  model.update(req, function (chart) {
    if (!chart) {
      return res.status(404).send('Sorry, we cannot find that!');
    }

    res.redirect('/charts/' + chart._id);
  });
});

module.exports = router;
