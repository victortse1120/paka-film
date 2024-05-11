import {StyleSheet } from 'react-native'

const productStyles = StyleSheet.create({
  qtyView: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 8, 
    paddingBottom: 20  
  },
  qtyButton: {
   width: 20,
   aspectRatio: 1,
   backgroundColor: '#FFC800',
   borderRadius: 4
  },
  qtyText: {
   minWidth: 70,
   paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }
})

export default productStyles