"use client";

import { useSignOut } from "@/stores/authQuery";
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
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const signOut = useSignOut();
  const { data: organizations, isLoading: isOrganizationsLoading } =
    useOrganizations();
  const router = useRouter();

  return (
    <Flex className="flex-1" direction={"row"}>
      <Flex direction={"column"} width={"20%"}>
        <Flex p="6" direction={"column"} gap={"2"}>
          <Text weight={"bold"} size={"2"} color={"gray"}>
            Organizations
          </Text>
          {!isOrganizationsLoading &&
            organizations?.map((organization) => {
              return (
                <Link
                  onClick={() =>
                    router.push(
                      `/dashboard/organizations/${organization.id}/edit`
                    )
                  }
                >
                  {organization.name}
                </Link>
              );
            })}
          <Button size="1" color="green" variant="outline" asChild>
            <NextLink href={"/dashboard/organizations/create"}>Create</NextLink>
          </Button>
        </Flex>
        <Separator size="4" />
        <Flex p="6" direction={"column"} gap={"2"}>
          <Text color="red">Sign Out</Text>
        </Flex>
        <Separator size="4" />
      </Flex>
      <Flex>
        <Separator orientation="vertical" size={"4"} />
      </Flex>
      {children}
    </Flex>
  );
}
