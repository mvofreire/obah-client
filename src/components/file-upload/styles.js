import { makeStyles } from "@material-ui/styles";

export default makeStyles(({ colors, font }) => {
  return {
    root: {
      background: colors.light,
      width: "100%",
      minHeight: 100,
      padding: 5,
      textAlign: "center",
    },
    hiddenInput: {
      width: 0,
      height: 0,
      visibility: "hidden",
    },
  };
});
