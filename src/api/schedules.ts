"use server";

import { prisma } from "@/utils/prisma/client";

export const getSchedules = async () => {
  let schedules = await prisma.schedule.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return schedules;
}

export const getSchedule = async (id: number) => {
  console.log(id);
  let schedule = await prisma.schedule.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      startDate: true,
      endDate: true,
    }
  });
  return schedule;
}