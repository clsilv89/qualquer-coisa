import { Image, StyleSheet, Platform, Button } from 'react-native';
import React, { useEffect } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context';
import { Post } from '@/api/client'

export default function HomeScreen() {

  useEffect(() => {
    fetchData()
  })

  async function fetchData() {
    const response = await Post.getPosts()
    console.log(response)
  }

  async function sendPost() {
    
  }

  return (
    <SafeAreaView>
      <Button title='Enviar Post' onPress={ () => sendPost() }/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
