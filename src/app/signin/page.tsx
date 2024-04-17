"use client";

import {
  FormEvent,
  FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as Form from "@radix-ui/react-form";
import {
  Button,
  Card,
  Container,
  Flex,
  Separator,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useSignIn, useUser } from "@/stores/authQuery";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: user, isLoading } = useUser();
  const signIn = useSignIn();

  useEffect(() => {
    if (user !== null && !isLoading) {
      redirect("/");
    }
  }, [user, isLoading]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    signIn.mutate({
      email: email,
      password: password,
    });
  };

  return (
    <Flex flexGrow={"1"} justify={"center"} align={"center"}>
      <Container size="1" align={"center"}>
        <Card>
          <Form.Root className="FormRoot" onSubmit={onSubmit}>
            <Flex direction={"column"} gap="2">
              <Form.Field name="email">
                <Flex direction={"column"} gap="2">
                  <Form.Label asChild>
                    <Text weight={"bold"}>Email</Text>
                  </Form.Label>
                  <Form.Control asChild>
                    <TextField.Root
                      size="1"
                      placeholder="johndoe@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Control>
                </Flex>
              </Form.Field>
              <Form.Field name="password">
                <Flex direction={"column"} gap="2">
                  <Form.Label asChild>
                    <Text weight={"bold"}>Password</Text>
                  </Form.Label>
                  <Form.Control asChild>
                    <TextField.Root
                      size="1"
                      placeholder="*******"
                      type={"password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Control>
                </Flex>
              </Form.Field>
              <Form.Submit asChild>
                <Button variant="classic" size={"2"}>
                  Sign In
                </Button>
              </Form.Submit>
            </Flex>
          </Form.Root>
        </Card>
      </Container>
    </Flex>
  );
}
