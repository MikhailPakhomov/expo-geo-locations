import { StyleSheet, Text, View } from 'react-native';
import Coordinates from './components/Coordinates';

export default function App() {

  return (
    <>
      <Coordinates />
    </>

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
