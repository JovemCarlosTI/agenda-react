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
        overflowX: "hidden",
        padding: "8px 4px"
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
        margin: "4px 0",
        whiteSpace: "nowrap",
    },
    eventBackground: {
        display: "inline-block",
        color: "white",
        padding: "4px",
        borderRadius: "4px",
    }
  });