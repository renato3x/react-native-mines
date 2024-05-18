import { Modal, StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default function LevelSelection({ onClose, visible, onLevelSelected }) {
  return (
    <Modal
      onRequestClose={onClose}
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.frame}>
        <View style={styles.container}>
          <Text style={styles.title}>Select the level</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, styles.easy]}
            onPress={() => onLevelSelected(0.1)}
          >
            <Text style={styles.buttonLabel}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, styles.normal]}
            onPress={() => onLevelSelected(0.2)}
          >
            <Text style={styles.buttonLabel}>Normal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, styles.hard]}
            onPress={() => onLevelSelected(0.3)}
          >
            <Text style={styles.buttonLabel}>Hard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  container: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    padding: 5,
  },
  buttonLabel: {
    fontSize: 20,
    color: '#eee',
    fontWeight: 'bold',
  },
  easy: {
    backgroundColor: '#49b65d',
  },
  normal: {
    backgroundColor: '#2765f7',
  },
  hard: {
    backgroundColor: '#f23337',
  },
});
