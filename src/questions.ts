import { QuestionType } from "./types";

export const questions: QuestionType[] = [
  // {
  //   title: "Up-skilling requires time commitment",
  //   type: "info",
  //   name: "info",
  //   summary: `The GrowthX experience is designed by keeping in mind the working hours founders & full time operators typically work in.\n\nYou will spend\n- 6 hours/week for the first 5 weeks\n- 15 hours/week for the last 3 weeks`,
  //   action: {
  //     title: "I agree",
  //     icon: "none",
  //     next: true,
  //   },
  // },
  // {
  //   title: "What's your first name?",
  //   required: true,
  //   name: "firstName",
  //   type: "input",
  //   action: {
  //     title: "Ok",
  //     icon: "done",
  //   },
  // },
  // {
  //   title: "and your last name, {{firstName}}?",
  //   required: true,
  //   name: "lastName",
  //   type: "input",
  //   action: {
  //     title: "Ok",
  //     icon: "done",
  //   },
  // },
  // {
  //   title: "What industry is your company in?",
  //   required: true,
  //   summary: "We will personalize your learning experience accordingly",
  //   type: "dropdown",
  //   name: "industry",
  //   action: {
  //     title: "Ok",
  //     icon: "done",
  //   },
  //   options: [
  //     "Founder or CXO",
  //     "Product team",
  //     "Marketing team",
  //     "VC",
  //     "Other",
  //   ],
  // },
  // {
  //   title: "Your role in your company?",
  //   summary: "We want to understand how you spend your time right now.",
  //   required: true,
  //   type: "single",
  //   name: "role",
  //   action: {
  //     title: "Ok",
  //     icon: "done",
  //   },
  //   options: [
  //     "Founder or CXO",
  //     "Product team",
  //     "Marketing team",
  //     "VC",
  //     "Other",
  //   ],
  // },
  // {
  //   title:
  //     "{{firstName}}, what's your professional goal for the next 12 months?",
  //   required: true,
  //   type: "multi",
  //   name: "goal",
  //   action: {
  //     title: "Ok",
  //     icon: "done",
  //   },
  //   maxSelect: 2,
  //   options: [
  //     "Get hired",
  //     "Get promoted",
  //     "Connect with like-minded people",
  //     "Structured approach to growth",
  //     "Build a growth team",
  //   ],
  // },
  {
    type: "input",
    title: "Email you'd like to register with?",
    name: "email",
    validation: "email",
    required: true,
    summary:
      "We will keep all our communications with you through this email. Do check your spam inbox if you can't find our application received email.",
    action: {
      title: "Ok",
      icon: "done",
    },
  },
  {
    type: "input",
    name: "phone",
    // variant: "phone",
    title: "Your phone number",
    summary:
      "We won't call you unless it is absolutely required to process your application.",
    action: {
      title: "Submit",
      icon: "none",
      submit: true,
    },
  },
];
