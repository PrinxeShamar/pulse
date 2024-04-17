import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { produce } from 'immer'

// export interface Schedule {
//   id: string;
//   name: string;
//   description: string;
//   startDate: Date;
//   endDate: Date;
// }

// export interface ScheduleItem {
//   id: string;
//   scheduleId: string;
//   date: Date;
// }

// [{
//   id: "1",
//   name: "March Night Shift",
//   description: "Night Shift Schedule for the month of March",
//   startDate: new Date(2024, 2, 1),
//   endDate: new Date(2024, 2, 31),
// }, {
//   id: "2",
//   name: "April Night Shift",
//   description: "Night Shift Schedule for the month of April",
//   startDate: new Date(2024, 3, 1),
//   endDate: new Date(2024, 3, 30),
// }, {
//   id: "3",
//   name: "May Night Shift",
//   description: "Night Shift Schedule for the month of May",
//   startDate: new Date(2024, 4, 1),
//   endDate: new Date(2024, 4, 31),
// },
// ],

// interface ScheduleStore {
//   schedules: Schedule[];
//   scheduleItems: ScheduleItem[];
//   addScheduleItem: (scheduleItem: ScheduleItem) => void;
// }

import { useQuery } from "@tanstack/react-query";
import { prisma } from '@/utils/prisma/client';
import { getSchedule, getSchedules } from '@/api/schedules';

export const useSchedules = () => {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: async () => {
      let schedules = await getSchedules();
      return schedules
    },
    staleTime: Infinity,
  });
};

export const useSchedule = (id: number) => {
  return useQuery({
    queryKey: ["schedules", id],
    queryFn: async () => {
      let schedule = await getSchedule(id);
      return schedule
    },
    staleTime: Infinity,
  });
}