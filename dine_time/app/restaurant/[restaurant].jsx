import { View, Text, Platform, ScrollView, FlatList, Dimensions, Image, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import DatePickerComponent from '../../components/layout/restaurant/DatePickerComponent';
export default function Restaurant() {
  const {restaurant} = useLocalSearchParams();
  const flatListRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;
  const [restaurantData,setRestaurantData]=useState({});
  const [currentIndex,setCurrentIndex] = useState(0);
  const [carouselData,setCarouselData]=useState({});
  const [slotsData,setSlotsData]=useState({});
  const [date,setDate] = useState(new Date());
  const handleNextImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex<carouselLength-1){
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        flatListRef.current.scrollToIndex({index: nextIndex , animated:true});
    }
    if (currentIndex===carouselLength-1){
        const nextIndex = 0;
        setCurrentIndex(nextIndex);
        flatListRef.current.scrollToIndex({index: nextIndex , animated:true});
    }
  };
    const handlePrevImage = () => {
    const carouselLength = carouselData[0]?.images.length;
    if (currentIndex>0){
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        flatListRef.current.scrollToIndex({index: prevIndex , animated:true});
    }
    if (currentIndex===0){
        const prevIndex = carouselLength-1;
        setCurrentIndex(prevIndex);
        flatListRef.current.scrollToIndex({index: prevIndex , animated:true});
    }
  };
  const carouselItem = ({item})=>{
    return(
      <View style={{width:windowWidth-2}}>
        <View style={{position:"absolute",
          top:"50%",
          backgroundColor:"rgba{0,0,0,0.6}",
          borderRadius:50,
          padding:5,zIndex:10,
          right:"6%"}}>
          <Ionicons onPress={handleNextImage} name="arrow-forward" size={24} color="white" />
        </View>
        <View style={{position:"absolute",
          top:"50%",
          backgroundColor:"rgba{0,0,0,0.6}",
          borderRadius:50,
          padding:5,zIndex:10,
          left:"2%"}}>
          <Ionicons onPress={handlePrevImage} name="arrow-back" size={24} color="white" />
        </View>
        <View style={{position:"absolute",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",left:"50%",transform:[{translateX:-50}],zIndex:10,bottom:15}}> 
            {carouselData[0].images?.map((_,i)=>{
              return (
                <View key={i} className={`bg-white h-2 w-2 ${i===currentIndex ? "h-3 w-3" : ""} p-1 mx-1 rounded-full`}/>
              );
            })}
        </View>
        <Image source={{uri:item}} style={{opacity:0.5,backgroundColor:"black",marginRight:20,marginLeft:5,borderRadius:25}} className="h-64"/>
      </View>
    );
  };
   const getRestaurantData = async()=>{
    try{
        const restaurantQuery = query(collection(db,"restaurants"),where("name","==",restaurant));
        const restaurantSnapshot = await getDocs(restaurantQuery);

        if(restaurantSnapshot.empty){
          console.log("No matching restaurant found");
          return;
        }

        for(const doc of restaurantSnapshot.docs) {
            const restaurantData= doc.data();
            setRestaurantData(restaurantData);

            const carouselQuery = query(
                collection(db,"carousel"),
                where("res_id","==",doc.ref)
            );
            const carouselSnapshot  = await getDocs(carouselQuery);
            const carouselImages=[];
            if(carouselImages.empty){
            console.log("No matching image found");
            return;
            }
            carouselSnapshot.forEach((carouselDoc)=>{
                carouselImages.push(carouselDoc.data());
            })
            setCarouselData(carouselImages);
            
            const slotsQuery = query(
                collection(db,"slots"),
                where("ref_id","==",doc.ref)
            );
            const slotsSnapshot  = await getDocs(slotsQuery);
            const slots=[];
            if(restaurantSnapshot.empty){
              console.log("No matching slot found");
              return;
              }
            slotsSnapshot.forEach((slotDoc)=>{
                slots.push(slotDoc.data());
            })
            setSlotsData(slots);
        }
    }catch(error){
        console.log("Error fetching data",error);
    }
   }
   const handleLocation = async() => {
    const url = "https://maps.app.goo.gl/ojkyH3Tomm25ginN6";
    const supported = await Linking.canOpenURL(url);
    if(supported){
      await Linking.canOpenURL(url);
    }else{
      console.log("Don't know how to open URI: ", url);
    }
  }
   useEffect(()=>{
    getRestaurantData();
   },[]);
   console.log(restaurantData,carouselData,slotsData);
  return (
    <SafeAreaView 
    style={[{backgroundColor:"#232946"}, 
        Platform.OS==="android" && {paddingBottom: 55},
         Platform.OS==="ios" && {paddingBottom: 20},
        ]}>
        <ScrollView className="h-full">
            <View className="flex-1 my-2 p-2">
                <Text className="text-xl text-[#f49b33] mr-2 font-semibold">
                {restaurant}
                </Text>
                <View className="border-b border-[#f49b33]"/>
            </View>
        
        <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
            <FlatList
              ref={flatListRef}
              data={carouselData[0]?.images}
              renderItem = {carouselItem}
              horizontal
              scrollEnabled = {false}
              showsHorizontalScrollIndicator={false}
              style={{borderRadius: 25}}
            />
        </View>
        <View className="flex-1 flex-row mt-2 p-2">
          <Ionicons  name="location-sharp" size={24} color="#f49b33" />
          <Text className="max-w-[75%] text-white">
            {restaurantData?.address} |{"  "}
          <Text onPress={handleLocation} className="underline flex items-center mt-1 text-[#f49b33] italic font-semibold"> Get Direction</Text>
          </Text>
        </View>
        <View className="flex-1 flex-row p-2">
          <Ionicons onPress={handlePrevImage} name="time" size={20} color="#f49b33" />
          <Text className="max-w-[75%] mx-2 font-semibold text-white">
            {restaurantData?.opening} - {restaurantData?.closing}
          
          </Text>
        </View>
        <View>
            <View className="flex-1 m-2 p-2 border-[#f49b33] rounded-lg">
              <Ionicons name="calender" size={20} color="#f49b33"/>
              <Text className="text-white mx-2">
                Select booking date
              </Text>
            </View>
          <DatePickerComponent date={date} setDate={setDate} />
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}