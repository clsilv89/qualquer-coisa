import { Image, 
  StyleSheet, 
  Platform, 
  Button, 
  Text, 
  ScrollView,
  View, 
  TouchableHighlight, 
  TextInput,
  Alert
 } from 'react-native';
import React, { useEffect, useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context';
import { PostType } from '@/models/post.interface';
import { Post } from '@/api/client'

export default function HomeScreen() {

  const [posts, setPosts] = useState<PostType[]>()
  const [id, setId] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const response = await Post.getPosts()
    setPosts(response)
    console.log(response)
  }

  async function sendPost() {
    const response = await Post.createPost({
      userId: 0,
      title: 'Título da minha postagem',
      body: 'Corpo da minha postagem'
    })

    console.log(response)
  }

  async function sendNewPost(post: PostType) {
    const response = await Post.createPost(post)
    let postList = [...posts]
    postList.push(response)
    setPosts(postList)
  }

  async function deletePost(post: PostType) {
    Alert.alert(
      "Deletar",
      "Tem certeza de que gostaria de apagar essa postagem?",
      [
        {
          text: "Não",
          onPress: () => {}
        },
        {
          text: "Sim",
          onPress: async () => {
            const response = await Post.deletePost(post.id ?? 1000)
            console.log(response)
            let postList = [...posts]
            const postToRemove = postList.lastIndexOf(post)
            let splicedList = postList.toSpliced(postToRemove)
            setPosts(splicedList)
          }
        }
      ]
    )  
  }

  async function getAPost(id: number) {
    const response = await Post.getAPost(id)
    let list = []
    list.push(response)
    setPosts(list)
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.textInput}
            placeholder='Post Id'
            onChangeText={(text) => setId(Number(text))}
            maxLength={2}
            keyboardType='numeric'
          />
          <Button title='Buscar' onPress={() => getAPost(id)}/>
        </View>
        <Button title='Buscar Posts' onPress={() => fetchData()}/>
        <Button title='Enviar Post' onPress={ () => sendPost() }/>
        <ScrollView>
          { posts?.map((post) => {
            return (
              <TouchableHighlight 
                onPress={() => sendNewPost(post)}
                onLongPress={() => deletePost(post)}
              >
                <View style={styles.postContainer}>
                  <Text style={styles.title}>{post.title}</Text>
                  <Text>{post.body}</Text>
                  <Text style={styles.userId}>{post.userId}</Text>
                </View>
              </TouchableHighlight>
            )
          }) }
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  searchContainer: {
    margin: 8,
    flexDirection: 'row'
  },
  textInput: {
    flex: 3
  },
  button: {
    flex: 1
  },
  postContainer: {
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    margin: 10
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold'
  },
  userId: {
    textAlign: 'right',
    color: '#babaca'
  }
});
