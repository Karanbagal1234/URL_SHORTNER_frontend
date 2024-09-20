export const isValidURL = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-zA-Z0-9\\-\\.]+)\\.)+[a-zA-Z]{2,})" + // domain name
        "(\\:\\d+)?(\\/[-a-zA-Z0-9%_@\\.~+])*" + // port and path
        "(\\?[;&a-zA-Z0-9%_@\\.~+=-]*)?" + // query string
        "(#[a-zA-Z0-9_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  };