import { UserProfile } from "@/app/(private)/profile/page";
import { EditIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProfileDetailsProps = {
  userProfile: UserProfile;
};

const ProfileDetails = ({ userProfile }: ProfileDetailsProps) => {
  return (
    <>
      <section className="wrapper my-5 space-y-5">
        <div className="flex  justify-between items-center">
          <h4 className="text-3xl font-bold">Profile Picture</h4>
          <Link href="/profile/update">
            <EditIcon className="cursor-pointer" />
          </Link>
        </div>
        <div className="relative w-32 h-32">
          <Image
            src={
              userProfile.avatar_url === ""
                ? "/assets/images/default-profile-pic.jpeg"
                : userProfile.avatar_url
            }
            height={200}
            width={200}
            alt="Profile Photo"
            className="rounded-full"
          />
        </div>
      </section>
      <section className="wrapper my-5 space-y-5">
        <h4 className="text-3xl font-bold">Contact Details</h4>
        <div className="text-center sm:text-left">
          <div className="flex gap-1">
            <p className="text-md mt-2 font-bold">Name: </p>
            <p className="text-md mt-2">{userProfile?.name}</p>
          </div>
          <div className="flex gap-1">
            <p className="text-md mt-2 font-bold">Email: </p>
            <p className="text-md mt-2">{userProfile?.email}</p>
          </div>
          <div className="flex gap-1">
            <p className="text-md mt-2 font-bold">Phone Number: </p>
            <p className="text-md mt-2">{userProfile?.phone_number}</p>
          </div>
        </div>
      </section>
      <section className="wrapper my-5 space-y-5">
        <h4 className="text-3xl font-bold">Home Address</h4>
        <div className="text-center sm:text-left ">
          {userProfile?.home_address ? (
            <h4 className="text-2xl font-bold">{userProfile?.home_address}</h4>
          ) : (
            <p className="text-md mt-2">*Update your home address*</p>
          )}
        </div>
      </section>
      <section className="wrapper my-5 space-y-5">
        <h4 className="text-3xl font-bold">Billing Address</h4>
        <div className="text-center sm:text-left ">
          {userProfile?.billing_address ? (
            <h4 className="text-2xl font-bold">
              {userProfile?.billing_address}
            </h4>
          ) : (
            <p className="text-md mt-2">*Update your billing address*</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfileDetails;
