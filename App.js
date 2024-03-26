import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default function App() {
  const [postList, setPostList] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
  return (
    <SafeAreaView style={styles.container}>
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

      />

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
  } 
});
