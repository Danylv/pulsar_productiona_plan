import * as React from "react";
import type { SpinnerProps } from "@fluentui/react-components";
import {
  makeStyles,
  shorthands,
  Spinner,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    "> div": { marginTop: "10%" },
  },

  // Inverted Spinners are meant as overlays (e.g., over an image or similar)
  // so give it a solid, dark background so it is visible in all themes.
});

export const DefaultSpinner = (props: Partial<SpinnerProps>) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Spinner {...props} />
    </div>
  );
};
