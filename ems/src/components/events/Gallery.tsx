import { IEvent } from "@/models";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
} from "../ui/card";
import { deleteEvent, unregisterForEvent } from "@/lib/actions/events/actions";
import { useCallback, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";

type GalleryProps = {
  data: IEvent[];
  type: "registration" | "organized" | "search";
};

// TODO: pagination
const Gallery = ({ data, type }: GalleryProps) => {
  const [galleryItems, setGalleryItems] = useState(data);
  const { user } = useUser();

  const handleDeleteEvent = useCallback(
    async (eventId: string) => {
      const updatedGalleryItems = galleryItems?.filter(
        (item: IEvent) => item.id !== eventId
      );
      setGalleryItems(updatedGalleryItems);
      await deleteEvent(eventId);
    },
    [galleryItems]
  );

  const handleUnregisterUser = useCallback(
    async (event: IEvent, userId: string) => {
      if (new Date(event.event_date) < new Date()) {
        return;
      }
      const updatedGalleryItems = galleryItems.filter(
        (item: IEvent) => item.id !== event.id
      );
      setGalleryItems(updatedGalleryItems);
      await unregisterForEvent(event.id, userId);
    },
    [galleryItems]
  );

  return (
    <>
      {galleryItems.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
            {galleryItems.map((event) => {
              return (
                <li key={event.id} className="flex justify-center">
                  <Link href={`/events/${event.id}`}>
                    <Card className="w-[300px]">
                      <CardImage
                        src={
                          event.image_url === ""
                            ? "/assets/images/default-profile-pic.jpeg"
                            : `https://vxxdicxhpxdjptsqhdul.supabase.co/storage/v1/object/public/events/${event.id}/${event.image_url}`
                        }
                      />

                      <CardHeader>
                        <div className="flex justify-between items-end">
                          <h4 className="text-xl font-semibold line-clamp-1">
                            {event.event_title}
                          </h4>
                        </div>
                        <CardDescription className="flex items-center gap-2">
                          <Image
                            src="/assets/icons/calendar.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                          />
                          {new Date(event.event_date).toLocaleDateString()}
                        </CardDescription>

                        <CardDescription className="flex items-center gap-2">
                          <Image
                            src="/assets/icons/location.svg"
                            alt="location"
                            width={24}
                            height={24}
                          />
                          {event.event_location}
                        </CardDescription>
                        <CardDescription className="line-clamp-2">
                          {event.event_description}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        {type === "registration" && (
                          <Button
                            disabled={new Date(event.event_date) < new Date()}
                            className="w-full rounded-full bg-red-400"
                            onClick={(e) => {
                              e.stopPropagation();
                              user && handleUnregisterUser(event, user?.id);
                            }}
                          >
                            Unregister
                          </Button>
                        )}
                        {type === "organized" && (
                          <div className="flex w-full gap-3">
                            <Button className="flex-1 rounded-full">
                              <Link href={`/events/${event.id}`}>
                                Attendance
                              </Link>
                            </Button>
                            <Button
                              className="flex-1 rounded-full bg-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEvent(event.id);
                              }}
                            >
                              Delete Event
                            </Button>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <h4 className="text-2xl font-semibold text-center sm:text-left">
          *You have not created any events yet*
        </h4>
      )}
    </>
  );
};

export default Gallery;
