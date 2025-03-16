import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';

import AddressAutocomplete from '~/components/AddressAutocomplete';
import Avatar from '~/components/Avatar';
import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function CreateEvent() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);

  const [imageUrl, setImageUrl] = useState('');

  const { user } = useAuth();

  const createEvent = async () => {
    setLoading(true);

    const long = location.features[0].geometry.coordinates[0];

    const lat = location.features[0].geometry.coordinates[1];

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title,
          description,
          date: date.toISOString(),
          user_id: user.id,
          image_uri: imageUrl,
          location: location.features[0].properties.name,
          location_point: `POINT(${long} ${lat})`,
        },
      ])
      .select()
      .single();

    if (error) {
      Alert.alert('Failed To Create Event', error.message);
    } else {
      setTitle('');
      setDescription('');
      setDate(new Date());
      router.push(`/event/${data.id}`);
    }

    setLoading(false);
  };

  return (
    <ScrollView className="flex-1" contentContainerClassName="gap-3 bg-white p-5">
      <View className="items-center">
        <Avatar
          size={200}
          url={imageUrl}
          onUpload={(url: string) => {
            setImageUrl(url);
          }}
        />
      </View>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        className="rounded-md border border-gray-200 p-3"
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
        numberOfLines={3}
        className="min-h-32 rounded-md border border-gray-200 p-3"
      />

      <Text className="rounded-md border border-gray-200 p-3" onPress={() => setOpen(true)}>
        {date.toLocaleString()}
      </Text>

      <DatePicker
        modal
        open={open}
        date={date}
        minimumDate={new Date()}
        minuteInterval={15}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <AddressAutocomplete onSelected={(location) => setLocation(location)} />

      <Pressable
        onPress={() => createEvent()}
        disabled={loading}
        className="mt-auto items-center rounded-md bg-red-300 p-3 px-8">
        <Text className="text-lg font-bold text-white">Create Event</Text>
      </Pressable>
    </ScrollView>
  );
}
