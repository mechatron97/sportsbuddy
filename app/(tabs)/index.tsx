import { Stack } from 'expo-router';

import EventListItem from '../../components/EventListItem';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <EventListItem />
    </>
  );
}
