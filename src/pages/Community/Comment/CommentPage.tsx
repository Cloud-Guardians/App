import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Text, View, Image, TextInput, SafeAreaView,Platform,TouchableOpacity, ScrollView,StyleSheet, Animated, ActivityIndicator, ImageBackground} from 'react-native';
import Images from '../../../constants/images';
import styled from 'styled-components/native';
import Fonts from '../../../constants/fonts';
import {Commenter, PostCommenter, ReCommenter, PostReCommenter} from '../Comment/Comment';
import { useRecoilValue, useRecoilState } from 'recoil';
import { tokenState, emailState } from '../../../atoms/authAtom';
import {makeApiRequest} from '../../../utils/api';
import { Post,Comment, ChildComment } from '../../../types/community';
import {communityProp} from '../../../types/community';
import {CommentWriteBox, UserNickname} from '../CommunityDetail';


const CommentPage= ({route,navigation}: communityProps) => {
    const tokens = useRecoilValue(tokenState);
    const user = useRecoilValue(emailState);
             const accessToken= 'Bearer '+tokens.accessToken;
             const [isLiked, setIsLiked] = useState(false);
const {post} = route.params;
const diaryId= post.id;
const postWriter = post.writer;
                 const [commentData, setCommentData] = useState<Comment[]>([]);
                 const [childCommentData, setChildCommentData] = useState<Comment[]>([]);


const refreshCommentData = async () => {

    try {
        const response = await fetch(`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries/${diaryId}/comments?count=100`, {
            method: 'GET',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const elements = data.data.elements;
            console.log(elements);
            const formattedData: Comment[] = elements.map((item: any) => ({
                id: item.publicDiaryCommentId,
                publicDiaryId: diaryId,
                date: item.createdAt,
                updatedDate: item.updatedAt,
                content: item.content,
                writer: item.author.nickname,
                 writerEmail: item.author.userEmail,
                 writerProfile: item.author.profilePhotoUrl,
                likes: item.likes,
                commentPostId: item.parentCommentId,
            }));
            const commentData: Comment[] = formattedData.filter(item => item.commentPostId === null && item.publicDiaryId === diaryId);
            const repliesData: Comment[] = formattedData.filter(item => item.commentPostId !== null && item.publicDiaryId === diaryId);
        }
    } catch (error) {
        console.error('Failed to fetch comments:', error);
    }
};
    const fetchCommentData = useCallback(async () => {
        console.log("fetch Comment Data Start");
        if (post !== null) {
            try {
                console.log("diary:"+diaryId);
                console.log("diary:" + JSON.stringify(post));

                const response = await fetch(`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries/${diaryId}/comments?count=100`, {
                    method: 'GET',
                    headers: {
                        'Authorization': accessToken,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(JSON.stringify(data));
                   const elements = data.data.elements;
                                                const formattedData: Comment[] = elements.map((item: any) => ({
                                                                           id: item.publicDiaryCommentId,
                                                                               date: item.createdAt,
                                                                               publicDiaryId: diaryId,
                                                                               updatedDate:item.updatedAt,
                                                                               content: item.content,
                                                                               writer: item.author.nickname,
                                                                               writerEmail: item.author.userEmail,
                                                                               writerProfile: item.author.profilePhotoUrl,
                                                                               likes:item.likes,
                                                                               commentPostId:item.parentCommentId || null,
                                                                         }));
                                                                    const commentData: Comment[] = formattedData.filter(item => item.commentPostId === null && item.publicDiaryId === diaryId);
                                                                    const repliesData: Comment[] = formattedData.filter(item => item.commentPostId !== null && item.publicDiaryId === diaryId);
                                                                     setCommentData(commentData);
                                                                     setChildCommentData(repliesData);
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

const goBack = () => {
    navigation.goBack();
  };


useEffect(() => {
        fetchCommentData(); // diaryId가 변경될 때마다 호출
    }, [fetchCommentData, diaryId]);

    return(
           <ImageBackground
                        style={{height: '100%'}}
                        resizeMode={'cover'}
                        source={Images.backgroundImage}>
                         <HeaderView>
                         <TouchableOpacity style={{width:"10%", marginLeft:10}}onPress={goBack}>
                                            <Images.Back/>
                                                    </TouchableOpacity>
                                                    <CommentText style={{fontSize:25,width:"80%", textAlign:"center", color: "black"}}>
                                                    댓글
                                                    </CommentText>
                                                         </HeaderView>
                                 <HeaderLine/>
                    <CommentList>
                    <ScrollView >
                       {commentData.map(data => {
                           const isPostWriter = data.writer === postWriter; // 현재 로그인한 writer를 currentUserWriter 변수에 할당

                           // data에 대한 추가 정보를 담고 있는 배열
                           const replies = childCommentData || []; // replies가 없을 경우 빈 배열로 초기화

                           return (
                               <View key={data.id}>
                                   {isPostWriter ? (
                                       <PostCommenter data={data} accessToken={accessToken} user={user} style={{ transform: [{ scale: 0.8 }] }} />
                                   ) : (
                                       <Commenter data={data} accessToken={accessToken} user={user} style={{ transform: [{ scale: 0.8 }] }} />
                                   )}

                                 {replies
                                   .filter(reply => reply.commentPostId === data.id) // data.id와 reply.publicDiaryId가 같은 것만 필터링
                                   .map(reply => {
                                     return (
                                       <ReCommenter
                                         key={reply.id}
                                         accessToken={accessToken}
                                         user={user}
                                         data={reply}
                                         style={{ transform: [{ scale: 0.5 }], position: 'relative' }}
                                       />
                                     );
                                   })}
                               </View>
                           );
                       })}
                    </ScrollView>
                    </CommentList>
                        <CommentWriteBox accessToken={accessToken} refreshComments={refreshCommentData}/>

                        </ImageBackground>
        );

    };

const CommentList = styled.View`
width:100%;
margin-top:10px;
height:78%;
background-color:white;
`;
  const HeaderView = styled.View`
  width:100%;
  padding:10px;
  margin-top:20px;
  height:50px;
  flex-direction: row;
  justify-content: flex;
  `;

const CommentText = styled.Text`
font-family: ${Fonts.MapoFont};
`;


const HeaderLine = styled.View`
    width:80%;
    margin: 0 auto;
    height: 1px;
    background-color:gray;

`;
export default CommentPage;