const csrfFetch = async (url, options = {}) => {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    if (!(options.body instanceof FormData)) {
      options.headers["Content-Type"] =
        options.headers["Content-Type"] || "application/json";
    }
    options.headers["X-CSRF-Token"] = sessionStorage.getItem("X-CSRF-Token");
  }

  const res = await fetch(url, options).catch((err) => {
    throw err;
  });

  if (res.status >= 400) throw res;

  return res;
};

export default csrfFetch;
