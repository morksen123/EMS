"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/actions/auth/actions";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/actions/profile/actions";
import { UserProfile } from "@/app/(private)/profile/page";

type AvatarDropdownProps = {};

const AvatarDropdown = ({}: AvatarDropdownProps) => {
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userData = (await getUserProfile(user.id)) as UserProfile;
        userData.billing_address = userData.billing_address ?? "";
        userData.home_address = userData.home_address ?? "";
        userData.avatar_url = userData.avatar_url = userData.avatar_url
          ? `https://vxxdicxhpxdjptsqhdul.supabase.co/storage/v1/object/public/avatars/${user.id}/${userData.avatar_url}`
          : "";
        setUserProfile(userData);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={
              userProfile?.avatar_url !== ""
                ? userProfile?.avatar_url
                : "/assets/images/default-profile-pic.jpeg"
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile" className="max-w-xl">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href="/events/events-joined" className="max-w-xl">
          <DropdownMenuItem>Events Joined</DropdownMenuItem>
        </Link>
        <Link href="/events/events-organized" className="max-w-xl">
          <DropdownMenuItem>Events Organised</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
