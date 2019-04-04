const assert = require("assert").deepEqual;

const {
  filterNeighbours,
  getNeighboursFirstColumn,
  getNeighboursMiddleColumn,
  getNeighboursLastColumn,
  getAllNeighbours,
  getLiveNeighboursLength,
} = require("../src/lib.js");

const contains = (list, element) =>
  list.some(e => e[0] === element[0] && e[1] === element[1]);
const isSame = (actualList, expectedList) =>
  actualList.every(contains.bind(null, expectedList));
const isSameArity = (actualList, expectedList) =>
  actualList.length == expectedList.length;

describe("test for lib", function() {
  describe("test for filterNeighbours", function() {
    it("for empty array should return empty array", function() {
      assert(filterNeighbours(2, 2, []), []);
    });
    it("for one or multielements array should return array of same or less length", function() {
      assert(filterNeighbours(3, 3, [2, -1, 5, 6, 0]), [2, 5, 6]);
    });
  });
  describe("test for getNeighboursFirstColumn", function() {
    it("for side 0 should return empty array", function() {
      assert(getNeighboursFirstColumn(0, 0, 1), []);
    });
    it("for different size an position array length will depend on the position", function() {
      isSame(getNeighboursFirstColumn(4, 4, 1), [2, 5, 6]);
      isSameArity(getNeighboursFirstColumn(4, 4, 1), [2, 5, 6]);

      isSame(getNeighboursFirstColumn(4, 4, 9), [5, 6, 10, 13, 14]);
      isSameArity(getNeighboursFirstColumn(4, 4, 9), [5, 6, 10, 13, 14]);
    });
  });
  describe("test for getNeighboursLastColumn", function() {
    it("for side 0 should return empty array", function() {
      assert(getNeighboursLastColumn(0, 0, 1), []);
    });
    it("for different size an position array length will depend on the position", function() {
      isSame(getNeighboursLastColumn(4, 4, 4), [3, 7, 8]);
      isSameArity(getNeighboursLastColumn(4, 4, 4), [3, 7, 8]);

      isSame(getNeighboursLastColumn(4, 4, 12), [7, 8, 11, 15, 16]);
      isSameArity(getNeighboursLastColumn(4, 4, 12), [7, 8, 11, 15, 16]);
    });
  });
  describe("test for getNeighboursMiddleColumn", function() {
    it("for side 0 should return empty array", function() {
      assert(getNeighboursMiddleColumn(0, 0, 1), []);
    });
    it("for different sizes array length will depend on the position", function() {
      isSame(getNeighboursMiddleColumn(4, 4, 6), [1, 2, 3, 5, 7, 9, 10, 11]);
      isSameArity(getNeighboursMiddleColumn(4, 4, 6), [
        1,
        2,
        3,
        5,
        7,
        9,
        10,
        11
      ]);

      isSame(getNeighboursMiddleColumn(4, 4, 11), [
        6,
        7,
        8,
        10,
        12,
        14,
        15,
        16
      ]);
      isSameArity(getNeighboursMiddleColumn(4, 4, 11), [
        6,
        7,
        8,
        10,
        12,
        14,
        15,
        16
      ]);
    });
  });
  describe("test for getAllNeighbours", function() {
    it("for side 0 should return empty array", function() {
      assert(getAllNeighbours(0, 0, 1), []);
    });
    it("for different sizes array length will depend on the position", function() {
      isSame(getAllNeighbours(4, 4, 6), [1, 2, 3, 5, 7, 9, 10, 11]);
      isSameArity(getAllNeighbours(4, 4, 6), [1, 2, 3, 5, 7, 9, 10, 11]);

      isSame(getAllNeighbours(4, 4, 11), [6, 7, 8, 10, 12, 14, 15, 16]);
      isSameArity(getAllNeighbours(4, 4, 11), [6, 7, 8, 10, 12, 14, 15, 16]);

      isSame(getAllNeighbours(3, 3, 3), [2, 5, 6]);
      isSameArity(getAllNeighbours(3, 3, 3), [2, 5, 6]);

      isSame(getAllNeighbours(3, 3, 4), [1, 2, 5, 7, 8]);
      isSameArity(getAllNeighbours(3, 3, 4), [1, 2, 5, 7, 8]);

      isSame(getAllNeighbours(3, 3, 5), [1, 2, 3, 4, 6, 7, 8, 9]);
      isSameArity(getAllNeighbours(3, 3, 5), [1, 2, 3, 4, 6, 7, 8, 9]);
    });
  });
  describe("test for getLiveNeighboursLength", function() {
    it("for empty alive array should return 0 length", function() {
      assert(getLiveNeighboursLength([], 3, 3, 1), 0);
    });
    it("for different sizes of alive array, length will be less or equal", function() {
      assert(getLiveNeighboursLength([1, 2, 3, 4], 3, 3, 1), 2);
      assert(getLiveNeighboursLength([1, 2, 3], 3, 3, 4), 2);
      assert(getLiveNeighboursLength([3, 4, 5, 6], 4, 4, 7), 3);
      assert(getLiveNeighboursLength([4, 8, 12], 4, 4, 16), 1);
    });
  });
});