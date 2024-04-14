import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { IEventAttendees } from "@/models";
import { createClient } from "@/utils/supabase/client";

type UserAttendanceItemProps = {
  user: IEventAttendees;
  eventId: string;
  initialAttendanceState: boolean;
};

const UserAttendanceItem = ({
  user,
  eventId,
  initialAttendanceState,
}: UserAttendanceItemProps) => {
  const [isChecked, setIsChecked] = useState(initialAttendanceState);
  const supabase = createClient();

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    const { data, error } = await supabase
      .from("eventRegistration")
      .update({ attended: !isChecked })
      .match({ user_id: user.user_id, event_id: eventId });
  };

  return (
    <div
      className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg m-2 hover:bg-gray-50 cursor-pointer"
      onClick={handleCheckboxChange}
    >
      <div className="mr-4">
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
      <Checkbox checked={isChecked} />
    </div>
  );
};

export default UserAttendanceItem;
