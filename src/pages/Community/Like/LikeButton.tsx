import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Text, View, Image, TextInput, SafeAreaView,Platform,TouchableOpacity, ScrollView,StyleSheet, Animated, ActivityIndicator, ImageBackground} from 'react-native';
import Images from '../../../constants/images';
import styled from 'styled-components/native';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { likeState } from '../../../atoms/communityAtom';

const LikeButton = ({diaryId, accessToken}) => {
    const initialLiked = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(()=>{
        loadLikeState();

        },[])

    const loadLikeState = async() =>{

        try{
          const likeKey = `like_${accessToken}_${diaryId}`;
          console.log(likeKey+" is likeKey");
          const storedLike = await AsyncStorage.getItem(likeKey);
          if(storedLike !=null){
              setIsLiked(JSON.parse(storedLike));
              }
            } catch(error){
                console.error(error);}
        };



   const toggleLike = async () => {
         await likeUpdate(diaryId, accessToken);

        try{
            const newLikeState = !isLiked;
            const likeKey = `like_${accessToken}_${diaryId}`;
            await AsyncStorage.setItem(likeKey, JSON.stringify(newLikeState));
            setIsLiked(newLikeState);
            } catch(error){
                console.log(error);
                }

     };

const likeUpdate = async (diaryId, accessToken) => {
                      try{
                          const toggle = await fetch (`http://localhost:9090/api/public-diaries/${diaryId}/likes`,{
                         method:'POST',
                          body:JSON.stringify({publicDiaryId:diaryId}),
                          headers:{
                                      'Authorization': accessToken,
                                      'Content-Type': 'application/json',
                                      },
                          })
                            if(toggle.ok){
                                console.log("toggle"+JSON.stringify(toggle));
                                }

                          } catch(error){
                              console.error(error);};};

    return (
        <TouchableOpacity onPress={toggleLike}>
            {isLiked ? <Images.Heart /> : <Images.UnHeart />}
        </TouchableOpacity>
    );
};

export default LikeButton;