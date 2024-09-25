import React from 'react';
import {Text, View, Image, TextInput, TouchableOpacity, ScrollView,StyleSheet, Animated, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import Images from '../../../constants/images';
import styled from 'styled-components/native';
import Fonts from '../../../constants/fonts';
import { Comment } from '../../../types/community';

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
    width:85%;
    background-color:gray;
    `;

export const Commenter = ({ data }: { data: Comment }) => {
    const date = data.date.split("T")[0].replaceAll("-",".");
            const time = data.date.split("T")[1].split(":");
    return(
     <CommentBox>
                        <CommentProfile>
                        <Icon style={{marginLeft:10, width:55, height:55}} source={Images.Fire}/>
                       <CommentText style={{fontSize:10, textAlign:"center", color:"black"}}> {data.writer} </CommentText>
                       </CommentProfile>
                       <CommentContent>
                        <CommentBubble >
                        <CommentText style={{marginTop:13, marginLeft:10}}>{data.content}</CommentText>
                        </CommentBubble>
                        <CommentText style={{marginTop:10, marginLeft:5, fontSize:10, color:"black"}}>{date} {time[0]}:{time[1]}</CommentText>
                        <CommentLineBox>
                        <CommentLine/>
                        <Images.UnHeart style={{marginLeft:3, width:10, height:10, marginTop:-10}}/>
                        <Images.Comment style={{marginLeft:3, width:10, height:10, marginTop:-10}}/>
                       </CommentLineBox>
                        </CommentContent>
                        </CommentBox>);
    };

    export const PostCommenter =({ data }: { data: Comment })=>{
        const date = data.date.split("T")[0].replaceAll("-",".");
        const time = data.date.split("T")[1].split(":");
        return( <CommentBox>
                                          <CommentContent>
                                           <CommentBubble style={{marginLeft:10}}>
                                           <CommentText style={{marginTop:13, marginLeft:10}}>{data.content}</CommentText>
                                           </CommentBubble>
                                           <CommentText style={{ right:0, marginTop:10, marginLeft:"68%", fontSize:10}}>{date} {time[0]}:{time[1]}</CommentText>
                                           <CommentLineBox>
                                           <Images.UnHeart style={{marginLeft:3, width:10, height:10, marginTop:-10}}/>
                                           <Images.Comment style={{marginLeft:3, width:10, height:10, marginTop:-10}}/>
                                          <CommentLine style={{right:5}}/>
                                          </CommentLineBox>
                                           </CommentContent>
                                            <CommentProfile>
                                                                       <Icon style={{marginLeft:10, width:55, height:55}} source={Images.Fire}/>
                                                                      <CommentText style={{fontSize:10, textAlign:"center", color:"black"}}> {data.writer} </CommentText>
                                                                      </CommentProfile>
                                           </CommentBox>);
        };

export default { Commenter, PostCommenter };