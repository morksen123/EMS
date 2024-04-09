"use client";

import ProfileDetails from "@/components/profile/ProfileDetails";
import { useUser } from "@/contexts/UserContext";
import { getUserProfile } from "@/lib/actions/profile/actions";
import { useEffect, useState } from "react";

export interface UserProfile {
  name: string;
  phone_number: string;
  avatar_url: string;
  email: string;
  home_address: string;
  billing_address: string;
}

const ProfilePage = () => {
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

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Profile</h3>
      </section>
      {userProfile && <ProfileDetails userProfile={userProfile} />}
    </>
  );
};

export default ProfilePage;
