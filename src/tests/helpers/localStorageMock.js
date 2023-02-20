
const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

const ranking = [
  {
    name: 'Carlos Marcos',
    gravatarEmail: 'carlosmarcos@email.com',
    score: 210,
  },
  {
    name: 'Adão Ferreira',
    gravatarEmail: 'adaoferreira@email.com',
    score: 210,
  },
];
const RankingMock = JSON.stringify(ranking);

const tokenMock = '2658a406073b55577a8642246c9cc192007c9bb4b78eef82817138197d8bca04';
export default localStorageMock;
export { RankingMock, tokenMock };
