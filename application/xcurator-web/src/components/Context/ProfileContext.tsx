import * as React from 'react';
import { useRouter } from 'next/router';
import {
  useProfileQuery,
  ProfileFragment,
  namedOperations,
  useUpdateUserProfileMutation,
  useMyFavouritesQuery,
  ArtefactFragment,
} from 'src/graphql/_generated/types';
import { useAuth } from './AuthContext';
import { localeToLanguage } from 'src/utils/useLanguage';

export const Profile = React.createContext<{
  profile?: ProfileFragment | null;
  pathBeforeRedirectRef: React.MutableRefObject<string | undefined>;
  loading?: boolean;
  favourites: ArtefactFragment[];
  favouritesLoading?: boolean;
  preferredLanguage?: string;
} | null>(null);

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { isLoggedIn, username } = useAuth();
  const { data, loading } = useProfileQuery({
    skip: !isLoggedIn,
    onCompleted: data => {
      router.push(router.asPath, router.asPath, {
        locale: data.profile?.preferredLanguage.toLowerCase(),
        scroll: false,
      });
    },
  });

  const [updateProfile] = useUpdateUserProfileMutation();
  const { data: favouritesData, loading: favouritesLoading } =
    useMyFavouritesQuery({
      skip: !isLoggedIn,
    });
  // Now you can access the data
  const pathBeforeRedirectRef = React.useRef<string>();
  const language = localeToLanguage(router.locale as string);

  React.useEffect(() => {
    if (
      isLoggedIn &&
      router.pathname !== '/onboarding' &&
      !loading &&
      data?.profile === null
    ) {
      pathBeforeRedirectRef.current = router.asPath;
      router.push('/onboarding');
      // if user is redirected to onboarding and doesn't have a profile yet, a default profile is set for him.
      updateProfile({
        variables: {
          continents: [],
          epochs: [],
          visitorRole: null,
          visitorWish: null,
          visitorTarget: null,
          preferredLanguage: language,
          username: username,
        },
        onCompleted: () => {
          router.push(router.asPath, router.asPath, {
            locale: language.toLowerCase(),
            scroll: false,
          });
        },
        refetchQueries: [namedOperations.Query.Profile],
      });
    }
  }, [
    isLoggedIn,
    router,
    loading,
    data?.profile,
    updateProfile,
    username,
    language,
  ]);

  return (
    <Profile.Provider
      value={{
        profile: data?.profile,
        pathBeforeRedirectRef,
        loading,
        favouritesLoading,
        favourites: favouritesData?.myFavourites || [],
        preferredLanguage: data?.profile?.preferredLanguage.toLowerCase(),
      }}
    >
      {children}
    </Profile.Provider>
  );
};

export function useProfile() {
  const context = React.useContext(Profile);
  if (context === null) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
