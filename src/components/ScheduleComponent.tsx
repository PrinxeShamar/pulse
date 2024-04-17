"use client";

import { useSchedule } from "@/stores/scheduleQuery";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Grid,
  ScrollArea,
  Section,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface MonthDate {
  date: Date;
  inRange: boolean;
}

const getMonthDateArray = (startDate: Date, endDate: Date) => {
  const startDayOfWeek = startDate.getUTCDay();
  const startOfWeek = new Date(startDate);
  startOfWeek.setUTCDate(startOfWeek.getUTCDate() - startDayOfWeek);

  const weeks: MonthDate[][] = [];
  let currentWeek: MonthDate[] = [];
  let currentDate = new Date(startOfWeek);

  console.log(currentDate);
  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeek.push({ date: new Date(currentDate), inRange: false });
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  while (currentDate <= endDate) {
    currentWeek.push({ date: new Date(currentDate), inRange: true });

    if (currentDate.getUTCDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: new Date(currentDate), inRange: false });
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    weeks.push(currentWeek);
  }

  return weeks;
};

const DateItem = ({
  date,
  scheduleId,
  weekIdx,
}: {
  date: MonthDate;
  scheduleId: number;
  weekIdx: number;
}) => {
  const [collectedProps, dropRef] = useDrop(
    () => ({
      accept: "component",
      drop: (component: any, monitor) => {
        console.log(component);
      },
    }),
    [date, scheduleId]
  );

  return (
    <Card
      style={{
        backgroundColor: !date.inRange ? "var(--gray-1)" : "var(--blue-1)",
      }}
      ref={date.inRange ? (dropRef as any) : undefined}
    >
      <Flex direction={"column"} gap="2">
        <Flex direction={"column"}>
          {weekIdx === 0 && (
            <Text size={"1"} weight={"bold"}>
              {daysOfWeek[date.date.getUTCDay()]}
            </Text>
          )}
          <Text size={"2"} weight={"medium"}>
            {date.date.getUTCDate()}
          </Text>
        </Flex>
        <ScrollArea>
          <Flex direction={"row"} gap={"1"} pb={"3"}>
            {/* {items.map((item) => {
              return <Avatar fallback="SS" />;
            })} */}
          </Flex>
        </ScrollArea>
      </Flex>
    </Card>
  );
};

export default function ScheduleComponent({ id }: { id: number }) {
  const { data: schedule } = useSchedule(id);
  const [dates, setUTCDates] = useState<MonthDate[][]>([]);

  useEffect(() => {
    if (schedule) {
      setUTCDates(getMonthDateArray(schedule.startDate, schedule.endDate));
    }
    console.log(schedule);
  }, [schedule]);

  if (schedule) {
    return (
      <div className="flex flex-col flex-1">
        <Flex
          direction={"column"}
          p="6"
          style={{ backgroundColor: "var(--blue-1)" }}
        >
          <Text size={"5"} weight={"bold"}>
            {schedule.name}
          </Text>
          <Text size={"2"} weight={"light"}>
            {schedule.description}
          </Text>
        </Flex>
        <Separator size={"4"} />
        <Grid
          className="flex-1"
          rows={`${dates.length}`}
          columns={"7"}
          gap={"2"}
          p={"2"}
        >
          {dates.map((week, weekIdx) => {
            return week.map((date) => {
              return (
                <DateItem
                  date={date}
                  scheduleId={schedule.id}
                  weekIdx={weekIdx}
                />
              );
            });
          })}
        </Grid>
      </div>
    );
  }
}
