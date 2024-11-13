const isJson = (text: string): boolean => {
  try {
    JSON.parse(text);
  } catch (_e) {
    return false;
  }
  return true;
};

const isXml = (text: string): boolean => {
  const parser = new DOMParser();
  try {
    parser.parseFromString(text, 'text/xml');
  } catch (_e) {
    return false;
  }
  return true;
};

const isBase64Image = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str;
  } catch (_e) {
    return false;
  }
};

const prettifyJson = (json: string): string => {
  try {
    const obj = JSON.parse(json);
    return JSON.stringify(obj, null, 2);
  } catch (_e) {
    return json;
  }
};

export { isBase64Image, isJson, isXml, prettifyJson };
