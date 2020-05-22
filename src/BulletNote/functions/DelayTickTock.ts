import { Callback } from "common-types";

export interface DelayTickTockOptions {
  timeoutTime?: number
  callback?: Callback
  clearCallback?: Callback
}

class DelayTickTock {
  static defaultTimeoutTime = 10

  timeoutTime: number
  timeout: NodeJS.Timeout | undefined = undefined
  callback: DelayTickTockOptions['callback']
  clearCallback: DelayTickTockOptions['clearCallback']

  constructor(options: DelayTickTockOptions) {
    this.timeoutTime = options.timeoutTime || DelayTickTock.defaultTimeoutTime;
    this.callback = options.callback;
    this.clearCallback = options.clearCallback;
  }

  private setDelayCallback() {
    if(!this.timeout) {
      this.timeout = setTimeout(() => {
        this.callback && this.callback();
      }, this.timeoutTime);
    }
  }

  clearTimeoutNow(clearCallback?: Callback) {
    if(clearCallback)
      this.clearCallback = clearCallback;
    if(this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
      this.clearCallback && this.clearCallback();
    }
  }

  delayCallback(callback?: Callback, clearCallback?: Callback) {
    if(callback)
      this.callback = callback;
    if(clearCallback)
      this.clearCallback = clearCallback;
    this.clearTimeoutNow();
    this.setDelayCallback();
  }
}

export default DelayTickTock;