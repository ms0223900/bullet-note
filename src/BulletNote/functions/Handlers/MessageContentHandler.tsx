import React from 'react';
import { Link, Box, makeStyles } from '@material-ui/core';
import { BulletNoteConfig } from 'BulletNote/constants/context';
import TextHighLightHandler from './TextHighLightHandler';
import SearchMatchHandler from './SearchMatchHandler';

const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

type MessageContentType = 'url' | 'normal'

interface FormattedContent {
  type: MessageContentType
  content: string
}

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  link: {
    color: theme.palette.primary.dark,
  }
}));

export const ParsedLink = ({
  index,
  content
}: {
  index: number
  content: string
}) => {
  const classes = useStyles();
  return (
    <Link 
      key={index} 
      className={classes.link}
      href={content} 
      target={'_blank'}
      dangerouslySetInnerHTML={{
        __html: content
      }}
    />
  );
};

class MessageContentHandler {
  static parseContent(content: string): FormattedContent[] {
    let res: FormattedContent[] = [];
    let textNow = content;

    const matchRes = content.match(urlRegExp);

    if(matchRes) {
      for (let i = 0; i < matchRes.length; i++) {
        const matchedStr = matchRes[i];
        const matchedStrLength = matchedStr.length;
        const matchedFirstIndex = textNow.indexOf(matchedStr);

        const matchedNormalStr = textNow.slice(0, matchedFirstIndex);
        res = [
          ...res,
          {
            type: 'normal',
            content: matchedNormalStr,
          }
        ];

        textNow = textNow.slice(matchedFirstIndex);
        const content = matchedStr;
        res = [
          ...res,
          {
            type: 'url',
            content,
          }
        ];
        textNow = textNow.slice(matchedStrLength);
      }
    }
    //us remain texts?
    if(textNow) {
      res = [
        ...res,
        {
          type: 'normal',
          content: textNow,
        }
      ];
    }

    return res;
  }

  static renderParsedContent(content: string, options?: {
    searchText?: BulletNoteConfig['searchingText']
  }) {
    const parsedContent = this.parseContent(content);
    const hightLightRegExp = options?.searchText ? new SearchMatchHandler({
      text: '',
      searchText: '',
    }).makeSearchTextRegExp({
      searchText: String(options.searchText),
      searchMode: 'ch-blurry',
      matchCase: false,
    }) : '';

    const res = parsedContent.map((c, i) => {
      const handledContent = options?.searchText ?
        TextHighLightHandler.getHighlightContent(hightLightRegExp)(c.content) : c.content;

      switch (c.type) {
        case 'url':
          return (
            <ParsedLink 
              index={i}
              content={handledContent}
            />
          );
        default:
          return (
            <Box 
              key={i}
              component={'span'} 
              dangerouslySetInnerHTML={{
                __html: handledContent,
              }} 
            />
          );
      }
    });

    return res;
  }
}

export default MessageContentHandler;