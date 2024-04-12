export interface IEvent {
  id: string;
  event_title: string;
  event_date: string;
  event_location: string;
  event_description: string;
  registration_deadline: Date;
  event_host_id: string;
  image_url: string;
  category_id: string;
}
