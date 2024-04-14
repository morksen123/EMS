import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IEventAttendees } from "@/models";
import { getEventAttendees } from "@/lib/actions/events/actions";

type StatisticsButtonProps = {
  eventId: string;
  triggerAttendance: boolean;
};

export function StatisticsButton({
  eventId,
  triggerAttendance,
}: StatisticsButtonProps) {
  const [eventAttendeesList, setEventAttendeesList] = useState<
    IEventAttendees[]
  >([]);

  useEffect(() => {
    const getAttendeesList = async () => {
      const attendeesList = await getEventAttendees(eventId);
      setEventAttendeesList(attendeesList);
    };
    getAttendeesList();
  }, [eventId, triggerAttendance]);

  const present = eventAttendeesList.filter((user) => user.attended);
  const notPresent = eventAttendeesList.filter((user) => !user.attended);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" size="lg">
          Statistics
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>Event Attendance</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold">Present</h2>
            <ul>
              {present.map((user) => (
                <li key={user.user_id}>
                  {user.name} ({user.email})
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Not Present</h2>
            <ul>
              {notPresent.map((user) => (
                <li key={user.user_id}>
                  {user.name} ({user.email})
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogClose asChild>
          <Button className="mt-4" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
