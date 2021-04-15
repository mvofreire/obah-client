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
    remove: {
      background: "#3e3e3e",
      borderRadius: 50,
      width: 20,
      height: 20,
      display: "block",
      position: "absolute",
      top: "-5px",
      right: "-3px",
      color: "#ffffff",
      cursor: "pointer",
    },
    hiddenInput: {
      width: 0,
      height: 0,
      visibility: "hidden",
    },
  };
});
