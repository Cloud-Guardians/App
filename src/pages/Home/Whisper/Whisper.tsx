import React, {useState, useEffect, useRef} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Animated, FlatList, ActivityIndicator} from 'react-native';
import S from './style';
import styled from 'styled-components/native';
import Fonts from '../../../constants/fonts';
import Images from '../../../constants/images';
import {Calendar} from 'react-native-calendars';



const WhisperPage: React.FC = () => {
const [sendDisabled, setSendDisabled] = useState(false);
const [isDisabled, setIsDisabled] = useState(false);
type Data = {
    id: number;
    date: Date;
    question: string;
    answer: string;
    }
const [isVisible, setIsVisible] = useState(false);
const [onCalendar, setOnCalendar] = useState(false);
const [whisperData, setWhisperData] = useState<Data[]>([]);
const [answerValue, setAnswerValue] = useState<string>('');


const flatListRef = useRef<FlatList<Data>>(null);

useEffect(()=>{

    setIsDisabled(isAnswered(whisperData));
     if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
     const sortedData = [...whisperData].sort((b, a) => b.date.getTime() - a.date.getTime());
        setWhisperData(sortedData);


    const whisperDataUpdate = async() => {
        try{
        const response = await fetch('http://127.0.0.1:9090/api/home/whisper?userEmail=e@d.com',{
        method:'GET',
        headers:{
            'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyRW1haWwiOiJlQGQuY29tIiwiZXhwIjoxNzI0OTQxNTcyfQ.R9mFAyyaoSXJYooRvJt9n34dspwKCNLswr0iUvbMDIgwDmgvFMI7FFE30Grb2Hm9',
            'Content-Type': 'application/json',
            },
        });
            if(response.ok){
                const data = await response.json();
                const elements = data.data.elements;
                const formattedData: Data[] = elements.map((item: any) => ({
                            id: item.whisperMessageId,
                            date: new Date(item.timestamp),
                            question: item.sender === 'SYSTEM'? item.content: null,
                            answer: item.sender === 'USER' ? item.content : null,
                          }));

                setWhisperData(formattedData);
                }

            } catch(error){
                console.error(error);}
        }
whisperDataUpdate();
    },[]);

const getMarkedDates = () =>{
    const markedDates = {};

    whisperData.forEach(item =>{
        if(item.answer != null){
            const dateString = item.date.toISOString().split('T')[0];
            markedDates[dateString]={
                selected:true,
                marked: true,
                selectedColor:'#35465C'};
            }
        });
    return markedDates;
    }

const markedDates = getMarkedDates();
const [filteredData, setFilteredData] = useState<Data[]>([]);

const filterAnswer = (day: {dateString: string}) =>{

    const filterDate = new Date(day.dateString);
   const result =  whisperData.filter(item=>
        item.date.toISOString().split('T')[0] === day.dateString
        );

        setFilteredData(result);

        if(result.length >0 && flatListRef.current){
            const index = whisperData.findIndex(item => item.date.toDateString() === filterDate.toDateString());
            flatListRef.current.scrollToIndex({index, animated: true});
            setOnCalendar(!onCalendar);
            }
    }
const WhisperDate= ({date}:{date: Date})=>(
      <WhisperHeaderView>
                <WhisperHeaderText>{date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일</WhisperHeaderText>
      </WhisperHeaderView>
    );

const WhisperQuestion = ({question}:{question: string}) => (
    <WhisperQuestionView>
            <WhisperQuestionProfile source={Images.Boss}/>
            <WhisperQuestionBubble>
            <BubbleText> {question} </BubbleText>
            </WhisperQuestionBubble>
            </WhisperQuestionView>
    );

const WhisperAnswer = ({answer}:{answer:string}) => (
     <WhisperAnswerView>
                    <WhisperAnswerBubble>
                    <BubbleText>{answer}</BubbleText>
                    </WhisperAnswerBubble>
                     <WhisperAnswerProfile/>
            </WhisperAnswerView>
    );

const sendAnswer = () =>{
    if(answerValue.trim()===''){
        Alert.alert('입력하지 않았습니다.','다시 입력해 주세요!');
        return;
        }
    const send = async () => {
        try{
            const request = await fetch ('http://127.0.0.1:9090/api/home/whisper/answer?userEmail=e@d.com',{
           method:'POST',
            body:JSON.stringify({
                content: answerValue}),
            headers:{
                        'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyRW1haWwiOiJlQGQuY29tIiwiZXhwIjoxNzI0OTM2ODE0fQ.XQPgx2gSyq7T82sbP4IZ5TfRNNqcAxOtg-XlblpxKBI80opAqk4mt0KZBzwj41tT',
                        'Content-Type': 'application/json',
                        },
            })
            } catch(error){
                console.error(error);};
        };
   if(sendDisabled==false) send();
    setAnswerValue('');
    };

const getTodayDateString = () =>{
    const today = new Date();
    today.setHours(0,0,0,0);
    return today.toDateString();
    }

const isAnswered = (data) =>{
    return data.some(item =>{
        const itemDate = new Date(item.date);
        itemDate.setHours(0,0,0,0);
        return itemDate.toDateString() === getTodayDateString() && item.answer != null;
        })
    }
const searchPress = () =>{
    setIsVisible(!isVisible);
    }

const closedPress = () =>{
    setIsVisible(false);
    setOnCalendar(false);
    }

const openCalendar = () =>{
    setOnCalendar(!onCalendar);
    };

const sendBlock = () =>{
     const filterDate = new Date(day.dateString);
       const result =  whisperData.filter(item=>
            {item.date.toISOString().split('T')[0] === day.dateString;
                         return;
            }
            );
            if(result == true) setSendDisabled(true);

    }

  return (
      <View style={{flex:1, position:'relative'}}>
      {isVisible &&
          (
              <SearchView>
                  <IconLeft
                  style={{marginRight:5, marginTop:7}}
                  source={Images.WhisperSearch}/>
                  <SearchInput/>
                  <Btn onPress={openCalendar}>
                <Icon
                style={{marginLeft:30, resizeMode:"contain", width:20}}
                source={Images.Calendar}/>
                </Btn>
                <Btn onPress={searchPress}>
                <BubbleText style={{color:"#35465C", fontSize:18}}>Back</BubbleText>
                </Btn>
                  </SearchView>
              )
          }
    <WhisperChatRoomView onTouchEnd={closedPress}>
<FlatList
ref={flatListRef}
    data={whisperData}
    keyExtractor={(item)=> item.date.toString()}
    renderItem={({item,index}) => (
        <View>
    {item.question && item.question.includes("?") && item.answer == null? (<WhisperDate date={item.date}/>):(<View/>)}
      {item.question && item.question.trim() !==""? (<WhisperQuestion question={item.question}/>):(<View/>)}
        {item.answer && item.answer.trim() !==""? (<WhisperAnswer answer={item.answer}/>):
        (<View/>)}
        </View>
        )
    }
    />
    {onCalendar && (
                        <CalendarView>
                         <Calendar
                        style={{elevation:3, borderTopLeftRadius:10, borderTopRightRadius:10}}
                         theme={{
                             selectedDayTextColor:'white',
                             textSectionTitleColor:'#35465C',
                             selectedDayBackgroundColor:'#35465C',
                             selectedDayTextColor:'white',
                             todayTextColor:'#35465C',
                             dayTextColor:'#C2D0CF',
                             selectedDotColor:'white',
                             textDisabledColor:'#C2D0CF',
                             textDayFontFamily:Fonts.MapoFont,
                             textMonthFontFamily:Fonts.MapoFont,
                             textDayHeaderFamily:Fonts.MapoFont,
                             textDayFontSize:15,
                             textMonthFontSize:18,
                             textDayHeaderFontSize:14,

                             }}
                            markedDates={markedDates}
                            current={new Date()}
                            onDayPress={filterAnswer}/>
                        </CalendarView>

                        )}
    </WhisperChatRoomView>

<WhisperAnswerInputView>
                        <SearchBtn onPress={searchPress}>
                            <IconLeft source={Images.WhisperSearch}
                            />
                            </SearchBtn>

                           <WhisperAnswerInput value={answerValue} onChangeText={text=> setAnswerValue(text)}/>
                            <WhisperAnswerBtn title="send" onPress={sendAnswer}>
                            <BtnText>send</BtnText>
                            </WhisperAnswerBtn>
                            </WhisperAnswerInputView>

    </View>
  );
};

const CalendarView = styled.View`
position: absolute;
bottom:120px;
width:100%;
`;

const SearchView = styled.View`
flex-direction: row;
justify-content: flex;
width:100%;
height: 35px;
background-color:#E8E7E7;
elevation:1;

`;
const Btn = styled.TouchableOpacity`
position:relative;
width:60px;
height:30px;
`;
const Icon = styled.Image`
position:relative;
width: 25px;
`;

const SearchInput = styled.TextInput`
width: 250px;
font-family:${Fonts.MapoFont};
height:35px;
margin-left: 40px;
font-size:15px;
color: black;
`;


const SearchBtn = styled.TouchableOpacity`
position:relative;
margin-left:5px;
width: 40px;
height: 30px;
`;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

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
flex:1;
padding-bottom:120px;
`;

const IconLeft = styled.Image`
position:absolute;
width:20px;
height:20px;
margin-top: 3px;
margin-left: 10px;
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

