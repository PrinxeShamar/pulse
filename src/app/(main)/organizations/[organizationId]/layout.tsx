"use client";

import ScheduleComponent from "@/components/ScheduleComponent";
import { randomUUID } from "crypto";
import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { v4 as uuidv4 } from "uuid";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag } from "react-dnd";
import {
  Avatar,
  Button,
  DropdownMenu,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
import { redirect, useRouter } from "next/navigation";
import { useSignOut, useUser } from "@/stores/authQuery";
import { useSchedules } from "@/stores/scheduleQuery";
import { prisma } from "@/utils/prisma/client";
import { Schedule } from "@prisma/client";

const calendarComponents = [
  {
    name: "Available",
  },
];

const CalendarComponentItem = ({ component }: { component: any }) => {
  const [collected, dragRef, dragPreview] = useDrag(() => ({
    type: "component",
    item: {
      type: "component",
    },
  }));
  return (
    <div
      ref={dragRef as any}
      className="text-xs bg-blue-400 p-1 text-white rounded-sm"
    >
      {component.name}
    </div>
  );
};

export default function Layout({
  children,
  params: { organizationId },
}: {
  children: React.ReactNode;
  params: { organizationId: string };
}) {
  const router = useRouter();
  const { data: schedules } = useSchedules();
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>();

  return (
    <Flex className="flex-1" direction={"column"}>
      <DndProvider backend={HTML5Backend}>
        <PanelGroup className="flex-1" direction="horizontal">
          <Panel defaultSize={20}>
            <PanelGroup direction="vertical">
              <Panel className="flex flex-col" defaultSize={30}>
                <Flex p={"4"} gap="2" align={"center"}>
                  <Text size={"1"} weight={"medium"}>
                    Schedules
                  </Text>
                  <Button
                    variant="outline"
                    color="green"
                    size="1"
                    onClick={() =>
                      router.push(
                        `/organizations/${organizationId}/schedules/create`
                      )
                    }
                  >
                    Create
                  </Button>
                </Flex>
                <Separator size={"4"} />
                <Flex direction={"column"} p={"2"} gap={"2"}>
                  {schedules &&
                    schedules.map((schedule, idx) => {
                      return (
                        <Button
                          key={idx}
                          variant={
                            schedule.id === selectedScheduleId
                              ? "classic"
                              : "outline"
                          }
                          onClick={() => setSelectedScheduleId(schedule.id)}
                        >
                          {schedule.name}
                        </Button>
                      );
                    })}
                </Flex>
              </Panel>
              <PanelResizeHandle>
                <Separator size={"4"} />
              </PanelResizeHandle>
              <Panel className="flex flex-col">
                <Flex p={"4"}>
                  <Text size={"1"} weight={"medium"}>
                    Calendar Components
                  </Text>
                </Flex>
                <Separator size={"4"} />
                <Flex direction={"column"} p={"4"} gap={"2"}>
                  {calendarComponents.map((component, idx) => {
                    return (
                      <CalendarComponentItem key={idx} component={component} />
                    );
                  })}
                </Flex>
              </Panel>
            </PanelGroup>
          </Panel>
          <PanelResizeHandle>
            <Separator size={"4"} orientation={"vertical"} />
          </PanelResizeHandle>
          <Panel className="flex flex-col flex-1">{children}</Panel>
        </PanelGroup>
      </DndProvider>
    </Flex>
  );
}
