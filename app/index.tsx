import { Redirect } from 'expo-router';
import { useStore } from '../src/store/useStore';

export default function Index() {
  const isOnboardingCompleted = useStore((state) => state.isOnboardingCompleted);

  if (!isOnboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
