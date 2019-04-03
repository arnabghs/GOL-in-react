const filterNeighbours = function(length, width, inputArray) {
  let initValue = 1;
  let totalArray = new Array(length * width).fill(0).map(x => initValue++);
  return inputArray.filter(x => totalArray.includes(x));
};

const getNeighboursFirstColumn = function(length, width, position) {
  let neighbours = new Array(0).concat(
    position + 1,
    position + length,
    position - length,
    position + length + 1,
    position - length + 1
  );
  return filterNeighbours(length, width, neighbours);
};

const getNeighboursLastColumn = function(length, width, position) {
  let neighbours = new Array(0).concat(
    position - 1,
    position + length,
    position - length,
    position + length - 1,
    position - length - 1
  );
  return filterNeighbours(length, width, neighbours);
};

const getNeighboursMiddleColumn = function(length, width, position) {
  let neighbours = new Array(0).concat(
    position + 1,
    position - 1,
    position + length,
    position - length,
    position + length + 1,
    position + length - 1,
    position - length + 1,
    position - length - 1
  );
  return filterNeighbours(length, width, neighbours);
};

const getAllNeighbours = function(length, width, position) {
  if ((position - 1) % length == 0)
    return getNeighboursFirstColumn(length, width, position);
  if (position % length == 0)
    return getNeighboursLastColumn(length, width, position);
  return getNeighboursMiddleColumn(length, width, position);
};

const getLiveNeighboursLength = function(aliveArray, length, width, position) {
  let allNeighbourArray = getAllNeighbours(length, width, position);
  return allNeighbourArray.filter(x => aliveArray.includes(x)).length;
};

const convertCoordinateToValue = function(inputArray, bounds) {
  let length = bounds.bottomRight[1] - bounds.topLeft[1] + 1;
  let width = bounds.bottomRight[0] - bounds.topLeft[0] + 1;
  inputArray = inputArray.map(x => x.filter(y => y < length));
  let inputArrayOfValue = inputArray.map(x => x[0] * length + x[1] + 1);
  return { length: length, width: width, alivePositions: inputArrayOfValue };
};

const convertValueToCoordinate = function(input, length) {
  return input.map(x => [Math.floor((x - 1) / length), (x - 1) % length]);
};

const produceNextGenAliveCells = function(length, width, aliveArray) {
  let initValue = 1;
  let deadCells = new Array(length * width)
    .fill(0)
    .map(x => initValue++)
    .filter(x => !aliveArray.includes(x));

  const aliveNeighbourLength = getLiveNeighboursLength.bind(
    null,
    aliveArray,
    length,
    width
  );

  let aliveCells = aliveArray.filter(
    x => aliveNeighbourLength(x) == 2 || aliveNeighbourLength(x) == 3
  );
  return aliveCells.concat(deadCells.filter(x => aliveNeighbourLength(x) == 3));
};

const deductUpperBounds = function(currGeneration, bounds) {
  return currGeneration.map(function(x) {
    x[0] = x[0] - bounds.topLeft[0];
    x[1] = x[1] - bounds.topLeft[1];
    return x;
  });
};

const addUpperBounds = function(currGeneration, bounds) {
  return currGeneration.map(function(x) {
    x[0] = x[0] + bounds.topLeft[0];
    x[1] = x[1] + bounds.topLeft[1];
    return x;
  });
};

module.exports = {
  convertCoordinateToValue,
  convertValueToCoordinate,
  produceNextGenAliveCells,
  deductUpperBounds,
  addUpperBounds,
  filterNeighbours,
  getNeighboursFirstColumn,
  getNeighboursMiddleColumn,
  getNeighboursLastColumn,
  getAllNeighbours,
  getLiveNeighboursLength
};