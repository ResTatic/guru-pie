import { useMemo, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'
import { TouchableWithoutFeedback } from 'react-native-web'

const RADIUS = 30
const CIRCUMFERENCE = 2 * RADIUS * Math.PI
const STROKE_COLORS = [
  'hsl(263, 100%, 30%)',
  'hsl(240, 20%, 50%)',
  'hsl(240, 30%, 70%)',
  'hsl(240, 30%, 80%)',
  'hsl(240, 30%, 90%)',
  'hsl(240, 30%, 100%)',
]

const getCircleData = (expenses, totalExpenses) =>
  expenses
    .sort((a, b) => b.value - a.value)
    .reduce(
      (acc, { id, value }) => ({
        circleData: [
          ...acc.circleData,
          {
            id,
            strokeDashoffset: -(acc.sum / totalExpenses) * CIRCUMFERENCE,
          },
        ],
        sum: acc.sum + value,
      }),
      { circleData: [], sum: 0 }
    ).circleData

export const PieChart = ({ expenses }) => {
  const [activeExpenseId, setActiveExpenseId] = useState(null)
  const totalExpenses = useMemo(() => expenses.reduce((sum, e) => sum + e.value, 0), [expenses])
  const circleData = useMemo(
    () => getCircleData(expenses, totalExpenses),
    [expenses, totalExpenses]
  )

  return (
    <View style={{ position: 'relative' }}>
      <Pressable onPress={() => setActiveExpenseId(null)}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
          <G transform="rotate(-90, 50, 50)">
            {circleData.map(({ id, strokeDashoffset }, i) => (
              <TouchableWithoutFeedback key={id} onPress={() => setActiveExpenseId(id)}>
                <G>
                  {/* first circle to blend with background and hide other underlying active circles */}
                  <Circle
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    stroke="#191919"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeDashoffset}
                    strokeWidth="12"
                  />
                  <Circle
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    fill="none"
                    stroke={STROKE_COLORS[i % STROKE_COLORS.length]}
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeDashoffset}
                    strokeWidth="10"
                    style={id === activeExpenseId ? { strokeWidth: '12' } : {}}
                  />
                </G>
              </TouchableWithoutFeedback>
            ))}
          </G>
        </Svg>
      </Pressable>
      <View pointerEvents="none" style={styles.selectedExpenseView}>
        <Text style={styles.selectedExpenseValue}>
          {(activeExpenseId
            ? expenses.find((e) => e.id === activeExpenseId).value
            : totalExpenses
          ).toLocaleString('de', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
        </Text>
        <Text style={styles.selectedExpenseName}>
          {activeExpenseId ? expenses.find((e) => e.id === activeExpenseId).name : '2022'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  selectedExpenseView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedExpenseValue: {
    color: '#fff',
    fontSize: 22,
  },
  selectedExpenseName: {
    marginTop: 8,
    color: 'gray',
  },
})
