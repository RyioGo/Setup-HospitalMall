class Storage {
  get len() {
    return sessionStorage.length;
  }

  /**
   * 获取数据
   * @param key
   */
  public get(key: string) {
    const data = sessionStorage.getItem(key);
    try {
      return data && JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  /**
   * 设置缓存
   * @param key
   * @param value
   */
  public set(key: string, value: any, override?: boolean) {
    if (override) {
      const setItemEvent: any = new Event("setItemEvent");
      setItemEvent.info = {
        key,
        value,
      };
      window.dispatchEvent(setItemEvent);
    }
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 删除缓存
   * @param key
   */
  public delete(key: string) {
    sessionStorage.removeItem(key);
  }
}

export default new Storage();
