import { Stack } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';

import events from '../../assets/events.json';
import EventListItem from '../../components/EventListItem';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <FlatList
        className="bg-white"
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
      />
    </>
  );
}
