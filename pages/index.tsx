import Container from "@mui/material/Container";
import Link from "next/link";
import Button from "@mui/material/Button";
import { Toolbar, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{ textAlign: "center" }}>
      <Toolbar />
      <Typography variant="h4" color="textPrimary">
        Typieeforms
      </Typography>
      <Button
        variant="contained"
        color="primary"
        LinkComponent={Link}
        href="/forms/growthX"
      >
        Go to example form
      </Button>
    </Container>
  );
}
