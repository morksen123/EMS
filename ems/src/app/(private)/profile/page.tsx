"use client";

import ProfileDetails from "@/components/profile/ProfileDetails";
import ProfileForm from "@/components/profile/ProfileForm";
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
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userData = (await getUserProfile(user.id)) as UserProfile;
        setUserProfile(userData);
      }
    };

    fetchUserProfile();
  }, [user]);

  const toggleEditMode = () => {
    setIsEditModeEnabled(!isEditModeEnabled);
  };

  useEffect(() => {
    console.log(isEditModeEnabled);
  }, [isEditModeEnabled]);

  return (
    <>
      {isEditModeEnabled && (
        <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
          <h3 className="wrapper h3-bold text-center sm:text-left">
            Edit Profile
          </h3>
        </section>
      )}
      {isEditModeEnabled ? (
        <ProfileForm
          defaultFormValues={userProfile}
          setIsEditModeEnabled={setIsEditModeEnabled}
        />
      ) : (
        <ProfileDetails
          userProfile={userProfile}
          toggleEditMode={toggleEditMode}
        />
      )}
    </>
  );
};

export default ProfilePage;
