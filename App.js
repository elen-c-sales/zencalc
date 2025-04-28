import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [expression, setExpression] = useState('');

  const handlePress = (symbol) => {
    if (symbol === 'AC') {
      setExpression('');
    } else if (symbol === '+/-') {
      if (expression.startsWith('-')) {
        setExpression(expression.slice(1));
      } else {
        setExpression('-' + expression);
      }
    } else if (symbol === '=') {
      try {
        const result = eval(expression.replace('%', '/100'));
        setExpression(String(result));
      } catch {
        setExpression('Erro');
      }
    } else {
      setExpression(expression + symbol);
    }
  };

  const buttons = [
    ['AC', '+/-', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{expression || '0'}</Text>
      </View>
      <View style={styles.buttonGrid}>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((symbol, j) => (
              <TouchableOpacity
                key={j}
                style={[
                  styles.button,
                  symbol === '0' ? styles.zeroButton : null,
                  isNaN(symbol) && symbol !== '.' ? styles.operatorButton : styles.numberButton
                ]}
                onPress={() => handlePress(symbol)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    symbol === 'AC' || symbol === '+/-' || symbol === '%' ? { color: 'black' } : { color: 'white' },
                  ]}
                >
                  {symbol}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  display: {
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 64,
    color: 'white',
  },
  buttonGrid: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberButton: {
    backgroundColor: '#333333',
  },
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  zeroButton: {
    width: 170,
    borderRadius: 40,
    alignItems: 'flex-start',
    paddingLeft: 30,
  },
  buttonText: {
    fontSize: 30,
  },
});
