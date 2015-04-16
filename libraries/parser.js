function removeChars(line, end) {
  return new Array(end + 1).join(' ') + line.slice(end);
}

function getType(match, i) {
  switch (match[0]) {
    case '[':
      return 'process';
    case '<':
      return 'decision';
    case '/':
      return 'feedback';
    case '|':
      return 'verticalLine';
    case '-':
      return 'horizontalLine';
    case 'y':
      return (i % 2 === 1) ? 'verticalYes' : 'horizontalYes';
    case 'n':
      return (i % 2 === 1) ? 'verticalNo' : 'horizontalNo';
  }
}

function getElements(markup) {
  var regex = /(\[[^\]]+])|(<[^>]+>)|(\/[^\/]+\/)|[|\-yn]/,
    elements = [];

  markup.split('\n').forEach(function (line, i) {
    var start,
      match,
      end;

    elements[i] = [];
    start = line.search(regex);

    while (start > -1) {
      match = line.match(regex)[0];
      end = start + match.length;

      elements[i].push({
        start: start,
        match: match,
        end: end,
        type: getType(match, i)
      });

      line = removeChars(line, end);
      start = line.search(regex);
    }
  });

  return elements;
}

function positionConnectors(elements) {
  elements.forEach(function (row, i) {
    if (i % 2 === 1) {
      var connectors = [];

      row.forEach(function (connector) {
        var connectorIndex;

        elements[i - 1].some(function (shape, shapeIndex) {
          if (shape.start <= connector.start && shape.end >= connector.end) {
            connectorIndex = shapeIndex;
            return true;
          }

          return false;
        });

        connectors[connectorIndex] = connector;
      });

      elements[i] = connectors;
    }
  });
}

exports.parse = function (markup) {
  var elements = getElements(markup);

  positionConnectors(elements);
  return elements;
};
