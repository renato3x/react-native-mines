import { StyleSheet, View, Alert } from 'react-native';
import { parameters } from './src/parameters';
import { createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines, invertFlag, flagsUsed } from './src/functions';
import { useEffect, useState } from 'react';
import MineField from './src/components/MineField';
import Header from './src/components/Header';
import LevelSelection from './src/components/LevelSelection';

export default function App() {
  const [ board, setBoard ] = useState([[]]);
  const [ won, setWon ] = useState(false);
  const [ lost, setLost ] = useState(false);
  const [ showLevelSelection , setShowLevelSelection] = useState(false);

  function minesAmount() {
    const columns = parameters.getColumnsAmount();
    const rows = parameters.getRowsAmount();
    return Math.ceil(columns * rows * parameters.difficultLevel);
  }

  function createState() {
    const rows = parameters.getRowsAmount();
    const columns = parameters.getColumnsAmount();

    const appBoard = createMinedBoard(rows, columns, minesAmount());

    setBoard(appBoard);
    setWon(false);
    setLost(false);
    setShowLevelSelection(false);
  }

  function handleOpenField(row, column) {
    const clonedBoard = cloneBoard(board);
    openField(clonedBoard, row, column);

    const userLost = hadExplosion(clonedBoard);
    const userWon = wonGame(clonedBoard);

    if (userLost) {
      showMines(clonedBoard);
      Alert.alert('You lost!', 'Newba.');
    }
    
    if (userWon) {
      Alert.alert('You win!', 'Congratulations.');
    }

    setLost(userLost);
    setWon(userWon);
    setBoard(clonedBoard);
  }

  function handleLongPressField(row, column) {
    const clonedBoard = cloneBoard(board);
    invertFlag(clonedBoard, row, column);

    const userWon = wonGame(clonedBoard);

    if (userWon) {
      Alert.alert('You win!', 'Congratulations.');
    }

    setBoard(clonedBoard);
    setWon(userWon);
  }

  function handleLevelSelected(level) {
    parameters.difficultLevel = level;
    createState();
  }

  useEffect(createState, []);

  return (
    <View style={styles.container}>
      <LevelSelection
        visible={showLevelSelection}
        onLevelSelected={handleLevelSelected}
        onClose={() => setShowLevelSelection(false)}
      />
      <Header
        flagsLeft={minesAmount() - flagsUsed(board)}
        onNewGame={() => createState()}
        onFlagPress={() => setShowLevelSelection(true)}
      />
      <View style={styles.board}>
        <MineField
          board={board}
          onOpenField={handleOpenField}
          onLongPressField={handleLongPressField}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#aaa'
  }
});
