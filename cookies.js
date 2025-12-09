class CookieStorage {
  static store(key, value) {
    document.cookie = `${key}=${JSON.stringify(value)}; path=/`;
  }

  static get(key) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split('; ');
    const cookie = cookies.find((cookie) => cookie.startsWith(key + '='));

    if (!cookie) {
      return null;
    }

    const value = cookie.split('=')[1];
    return JSON.parse(value);
  }

  static delete(key) {
    document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
}
