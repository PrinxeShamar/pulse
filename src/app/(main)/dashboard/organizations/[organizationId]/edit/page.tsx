"use client";

import {
  useCreateOrganization,
  useOrganization,
} from "@/stores/organizationQuery";
import * as Form from "@radix-ui/react-form";
import {
  Button,
  Card,
  Container,
  Flex,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

export default function Page({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const { data: organization } = useOrganization(Number(organizationId));

  if (organization) {
    return (
      <Flex flexGrow={"1"} direction={"column"}>
        <Flex p="6">
          <Text weight={"bold"} size={"6"}>
            {organization.name}
          </Text>
        </Flex>
        <Separator size="4" />
      </Flex>
    );
  }
}
