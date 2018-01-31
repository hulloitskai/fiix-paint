export default class DataConnector {
  static key = 'fiix-paint-saved-paintings';

  static saveDrawings(obj) {
    if (!DataConnector.localStorageAvailable()) return false;
    const storage = window.localStorage;

    const storedString = JSON.stringify(obj);
    storage.setItem(DataConnector.key, storedString);
    return true;
  }

  static loadDrawings() {
    if (!DataConnector.localStorageAvailable()) return null;
    const storage = window.localStorage;
    let storedString = storage.getItem(DataConnector.key);
    return JSON.parse(storedString);
  }


  static localStorageAvailable() {
    let storage = window.localStorage, testObject = '__storage_test__';
    try {
      storage.setItem(testObject, testObject);
      storage.removeItem(testObject);
      return true;
    } catch (e) {
      return e instanceof DOMException && (
          e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError'
          || (e.name === 'NS_ERROR_DOM_QUOTA_REACHED' && storage.length !== 0)
      );
    }
  }
};