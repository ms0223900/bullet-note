import HandleParseMessage from './handleParseMessage';

class FastInputHandler {
  static getValueWithoutTags(inputStr: string) {
    const res = inputStr
      .replace(HandleParseMessage.tagReg, '')
      .trim();
    return res;
  }

  static getInputStrMatchedTags(inputStr: string) {
    const tags = inputStr.match(HandleParseMessage.tagReg);
    if(!tags) {
      return [];
    }
    return tags;
  }

  static findTagsByMatchedTag(tags: string[], matchedTag: string) {
    const foundTag = tags.find(tag => {
      return tag.includes(matchedTag);
    });
    const res = foundTag ? foundTag : matchedTag;

    return res;
  }

  static joinTags(tags: string[]) {
    let res = '';

    if(tags.length > 0) {
      res = ' ' + tags.join(' ');
    }
    
    return res;
  }

  static handleFastInput(inputStr: string) {
    return (tags: string[]) => {
      let res = inputStr;

      const matchedTag = this.getInputStrMatchedTags(inputStr);
      const matchedTagsInTags = matchedTag.map(tag => this.findTagsByMatchedTag(tags, tag));

      const valueWithoutTags = this.getValueWithoutTags(inputStr);
      const joinedTags = this.joinTags(matchedTagsInTags);
      
      res = valueWithoutTags + joinedTags;

      return res;
    };
  }
}

export default FastInputHandler;