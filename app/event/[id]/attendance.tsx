import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { supabase } from '~/utils/supabase';

export default function EventAttendance() {
  const { id } = useLocalSearchParams();

  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetchAttendees();
  }, [id]);

  const fetchAttendees = async () => {
    const { data } = await supabase.from('attendance').select('*, profiles(*)').eq('event_id', id);
    setAttendees(data);
  };

  return (
    <>
      <FlatList
        data={attendees}
        renderItem={({ item }) => (
          <View className="p-3">
            <Text className="font-bold">{item.profiles.full_name || 'User'}</Text>
          </View>
        )}
      />
    </>
  );
}
