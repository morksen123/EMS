import EventForm from "@/components/events/EventForm";

function CreateEventPage() {
  return (
    <>
      <section className="bg-primary-50  bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <section className="wrapper my-8">
        <EventForm />
      </section>
    </>
  );
}

export default CreateEventPage;
