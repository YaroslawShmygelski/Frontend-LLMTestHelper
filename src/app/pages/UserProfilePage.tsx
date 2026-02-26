import { UserProfile } from '@/features/users/components/UserProfile';

export const UserProfilePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background items-center justify-center p-25 ">
      <UserProfile />
    </div>
  );
};
