"use client";

import * as Form from "@radix-ui/react-form";
import {
  Button,
  Card,
  Container,
  Flex,
  Separator,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");

  const onSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <Flex flexGrow={"1"} align={"center"} justify={"center"}>
      <Container size="2">
        <Card style={{ padding: "0" }}>
          <Flex direction={"column"}>
            <Flex p="6">
              <Text weight={"bold"} size={"4"}>
                Create Schedule
              </Text>
            </Flex>
            <Separator size="4" />
            <Form.Root>
              <Flex p="6" direction={"column"} gap="4">
                <Form.Field name="name">
                  <Flex direction={"column"} gap="2">
                    <Form.Label asChild>
                      <Text weight={"bold"} size={"1"} color="gray">
                        Name
                      </Text>
                    </Form.Label>
                    <Form.Control asChild>
                      <TextField.Root
                        size="1"
                        placeholder="Brookdale"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Control>
                  </Flex>
                </Form.Field>
                <Form.Field name="name">
                  <Flex direction={"column"} gap="2">
                    <Form.Label asChild>
                      <Text weight={"bold"} size={"1"} color="gray">
                        Description
                      </Text>
                    </Form.Label>
                    <Form.Control asChild>
                      <TextArea size="1" placeholder="Brookdale" />
                    </Form.Control>
                  </Flex>
                </Form.Field>
                <Form.Field name="name">
                  <Flex direction={"column"} gap="2">
                    <Form.Label asChild>
                      <Text weight={"bold"} size={"1"} color="gray">
                        Start Date
                      </Text>
                    </Form.Label>
                    <Form.Control asChild>
                      <TextArea size="1" placeholder="Brookdale" />
                    </Form.Control>
                  </Flex>
                </Form.Field>
                <Form.Submit asChild>
                  <Button
                    size={"1"}
                    variant="outline"
                    onClick={onSubmit}
                    color="green"
                  >
                    Create
                  </Button>
                </Form.Submit>
              </Flex>
            </Form.Root>
          </Flex>
        </Card>
      </Container>
    </Flex>
  );
}
