const getQuery = (key: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(key);
};

export default getQuery;
