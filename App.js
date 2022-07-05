import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Card } from './components/Card'
import { PieChart } from './components/PieChart'
import { expenses } from './data/expenses'

export default function App() {
  return (
    <View style={styles.container}>
      <Card>
        <PieChart expenses={expenses}></PieChart>
      </Card>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,

    backgroundColor: '#000',

    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
