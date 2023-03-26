import { Backdrop, Container, LinearProgress } from "@mui/material";
import Image from "next/image";

export function Loading({ isLoading }: { isLoading: boolean }) {
  return (
    <Backdrop
      open={isLoading}
      sx={{
        backgroundColor: "#000",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container sx={{ textAlign: "center", maxWidth: "14em" }}>
        <Image src="/logo.png" width={100} height={24} alt="logo" />
        <LinearProgress
          color="inherit"
          sx={{
            marginTop: 2,
            borderRadius: 2,
            ".MuiLinearProgress-bar2Indeterminate": {
              display: "none",
            },
          }}
        />
      </Container>
    </Backdrop>
  );
}
