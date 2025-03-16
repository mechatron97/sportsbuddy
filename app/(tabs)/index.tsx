import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import EventListItem from '../../components/EventListItem';

import { NearbyEvent } from '~/types/db';
import { supabase } from '~/utils/supabase';

export default function Home() {
  const [events, setEvents] = useState<NearbyEvent[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const [status, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    if (status && !status.granted && status.canAskAgain) {
      requestPermission();
    }
  }, [status]);

  useEffect(() => {
    (async () => {
      if (!status?.granted) {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [status]);

  useEffect(() => {
    if (location) {
      fetchNearbyEvents();
    }
  }, [location]);

  // const fetchAllEvents = async () => {
  //   const { data, error } = await supabase.from('events').select('*');
  //   setEvents(data);
  // };

  const fetchNearbyEvents = async () => {
    if (!location) {
      return;
    }
    const { data, error } = await supabase.rpc('nearby_events', {
      lat: location.coords.latitude,
      long: location.coords.longitude,
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
