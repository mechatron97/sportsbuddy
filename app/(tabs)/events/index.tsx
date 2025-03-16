import { Stack } from 'expo-router';
import { FlatList } from 'react-native';

import EventListItem from '../../../components/EventListItem';

import { useNearbyEvents } from '~/hooks/useNearbyEvents';

export default function Home() {
  const events = useNearbyEvents();

  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <FlatList
        className="bg-white"
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
      />
    </>
  );
}
