import { dueDateRegExp } from "./Handlers/DueDateHandler";

function divideTagStrList(tags: string[]) {
  let res = {
    normalTags: [] as string[],
    dueDateTags: [] as string[],
  };

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const isDueDataTag = tag.match(dueDateRegExp);

    if(isDueDataTag) {
      res.dueDateTags = [...res.dueDateTags, tag];
    }
    else {
      res.normalTags = [...res.normalTags, tag];
    }
  }

  return res;
}

export default divideTagStrList;