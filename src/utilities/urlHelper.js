export const getUrlString = (
  infoType,
  beer,
  url = `https://api.punkapi.com/v2/beers?page=2&per_page=1&`
) => {
  if (typeof infoType === "undefined" || typeof beer === "undefined") {
    return url;
  }
  const infoParam = infoType.split("_")[0];
  const query = url + infoType + `=` + Math.floor(beer[infoParam]);
  return query;
};

export const urls = (beer, params = ["abv_gt", "ibu_lt", "ebc_gt"]) => {
  let array = [];
  params.forEach(param => {
    if (typeof param !== "string") {
      console.warn("You have to pass string as url !");
      return "";
    }
    return array.push(getUrlString(param, beer));
  });
  return array;
};

export const Promises = urls => {
  return urls.map(url =>
    fetch(url).then(response => {
      return response.json().catch(err => {
        console.log(err);
      });
    })
  );
};

export const PromiseAll = (promises, callback) => {
  Promise.all(promises).then(callback);
};