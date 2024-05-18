import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Flag from './Flag';

export default function Header({ onFlagPress, flagsLeft, onNewGame }) {
  return (
    <View style={styles.container}>
      <View style={styles.flagContainer}>
        <TouchableOpacity onPress={onFlagPress} style={styles.flagButton} activeOpacity={0.8}>
          <Flag bigger/>
        </TouchableOpacity>
        <Text style={styles.flagsLeft}>= { flagsLeft }</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onNewGame} activeOpacity={0.8}>
        <Text style={styles.buttonLabel}>New Game</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  flagContainer: {
    flexDirection: 'row',
  },
  flagButton: {
    marginTop: 10,
    minWidth: 30,
  },
  flagsLeft: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 5,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#999',
    padding: 5,
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ddd',
  },
});
