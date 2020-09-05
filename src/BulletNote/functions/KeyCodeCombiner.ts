import { Callback } from "common-types";

type SingleKeyCode = number | string // support e.key

export interface KeyCodeCombinerInit {
  keyCodes: SingleKeyCode[][]
  callback?: Callback
}

class KeyCodeCombiner {
  protected keyCodes: SingleKeyCode[][]
  private keyCodesNow: SingleKeyCode[][]
  private callback: Callback | undefined

  constructor(init: KeyCodeCombinerInit) {
    this.keyCodesNow = init.keyCodes.map(k => []);
    this.keyCodes = init.keyCodes;
  }

  private stringifyArr(arr: any[]) {
    const res = arr.sort().join();
    return res;
  }

  private compareKeyCodesNowFulFilled(): boolean {
    let res = false;
    let index = 0;

    while (index < this.keyCodes.length) {
      const checkRes = 
        this.stringifyArr(this.keyCodes[index]) === 
        this.stringifyArr(this.keyCodesNow[index]);
      if(checkRes) {
        res = true;
        break;
      }
      index += 1;
    }

    return res;
  }

  private setKeyCode(index: number, keyCode: SingleKeyCode) {
    const isNotInKeyCodes = !this.keyCodes[index].includes(keyCode);
    if(isNotInKeyCodes) {
      return;
    }

    const isInKeycodesNow = this.keyCodesNow[index].includes(keyCode);
    if(!isInKeycodesNow) {
      this.keyCodesNow[index] = [
        ...this.keyCodesNow[index],
        keyCode,
      ];
    }
  }

  private resetKeyCodes() {
    this.keyCodesNow = this.keyCodes.map(() => []);
  }

  removeKeyCode(keyCode: SingleKeyCode) {
    const index = this.keyCodesNow.findIndex(k => k.includes(keyCode));
    if(index !== -1) {
      const res = this.keyCodesNow[index].filter(k => k !== keyCode);
      this.keyCodesNow[index] = res;
    }
  }

  triggerCallbackByKeyCode(keyCode: number | string, callback?: Callback) {
    console.log(keyCode);
    if(callback) {
      this.callback = callback;
    }
    for (let i = 0; i < this.keyCodes.length; i++) {
      this.setKeyCode(i, keyCode);
    }
    
    const isFulfilled = this.compareKeyCodesNowFulFilled();
    if(isFulfilled) {
      this.callback && this.callback();
      this.resetKeyCodes();
    }
  }
}

export default KeyCodeCombiner;