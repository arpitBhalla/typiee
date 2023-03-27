import { Form } from "@/components/Form";
import { Loading } from "@/components/Loading";
import { If } from "@/components/ui/If";
import { useWait } from "@/hooks/useWait";
import { questions as defaultQuestions } from "@/data/questions";
import { QuestionType } from "@/types";
import { Toolbar } from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async ({}) => {
  // some server side fetching
  return {
    props: {
      questions: defaultQuestions,
    },
  };
};

interface FormIndex {
  questions: QuestionType[];
}

export default function Home({ questions }: FormIndex) {
  const { isLoading = false } = {} || useWait();
  return (
    <>
      <Loading isLoading={isLoading} />
      <If cond={!isLoading}>
        <Toolbar sx={{ position: "fixed" }} className="renderer-in">
          <Image src="/logo.png" width={100} height={24} alt="logo" />
        </Toolbar>
        <Form questions={questions} />
      </If>
    </>
  );
}
