const splitZhEnRegExp = /[\u4E00-\u9FFF]|(\w+)/g;


export type SearchMode = 'strict' | 'blurry' | 'ch-blurry'
export type SearchMatchCase = boolean

export interface SearchMatchHandlerOptions {
  text: string
  searchText: string
  searchMatchCase?: SearchMatchCase
  searchMode?: SearchMode
}

class SearchMatchHandler {
  text: string
  searchText: string
  searchRes: any[]
  allMatched: boolean
  searchMode: SearchMode
  searchMatchCase: SearchMatchCase

  // static defaultSearchMode: SearchMode = 'strict'
  // static defaultSearchMode: SearchMode = 'blurry'
  static defaultSearchMode: SearchMode = 'ch-blurry'

  constructor(options: SearchMatchHandlerOptions) {
    this.text = options.text;
    this.searchText = options.searchText;
    this.searchRes = [];
    this.searchMode = options.searchMode || SearchMatchHandler.defaultSearchMode;
    this.searchMatchCase = false;
    this.allMatched = false;
    this.makeMatchedSearchRes();
  }

  handleDivideSearchText(searchText: string, searchMode: SearchMode) {
    let divided: string[] = [];

    switch (searchMode) {
      case 'blurry': 
        divided = searchText.split('');
        break;
      case 'ch-blurry': {
        const chMatchedRes = searchText.matchAll(splitZhEnRegExp);
        for (const matchRes of chMatchedRes) {
          divided = [
            ...divided,
            matchRes[0],
          ];
        } 
        break;
      }
      default:
        divided = [searchText];
        break;
    }
    divided = [...new Set(divided)];
    return divided;  
  }

  getSearchTextRegExp(searchText: string, matchCase: boolean) {
    const flag = matchCase ? 'g' : 'gi';
    const res = new RegExp(searchText, flag);
    return res;
  }

  makeSearchTextRegExp(options: {
    searchText: string
    searchMode: SearchMode
    matchCase: boolean
  }) {
    const dividedSearchText = this.handleDivideSearchText(options.searchText, options.searchMode);
    const joinedSearchText = dividedSearchText.join('|');
    const res = this.getSearchTextRegExp(joinedSearchText, options.matchCase);
    return res;
  }
  
  matchSingleSearchText({
    text, singleSearchText, matchCase
  }: {
    text: string, singleSearchText: string, matchCase: boolean
  }) {
    let res: RegExpMatchArray[] = [];
    const regExp = this.getSearchTextRegExp(singleSearchText, matchCase);
    const matchedAll = text.matchAll(regExp);
    
    for (const singleMatched of matchedAll) {
      res = [
        ...res,
        singleMatched,
      ];
    }
    return res;
  }

  checkDividedSearchTextIsMatched(regMatchArr: RegExpMatchArray[]) {
    if(regMatchArr.length === 0) {
      return false;
    }
    return true;
  }
  checkAreAllMatched(regMatchedResArr: boolean[]) {
    const res = !regMatchedResArr.includes(false);
    return res;
  }

  private makeMatchedSearchRes() {
    let res: RegExpMatchArray[] = [];
    let allMatchedResArr: boolean[] = [];

    const dividedSearchText = this.handleDivideSearchText(this.searchText, this.searchMode);

    dividedSearchText.forEach(s => {
      const singleDividedMatchedRes = this.matchSingleSearchText({
        text: this.text,
        singleSearchText: s,
        matchCase: this.searchMatchCase,
      });
      const checkIsMatched = this.checkDividedSearchTextIsMatched(singleDividedMatchedRes);

      allMatchedResArr = [
        ...allMatchedResArr,
        checkIsMatched,
      ];
      res = [
        ...res,
        ...singleDividedMatchedRes,
      ];
    });
    
    this.allMatched = this.checkAreAllMatched(allMatchedResArr);
    this.searchRes = res;
    return this.searchRes;
  }

  getSearchRes() {
    return this.searchRes;
  }
  getSearchAllMatched() {
    return this.allMatched;
  }
}

export default SearchMatchHandler;