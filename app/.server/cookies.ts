import cookie, { CookieSerializeOptions } from "cookie";

const getCookiesString = (req: Request) => {
  const cookieHeader = req.headers.get("Cookie");
  return cookieHeader || "";
};

const getCookies = (req: Request) => {
  const cookieHeader = req.headers.get("Cookie");
  if (!cookieHeader) return {};
  return cookie.parse(cookieHeader);
};

const getCookie = (req: Request, name: string) => {
  const cookieHeader = req.headers.get("Cookie");
  if (!cookieHeader) return;
  const cookies = cookie.parse(cookieHeader);
  return cookies[name];
};

const setCookie = (
  resHeaders: Headers,
  name: string,
  value: string,
  options?: CookieSerializeOptions,
) => {
  resHeaders.set("Set-Cookie", cookie.serialize(name, value, options));
};

const deleteCookie = (
  resHeaders: Headers,
  name: string,
  options?: CookieSerializeOptions,
) => {
  resHeaders.set("Set-Cookie", cookie.serialize(name, "", options));
};

export const Cookies = {
  string: getCookiesString,
  getAll: getCookies,
  get: getCookie,
  set: setCookie,
  delete: deleteCookie,
};
