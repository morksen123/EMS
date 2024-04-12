"use client";

import SkeletonLoader from "@/components/shared/SkeletonLoader";
import { getEventById } from "@/lib/actions/events/actions";
import { IEvent } from "@/models";
import Image from "next/image";
import { useEffect, useState } from "react";

type EventDetailsProps = {
  params: {
    id: string;
  };
};

const EventDetails = ({ params: { id } }: EventDetailsProps) => {
  const [eventDetails, setEventDetails] = useState<IEvent>();

  useEffect(() => {
    const fetchEventDetails = async () => {
      const event = await getEventById(id);
      setEventDetails(event);
    };

    fetchEventDetails();
  }, [id]);

  if (!eventDetails) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Details</h3>
        </div>
      </section>
      <section className="wrapper">
        <div className="flex flex-col items-center gap-10">
          <div className="w-full">
            <Image
              src={
                `https://vxxdicxhpxdjptsqhdul.supabase.co/storage/v1/object/public/events/${eventDetails.id}/${eventDetails.image_url}` ||
                "/assets/images/default-profile-pic.jpeg"
              }
              alt="Event Image"
              width={1000}
              height={600}
            />
          </div>

          <div className="content bg-white w-full p-5 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-3">
              {eventDetails.event_title}
            </h1>
            <div className=" mb-5">
              <p className="text-sm text-gray-500">
                Hosted by{" "}
                <span className="text-primary-500">
                  {eventDetails.event_host_id}
                </span>
              </p>
              <p className="text-sm rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500 w-[120px] my-2 text-center">
                {eventDetails.category_id}
              </p>
            </div>

            <div className="date-location flex gap-4 items-center mb-5">
              <Image
                src="/assets/icons/calendar.svg"
                alt="calendar"
                width={24}
                height={24}
              />
              <p>{new Date(eventDetails.event_date).toLocaleDateString()}</p>

              <Image
                src="/assets/icons/location.svg"
                alt="location"
                width={24}
                height={24}
              />
              <p>{eventDetails.event_location}</p>
            </div>

            <div className="description">
              <h2 className="text-xl font-semibold mb-2">Description:</h2>
              <p>{eventDetails.event_description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetails;
