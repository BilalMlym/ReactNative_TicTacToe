import { StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { VStack, HStack, Flex } from "react-native-flex-layout";

function Box({ value, onPress, highlighted, disabled }) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Flex
        center
        w={100}
        h={100}
        style={{ backgroundColor: highlighted ? "lightgreen" : "lightgray" }}
      >
        <Text style={{ fontSize: 56 }}>{value}</Text>
      </Flex>
    </TouchableOpacity>
  );
}

// Array(9).fill(null) = [null,null,null,null,null,null,null,null,null,]

function checkWinner(board, player) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return lines.find(([a, b, c]) => {
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
    return false;
  });
}

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [highlighted, setHighlighted] = useState([]);
  const [winner, setWinner] = useState(null);

  const handlePress = (index) => {
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winnerLine = checkWinner(newBoard);
    if (winnerLine) {
      setHighlighted(winnerLine);
      setWinner(currentPlayer);
      alert("$currentPlayer");
    } else {
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  const getBox = (index) => (
    <Box
      onPress={() => handlePress(index)}
      value={board[index]}
      highlighted={highlighted.includes(index)}
      disabled={winner || board[index]}
    />
  );

  const handleReset = () => {
    setCurrentPlayer("X");
    setBoard(Array(9).fill(null));
    setHighlighted([]);
    setWinner(null);
  };

  return (
    <VStack fill center spacing={2}>
      <Text style={{ fontSize: 45 }}>{currentPlayer} to Play</Text>
      <HStack spacing={2} shouldWrapChildren>
        {getBox(0)}
        {getBox(1)}
        {getBox(2)}
      </HStack>
      <HStack spacing={2} shouldWrapChildren>
        {getBox(3)}
        {getBox(4)}
        {getBox(5)}
      </HStack>
      <HStack spacing={2} shouldWrapChildren>
        {getBox(6)}
        {getBox(7)}
        {getBox(8)}
      </HStack>
      <Button onPress={handleReset} title="Reset"></Button>
    </VStack>
  );
}

export default App;

const styles = StyleSheet.create({});
