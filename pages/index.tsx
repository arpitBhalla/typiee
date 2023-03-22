import Container from "@mui/material/Container";
// import KeyboardCommandKeyOutlinedIcon from "@mui/icons-material/KeyboardCommandKeyOutlined";
// import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { questions } from "../src/questions";
import { Section } from "../src/components/Section";

export default function Home() {
  return (
    <Container maxWidth="md">
      {questions.map((question, index) => (
        <Section {...question} key={index} />
      ))}
    </Container>
  );
}
