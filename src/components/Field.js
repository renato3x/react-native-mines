import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { parameters } from '../parameters';
import Mine from './Mine';
import Flag from './Flag';

export default function Field({ mined, opened, nearMines, exploded, flagged, onOpen, onLongPress }) {
  const styleField = [styles.field];

  if (opened) {
    styleField.push(styles.opened);
  }

  if (exploded) {
    styleField.push(styles.exploded);
  }

  if (flagged) {
    styleField.push(styles.flagged);
  }

  if (!opened && !exploded) {
    styleField.push(styles.regular);
  }

  let color = null;

  if (nearMines > 0) {
    if (nearMines == 1) {
      color = '#3a28d7';
    }

    if (nearMines == 2) {
      color = '#2b520f';
    }

    if (nearMines > 2 && nearMines < 6) {
      color = '#f9060a';
    }

    if (nearMines >= 6) {
      color = '#f221a9';
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onOpen} onLongPress={onLongPress}>
      <View style={styleField}>
        { !mined && opened && nearMines > 0 && <Text style={[styles.label, { color }]}>{ nearMines }</Text> }
        { mined && opened && <Mine/> }
        { flagged && !opened && <Flag/> }
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  field: {
    width: parameters.blockSize,
    height: parameters.blockSize,
    borderWidth: parameters.borderSize,
  },
  regular: {
    backgroundColor: '#999',
    borderLeftColor: '#ccc',
    borderTopColor: '#ccc',
    borderRightColor: '#333',
    borderBottomColor: '#333'
  },
  opened: {
    backgroundColor: '#999',
    borderColor: '#777',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: parameters.fontSize,
  },
  exploded: {
    backgroundColor: 'red',
    borderColor: 'red',
  },
});
