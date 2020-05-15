import { makeStyles } from "@material-ui/core";

const useTagStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    fontSize: '1rem',
    // backgroundColor: theme.palette.primary.light,
    // color: '#222',
    color: theme.palette.primary.dark,
    borderRadius: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    '&:hover': {
      opacity: 0.7
      // color: theme.palette.primary.main,
    }
  }
}));

export default useTagStyles;