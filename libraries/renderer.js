function renderConnectors(elements) {
  var svg = '';

  elements
    .filter(function (row, i) {
      return i % 2 === 1;
    })
    .forEach(function (row, yOffset) {
      row.forEach(function (element, xOffset) {

      });
    });

  return svg;
}

function renderShapes(elements) {
  var svg = '';

  return svg;
}

exports.render = function (elements) {
  var svg = '';

  svg += renderConnectors(elements);
  svg += renderShapes(elements);

  return svg;
};
