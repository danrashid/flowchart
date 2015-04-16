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
          x: Math.floor(xOffset / 2) * 300,
          y: Math.floor(yOffset / 2) * 200
        });
      }
    });
  });

  return svg;
}

function wrap(text) {
  var lines = [],
    spacePosition;

  while (text.length > 20) {
    spacePosition = text.substr(0, 20).lastIndexOf(' ');
    lines.push(text.substring(0, spacePosition));
    text = text.substring(spacePosition + 1);
  }

  lines.push(text);

  return lines;
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
          var template = getTemplate(element),
            text = element.match.substr(1, element.match.length - 2);

          svg += jade.renderFile(template, {
            x: (xOffset / 2) * 300,
            y: (yOffset / 2) * 200,
            text: wrap(text)
          });
        }
      });
    }
  });

  return svg;
}

exports.render = function (elements) {
  var rowLengths = elements.map(function (row) { return row.length; }),
    maxRowLength = Math.max.apply(null, rowLengths);

  return {
    connectors: renderConnectors(elements),
    shapes: renderShapes(elements),
    width: Math.ceil(maxRowLength / 2) * 300,
    height: Math.ceil(elements.length / 2) * 200
  };
};
