import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import EventListItem from '../../components/EventListItem';

import { NearbyEvent } from '~/types/db';
import { supabase } from '~/utils/supabase';

export default function Home() {
  const [events, setEvents] = useState<NearbyEvent[]>([]);

  useEffect(() => {
    fetchNearbyEvents();
  }, []);

  // const fetchAllEvents = async () => {
  //   const { data, error } = await supabase.from('events').select('*');
  //   setEvents(data);
  // };

  const fetchNearbyEvents = async () => {
    const { data, error } = await supabase.rpc('nearby_events', {
      lat: 40.807416,
      long: -73.946823,
    });
    if (data) {
      setEvents(data);
    }
  };

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
