import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Text, View, Image, TextInput, SafeAreaView,Platform,TouchableOpacity, ScrollView,StyleSheet, Animated, ActivityIndicator, ImageBackground} from 'react-native';
import Images from '../../constants/images';
import styled from 'styled-components/native';
import Fonts from '../../constants/fonts';
import {Commenter, PostCommenter} from './Comment/Comment';
import { useRecoilValue, useRecoilState } from 'recoil';
import { tokenState,emailState } from '../../atoms/authAtom';
import {likeState, todayState} from '../../atoms/communityAtom';
import {makeApiRequest} from '../../utils/api';
import { Post,Comment } from '../../types/community';
import {communityProp} from '../../types/community';
import { useNavigation } from '@react-navigation/native';
import LikeButton from './Like/LikeButton';
import {GetElement} from '../Home/HomePage';

const CommunityDetail= ({route,navigation}: communityProps) => {
    const [writer, setWriter] = useState<string>('');
    const loggedInUserEmail = useRecoilValue(emailState);
      const today = useRecoilValue(todayState);
  const tokens = useRecoilValue(tokenState);
         const accessToken= 'Bearer '+tokens.accessToken;
         const state = useRecoilValue(likeState);
         const [isLiked, setIsLiked] = useRecoilState(likeState);
         const [commentSum, setCommentSum] = useState<Comment[]>([]);
    const [diaryData, setDiaryData] = useState<Post | null>(null);
    const diaryId = route.params?.diaryId;
    const [isLoading, setIsLoading] = useState(true);
    const [isWriter, setIsWriter] = useState(false);


const goToCommentList = (post) => {
  navigation.navigate('CommentPage',{post});
};


    const fetchDiaryData = useCallback(async () => {

        console.log("fetch Diary Data Start");
        if (diaryId !== undefined) {
            try {
                console.log("diary:" + diaryId);

                const response = await fetch(`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries/${diaryId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': accessToken,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("diary content:"+JSON.stringify(data));
                    const post: Post = {
                        id: data.data.publicDiaryId,
                        writer: data.data.author.nickname,
                        title: data.data.title,
                        content: data.data.content,
                        date: data.data.createdAt.split("T")[0],
                        time: data.data.createdAt.split("T")[1],
                        photoUrl: data.data.photoUrl,
                        views: data.data.views,
                        favoriteCount: data.data.likes,
                    };
                 setWriter(data.data.author.userEmail);
                    setDiaryData(post);
                   if(loggedInUserEmail === data.data.author.userEmail ){
                       setIsWriter(true);
                       } else{
                           setIsWriter(false);
                           }
                    console.log("작성자는"+writer);

                    console.log("setDiary:" + JSON.stringify(post));
                }
            } catch (error) {
                console.error('Failed to fetch diary:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.error('diaryId is undefined');
            setIsLoading(false);
        }
    }, [diaryId]);

useEffect(() => {
        fetchDiaryData();
         updateTopTwoComments();// diaryId가 변경될 때마다 호출
    }, [fetchDiaryData]);
const goBack = () => {
    navigation.goBack();
  };

const updateTopTwoComments = async () => {
                                 try {
                                     const response = await fetch(`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries/${diaryId}/comments`, {
                                         method: 'GET',
                                         headers: {
                                             'Authorization': accessToken,
                                             'Content-Type': 'application/json'
                                         }
                                     });

                                     if (response.ok) {
                                         const data = await response.json();
                                         const elements = data.data.elements;
                                         const formattedData: Comment[] = elements.map((item: any) => ({
                                             id: item.publicDiaryCommentId,
                                             date: item.createdAt,
                                             updatedDate: item.updatedAt,
                                             content: item.content,
                                             writer: item.author.nickname,
                                             likes: item.likes,
                                             commentPostId: null,
                                         }));
                                         setCommentSum(formattedData);
                                         console.log("comment:"+JSON.stringify(commentSum));
                                     }
                                 } catch (error) {
                                     console.error('Failed to fetch comments:', error);
                                 }
                             };



const deletePost = async ()=> {
    try {
                                         const response = await fetch(`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries/${diaryId}`, {
                                             method: 'DELETE',
                                             headers: {
                                                 'Authorization': accessToken,
                                                 'Content-Type': 'application/json'
                                             }
                                         });

                                         if (response.ok) {
                                            console.log("delete done");
                                            goBack();
                                            }
                                     } catch (error) {
                                         console.error('Failed to fetch comments:', error);
                                     }
    }



const splitContent = (content) => {
  if (content.length <= 27) {
    return [content]; // 28자 이하인 경우 그대로 반환
  }

 if(content.length>27 && content.length<=54){
      const firstPart = content.slice(0, 27); // 처음 28자
       const secondPart = content.slice(27); // 나머지 문자열
       return [firstPart,secondPart]
     }

if(content.length>54 && content.length<=81){
   const firstPart = content.slice(0, 27); // 처음 28자
          const secondPart = content.slice(27,54); // 나머지 문자열
          const thirdPart = content.slice(54);
          return [firstPart,secondPart, thirdPart]
    }

if(content.length>81){
  const firstPart = content.slice(0, 27); // 처음 28자
           const secondPart = content.slice(27,54); // 나머지 문자열
           const thirdPart = content.slice(54,81);
           const fourthPart = content.slice(81);
           return [firstPart,secondPart, thirdPart, fourthPart]
    }

};

const contentLines = diaryData && diaryData.content ? splitContent(diaryData.content):[];

    return (
        <ImageBackground
                style={{height: '100%'}}
                resizeMode={'cover'}
                source={Images.backgroundImage}>
                <View style={{marginTop:5, height:25, width:"100%"}}>
               <TouchableOpacity onPress={goBack}>
               <Images.Back/>
                       </TouchableOpacity></View>
                    <PostHeaderView>
{diaryData? (<><PostTextBox>
                                   <PostText style={{fontSize:30}}>{diaryData.date.split("-")[1]}월 {diaryData.date.split("-")[2]}일 </PostText>
                                   <PostText style={{fontSize:20}}>{diaryData.time.split(":")[0]}:{diaryData.time.split(":")[1]}</PostText>

                                   </PostTextBox>

                                   <PostProfileBox>
                                    <PostTextBox style={{width:"50%", marginRight:30}}>
                                   <Icon  style={{margin:"0"}}source={Images.Fire}/>
                                   <PostText style={{ top:-18, fontSize:15}}>{diaryData.writer}</PostText></PostTextBox>
                                 {isWriter? <DeleteButton onPress={deletePost}><PostText style={{marginTop:2}}>삭제</PostText></DeleteButton> : <UnDeleteButton></UnDeleteButton>}
                                   </PostProfileBox></>):(<><Text>데이터가 존재하지 않습니다</Text></>)}

                    </PostHeaderView>

                   <DetailView>
                           {isLoading ? (
                             <ActivityIndicator size="large" color="#0000ff" />
                           ) : diaryData ? (
                             <>
                             <Images.Clip  style={{ marginTop: -10, left: "50%" }}/>
                               <PostText style={{ marginTop: 10, fontSize: 20 }}>{diaryData.title}</PostText>
                               <PostLine />
                               <PostImage source={{ uri: diaryData.photoUrl }} />
                                {contentLines.map((line, index) => (
                                     <PostContent key={index}>{line}</PostContent>
                                   ))}
                             </>
                           ) : (
                             <Text>데이터를 찾을 수 없습니다.</Text>
                           )}
                         </DetailView>

                    <ButtonBox>
                                        <TouchableOpacity onPress={()=>goToCommentList(diaryData)}>
                    <Images.Comment/>
                          </TouchableOpacity>
                          <LikeButton diaryId={diaryId} accessToken={accessToken}/>

                    <Images.Report/>

                    </ButtonBox>
                     <CommentWriteBox accessToken={accessToken} diaryId={diaryId}/>
                    <CommentBox>
                     {commentSum.length > 0 ? (
                            commentSum.map(data => {
                                const isPostWriter = diaryData && data.writer === diaryData.writer;

                                return isPostWriter ? (
                                    <PostCommenter key={data.id} data={data} />
                                ) : (
                                    <Commenter key={data.id} data={data}  />
                                );
                            })
                        ) : (
                            <PostText style={{fontSize:20}}>댓글을 남겨 보세요</PostText>
                        )}
                    </CommentBox>
                </ImageBackground>
        );
    };

export const CommentWriteBox = ({accessToken, refreshComments,diaryId})=>{

    const [writeValue, setWriteValue]=useState('');
if (typeof refreshComments === 'function') {
    refreshComments();
}
   const sendComment = () =>{
       if(writeValue.trim()===''){
          console.log('입력하지 않았습니다.');
           return;
           }
       const send = async () => {
           try{
               const request = await fetch (`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries/${diaryId}/comments`,{
              method:'POST',
               body:JSON.stringify({
                   content: writeValue}),
               headers:{
                           'Authorization': accessToken,
                           'Content-Type': 'application/json',
                           },
               })

               if(request.ok){
                if (typeof refreshComments === 'function') {
                                    await refreshComments();
                                }
                    }
               } catch(error){
                   console.error(error);};
           };
      send();
       setWriteValue('');
       };
    return(
      <CommentInputView>

                              <CommentInput value={writeValue} onChangeText={text => setWriteValue(text)}/>
                                                              <CommentBtn onPress={sendComment} title="send" >
                                                              <BtnText>write</BtnText>
                                                              </CommentBtn>
                              </CommentInputView>
        );

    };

const DeleteButton = styled.TouchableOpacity`
width:50px;
height:20px;
background-color:#E5DECA;
border-radius:5px;
margin-top:15px;
`;

const UnDeleteButton = styled.View`
width:50px;
height:20px;
border-radius:5px;
margin-top:15px;
`;
const CommentBox = styled.View`
width:90%;
top:50px;
margin: 0 auto;
height:150px;
border-radius:20px;
`;
const CommentInputView = styled.View`
top: 40px;
flex-direction: row;
    justifyContent: space-between;
width:90%;
margin:0 auto;
border-radius:10px;
font-size: 10px;
background-color:white;
height: 35px;
border-bottom-width: 4px;
 border-bottom-color: #C2D0CF;
color:black;
`;
const CommentInput = styled.TextInput`
width: 300px;
position:relative;
height:35px;
margin-left: 40px;
font-size:15px;
color: black;
`;
const BtnText = styled.Text`
width: 65px;
height:31px;
font-size: 15px;
font-family: ${Fonts.MapoFont};
text-align: center;
margin-top: 5px;
`;
const CommentBtn = styled.TouchableOpacity`
  width:80px;
  position:absolute;
  right: 2px;
  border-top-left-radius:5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height:31px;
  background-color:white;
  color: #35465C;
  overflow: hidden;
  border-left-width:8px;
  border-left-color: #35465C;
  `;

const ButtonBox = styled.View`
width:90%;
margin: 0 auto;
top: 15px;
height:20px;
flex-direction: row-reverse;
justify-content: flex;
`;
const PostContent = styled.Text`
top:30px;
padding: 5px;
font-family: ${Fonts.MapoFont};
color: black;
font-size:13px;
width:80%;
margin: 0 auto;
border-bottom-width:1px;
border-bottom-color:#B0A195;
border-bottom-style:solid;
`;
const PostImage = styled.Image `
top:20px;
width: 150px;
height: 150px;
background-color:lightgray;
border-radius: 20px;
margin: 0 auto;
`;
const PostLine = styled.View`
top:5px;
width: 80%;
background-color:#B0A195;
height: 1px;
margin: 0 auto;
`;
const DetailView = styled.View`
top:10px;
position:relative;
width:90%;
height: 400px;
border-radius: 10px;
elevation:5;
margin:0 auto;
background-color:white;
`;
const Icon = styled.Image`
position:relative;
margin-top:10px;
margin-right:10px;
width: 25px;
height: 25px;
`;
const PostProfileBox = styled.View `
flex-direction: row;
justify-content: flex;
margin-top:10px;
width:80%;
margin: 0 auto;
height:50px;
`;
const PostTextBox = styled.View`
margin: 0 auto;
`;
const PostText= styled.Text`
font-family:${Fonts.MapoFont};
text-align:center;
`;
const PostHeaderView = styled.View`
width:100%;
margin-top:10px;
height:100px;
`;
export default CommunityDetail;