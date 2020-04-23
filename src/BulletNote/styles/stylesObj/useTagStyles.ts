import { makeStyles } from "@material-ui/core";

const useTagStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.spacing(0.5),
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    '&:hover': {
      opacity: 0.8,
    }
  }
}));

export default useTagStyles;