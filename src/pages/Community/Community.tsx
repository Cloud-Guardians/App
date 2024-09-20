import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Image, TextInput, SafeAreaView,Platform,TouchableOpacity, ScrollView,StyleSheet, Animated, ActivityIndicator, ImageBackground} from 'react-native';
import Images from '../../constants/images';
import styled from 'styled-components/native';
import Fonts from '../../constants/fonts';
import {Commenter, PostCommenter} from './Comment/Comment';
import { useRecoilValue } from 'recoil';
import {todayState} from '../../atoms/communityAtom';
import { tokenState } from '../../atoms/authAtom';
import {makeApiRequest} from '../../utils/api';
import { Post } from '../../types/community';
import { Picker } from '@react-native-picker/picker';
import {communityProp} from '../../types/community';
import { useNavigation } from '@react-navigation/native';
import {GetElement} from '../Home/HomePage';

const Community = ({navigation}:communityProp) => {
    const today = useRecoilValue(todayState);
    const tokens = useRecoilValue(tokenState);
         const accessToken= 'Bearer '+tokens.accessToken;
         const [pickerValue, setPickerValue] = useState("제목");
         const [communityData, setCommunityData] = useState<Post[]>([]);

useEffect(()=>{
    console.log("today: "+today);
    const communityRenew = async()=>{
        try{
             const response = await fetch('http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries?count=100', {
                               method: 'GET',
                               headers: {
                                   'Authorization': accessToken,
                                   'Content-Type': 'application/json'
                               }
                           });
                       if(response.ok){
                           const data = await response.json();
                           const elements = data.data.elements;

                            const formattedData: Post[] = elements.map((item: any) => ({
                                                       id: item.publicDiaryId,
                                                           title: item.title,
                                                           date: item.timestamp,
                                                           view: item.views,
                                                           content: item.content,
                                                           writer: item.author.nickname,
                                                           favoriteCount: item.totalCommentsCount,
                                                           commentCount: item.totalLikeCount,
                                                           isBest: false,
                                                     }));
                                                 setCommunityData(formattedData);

                           }
            } catch(error){
                console.error(error);
                }
        }
    communityRenew();

     const unsubscribe = navigation.addListener('focus', () => {
                communityRenew(); // 포커스가 돌아올 때 데이터 갱신
            });

            return unsubscribe; // 언마운트 시 리스너 제거

    },[navigation])


  const PostCard = ({ data }: { data: Post }) =>(

      <View>
       <BoardSummary onPress={()=>goToDetail(data.id)}>
                          <BoardSummaryTextBox>
                          <BoardSummaryText style={{marginTop:10, fontSize:20}}>{data.title}</BoardSummaryText>
                          <BoardSummaryText numberOfLines={1} style={{ marginTop:10,fontSize:15}}>{data.content} </BoardSummaryText>
                          <BoardSummaryText style={{marginTop:10, fontSize:12}}>{data.writer}  {data.date.split("T")[1].split(":")[0]+":"+data.date.split("T")[1].split(":")[1]}  조회수 {data.view}</BoardSummaryText>
                          </BoardSummaryTextBox>
                          <BoardSummaryImage source={{uri:'${data.photoUrl}'}}/>
                          </BoardSummary>
                          <BoardSummaryIconBox>
                          <BoardSummaryText style={{fontSize:15, textAlign:"center", marginTop:2}}> {data.commentCount} </BoardSummaryText>
                          <Images.UnHeart style={{width:15, height:15, marginLeft:3, marginTop:2}}/>
      <BoardSummaryText style={{fontSize:15, textAlign:"center", marginTop:2}}> {data.favoriteCount} </BoardSummaryText>
                           <Images.Comment style={{width:15, height:15, marginLeft:3, marginTop:4}}/>

                          </BoardSummaryIconBox>
                          <BoardSummaryLine/>
                          </View>
      );

const goToDetail = (diaryId: number) => {
    console.log("goToDetail:", diaryId);
  navigation.navigate('CommunityDetail', { diaryId });
};

  return (
    <ImageBackground
         style={{height: '100%'}}
         resizeMode={'cover'}
         source={Images.backgroundImage}>
         <HeaderBox>
  <SearchView>
<BoardSummaryText style={{width:50, textAlign:"center", left:10, marginTop:10}}>{pickerValue} </BoardSummaryText>
                    <Picker
                     mode="dropdown"
                    style={{marginLeft:10, marginTop:-10, width:30, height:20}}
                    selectedValue={pickerValue}
                                            onValueChange={(item) => setPickerValue(item)}>
                     <Picker.Item label="제목" value="제목" />
                            <Picker.Item label="작성자" value="작성자" />
                            <Picker.Item label="내용" value="내용" />
                    </Picker>

                    <SearchInput />
                    <Images.Search style={{marginTop:7, marginLeft:5}}/>
                    </SearchView>
                    <Images.Alarm style={{marginRight:10, marginTop:5}}/>
                    </HeaderBox>
                    <CommunityView>
                    {communityData.map(data=>(
                        <PostCard key={data.id} data={data}/>
                        ))}
                    </CommunityView>
    </ImageBackground>
  );

};

const HeaderBox = styled.SafeAreaView`
width:100%;
margin-top:10px;
flex-direction: row;
justify-content: flex;
`;

const BoardSummary = styled.TouchableOpacity`
margin-top:10px;
flex-direction: row;
justify-content: flex;
width:100%;
padding:15px;
height:120px;
`;

const BoardSummaryIconBox = styled.View`
flex-direction: row-reverse;
justify-content: flex;
width:95%;
height:30px;
`;

const CommunityView = styled.ScrollView`
margin-top:20px;
position:relative;
flex:1;
border-radius: 10px;
margin:10px;
background-color:white;
`;

const BoardSummaryLine = styled.View`
 margin: 0 auto;
height:1px;
width:95%;
background-color:gray;
`;

const BoardSummaryTextBox = styled.View`
width:70%;
margin-left:5px;
`;
const BoardSummaryImage = styled.Image`
width:100px;
height:100px;
background-color:lightgray;
border-radius:10px;
`;
const BoardSummaryText = styled.Text`
font-family: ${Fonts.MapoFont};
color:black;
`;
const SearchView = styled.View`
width:80%;
flex-direction: row;
justify-content: flex;
height: 35px;
margin:auto;
background-color:white;
border-radius:15px;
elevation:1;

`;
const Btn = styled.TouchableOpacity`
position:relative;
width:60px;
height:30px;
`;
const Icon = styled.Image`
position:relative;
margin-top:5px;
margin-right:10px;
width: 25px;
height: 25px;
`;

const SearchInput = styled.TextInput`
width: 200px;
font-family:${Fonts.MapoFont};
height:35px;
font-size:15px;
color: black;
`;


const SearchBtn = styled.TouchableOpacity`
position:relative;
margin-left:5px;
width: 40px;
height: 30px;
`;

export default Community;
