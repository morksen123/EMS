import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IEventAttendees } from "@/models";
import { getEventAttendees } from "@/lib/actions/events/actions";

type StatisticsButtonProps = {
  eventId: string;
};

export function StatisticsButton({ eventId }: StatisticsButtonProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventAttendeesList, setEventAttendeesList] = useState<
    IEventAttendees[]
  >([]);

  useEffect(() => {
    if (!dialogOpen) return;
    const getAttendeesList = async () => {
      const attendeesList = await getEventAttendees(eventId);
      setEventAttendeesList(attendeesList);
    };
    getAttendeesList();
  }, [eventId, dialogOpen]);

  const present = useMemo(() => {
    return eventAttendeesList.filter((user) => user.attended);
  }, [eventAttendeesList]);
  const notPresent = useMemo(() => {
    return eventAttendeesList.filter((user) => !user.attended);
  }, [eventAttendeesList]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button className="mt-4 rounded-full" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
