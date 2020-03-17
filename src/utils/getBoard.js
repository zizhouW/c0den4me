const boards = [{
  id: 1,
  keys: [
    ['red', null, 'blue', null, 'blue'],
    ['red', 'blue', 'red', 'blue', null],
    ['blue', 'blue', 'bomb', 'red', 'blue'],
    [null, 'red', 'blue', 'red', 'red'],
    [null, 'blue', null, 'red', null],
  ],
  first: 'blue',
}, {
  id: 2,
  keys: [
    ['red', 'blue', 'bomb', null, 'blue'],
    ['blue', 'blue', 'red', 'red', 'red'],
    [null, null, 'red', 'blue', null],
    ['red', 'blue', 'blue', null, 'red'],
    [null, 'red', 'blue', 'red', null],
  ],
  first: 'red',
}, {
  id: 3,
  keys: [
    ['blue', null, null, 'red', 'blue'],
    [null, 'red', 'red', null, 'blue'],
    ['blue', 'blue', 'red', null, 'bomb'],
    ['blue', 'red', null, 'blue', 'red'],
    ['red', null, 'blue', 'red', 'blue'],
  ],
  first: 'blue',
}, {
  id: 4,
  keys: [
    ['blue', 'red', 'blue', 'red', null],
    [null, 'blue', 'blue', 'red', 'red'],
    ['red', null, null, 'red', 'blue'],
    ['blue', 'blue', 'red', 'bomb', 'red'],
    [null, 'red', null, 'blue', null],
  ],
  first: 'red',
}, {
  id: 5,
  keys: [
    ['red', 'blue', null, 'blue', 'blue'],
    ['blue', null, null, 'red', 'red'],
    [null, 'red', 'blue', 'red', null],
    ['blue', 'red', 'blue', 'bomb', 'blue'],
    ['red', null, 'blue', null, 'red'],
  ],
  first: 'blue',
}, {
  id: 6,
  keys: [
    [null, 'red', 'blue', 'red', null],
    ['blue', 'blue', null, 'blue', 'blue'],
    ['red', 'bomb', 'red', null, null],
    [null, 'blue', 'red', 'red', 'blue'],
    ['red', 'red', null, 'blue', 'red'],
  ],
  first: 'red',
}, {
  id: 7,
  keys: [
    ['blue', 'red', 'blue', null, null],
    ['red', 'blue', 'red', 'blue', 'red'],
    ['blue', 'blue', null, 'red', 'blue'],
    ['blue', 'red', 'blue', null, 'red'],
    ['bomb', null, null, null, 'red'],
  ],
  first: 'blue',
}, {
  id: 8,
  keys: [
    ['red', 'red', 'red', null, 'blue'],
    [null, null, 'blue', null, 'red'],
    ['red', 'blue', 'red', 'blue', null],
    ['red', 'blue', 'bomb', 'blue', 'red'],
    ['blue', null, 'blue', null, 'red'],
  ],
  first: 'red',
}, {
  id: 9,
  keys: [
    ['blue', null, 'red', 'red', 'red'],
    [null, 'red', 'blue', 'bomb', 'blue'],
    [null, null, 'red', 'blue', 'blue'],
    ['blue', 'red', null, 'blue', 'blue'],
    [null, 'red', 'blue', 'red', 'red'],
  ],
  first: 'blue',
}, {
  id: 10,
  keys: [
    ['red', 'bomb', 'blue', 'red', 'blue'],
    [null, null, null, 'blue', 'blue'],
    ['red', null, 'red', 'red', null],
    ['blue', 'blue', 'red', null, 'red'],
    ['red', 'red', null, 'blue', 'blue'],
  ],
  first: 'red',
}, {
  id: 11,
  keys: [
    [null, 'blue', 'red', 'blue', 'blue'],
    ['blue', 'red', 'blue', null, null],
    ['bomb', 'red', 'blue', 'red', 'red'],
    ['red', null, 'red', 'blue', 'blue'],
    ['red', null, null, 'blue', null],
  ],
  first: 'blue',
}, {
  id: 12,
  keys: [
    ['red', 'blue', 'blue', 'red', 'blue'],
    [null, 'red', 'bomb', 'blue', 'red'],
    ['red', null, 'blue', 'red', 'red'],
    [null, null, null, 'red', 'blue'],
    ['blue', 'red', null, 'blue', null],
  ],
  first: 'red',
}];

const getBoard = () => {
  return boards[Math.floor(Math.random() * boards.length)];
};

const getBoardById = (id) => {
  return boards.find(b => b.id === id);
};

export { getBoard, getBoardById };
