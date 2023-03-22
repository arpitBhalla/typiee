import Container from "@mui/material/Container";
// import KeyboardCommandKeyOutlinedIcon from "@mui/icons-material/KeyboardCommandKeyOutlined";
// import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { Form } from "../src/components/Form";
import { questions } from "../src/questions";

export default function Home() {
  return (
    <Container maxWidth="md">
      {/* {questions.map((question, index) => (
        <Section {...question} key={index} />
      ))} */}
      <Form questions={questions} />
    </Container>
  );
}
