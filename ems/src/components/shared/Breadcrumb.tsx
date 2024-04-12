import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BreadCrumbProps = {
  type: "events_organized" | "events_joined" | "events";
  eventId: string;
  onDelete?: (eventId: string) => Promise<void>;
};

export function BreadCrumb({ eventId, onDelete, type }: BreadCrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 ">
            <BreadcrumbEllipsis className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => onDelete && onDelete(eventId)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
