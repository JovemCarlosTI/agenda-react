import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    table: {
        borderTop: "1px solid rgb(224, 224, 224)",
        minHeight: "100%",
        tableLayout: "fixed",
      "& td ~ td, & th ~ th": {
        borderLeft: "1px solid rgb(224, 224, 224)"
      },
      "& td": {
        verticalAlign: "top",
        overflow: "hidden",
        padding: "8px 4px",
        height: "20%"
      }
    },
    dayOfMonth: {
        fontWeight: 500,
        marginBottom: "4px",
    },
    event: {
        display: "flex",
        alignItems: "center",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        whiteSpace: "nowrap",
        margin: "4px 0",
    },
    eventBackground: {
        display: "inline-block",
        color: "white",
        padding: "2px 4px",
        borderRadius: "4px",
    }
  });