"use server";

import { prisma } from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";

export const getOrganizations = async () => {
  let supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    let organizations = await prisma.organization.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        users: {
          some: {
            userId: user.id
          }
        }
      }
    });
    return organizations;
  }
  return [];
}

export const getOrganization = async (id: number) => {
  let supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    let organizations = await prisma.organization.findUnique({
      select: {
        id: true,
        name: true,
      },
      where: {
        id: id,
        users: {
          some: {
            userId: user.id
          }
        }
      }
    });
    return organizations;
  }
  return null;
}

export const createOrganization = async (name: string) => {
  let supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    let organization = await prisma.organization.create({
      data: {
        name: name,
        users: {
          create: {
            user: {
              connect: {
                id: user.id
              }
            }
          }
        }
      },
      select: {
        id: true,
        name: true,
      }
    });
    return organization;
  }
  return [];
}

