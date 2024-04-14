"use client";

import Gallery from "@/components/events/Gallery";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { getRegisteredEvents } from "@/lib/actions/events/actions";
import { IEvent } from "@/models";
import Link from "next/link";
import { useEffect, useState } from "react";

const EventsJoinedPage = () => {
  const { user } = useUser();
  const [eventData, setEventData] = useState<IEvent[]>();
  const userId = user?.id;

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (userId) {
        const data = await getRegisteredEvents(userId);
        if (data) {
          console.log(data);
          setEventData(data);
        }
      }
    };

    fetchRegisteredEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      <section className="bg-primary-50  bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">
            Events Registered
          </h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/search-events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className=" py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          {eventData ? (
            <Gallery type={"registration"} data={eventData} />
          ) : (
            <SkeletonLoader />
          )}
        </div>
      </section>
    </>
  );
};

export default EventsJoinedPage;
