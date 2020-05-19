import { MessageItem, StarLevelNum } from "BulletNote/types";

function checkMessageShouldStandBy(starLevelNum: StarLevelNum | undefined) {
  const res = typeof starLevelNum === 'number' && starLevelNum < 0;
  return res;
}

export default checkMessageShouldStandBy;