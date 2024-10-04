import React, {useState, useEffect, useRef} from 'react';
import {TouchableWithoutFeedback, Text, View, Image, Button, TextInput, Modal, SafeAreaView,Platform,TouchableOpacity, ScrollView,StyleSheet, Animated, ActivityIndicator, ImageBackground} from 'react-native';
import Images from '../../constants/images';
import styled from 'styled-components/native';
import Fonts from '../../constants/fonts';
import {Commenter, PostCommenter} from './Comment/Comment';
import { useRecoilValue } from 'recoil';
import {todayState, profileState} from '../../atoms/communityAtom';
import { tokenState } from '../../atoms/authAtom';
import {makeApiRequest} from '../../utils/api';
import { Post, Comment } from '../../types/community';
import {PostCard} from './Community';
import { Picker } from '@react-native-picker/picker';
import {communityProp} from '../../types/community';
import { useNavigation } from '@react-navigation/native';
import {GetElement} from '../Home/HomePage';

const CommunityProfile = ({route,navigation}: communityProps) =>{
const goToDetail = (diaryId: number) => {

  navigation.navigate('CommunityDetail', { diaryId });
};
  const tokens = useRecoilValue(tokenState);
         const accessToken= 'Bearer '+tokens.accessToken;
    const [postList, setPostList] = useState<Post[]>([]);
    const user = route.params;
      const [commentList, setCommentList] = useState<Comment[]>([]);
const getPostList = async()=>{
               try {
                                                   const response = await fetch(`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries/post-list?userEmail=${user.userEmail}`, {
                                                       method: 'GET',
                                                       headers: {
                                                           'Authorization': accessToken,
                                                           'Content-Type': 'application/json'
                                                       }
                                                   });

                                                   if (response.ok) {
                                                       const data = await response.json();
                                                       const elements = data.data.elements;
                                                         const formattedData: Post[] = elements.map((item: any) => ({
                                                                                                              id: item.publicDiaryId,
                                                                                                                  title: item.title,
                                                                                                                  date: item.timestamp,
                                                                                                                  view: item.views,
                                                                                                                  content: item.content,
                                                                                                                  writer: item.author.nickname,
                                                                                                                  writerProfile: item.author.profilePhotoUrl || '',
                                                                                                                  writerEmail: item.author.userEmail,
                                                                                                                  favoriteCount: item.totalCommentsCount,
                                                                                                                  commentCount: item.totalLikeCount,
                                                                                                                  isBest: false,
                                                                                                            }));

                                                  const sortData =  formattedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                                                       setPostList(sortData);


                                                   }


                                               } catch (error) {
                                                   console.error('Failed to fetch comments:', error);
                                               }

              }
      useEffect(()=>{

          getPostList();

          },[]);



    const diaryId= user;
const goBack = () => {
    navigation.goBack();
  };
    return(<ImageBackground
                    style={{height: '100%'}}
                    resizeMode={'cover'}
                    source={Images.backgroundImage}>
                    <View style={{width:"100%", height:100}}>
                    <TouchableOpacity onPress={goBack}>
                     <Images.Back/>
                    </TouchableOpacity>
                    </View>

                     <View style={{width:"100%", height:300, justifyContent:"center", alignItems:"center"}}>
                      <Image source={{uri:user.data.profilePhotoUrl}} style={{borderRadius:50, width:200, height:200}} />
                      <ProfileText style={{marginTop:20, fontSize:20}}>{user.data.writer}</ProfileText>
                     </View>

                      <View style={{width:"100%", flexDirection:"row", justifyContent:"space-between",  height:50, borderTopWidth:1, borderTopColor:"gray", borderBottomColor:"gray", borderBottomWidth:1}}>
                      <ProfileText style={{width:"50%", margin:"auto", fontSize: 15, textAlign:"center"}}> 작성글 </ProfileText>
                      <ProfileText style={{width:"50%", margin:"auto", fontSize:15, textAlign:"center"}}>댓글</ProfileText>
                      </View>
                        <ScrollView>
{postList.map(data=>(
                        <PostCard key={data.id} data={data} goToDetail={goToDetail}/>
                        ))}
                        </ScrollView>



                    </ImageBackground>);
    }



const ProfileText = styled.Text`
font-family:${Fonts.MapoFont};
color: black;
`;

export default CommunityProfile;