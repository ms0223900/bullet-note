const highLightClassName = 'search-high-light';

class TextHighLightHandler {
  static makeRegExp() {

  }
  static makeSingleHighlightEl(highLightContent: string) {
    const res = `<span class=${highLightClassName}>${highLightContent}</span>`;
    return res;
  }

  static replaceSingleText() {

  }

  static getHighlightContent(matchRegExp: RegExp | string) {
    return (originContent: string) => {
      const res = originContent.replace(
        matchRegExp, TextHighLightHandler.makeSingleHighlightEl
      );
      return res;
    };
  }
}

export default TextHighLightHandler;