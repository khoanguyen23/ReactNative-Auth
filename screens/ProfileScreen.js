import { View, Text } from 'react-native'
import * as React from 'react'

export default function ProfileScreen ({navigation}) {
  return (
    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
      <Text
        onPress={() => navigation.navigate('Home')}
        style={{fontSize:26,fontWeight:'bold'}}>profile Sccreen
      </Text>
    </View>
  )
}


// import { View, Text } from 'react-native'
// import React from 'react'

// const ProfileSCreen = () => {
//   return (
//     <View>
//       <Text>ProfileSCreen</Text>
//     </View>
//   )
// }

// export default ProfileSCreen