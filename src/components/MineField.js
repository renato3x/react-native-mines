import { StyleSheet, View } from 'react-native';
import Field from './Field';

export default function MineField({ board, onOpenField, onLongPressField }) {
  const rows = board.map((row, rIndex) => {
    const fields = row.map((field, fIndex) => {
      return <Field
        {...field}
        onOpen={() => onOpenField(rIndex, fIndex)}
        onLongPress={() => onLongPressField(rIndex, fIndex)}
        key={fIndex}
      />
    });

    return <View key={rIndex} style={{ flexDirection: 'row' }}>{ fields }</View>
  });

  return <View style={styles.container}>{ rows }</View>
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  }
})
