const {
  convertCoordinateToValue,
  convertValueToCoordinate,
  produceNextGenAliveCells,
  deductUpperBounds,
  addUpperBounds
} = require("./lib.js");

const nextGeneration = function(currGeneration, bounds) {
  const currentGenCoordinates = deductUpperBounds(currGeneration, bounds);
  const currGenValues = convertCoordinateToValue(currentGenCoordinates, bounds);
  const { length, width, alivePositions } = currGenValues;

  const nextGenValues = produceNextGenAliveCells(length, width, alivePositions);
  let nextGenCoordinates = convertValueToCoordinate(nextGenValues, length);
  return addUpperBounds(nextGenCoordinates, bounds);
};

module.exports = { nextGeneration };