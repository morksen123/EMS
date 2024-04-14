"use client";

import { StatisticsButton } from "@/components/events/StatisticsButton";
import UserAttendanceItem from "@/components/events/UserAttendanceItem";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import {
  getEventAttendees,
  getEventById,
  registerForEvent,
} from "@/lib/actions/events/actions";
import { getUserProfile } from "@/lib/actions/profile/actions";
import { IEvent, IEventAttendees } from "@/models";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

type EventDetailsProps = {
  params: {
    id: string;
  };
};

const EventDetails = ({ params: { id } }: EventDetailsProps) => {
  const [eventDetails, setEventDetails] = useState<IEvent>();
  const [eventAttendeesList, setEventAttendeesList] = useState<
    IEventAttendees[]
  >([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegisteredForEvent, setIsRegisteredForEvent] = useState(false);
  const [isPassedRegistrationDeadline, setIsPassedRegistrationDeadline] =
    useState(false);
  const supabase = createClient();
  const { user } = useUser();

  useEffect(() => {
    const fetchEventDetails = async () => {
      const event = await getEventById(id);
      setEventDetails(event);
      setIsPassedRegistrationDeadline(
        new Date(event.registration_deadline).getDate() < new Date().getDate()
      );
    };

    fetchEventDetails();
  }, [id]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (eventDetails) {
        const profile = await getUserProfile(eventDetails?.event_host_id);
        setUserName(profile?.name);
      }
    };

    fetchUserProfile();
  }, [eventDetails]);

  useEffect(() => {
    const getEventRegistrationId = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("eventRegistration")
          .select("id")
          .match({ event_id: id, user_id: user.id });

        if (data && data?.length > 0) {
          setIsRegisteredForEvent(true);
        }
      }
    };

    getEventRegistrationId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  useEffect(() => {
    const getAttendeesList = async () => {
      const attendeesList = await getEventAttendees(id);
      setEventAttendeesList(attendeesList);
    };

    getAttendeesList();
  }, [id]);

  const handleRegisterUser = async () => {
    if (isPassedRegistrationDeadline) {
      return;
    }
    setLoading(true);
    await registerForEvent(id);
    setIsRegisteredForEvent(true);
    setLoading(false);
  };

  const isButtonDisabled =
    loading || isRegisteredForEvent || isPassedRegistrationDeadline;

  const buttonLabel = useMemo(() => {
    if (loading) {
      return "Registering...";
    } else if (isPassedRegistrationDeadline) {
      return "Registration Closed";
    } else if (isRegisteredForEvent) {
      return "Registered";
    } else {
      return "Register Now";
    }
  }, [loading, isPassedRegistrationDeadline, isRegisteredForEvent]);

  if (!eventDetails) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <section className="bg-primary-50  bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Details</h3>
        </div>
      </section>
      <section className="wrapper">
        <div className="flex flex-col items-start gap-10">
          <div className="rounded-2xl w-full overflow-hidden border-2 border-gray-300 bg-white">
            <Image
              src={
                eventDetails.image_url
                  ? `https://vxxdicxhpxdjptsqhdul.supabase.co/storage/v1/object/public/events/${eventDetails.id}/${eventDetails.image_url}`
                  : "/assets/images/default-profile-pic.jpeg"
              }
              alt="Event Image"
              width={1000}
              height={600}
              className="w-full object-contain"
            />
          </div>

          <section className="wrapper">
            <h1 className="text-3xl font-bold mb-3">
              {eventDetails.event_title}
            </h1>
            <div className="flex items-center mb-5">
              <p className="text-md text-gray-500">
                Hosted by <span className="text-primary-500">{userName}</span>
              </p>
            </div>

            <div className="flex gap-4 items-center mb-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={24}
                  height={24}
                />
                <p>{new Date(eventDetails.event_date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={24}
                  height={24}
                />
                <p>{eventDetails.event_location}</p>
              </div>

              <p className="text-sm rounded-full bg-grey-500/10 px-4 py-1 text-grey-500  text-center">
                {eventDetails.category_id}
              </p>
            </div>

            {/* Registration Information */}
            <div className="gap-10 mb-4">
              <p className="text-lg font-medium flex gap-2 mb-4">
                Register by:{" "}
                <span className="font-bold">
                  {new Date(
                    eventDetails.registration_deadline
                  ).toLocaleDateString()}
                </span>
              </p>
              <Button
                className="rounded-full px-6 py-2 bg-red-600 hover:bg-red-500"
                disabled={isButtonDisabled}
                onClick={handleRegisterUser}
              >
                {buttonLabel}
              </Button>
            </div>

            <div className="description">
              <h2 className="text-xl font-semibold mb-2">Description:</h2>
              <p>{eventDetails.event_description}</p>
            </div>
          </section>
        </div>
      </section>
      {eventDetails.event_host_id === user?.id && (
        <>
          <section className="bg-primary-50  bg-cover bg-center">
            <div className="wrapper flex items-center justify-center sm:justify-between">
              <h3 className="h3-bold text-center sm:text-left">
                Event Attendance
              </h3>
              <StatisticsButton eventId={id} />
            </div>
          </section>
          <section className="wrapper mb-[100px]">
            <div className="flex items-center justify-center sm:justify-between">
              {eventAttendeesList.map((user) => (
                <UserAttendanceItem
                  key={user.user_id}
                  user={user}
                  eventId={id}
                  initialAttendanceState={user.attended}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EventDetails;
