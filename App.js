import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput, Button } from 'react-native';

export default function App() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [isPosting, setPosting] = useState(false);

  const fetchData = async (limit = 20) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
    const data = await response.json();
    setPostList(data);
    setLoading(false);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );

  }

  const addPost = async () => {
    const postData = {
      title: postTitle,
      body: postBody
    };
    setPosting(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const newPost = await response.json();
    setPostList([newPost, ...postList]);
    setPosting(false);
    setPostTitle('');
    setPostBody('');
  }
  return (
    <SafeAreaView style={styles.container}>
      <>
        {/* Post Request */}
        <View style={styles.inputContainer}>
          <TextInput title="title" placeholder='post title' style={styles.inputTitle} value={postTitle} onChangeText={text => setPostTitle(text)} />
          <TextInput title="body" placeholder='post body' style={styles.inputBody} value={postBody} onChangeText={text => setPostBody(text)} />
          <Button title={isPosting ? 'Adding...' : 'Add Post'} style={styles.postButton} onPress={addPost} disabled={isPosting} />
        </View>
        <FlatList
          data={postList}
          renderItem={({ item }) => {
            return (
              <View style={styles.listContainer}>
                <View style={styles.card}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.bodyText}>{item.body}</Text>
                </View>

              </View>

            )


          }}
          ListHeaderComponent={<Text style={styles.headerText}>Post Titles and Content</Text>}
          ListFooterComponent={<Text style={styles.footerText}>End of List</Text>}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchData(30);
            setRefreshing(false);
          }}

        />
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    paddingStart: StatusBar.currentHeight,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    alignSelf: 'center'
  },
  footerText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    alignSelf: 'center'
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 15,
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },

  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    borderColor: 'gra',
    borderWidth: 2,
    marginHorizontal: 10, 
    borderRadius: 5,
  },

  inputTitle: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderColor: 'lightgrey',
    minWidth: 300,
    paddingVertical: 10,
    paddingLeft: 5,
    borderWidth: 2,  
  },
  inputBody: {
    minHeight: 100,
    borderColor: 'lightgrey',
    borderWidth: 2,
    minWidth: 300,
    paddingLeft: 10,
  }


});
