import React from 'react'
import { View, Text, Image, ScrollView, ImageBackground, TouchableOpacity, Platform, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from "../../assets/images/dinetimelogo.png";
import banner from "../../assets/images/homeBanner.png";
import { BlurView } from 'expo-blur';
import restaurants from '../../store/restaurants';
export default function Home() {
  const renderItem = ({item}) => (
    <TouchableOpacity className="bg-[#4f5d75] max-h-64 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow-md">
      <Image resizeMode="cover" 
        source={{uri: item.image}}
        className="h-28 mt-2 mb-1 rounded-lg"
      />
      <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
      <Text className="text-white text-base mb-2">{item.address}</Text>
      <Text className="text-white text-base mb-2">Open: {item.opening}-Close: {item.closing}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={[{backgroundColor:"#232946"}, 
    Platform.OS==="android" && {paddingBottom: 55},
     Platform.OS==="ios" && {paddingBottom: 20},
    ]}>
      <View className="flex items-center">
        <View className="bg-[#4f5d75] w-11/12 rounded-lg shadow-lg justify-between items-center flex flex-row p-2">
          <View className="flex flex-row">
            <Text className={`text-base h-10 ${Platform.OS === "ios"?"pt-[8px]":"pt-1"} align-middle text-white`}>
              {" "}
              Welcome to{" "}</Text>
            <Image resizeMode='cover' className={"w-20 h-12"} source={logo} ></Image>
          </View>
        </View>
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          resizeMode="cover"
          className="mb-4 w-full bg-[#232946] h-52 items-center justify-center"
          source={banner}
        >
          <BlurView intensity={Platform.OS=="android"?100:25}
            tint="dark"
            className="w-full p-4 shadow-lg"
          >
            <Text className="text-center text-3xl font-bold text-white">
              Dine with your loved ones 
              </Text>
          </BlurView> 
        </ImageBackground>
        <View className="p-4 bg-[#232946] flex-row items-center">
          <Text className="text-3xl text-white mr-2 font-semibold">
            Special Discount%
          </Text>
        </View>
        {
        restaurants.length>0?(
        <FlatList 
        data={restaurants} 
        renderItem={renderItem} 
        horizontal 
        contentContainerStyle={{padding:16}} 
        showsHorizontalScrollIndicator={false} 
        scrollEnabled={true}/>):
        (<ActivityIndicator animating color={"#fb9b33"}/>)
      }
      <View className="p-4 bg-[#232946] flex-row items-center">
          <Text className="text-3xl text-[#fb9b33] mr-2 font-semibold">
            Our Restaurants
          </Text>
        </View>
        {
        restaurants.length>0?(
        <FlatList 
        data={restaurants} 
        renderItem={renderItem} 
        horizontal 
        contentContainerStyle={{padding:16}} 
        showsHorizontalScrollIndicator={false} 
        scrollEnabled={true}/>):
        (<ActivityIndicator animating color={"#fb9b33"}/>)
      }
      </ScrollView>
    </SafeAreaView>
  )
}