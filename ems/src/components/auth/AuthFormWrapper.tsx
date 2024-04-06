import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface AuthFormWrapperProps {
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
  children: React.ReactNode;
}

const AuthFormWrapper = ({
  title,
  backButtonHref,
  backButtonLabel,
  children,
}: AuthFormWrapperProps) => {
  return (
    <Card className="xl:w-1/4 md:w-1/2 shadow-md">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center">
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button variant="link" className="font-normal w-full" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthFormWrapper;
