import React, {useState, useEffect} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import S from './style';
import styled from 'styled-components/native';
import Fonts from '../../../constants/fonts';
import Images from '../../../constants/images';

 const getCurrentDateString = (date: Date) => {
       const year = date.getFullYear();
       const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1
       const day = date.getDate().toString().padStart(2, '0');
       const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

       return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
     };

const WhisperPage: React.FC = () => {

const [currentDate, setCurrentDate] = useState<string>('');

useEffect(()=>{

    const today = new Date();
    setCurrentDate(getCurrentDateString(today));

    const intervalId = setInterval(()=>{
        const now = new Date();
        setCurrentDate(getCurrentDateString(now));
        },24 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
    },[]);


const WhisperDate= ()=>(
    <WhisperHeaderView>
                <WhisperHeaderText>2024년 7월 17일 (수)</WhisperHeaderText>
            </WhisperHeaderView>
    );
const WhisperQuestion = () => (
    <WhisperQuestionView>
            <WhisperQuestionProfile source={Images.Boss}/>
            <WhisperQuestionBubble>
            <BubbleText> 오늘 이것만큼은 꼭 하고 싶다! 하는 행동이 있을까? </BubbleText>
            </WhisperQuestionBubble>
            </WhisperQuestionView>
    );

const WhisperAnswer = () => (
     <WhisperAnswerView>
                    <WhisperAnswerBubble>
                    <BubbleText>날로 프로젝트 끝내기</BubbleText>
                    </WhisperAnswerBubble>
                     <WhisperAnswerProfile/>
            </WhisperAnswerView>
    );


  return (
      <View style={{flex:1, position:'relative'}}>
    <WhisperChatRoomView>
     <WhisperDate/>
     <WhisperQuestion/>
    <WhisperAnswer/>
    </WhisperChatRoomView>


    <WhisperAnswerInputView>
     <IconLeft source={Images.Search}/>
    <WhisperAnswerInput/>
     <WhisperAnswerBtn title="send">
     <BtnText>send</BtnText>
     </WhisperAnswerBtn>
     </WhisperAnswerInputView>

    </View>
  );
};

const BubbleText = styled.Text`
margin: auto;
font-size:10px;
font-family: ${Fonts.MapoFont};
text-align: center;
color: white;
`;

const WhisperAnswerProfile = styled.Image`
right: 0;
width: 80px;
height:80px;
margin-right:10px;
border-radius:100px;
background-color:#D9D9D9;
`;

const WhisperQuestionProfile = styled.Image`
left: 0;
width: 100px;
height:100px;
border-radius:100px;
`;

const WhisperQuestionBubble = styled.View`
margin-top: 20px;
border-radius: 15px;
color: white;
right: 0;
width: 200px;
height: 50px;
background-color: #35465C;
`;


const WhisperAnswerBubble = styled.View`
margin-top: 20px;
margin-right: 20px;
border-radius: 15px;
color: white;
width: 200px;
height: 50px;
background-color: #C2D0CF;
`;


const WhisperAnswerView = styled.View`
flex-direction: row;
justify-content: flex-end;
right:0;
height: 80px;
`;

const WhisperQuestionView = styled.View`
flex-direction: row;
width: 100%;
height: 80px;
`;
const WhisperChatRoomView = styled.View`
position:relative;
height:730px;
`;

const IconLeft = styled.Image`
position:absolute;
width:20px;
height:20px;
margin-left: 10px;
background-color:red;
`;
const BtnText = styled.Text`
width: 65px;
height:31px;
font-size: 15px;
font-family: ${Fonts.MapoFont};
text-align: center;
margin-top: 5px;
`;
const WhisperAnswerBtn = styled.TouchableOpacity`
width:80px;
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


const WhisperAnswerInput = styled.TextInput`
width: 300px;
position:relative;
height:35px;
margin-left: 40px;
font-size:15px;
color: black;
`;
const WhisperAnswerInputView = styled.View`
position:absolute;
bottom:70px;
flex-direction: row;
    justifyContent: space-between;
width:100%;
border-radius:10px;
font-size: 10px;
background-color:white;
height: 35px;
border-bottom-width: 4px;
 border-bottom-color: #C2D0CF;
color:black;
`;
const WhisperHeaderView = styled.View`
width: 100%;
`;
const WhisperHeaderText = styled.Text`
text-align: center;
font-family: ${Fonts.MapoFont};
font-size: 20px;
color: 957A65;

`;


export default WhisperPage;

