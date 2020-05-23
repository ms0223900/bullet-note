import { BulletNoteConfig } from "BulletNote/constants/context";

const configLSKey = 'bullet-note-config-LS';

class ConfigLocalStorageHandler {
  static setData(config: BulletNoteConfig) {
    const data = JSON.stringify(config);
    localStorage.setItem(configLSKey, data);
  }

  static getData(): Partial<BulletNoteConfig> {
    let data = {};
    const LSData = localStorage.getItem(configLSKey);

    if(LSData) {
      data = JSON.parse(LSData);
    }
    return data;
  }
}

export default ConfigLocalStorageHandler;