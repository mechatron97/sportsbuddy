import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import EventListItem from '../../components/EventListItem';

import { supabase } from '~/utils/supabase';

export default function Home() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    setEvents(data);
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
