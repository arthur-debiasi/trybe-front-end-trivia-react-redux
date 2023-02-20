// funções de requisição de api
const requestToken = async () => {
  const END_POINT = 'https://opentdb.com/api_token.php?command=request';
  return fetch(END_POINT).then((e) => e.json()).then((e) => e.token);
};

export default requestToken;
