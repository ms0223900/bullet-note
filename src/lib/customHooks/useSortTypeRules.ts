import { SortTypeRule, SortRule } from "BulletNote/types";
import { useState, useCallback } from "react";

const defaultSortTypeRule: SortTypeRule = {
  sortRule: 'asc',
  sortType: 'default',
};

const useSortTypeRules = (initSortTypeRuleOption=defaultSortTypeRule) => {
  const [sortTypeRule, setSortTypeRule] = useState(initSortTypeRuleOption);

  const handleSortByStarNums = useCallback((sortRule: SortRule) => {
    return () => setSortTypeRule(s => ({
      sortType: 'star-num',
      sortRule
    }));
  }, []);

  return ({
    sortTypeRule, 
    setSortTypeRule,
    handleSortByStarNums,
  });
};

export default useSortTypeRules;