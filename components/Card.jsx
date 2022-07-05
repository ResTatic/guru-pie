import { StyleSheet, Text, View } from 'react-native'

export const Card = (props) => (
  <View style={styles.card}>
    <Text style={styles.heading}>Verteilung aller Ausgaben</Text>
    {props.children}
    <View style={styles.footer}>
      <Text style={styles.link}>Zur Analyse {'>'}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  card: {
    maxWidth: 400,
    maxHeight: 500,
    backgroundColor: '#191919',
    borderRadius: '15px',

    flexDirection: 'column',
    justifyContent: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 22,
    padding: 16,
    marginRight: 48,
  },
  footer: {
    borderTopWidth: '1px',
    borderTopColor: '#222',
    padding: 16,

    alignItems: 'flex-end',
  },
  link: {
    color: 'hsl(170, 100%, 47%)',
  },
})
