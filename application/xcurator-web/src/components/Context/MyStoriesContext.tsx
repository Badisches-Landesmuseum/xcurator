import { useRouter } from 'next/router';
import * as React from 'react';
import { StoryFragment, useMyStoriesQuery } from 'src/graphql/_generated/types';
import { localeToLanguage } from 'src/utils/useLanguage';
import { useAuth } from './AuthContext';

export const MyStoriesContext = React.createContext<{
  stories: StoryFragment[];
  loading: boolean;
} | null>(null);

export const MyStoriesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const language = localeToLanguage(router.locale || '');
  const { isLoggedIn } = useAuth();
  const { data, loading } = useMyStoriesQuery({
    variables: { language },
    skip: !isLoggedIn,
  });

  return (
    <MyStoriesContext.Provider
      value={{
        stories: data?.myStories || [],
        loading,
      }}
    >
      {children}
    </MyStoriesContext.Provider>
  );
};

export function useMyStories() {
  const context = React.useContext(MyStoriesContext);
  if (context === null) {
    throw new Error('useMyStories must be used within a MyStoriesContext');
  }
  return context;
}
