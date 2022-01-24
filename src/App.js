import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

import "./App.css";
import React, { useEffect } from "react";
import StickyFooter from "./components/Footer";
const theme = createTheme({
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
    },
  },
});
function App() {
  const [paragraphCount, setParagraphCount] = React.useState(1);
  const [paragraph, setParagraph] = React.useState([]);
  const [p, setP] = React.useState(1);

  useEffect(() => {
    var url = `https://hipsum.co/api/?type=hipster-centric&paras=${paragraphCount}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setParagraph(data);
      });
  }, [paragraphCount]);

  function handleChange(e) {
    setParagraphCount(e);
  }

  const paragraphs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "4rem",
            minHeight: "100vh",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Dummy Text Generator
          </Typography>

          <FormControl
            fullWidth
            sx={{
              marginBottom: "1rem",
            }}
          >
            <InputLabel id="select-label">Paragraph Count</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={p}
              label="Paragraph Count"
              onChange={(e) => setP(e.target.value)}
            >
              {paragraphs.map((para) => (
                <MenuItem key={para} value={para}>
                  {para}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack alignItems="center" direction="row" gap={4}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginBottom: "1rem",
              }}
              onClick={() => {
                handleChange(p);
              }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                marginBottom: "1rem",
              }}
              onClick={() => {
                const copy = paragraph.splice(" ").join("\n");
                navigator.clipboard
                  .writeText(copy)
                  .then(() => {
                    alert("successfully copied");
                  })
                  .catch(() => {
                    alert("something went wrong");
                  });
              }}
            >
              Copy
            </Button>
          </Stack>
          {paragraph.map((para) => (
            <Typography
              variant="body1"
              gutterBottom
              paragraph
              key={para.substring(0, 5)}
            >
              {para}
            </Typography>
          ))}
          {/* footer */}
        </Container>
        <StickyFooter />
      </ThemeProvider>
    </div>
  );
}

export default App;
