"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EventFormSchema } from "@/schema";

type CalendarFormInputProps = {
  inputName: "eventDate" | "registrationDeadline";
  control: Control<z.infer<typeof EventFormSchema>>;
  placeholder: string;
};

const CalendarFormInput = ({
  placeholder,
  inputName,
  control,
}: CalendarFormInputProps) => {
  return (
    <FormField
      control={control}
      name={inputName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className="button w-[400px] text-left text-grey-500 bg-grey-50"
                >
                  {field.value ? (
                    `${placeholder}: ${format(field.value, "PPP")}`
                  ) : (
                    <span>Event Date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CalendarFormInput;
