import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type HomeProps = {};

export default async function Home(props: HomeProps) {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-10">
        <div className="wrapper grid gap-5 grid-cols-2">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Unlock Your Moments, Amplify the Vibes</h1>
            <p className="p-regular-24">
              Explore and connect at the hottest events in Singapore!
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/networking.jpg"
            alt="networking"
            width={1000}
            height={1000}
            className="max-h-[70vh] rounded-xl"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trust by <br /> Thousands of Events
        </h2>

        {/* <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        /> */}
      </section>
    </>
  );
}
