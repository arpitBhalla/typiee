import { Form } from "@/components/Form";
import { questions } from "@/questions";

export default function Home() {
  return <Form questions={questions} />;
}
