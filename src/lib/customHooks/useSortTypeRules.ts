import { SortTypeRule, SortRule, SortType } from "BulletNote/types";
import { useState, useCallback } from "react";

const defaultSortTypeRule: SortTypeRule = {
  sortRule: 'asc',
  sortType: 'date',
};

const useSortTypeRules = (initSortTypeRuleOption=defaultSortTypeRule) => {
  const [sortTypeRule, setSortTypeRule] = useState(initSortTypeRuleOption);

  const handleSort = useCallback((sortType: SortType) => (sortRule: SortRule) => {
    return () => setSortTypeRule(s => ({
      sortType,
      sortRule
    }));
  }, []);

  const handleSortByStarNums = handleSort('star-num');
  const handleSortByDate = handleSort('date');
  const handleSortByDueDate = handleSort('due-date');

  return ({
    sortTypeRule, 
    setSortTypeRule,
    
    handleSortByStarNums,
    handleSortByDate,
    handleSortByDueDate,
  });
};

export default useSortTypeRules;