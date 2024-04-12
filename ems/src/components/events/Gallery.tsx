import { IEvent } from "@/models";
import { Card, CardDescription, CardHeader, CardImage } from "../ui/card";
import { BreadCrumb } from "../shared/Breadcrumb";
import { deleteEvent } from "@/lib/actions/events/actions";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type GalleryProps = {
  data: IEvent[];
};

// TODO: pagination
const Gallery = ({ data }: GalleryProps) => {
  const [galleryItems, setGalleryItems] = useState(data);

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

  useEffect(() => {
    console.log(galleryItems);
  }, [galleryItems]);

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
                          <BreadCrumb
                            type="events_organized"
                            eventId={event.id}
                            onDelete={handleDeleteEvent}
                          />
                        </div>
                        <CardDescription className="line-clamp-2">
                          {event.event_description}
                        </CardDescription>
                        <CardDescription>{event.event_date}</CardDescription>
                        <CardDescription>
                          {event.event_location}
                        </CardDescription>
                      </CardHeader>
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
