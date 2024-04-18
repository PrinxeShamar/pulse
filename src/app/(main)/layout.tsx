"use client";

import { useSignOut, useUser } from "@/stores/authQuery";
import { useOrganizations } from "@/stores/organizationQuery";
import {
  Avatar,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes";
import NextLink from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const signOut = useSignOut();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (user === null && !isLoading) {
      redirect("/signin");
    }
  }, [user, isLoading]);

  return (
    <Flex className="flex-1" direction={"column"}>
      <Flex p={"4"} align={"center"}>
        <Flex flexGrow={"1"}>
          <Text size={"5"} weight={"bold"}>
            Pulse
          </Text>
        </Flex>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Flex>
              <Avatar fallback="SS" />
            </Flex>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item color="red" onClick={() => signOut.mutate()}>
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
      <Separator size={"4"} />
      {children}
    </Flex>
  );
}
