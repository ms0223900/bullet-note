import React from 'react';
import { Link, Box, makeStyles } from '@material-ui/core';

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
    >
      {content}
    </Link>
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

  static renderParsedContent(content: string) {
    const parsedContent = this.parseContent(content);
    return parsedContent.map((c, i) => {
      switch (c.type) {
      case 'url':
        return (
          <ParsedLink 
            index={i}
            content={c.content}
          />
        );
      default:
        return (
          <Box component={'span'} key={i}>{c.content}</Box>
        );
      }
    });
  }
}

export default MessageContentHandler;