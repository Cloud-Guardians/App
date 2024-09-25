import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Text, View, Image, TextInput, SafeAreaView,Platform,TouchableOpacity, ScrollView,StyleSheet, Animated, ActivityIndicator, ImageBackground} from 'react-native';
import Images from '../../../constants/images';
import styled from 'styled-components/native';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { likeState } from '../../../atoms/communityAtom';

const LikeButton = ({diaryId, accessToken}) => {
    const [isLiked, setIsLiked] = useRecoilState(likeState);
   const toggleLike = async () => {
         await likeUpdate(diaryId, accessToken);

         setIsLiked(prev => ({

             ...prev,
             [accessToken]: {
                 ...prev[accessToken],
                 [diaryId]: {
                     liked: !prev[accessToken]?.[diaryId]?.liked, // 해당 게시글에 대한 좋아요 상태만 변경
                 },
             },
         }));

     };
const likeUpdate = async (diaryId, accessToken) => {
                      try{
                          const toggle = await fetch (`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries/${diaryId}/likes`,{
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

const likedStatus = isLiked[accessToken]?.[diaryId]?.liked || false;
    return (
        <TouchableOpacity onPress={toggleLike}>
            {likedStatus ? <Images.UnHeart /> : <Images.Heart />}
        </TouchableOpacity>
    );
};

export default LikeButton;