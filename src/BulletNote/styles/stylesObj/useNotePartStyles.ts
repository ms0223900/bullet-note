import { makeStyles } from "@material-ui/core";
import { navHeight } from "BulletNote/components/CommonComponents/NavBar";

const useNotePartStyles = makeStyles(theme => ({
  root: {
    maxHeight: `calc(100vh - 80px - ${navHeight}px - ${36}px)`,
    overflow: 'auto',
  }
}));

export default useNotePartStyles;