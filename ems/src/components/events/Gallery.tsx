import { IEvent } from "@/models";
import { Card } from "../ui/card";
import { Pagination } from "../ui/pagination";

type GalleryProps = {
  data: IEvent[];
  // emptyTitle: string;
  // emptyStateSubtext: string;
  // limit: number;
  page?: number | string;
  totalPages?: number;
  // urlParamName?: string;
  // collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
};

const Gallery = ({ data, page, totalPages = 0 }: GalleryProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              return (
                <li key={event.id} className="flex justify-center">
                  <Card />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && <Pagination />}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">hey</h3>
          <p className="p-regular-14">hey3</p>
        </div>
      )}
    </>
  );
};

export default Gallery;
