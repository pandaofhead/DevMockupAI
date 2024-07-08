import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => {
  return (
    <div className="flex justify-center items-center mt-4 mb-4">
      <UserProfile path="/user-profile" />;
    </div>
  );
};

export default UserProfilePage;
