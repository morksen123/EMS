"use client";

import Gallery from "@/components/events/Gallery";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/UserContext";
import { IEvent } from "@/models";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface EventGalleryWrapperProps {
  searchTerm: string;
}

const SearchEventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Search Events</h3>
        </div>
      </section>

      <section className="py-5 md:py-10">
        <div className="wrapper">
          <Label htmlFor="search">Search Events</Label>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              className="w-full sm:w-[300px]" // Make input responsive
              type="text"
              id="search"
              placeholder="e.g., 'festival'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              className="rounded-full"
              type="button"
            >
              Search
            </Button>
          </div>
        </div>
        <EventGalleryWrapper searchTerm={searchQuery} />
      </section>
    </>
  );
};

interface EventGalleryWrapperProps {
  searchTerm: string;
}

const EventGalleryWrapper = ({ searchTerm }: EventGalleryWrapperProps) => {
  const [eventData, setEventData] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchAllEvents = async () => {
      setLoading(true);
      let query = supabase.from("event").select();

      if (searchTerm) {
        query = query.ilike("event_title", `%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching events:", error.message);
        setEventData([]);
      } else {
        setEventData(data || []);
      }
      setLoading(false);
    };

    fetchAllEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className="wrapper flex flex-col items-center justify-center">
      {loading ? (
        <SkeletonLoader />
      ) : eventData.length > 0 ? (
        <Gallery type="search" data={eventData} />
      ) : (
        <h4 className="text-2xl font-semibold text-center sm:text-left">
          No events found.
        </h4>
      )}
    </div>
  );
};

export default SearchEventsPage;
