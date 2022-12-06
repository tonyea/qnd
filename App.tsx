import { StyleSheet, Text, View } from 'react-native';
import { Splash } from './pages/Splash';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Splash a={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
