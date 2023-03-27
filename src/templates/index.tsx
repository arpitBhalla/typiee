import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";
import React from "react";

export function Email({ responses }: { responses: [string, string][] }) {
  return (
    <Html>
      <Container
        style={{
          padding: 16,
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <Heading as="h2">We got your response</Heading>

        <Section
          style={{
            border: "1px solid #c2c2c2",
            borderRadius: 6,
            padding: "12px 16px",
          }}
        >
          {responses.map(([question, answer], index) =>
            answer ? (
              <Section key={index}>
                <Text style={{ fontWeight: "bold" }}>
                  {camelToCap(question)}
                </Text>
                <Text>{answer}</Text>
              </Section>
            ) : null
          )}
        </Section>
        <Section style={{ textAlign: "center", padding: 12 }}>
          <Button
            pX={20}
            pY={12}
            href="https://typiee.vercel.app"
            style={{ background: "#000", color: "#fff" }}
          >
            Create your own form
          </Button>
        </Section>
      </Container>
    </Html>
  );
}

export default Email;

const camelToCap = (str: string) => {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
