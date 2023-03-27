import { Form } from "@/components/Form";
import { Loading } from "@/components/Loading";
import { If } from "@/components/ui/If";
import { useWait } from "@/hooks/useWait";
import { questions as defaultQuestions } from "@/data/questions";
import { QuestionType } from "@/types";
import { Toolbar } from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";

// export const getServerSideProps: GetServerSideProps = async ({}) => {
//   // some server side fetching
//   return {
//     props: {
//       questions: defaultQuestions,
//     },
//   };
// };

interface FormIndex {
  questions: QuestionType[];
}

export default function Home({ questions = defaultQuestions }: FormIndex) {
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

// import { Toolbar, Typography } from "@mui/material";
// import Button from "@mui/material/Button";
// import Container from "@mui/material/Container";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <Container sx={{ textAlign: "center" }}>
//       <Toolbar />
//       <Typography variant="h4" color="textPrimary">
//         Typieeforms
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         LinkComponent={Link}
//         href="/forms/growthX"
//       >
//         Go to example form
//       </Button>
//     </Container>
//   );
// }
