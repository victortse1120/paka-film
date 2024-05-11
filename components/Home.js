import {View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import defaultStyles from './../components/styles/DefaultStyles';


export default function Home() {

  const navigation = useNavigation()
    
  return (
      <View style={defaultStyles.container}>
       
      </View>
  )
}

const styles = StyleSheet.create({

})


  