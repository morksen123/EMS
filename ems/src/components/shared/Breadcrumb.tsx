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
  eventId: string;
  onDelete?: (eventId: string) => Promise<void>;
  onJoin?: (eventId: string) => void;
  hasJoinedEvent?: boolean;
};

export function BreadCrumb({
  eventId,
  onDelete,
  onJoin,
  hasJoinedEvent,
}: BreadCrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 ">
            <BreadcrumbEllipsis className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {onDelete && (
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => onDelete && onDelete(eventId)}
              >
                Delete
              </DropdownMenuItem>
            )}
            {!hasJoinedEvent && (
              <DropdownMenuItem onClick={() => onJoin && onJoin(eventId)}>
                {!hasJoinedEvent ? "Register" : "Unregister"}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
