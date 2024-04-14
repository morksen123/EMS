"use client";

import Gallery from "@/components/events/Gallery";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import { useUser } from "@/contexts/UserContext";
import { IEvent } from "@/models";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const EventsOrganizedPage = () => {
  return (
    <>
      <section className="bg-primary-50  bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
        </div>
      </section>

      <section className=" py-5 md:py-10">
        <EventGalleryWrapper />
      </section>
    </>
  );
};

const EventGalleryWrapper = () => {
  const { user } = useUser();
  const [eventData, setEventData] = useState<IEvent[]>();

  const supabase = createClient();

  useEffect(() => {
    const fetchEventsOrganizedByUser = async () => {
      const { data, error } = await supabase
        .from("event")
        .select()
        .eq("event_host_id", user?.id);

      if (data) {
        setEventData(data);
      }
    };

    fetchEventsOrganizedByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="wrapper flex items-center justify-center sm:justify-between">
      {eventData ? (
        <Gallery type="organized" data={eventData} />
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
};

export default EventsOrganizedPage;
