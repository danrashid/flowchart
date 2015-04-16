var jade = require('jade'),
  path = require('path');

function getTemplate(element) {
  return path.join(__dirname, '../views/elements', element.type + '.jade');
}

function renderConnectors(elements) {
  var svg = '',
    types = [
      'horizontalLine',
      'horizontalNo',
      'horizontalYes',
      'verticalLine',
      'verticalNo',
      'verticalYes'
    ];

  elements.forEach(function (row, yOffset) {
    row.forEach(function (element, xOffset) {
      if (types.indexOf(element.type) > -1) {
        var template = getTemplate(element);

        svg += jade.renderFile(template, {
          x: xOffset * 400,
          y: yOffset * 300
        });
      }
    });
  });

  return svg;
}

function renderShapes(elements) {
  var svg = '',
    types = [
      'decision',
      'feedback',
      'process'
    ];

  elements.forEach(function (row, yOffset) {
    if (yOffset % 2 === 0) {
      row.forEach(function (element, xOffset) {
        if (types.indexOf(element.type) > -1) {
          var template = getTemplate(element);

          svg += jade.renderFile(template, {
            x: xOffset * 400,
            y: yOffset * 300,
            text: element.match.substr(1, element.match.length - 2)
          });
        }
      });
    }
  });

  return svg;
}

exports.render = function (elements) {
  return {
    connectors: renderConnectors(elements),
    shapes: renderShapes(elements)
  };
};
