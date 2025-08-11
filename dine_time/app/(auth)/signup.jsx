import { View, Text, TouchableOpacity,ScrollView,Image,StatusBar} from 'react-native'
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import logo from "../../assets/images/dinetimelogo.png";
import empty from "../../assets/images/Frame.png";
import React from 'react'

const Signup = () => {
    const router = useRouter();
  return (
    <SafeAreaView className={`bg-[#232946]`}>
      <ScrollView contentContainerStyle={{height:"100%"}}>
      <View className="m-2 flex justify-center items-center">
        <Image source={logo} style={{width:300,height:300}}/>
        <Text className="text-lg text-center text-white font-bold mb-10"> 
            Let&#39;s get you started
            </Text>
        </View>    
      <View className="flex-1">
         <Image source={empty} className="w-full h-full" resizeMode="contain"/>
      </View>
      <TouchableOpacity onPress={()=>router.push("/signup")} className="p-2 m-2 bg-[#f49b33] text-black rounded-lg" >
            <Text className="text-lg font-semibold text-center">
              Sign up
            </Text>
          </TouchableOpacity>
      <StatusBar barStyle={"light-content"} backgroundColor={"#232946"}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup