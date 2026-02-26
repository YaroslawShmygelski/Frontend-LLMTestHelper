import { Loader } from '@/components/Loader';
import { ErrorState } from '@/components/ErrorState';
import { FiMail, FiPhone, FiUser, FiEdit3 } from 'react-icons/fi';
import { useGetUserProfileQuery } from '../api/userApi';
import type { ElementType } from 'react';
import { CustomButton } from '@/components/CustomButton';

export const UserProfile = () => {
  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useGetUserProfileQuery();

  if (isLoading) {
    return <Loader fullScreen text="Loading profile..." />;
  }

  if (isError || !profile) {
    return (
      <ErrorState
        title="Failed to load profile"
        message="We couldn't retrieve your profile. Please try again."
        onRetry={refetch}
      />
    );
  }

  const initials =
    `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();

  const formattedPhone = String(profile.phone_number).replace(
    /(\d{3})(?=\d)/g,
    '$1 '
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section with gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute rounded-2xl inset-0 bg-linear-to-br from-primary/7 via-focus/5 to-transparent" />
        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-br from-primary to-focus rounded-full opacity-60 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-primary to-focus flex items-center justify-center ring-4 ring-background">
                <span className="text-2xl font-bold text-primary-foreground tracking-wider">
                  {initials}
                </span>
              </div>
            </div>

            {/* Name & subtitle */}
            <div className="text-center sm:text-left sm:pt-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {profile.first_name} {profile.last_name}
              </h1>
              <p className="text-muted-foreground mt-1.5 text-base">
                {profile.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-16 space-y-6">
        {/* Personal info card */}
        <div className="bg-card rounded-2xl border border-card-foreground/8 shadow-xl">
          <div className="px-8 py-5 border-b border-card-foreground/8">
            <div className="flex items-center gap-2">
              <FiUser className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Personal Information
              </h2>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DataBlock label="First Name" value={profile.first_name} />
              <DataBlock label="Last Name" value={profile.last_name} />
            </div>
          </div>
        </div>

        {/* Contact info card */}
        <div className="bg-card rounded-2xl border border-card-foreground/8 shadow-xl">
          <div className="px-8 py-5 border-b border-card-foreground/8">
            <div className="flex items-center gap-2">
              <FiMail className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Contact Information
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <DataBlock
              label="Email Address"
              value={profile.email}
              icon={FiMail}
            />
            <DataBlock
              label="Phone Number"
              icon={FiPhone}
              customValue={
                <div className="bg-background/60 border border-card-foreground/8 px-4 py-3 rounded-xl flex items-center gap-2.5">
                  <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded-lg">
                    +{profile.country_code}
                  </span>
                  <span className="text-base font-medium text-foreground">
                    {formattedPhone}
                  </span>
                </div>
              }
            />
          </div>
        </div>

        {/* Actions */}
        <div className="bg-card rounded-2xl border border-card-foreground/8 shadow-xl px-8 py-5 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Need to update your information?
          </p>
          <CustomButton
            onClick={() => document.getElementById('doc-upload')?.click()}
            className="w-auto! px-2! h-! ml-4! text-sm!"
            icon={<FiEdit3 />}
          >
            Edit Profile
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

/* ─── helpers ─────────────────────────────────────────────────── */

interface DataBlockProps {
  label: string;
  value?: string;
  icon?: ElementType;
  customValue?: React.ReactNode;
}

const DataBlock = ({
  label,
  value,
  icon: Icon,
  customValue,
}: DataBlockProps) => (
  <div className="space-y-2">
    <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label}
    </label>
    {customValue ? (
      customValue
    ) : (
      <div className="bg-background/60 border border-card-foreground/8 px-4 py-3 rounded-xl">
        <span className="text-base font-medium text-foreground">{value}</span>
      </div>
    )}
  </div>
);
