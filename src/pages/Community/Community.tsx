import React, {useState, useEffect, useRef} from 'react';
import {TouchableWithoutFeedback, Text, View, Image, Button, TextInput, Modal, SafeAreaView,Platform,TouchableOpacity, ScrollView,StyleSheet, Animated, ActivityIndicator, ImageBackground} from 'react-native';
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
    enum NotificationSort {
        Like = 'Like',
        Comment = 'Comment'
        }

    type Notification = {
        id: number;
        diaryId: number;
        sort: NotificationSort;
        isRead: boolean;
        }



    const today = useRecoilValue(todayState);
    const [modalVisible, setModalVisible] = useState(false);
    const tokens = useRecoilValue(tokenState);
    const [notiData, setNotiData] = useState<Notification[]>([
        {id:6,diaryId:3, sort:"Like", isRead:false},{id:1, diaryId:9, sort:"Like",isRead:false},
        {id:2, diaryId: 5, sort:"Comment",isRead:true},
        {id:3,diaryId: 10, sort:"Comment",isRead:false},
        {id:4,diaryId: 11, sort:"Like",isRead:false},

        ]);
         const accessToken= 'Bearer '+tokens.accessToken;
         const [pickerValue, setPickerValue] = useState("title");
         const [communityData, setCommunityData] = useState<Post[]>([]);
         const [searchValue, setSearchValue] = useState('');
         const [searchType, setSearchType] = useState('');
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
                                                           photoUrl:item.photoUrl || '',
                                                           writer: item.author.nickname,
                                                           writerProfile: item.author.profilePhotoUrl || '',
                                                           writerEmail: item.author.userEmail,
                                                           favoriteCount: item.totalCommentsCount,
                                                           commentCount: item.totalLikeCount,
                                                           isBest: false,
                                                     }));
                                                 setCommunityData(formattedData);

                           }
                       console.log("community renew code");
            } catch(error){
                console.error(error);
                }
        }
useEffect(()=>{
    console.log("today: "+today);
console.log("community renew useEffect");
    communityRenew();

     const unsubscribe = navigation.addListener('focus', () => {
                communityRenew(); // 포커스가 돌아올 때 데이터 갱신
            });

            return unsubscribe; // 언마운트 시 리스너 제거

    },[navigation])




const goToDetail = (diaryId: number) => {
    console.log("goToDetail:", diaryId);
  navigation.navigate('CommunityDetail', { diaryId });
};


const goBack = () => {
    communityRenew();
  };
const sendKeyword = async() =>{
    if(searchValue.trim()===''){
        Alert.alert('입력하지 않았습니다.','다시 입력해 주세요!');
        return;
        }

    const search = async () => {
        try{
            const response = await fetch (`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries?count=100&searchType=${pickerValue}&keyword=${searchValue}`,{
           method:'GET',
            headers:{
                        'Authorization': accessToken,
                        'Content-Type': 'application/json',
                        },
            })
        console.log("pickerValue:",pickerValue);
        console.log("searchValue:",searchValue);
       if(response.ok){
                                  const data = await response.json();
                                  const elements = data.data.elements;

                                   const searchedData: Post[] = elements.map((item: any) => ({
                                                              id: item.publicDiaryId,
                                                                  title: item.title,
                                                                  date: item.timestamp,
                                                                  view: item.views,
                                                                  content: item.content,
                                                                    photoUrl:item.photoUrl || '',
                                                                  writer: item.author.nickname,
                                                                  writerProfile: item.author.profilePhotoUrl  || '',
                                                                  writerEmail: item.author.userEmail,
                                                                  favoriteCount: item.totalCommentsCount,
                                                                  commentCount: item.totalLikeCount,
                                                                  isBest: false,
                                                            }));

                                                        setCommunityData(searchedData);
                                                        console.log(searchedData);

        } else {
            console.log('응답이 실패했습니다:', response.message);
        }
            } catch(error){
                console.error(error);};
        };

    await search();
    setSearchValue('');


    };
const handlePress = (id: number) => {
    // data.isRead 값을 반전시켜 업데이트
    console.log("id:"+id);
    setNotiData(prevNotiData =>
        prevNotiData.map(notification =>
            notification.id === id
                ? { ...notification, isRead: !notification.isRead } // 반전
                : notification
        )
    );

};

 const NotificationLine = ({data}:{data:Notification})=>{
    if(data.sort==='Like' && data.isRead){
return <>

 <NotificationView style={{backgroundColor:"lightgray"}}>
 <TouchableOpacity style={{height:10, width:"100%"}} onPress={()=>goToDetail(data.diaryId)}>
                              <BoardSummaryText style={{fontSize:10}}>어쩌고 님이 어쩌고 글을 좋아합니다. </BoardSummaryText>
                              </TouchableOpacity>
                              </NotificationView>
                             </>;
        }
    else if(data.sort === 'Like' && !data.isRead){
return  <TouchableOpacity onPress={() => handlePress(data.id)}>
        <NotificationView>
         <TouchableOpacity style={{height:10, width:"100%"}} onPress={()=>goToDetail(data.diaryId)}>
                                     <BoardSummaryText style={{fontSize:10}}>어쩌고 님이 어쩌고 글을 좋아합니다. </BoardSummaryText>
                                    </TouchableOpacity>
                                     </NotificationView>
                                    </TouchableOpacity>
                                    ;
        }
    else if(data. sort === 'Comment' && data.isRead){ return
        <NotificationView style={{backgroundColor:"lightgray"}}>
         <TouchableOpacity style={{height:10, width:"100%"}} onPress={()=>goToDetail(data.diaryId)}>
                                     <BoardSummaryText style={{fontSize:10}}>어쩌고 님이 어쩌고 글을 좋아합니다. </BoardSummaryText>
                                     </TouchableOpacity>
                                     </NotificationView>
                                    ;
        }
    else if(data.sort === 'Comment' && !data.isRead){
         return  <TouchableOpacity onPress={() => handlePress(data.id)}>
                 <NotificationView>
                  <TouchableOpacity style={{height:10, width:"100%"}} onPress={()=>goToDetail(data.diaryId)}>
                                              <BoardSummaryText style={{fontSize:10}}>어쩌고 님이 어쩌고 글을 좋아합니다. </BoardSummaryText>
                                              </TouchableOpacity>
                                              </NotificationView>
                                             </TouchableOpacity>
                                             ;
        }

     };

  return (

    <ImageBackground
         style={{height: '100%'}}
         resizeMode={'cover'}
         source={Images.backgroundImage}>
         <HeaderBox>
         <TouchableOpacity onPress={goBack}>
                        <Image source={Images.Return} style={{width:25, height:21, marginTop:8, marginLeft:5}}/>
                                </TouchableOpacity>
  <SearchView>
<BoardSummaryText style={{width:50, textAlign:"center", left:10, marginTop:10}}>{pickerValue} </BoardSummaryText>
                    <Picker
                     mode="dropdown"
                    style={{marginLeft:10, marginTop:-10, width:30, height:20}}
                    selectedValue={pickerValue}
                                            onValueChange={(item) => setPickerValue(item)}>
                     <Picker.Item label="title" value="title" />
                            <Picker.Item label="author" value="author" />
                            <Picker.Item label="content" value="content" />
                    </Picker>

                    <SearchInput value={searchValue} onChangeText={text=> setSearchValue(text)} />
                    <TouchableOpacity onPress={sendKeyword}><Images.Search style={{marginTop:7, marginLeft:5}}/></TouchableOpacity>
                    </SearchView>
                    <TouchableOpacity onPress={() => {
                        console.log("modal state:"+modalVisible);
                        setModalVisible(true)}}>
<Images.Alarm style={{marginRight:10, marginTop:5}}/>
</TouchableOpacity>

                          <Modal
                            animationType="none"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                              setModalVisible(!modalVisible);
                            }}>
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <ModalView><BoardSummaryText style={{fontSize:15, textAlign:"center"}}>알림 목록</BoardSummaryText>
                         <BoardSummaryLine style={{marginTop:5}}/>
    <ScrollView >
    {notiData.map(data=>(

        <NotificationLine key={data.id} data={data}/>

        ))}</ScrollView>
                        </ModalView>
                        </TouchableWithoutFeedback>
                        </Modal>

                    </HeaderBox>
                    <CommunityView>
                    {communityData.map(data=>(
                        <PostCard key={data.id} data={data} goToDetail={goToDetail}/>
                        ))}
                    </CommunityView>

    </ImageBackground>

  );

};

export const PostCard = ({ data, goToDetail }: { data: Post,goToDetail: (diaryId: number) => void }) =>{


       return(
            <View>
                         <BoardSummary onPress={()=>goToDetail(data.id)}>
                                            <BoardSummaryTextBox>
                                            <BoardSummaryText style={{marginTop:10, fontSize:20}}>{data.title}</BoardSummaryText>
                                            <BoardSummaryText numberOfLines={1} style={{ marginTop:10,fontSize:15}}>{data.content} </BoardSummaryText>
                                            <BoardSummaryText style={{marginTop:10, fontSize:12}}>{data.writer}  {data.date.split("T")[1].split(":")[0]+":"+data.date.split("T")[1].split(":")[1]}  조회수 {data.view}</BoardSummaryText>
                                            </BoardSummaryTextBox>
                                            {data.photoUrl ? (
                                              <BoardSummaryImage source={{ uri: data.photoUrl }} />
                                            ) : (
                                             <BoardSummaryImage />  // 대체 텍스트 또는 기본 이미지
                                            )}
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

             };
const NotificationView = styled.View`
width:100%;
margin-top:5px;
height: 20px;
`;
const ModalView = styled.View`
width: 250px;
height: 400px;
background-color:white;
position:absolute;
right:10px;
top:50px;
padding: 20px;
border-radius:20px;
elevation:2;

`;
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
