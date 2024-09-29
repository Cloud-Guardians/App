import React, {useState} from 'react';
import {Text, View, Image, TextInput, TouchableOpacity, ScrollView,StyleSheet, Animated, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import Images from '../../../constants/images';
import styled from 'styled-components/native';
import Fonts from '../../../constants/fonts';
import { Comment } from '../../../types/community';
import {taggingState, profileState} from '../../../atoms/communityAtom';
import { useRecoilValue, useRecoilState } from 'recoil';
import CommentReport from '../Report/CommentReport';
import {UserNickname, goToUserProfile} from '../CommunityDetail';
import { useNavigation } from '@react-navigation/native';




const refreshCommentData = async (data,accessToken, diaryId) => {
        const [comment,setComment] = useState<Comment>(data);
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
                commentPostId: null,
            }));
            setComment(formattedData[0]);
            console.log("comment page & refresh");
        }
    } catch (error) {
        console.error('Failed to fetch comments:', error);
    }
};


const Icon = styled.Image`
position:relative;
margin-top:5px;
margin-right:10px;
width: 25px;
height: 25px;
`;
    const CommentBox = styled.View`
    width:90%;
    margin: 0 auto;
    flex-direction: row;
    justify-content: flex;
    height:80px;
    `;
    const CommentProfile = styled.View`
    width:20%;
    margin:auto;
    `;
    const CommentContent = styled.View`
    width:80%;
    position:relative;
    `;
    const CommentBubble = styled.View`
    margin-top:5px;
    width: 98%;
    height: 40px;
    border-radius:15px;
    elevation:5;
    background-color:white;
    `;

    const CommentLineBox = styled.View`
    flex-direction: row;
    justify-content: flex;
    width:100%;
    `;



    const CommentText = styled.Text`
    font-family: ${Fonts.MapoFont};
    color:black;
    `;

    const CommentLine = styled.View`
    margin-left:5px;
    height:0.5px;
    width:80%;
    background-color:gray;
    `;

export const Commenter = ({ data, accessToken, user }: { data: Comment, accessToken:string, user:string }) => {
    const [isWriter, setIsWriter] = useState(false);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState<Comment>(data);


     const closeModal =()=>{
            setCommentModalVisible(false);
            }
    const date = data.date.split("T")[0].replaceAll("-",".");
            const time = data.date.split("T")[1].split(":");
              const [taggedWriter, setTaggedWriter] = useRecoilState(taggingState);

              const handleTagWriter = (data)=>{
                  console.log(JSON.stringify(data));
                  setTaggedWriter({
                      writer:"@ "+data.writer,
                      id: data.id
                      });
                  console.log(taggedWriter);
                  }

              const [writeValue, setWriteValue] = useState(data.content || '');
              const modifyComment = (data)=>{
                setIsEditing(!isEditing);
                setWriteValue(data.content);
                setComment(prev => ({
                    ...prev,
                    content: data.content,
                }));
                }

    return(
     <CommentBox>
     {user === data.writerEmail ? (<><TouchableOpacity onPress={()=>deleteComment(data, accessToken)}>
                                                             <Images.Cancel style={{width:10, height:10}}/>
                                                             </TouchableOpacity>
                                                             <TouchableOpacity onPress={()=>modifyComment(data)}>
                                                                                                                          <Images.Cancel style={{width:10, height:10}}/>
                                                                                                                          </TouchableOpacity>
                                                                                                                       </>):(<></>)}
                        <CommentProfile style={{marginTop:-10}}>
                        <UserNickname data={data}/>
                       </CommentProfile>

                       <CommentContent>
                        <CommentBubble >
                       {isEditing? (<View style={{position:"relative",flexDirection:"row", justifyContent:"space-between"}}><CommentInput value={writeValue} onChangeText={text=>setWriteValue(text)}/><TouchableOpacity onPress={()=>{updateComment(data,writeValue,accessToken);
                           setIsEditing(false); }} style={{width:40, height:20,backgroundColor:"#35465C",  borderRadius:20, marginTop:10, marginRight:10}}><CommentText style={{color:"white", margin:"auto"}}>수정</CommentText></TouchableOpacity></View>):(<CommentText style={{marginTop:13, marginLeft:10}}>{writeValue}</CommentText>)
                        }
                        </CommentBubble>
                        <CommentText style={{marginTop:10, marginLeft:5, fontSize:10, color:"black"}}>{date} {time[0]}:{time[1]}</CommentText>
                        <CommentLineBox>
                        <CommentLine/>
                        <Images.UnHeart style={{marginLeft:3, width:10, height:10, marginTop:-10}}/>

                         <TouchableOpacity onPress={()=>handleTagWriter(data)}>
                        <Images.Comment style={{marginLeft:3, width:10, height:10, marginTop:-10}}/>
                        </TouchableOpacity>

                        <CommentReport diaryId={data.publicDiaryId} commentId={data.id}
                          visible={commentModalVisible} accessToken={accessToken} onClose={closeModal}/>
                       </CommentLineBox>
                        </CommentContent>
                        </CommentBox>);
    };

export const ReCommenter = ({ data, accessToken, user }: { data: Comment, accessToken:string, user:string }) => {
    const [isWriter, setIsWriter] = useState(false);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState<Comment>(data);
     const closeModal =()=>{
            setCommentModalVisible(false);
            }
    const date = data.date.split("T")[0].replaceAll("-",".");
            const time = data.date.split("T")[1].split(":");
              const [taggedWriter, setTaggedWriter] = useRecoilState(taggingState);

              const handleTagWriter = (data)=>{
                  console.log(JSON.stringify(data));
                  setTaggedWriter({
                      writer:"@ "+data.writer,
                      id: data.id
                      });
                  console.log(taggedWriter);
                  }

              const [writeValue, setWriteValue] = useState(data.content || '');
              const modifyComment = (data)=>{
                setIsEditing(!isEditing);
                setWriteValue(data.content);
                setComment(prev => ({
                    ...prev,
                    content: data.content,
                }));
                }

    return(
     <CommentBox style={{ marginRight:30, transform: [{ scale: 0.8 }], position: 'relative' }}>
     {user === data.writerEmail ? (<><TouchableOpacity onPress={()=>deleteComment(data, accessToken)}>
                                                             <Images.Cancel style={{width:10, height:10}}/>
                                                             </TouchableOpacity>
                                                             <TouchableOpacity onPress={()=>modifyComment(data)}>
                                                                                                                          <Images.Cancel style={{width:10, height:10}}/>
                                                                                                                          </TouchableOpacity>
                                                                                                                          </>):(<></>)}


                       <CommentProfile style={{marginTop:-25}}>
                         <UserNickname data={data}/>
                       </CommentProfile>
                          <CommentContent>
                        <CommentBubble style={{backgroundColor:"lightgray", marginRight:30, marginTop:-10}} >
                       {isEditing? (<View style={{position:"relative",flexDirection:"row", justifyContent:"space-between"}}><CommentInput value={writeValue} onChangeText={text=>setWriteValue(text)}/><TouchableOpacity onPress={()=>{updateComment(data,writeValue,accessToken);
                           setIsEditing(false); }} style={{width:40, height:20,backgroundColor:"#35465C",  borderRadius:20, marginTop:10, marginRight:10}}><CommentText style={{color:"white", margin:"auto"}}>수정</CommentText></TouchableOpacity></View>):(<CommentText style={{marginTop:13, marginLeft:10}}>{writeValue}</CommentText>)
                        }
                        </CommentBubble>

                        <CommentText style={{marginTop:10, marginLeft:5, fontSize:10, color:"black"}}>{date} {time[0]}:{time[1]} </CommentText>
                        <CommentLineBox>
                        <CommentLine/>
                        <Images.UnHeart style={{marginLeft:3, width:10, height:10, marginTop:-10}}/>



                        <CommentReport diaryId={data.publicDiaryId} commentId={data.id}
                          visible={commentModalVisible} accessToken={accessToken} onClose={closeModal}/>
                       </CommentLineBox>
                        </CommentContent>
                        </CommentBox>);
    };


   export const ReCommentTag = ({data}: {data: Comment}) => {
       console.log("click "+data)!

     return data;
   };
export const CommentInput = styled.TextInput`
font-family:${Fonts.MapoFont};
color: black;
font-size:10px;
padding:10px;
`;


   export const updateComment = (data, writeValue, accessToken)=>{
       console.log("수정하려는건여"+JSON.stringify(data));
       console.log(accessToken);
       const diaryId = data.publicDiaryId;
       const commentId = data.id;
       console.log(writeValue);
       const updateComment = async ()=> {

                  console.log("Start");
                  try {
                                                       const response = await fetch(`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries/${diaryId}/comments/${commentId}`, {
                                                           method: 'PUT',
                                                           body:JSON.stringify({content:writeValue}),
                                                           headers: {
                                                               'Authorization': accessToken,
                                                               'Content-Type': 'application/json'
                                                           }
                                                       });

                                                       if (response.ok) {
                                                          console.log("delete done");


                                                          }
                                                      else{
                                                          console.log("why: "+accessToken+","+writeValue+","+data.publicDiaryId);
                                                          }
                                                   } catch (error) {
                                                       console.error('Failed to fetch comments:', error);
                                                   }
                  }
              updateComment();

       };

   export const deleteComment = (data,accessToken)=>{
        console.log(JSON.stringify(data)+"to everything");


   const diaryId = data.publicDiaryId;
   console.log(diaryId);
       const commentId = data.id;
       console.log(commentId);
       console.log(accessToken);
       const deleteComment = async ()=> {
           console.log("Start");
           try {
                                                const response = await fetch(`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries/${diaryId}/comments/${commentId}`, {
                                                    method: 'DELETE',
                                                    headers: {
                                                        'Authorization': accessToken,
                                                        'Content-Type': 'application/json'
                                                    }
                                                });

                                                if (response.ok) {
                                                   console.log("delete done");

                                                   }
                                            } catch (error) {
                                                console.error('Failed to fetch comments:', error);
                                            }
           }
deleteComment();

       };


    export const PostCommenter =({ data, accessToken, user }: { data: Comment, accessToken:string, user:string })=>{
             const [isWriter, setIsWriter] = useState(false);

             const [isEditing, setIsEditing] = useState(false);
             const [comment, setComment] = useState<Comment>(data);
         const [commentModalVisible, setCommentModalVisible] = useState(false);
             const closeModal =()=>{
                    setCommentModalVisible(false);
                    }
        const date = data.date.split("T")[0].replaceAll("-",".");
        const time = data.date.split("T")[1].split(":");
const [writeValue, setWriteValue] = useState(data.content || '');
              const modifyComment = (data)=>{
                setIsEditing(!isEditing);
                setWriteValue(data.content);
                setComment(prev => ({
                    ...prev,
                    content: data.content,
                }));
                }
        const [taggedWriter, setTaggedWriter] = useRecoilState(taggingState);

              const handleTagWriter = (data)=>{
                  console.log(JSON.stringify(data));
                  setTaggedWriter({
                      writer:"@ "+data.writer,
                      id: data.id
                      });
                  console.log(taggedWriter);
                  }
        return( <CommentBox>

                                          <CommentContent>
                                           <CommentBubble style={{marginLeft:10}}>
                                            {isEditing? (<View style={{position:"relative",flexDirection:"row", justifyContent:"space-between"}}><CommentInput value={writeValue} onChangeText={text=>setWriteValue(text)}/><TouchableOpacity onPress={()=>{updateComment(data,writeValue,accessToken);
                                                                      setIsEditing(false); }} style={{width:40, height:20,backgroundColor:"#35465C",  borderRadius:20, marginTop:10, marginRight:10}}><CommentText style={{color:"white", margin:"auto"}}>수정</CommentText></TouchableOpacity></View>):(<CommentText style={{marginTop:13, marginLeft:10}}>{writeValue}</CommentText>)
                                                                   }
                                           </CommentBubble>
                                           <CommentText style={{ right:0, marginTop:10, marginLeft:"68%", fontSize:10}}>{date} {time[0]}:{time[1]}</CommentText>
                                           <CommentLineBox>
                                           <Images.UnHeart style={{marginLeft:3, width:10, height:10, marginTop:-10}}/>
                                           <TouchableOpacity onPress={()=>handleTagWriter(data)}>
                                           <Images.Comment style={{marginLeft:3, width:10, height:10, marginTop:-10}}/>
                                           </TouchableOpacity>
                                            <CommentReport diaryId={data.publicDiaryId} commentId={data.id}
                                                                     visible={commentModalVisible} accessToken={accessToken} onClose={closeModal}/>
                                          <CommentLine style={{right:5}}/>
                                          </CommentLineBox>
                                           </CommentContent>
                                            {user === data.writerEmail ? (<><TouchableOpacity onPress={()=>deleteComment(data)}>
                                                                                                        <Images.Cancel style={{width:10, height:10}}/>
                                                                                                        </TouchableOpacity></>):(<></>)}
                                            <CommentProfile style={{marginTop:-10}}>
                                                                       <UserNickname data={data}/>
                                                                      </CommentProfile>
                                           </CommentBox>);
        };

    export const PostReCommenter =({ data, accessToken, user }: { data: Comment, accessToken:string, user:string })=>{
                 const [isWriter, setIsWriter] = useState(false);

                 const [isEditing, setIsEditing] = useState(false);
                 const [comment, setComment] = useState<Comment>(data);
             const [commentModalVisible, setCommentModalVisible] = useState(false);
                 const closeModal =()=>{
                        setCommentModalVisible(false);
                        }
            const date = data.date.split("T")[0].replaceAll("-",".");
            const time = data.date.split("T")[1].split(":");
    const [writeValue, setWriteValue] = useState(data.content || '');
                  const modifyComment = (data)=>{
                    setIsEditing(!isEditing);
                    setWriteValue(data.content);
                    setComment(prev => ({
                        ...prev,
                        content: data.content,
                    }));
                    }

            return( <CommentBox style={{ marginLeft:50, transform: [{ scale: 0.8 }], position: 'relative' }}>

                                              <CommentContent>
                                               <CommentBubble style={{marginLeft:10, marginTop:-10, backgroundColor:"lightgray"}}>
                                                {isEditing? (<View style={{position:"relative",flexDirection:"row", justifyContent:"space-between"}}><CommentInput value={writeValue} onChangeText={text=>setWriteValue(text)}/><TouchableOpacity onPress={()=>{updateComment(data,writeValue,accessToken);
                                                                          setIsEditing(false); }} style={{width:40, height:20,backgroundColor:"#35465C",  borderRadius:20, marginTop:10, marginRight:10}}><CommentText style={{color:"white", margin:"auto"}}>수정</CommentText></TouchableOpacity></View>):(<CommentText style={{marginTop:13, marginLeft:10}}>{writeValue}</CommentText>)
                                                                       }
                                               </CommentBubble>
                                               <CommentText style={{ right:0, marginTop:10, marginLeft:"68%", fontSize:10}}>{date} {time[0]}:{time[1]}</CommentText>
                                               <CommentLineBox>
                                               <Images.UnHeart style={{marginLeft:3, width:10, height:10, marginTop:-10}}/>
                                                 <TouchableOpacity onPress={()=>handleTagWriter(data)}>
                                               <Images.Comment style={{marginLeft:3, width:10, height:10, marginTop:-10}}/>
                                               </TouchableOpacity>
                                                <CommentReport diaryId={data.publicDiaryId} commentId={data.id}
                                                                         visible={commentModalVisible} accessToken={accessToken} onClose={closeModal}/>
                                              <CommentLine style={{right:5}}/>
                                              </CommentLineBox>
                                               </CommentContent>
                                                {user === data.writerEmail ? (<><TouchableOpacity onPress={()=>deleteComment(data)}>
                                                                                                            <Images.Cancel style={{width:10, height:10}}/>
                                                                                                            </TouchableOpacity></>):(<></>)}
                                                <CommentProfile>
                                                                          <UserNickname data={data}/>
                                                                          </CommentProfile>
                                               </CommentBox>);
            };

export default { Commenter, PostCommenter, ReCommenter, PostReCommenter };