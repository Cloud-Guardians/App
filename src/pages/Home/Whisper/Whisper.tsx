import React, {useState, useEffect, useRef} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Animated, FlatList, ActivityIndicator} from 'react-native';
import S from './style';
import styled from 'styled-components/native';
import Fonts from '../../../constants/fonts';
import Images from '../../../constants/images';
import {Calendar} from 'react-native-calendars';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../../../atoms/authAtom';
import {makeApiRequest} from '../../utils/api';


const WhisperPage: React.FC = () => {
    const tokens = useRecoilValue(tokenState);
         const accessToken= 'Bearer '+tokens.accessToken;

const [sendDisabled, setSendDisabled] = useState(false);
const [isDisabled, setIsDisabled] = useState(false);
enum WhisperSort {
    Question = 'Question',
    Answer = 'Answer',
    Finally = 'Finally'
    }

type Whisper = {
    id: number;
    date: Date;
    content: string;
    sort: WhisperSort;
    }
const [isVisible, setIsVisible] = useState(false);
const [onCalendar, setOnCalendar] = useState(false);
const [whisperData, setWhisperData] = useState<Whisper[]>([]);
const [answerValue, setAnswerValue] = useState<string>('');
const [searchText, setSearchText] = useState('');
const flatListRef = useRef<FlatList<Whisper>>(null);

 const whisperDataUpdate = async() => {

        try{
       const response = await fetch('http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/home/whisper?count=100', {
                   method: 'GET',
                   headers: {
                       'Authorization': accessToken,
                       'Content-Type': 'application/json'
                   }
               });
            if(response.ok){
                const data = await response.json();
                const elements = data.data.elements;
                const getSortValue = (item: { sender: string; content: string }): WhisperSort => {
                    if (item.sender === 'SYSTEM') {
                        if (item.content.includes('?')) {
                            return WhisperSort.Question; // 질문인 경우
                        } else {
                            return WhisperSort.Finally; // 질문이 아닌 경우
                        }
                    } else if (item.sender === 'USER') {
                        return WhisperSort.Answer; // 사용자일 경우
                    }
                    throw new Error('Invalid sender'); // 잘못된 sender 값에 대한 오류 처리
                };

                      const formattedData: Whisper[] = elements.map((item: any) => ({
                                                  id: item.whisperMessageId,
                                                  date: new Date(item.timestamp),
                                                  content: item.content,
                                                  sort: getSortValue(item),


                                                }));



                const sortedData = formattedData.sort((a, b) => {
                                     // 먼저 id를 기준으로 정렬 (오름차순)
                                     if (a.id !== b.id) {
                                       return a.id - b.id; // id가 숫자라고 가정했을 때 오름차순
                                     }
                                     // id가 같으면 date 기준으로 정렬 (오름차순)
                                     return a.date.getTime() - b.date.getTime();
                                   });
                const sortedDataByDate = sortedData.sort((a, b) => a.date.getTime() - b.date.getTime());
                const sortedDataById =sortedDataByDate.filter((item, index, self) =>
                                        index === self.findIndex((t) => t.id === item.id)
                                      );

                                setWhisperData(sortedDataById);

                                if (flatListRef.current) {
                                          flatListRef.current.scrollToEnd({animated: false });
                                        }

                }

            } catch(error){
                console.error(error);}
        }



useEffect(()=>{
    setIsDisabled(isAnswered(whisperData));
    console.log("dis:",isDisabled);
whisperDataUpdate();
getMarkedDates();

console.log("send:",isDisabled);
    },[]);

 useEffect(() => {
        // whisperData가 업데이트될 때마다 FlatList를 아래로 스크롤
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [whisperData]);

const getMarkedDates = () =>{
    const markedDates = {};

    whisperData.forEach(item =>{
        if(item.sort==='Answer'){
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
const [filteredData, setFilteredData] = useState<Whisper[]>([]);


const filterAnswer = (day: {dateString: string}) => {
    const filterDate = new Date(day.dateString);
    const result = whisperData.filter(item =>
        item.date.toISOString().split('T')[0] === day.dateString
    );

    setFilteredData(result);

    if (result.length > 0 && flatListRef.current) {
        const index = whisperData.findIndex(item => item.date.toDateString() === filterDate.toDateString());
        // List의 전체 크기와 요소의 크기를 고려하여 스크롤 위치를 조정합니다.
        flatListRef.current.scrollToOffset({offset: index * ITEM_HEIGHT, animated: true});
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
            <WhisperQuestionProfile source={Images.WhisperBoss}/>
            <WhisperQuestionBubble>
            <BubbleText>  {highlightText(question, searchText)} </BubbleText>
            </WhisperQuestionBubble>
            </WhisperQuestionView>
    );

const WhisperAnswer = ({answer}:{answer:string}) => (
     <WhisperAnswerView>
                    <WhisperAnswerBubble>
                    <BubbleText> {highlightText(answer, searchText)}</BubbleText>
                    </WhisperAnswerBubble>
                     <WhisperAnswerProfile/>
            </WhisperAnswerView>
    );

const sendAnswer = async() =>{
    if(answerValue.trim()===''){
        Alert.alert('입력하지 않았습니다.','다시 입력해 주세요!');
        return;
        }

    const send = async () => {
        try{
            const request = await fetch ('http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/home/whisper/answer',{
           method:'POST',
            body:JSON.stringify({
                content: answerValue}),
            headers:{
                        'Authorization': accessToken,
                        'Content-Type': 'application/json',
                        },
            })
const response = await request.json();
        console.log(response); // 응답 확인

        if (request.ok) {
            console.log('응답이 성공적으로 전송되었습니다.');
        } else {
            console.log('응답이 실패했습니다:', response.message);
        }
            } catch(error){
                console.error(error);};
        };

   if(!sendDisabled) {
      await send();

       }
   setAnswerValue('');
   whisperDataUpdate();
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
//     setOnCalendar(false);
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
const ITEM_HEIGHT = 80;
const [searchResults, setSearchResults] = useState<Data[]>([]);
const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
const [highlightedIndexes, setHighlightedIndexes] = useState<number[]>([]);
const [filteredSearchData, setFilteredSearchData] = useState('');
 const handleSearch = () => {
        const indexes = whisperData.reduce((acc: number[], item, index) => {
            if (item.question?.includes(searchText) || item.answer?.includes(searchText)) {
                acc.push(index);
            }
            return acc;
        }, []);

        setHighlightedIndexes(indexes);

        if (indexes.length > 0 && flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: indexes[0], animated: true });
        }
    };
 const renderItem = ({ item, index }: { item: any; index: number }) => (
        <View style={[styles.item, highlightedIndexes.includes(index) ? styles.highlighted : {}]}>
            <Text>{highlightText(item.question || item.answer, searchText)}</Text>
        </View>
    );
const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={{ backgroundColor: 'gray', color:'white' }}>{part}</Text>
        ) : (
            <Text key={index}>{part}</Text>
        )
    );
};
  return (
      <View style={{flex:1, position:'relative'}}>
      {isVisible &&
          (
              <SearchView>
              <Btn onPress={handleSearch}>
                  <IconLeft
                  style={{marginRight:5, marginTop:7}}
                  source={Images.WhisperSearch}
                  />
                                  </Btn>
                  <SearchInput value={searchText} onChangeText={text => setSearchText(text)}/>


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
    keyExtractor={(item) => item.date.toString()}
    renderItem={({ item, index }) => (
        <View>
            {item.sort === 'Question' ? (
                <>
                <WhisperDate date={item.date} />
                <WhisperQuestion question={item.content} /></>
            ) : null}
            {item.sort === 'Answer' ? (
                           <WhisperAnswer answer={item.content} />
                       ) : null}
            {item.sort === 'Finally' ? (
                <WhisperQuestion question={item.content} />
            ) : null}

        </View>
    )}
    getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    })}
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

                        {!sendDisabled && (
                          <>
                            <WhisperAnswerInput value={answerValue} onChangeText={text => setAnswerValue(text)} />
                            <WhisperAnswerBtn title="send" onPress={sendAnswer}>
                              <BtnText>send</BtnText>
                            </WhisperAnswerBtn>
                          </>
                        )}
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
width:50px;
height:50px;
margin:20px;
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
padding-bottom:60px;
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
bottom:20px;
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

export const Input = () =>(
    <WhisperAnswerInputView>
                            <SearchBtn>
                                <IconLeft source={Images.WhisperSearch}
                                />
                                </SearchBtn>

                               <WhisperAnswerInput value={answerValue} onChangeText={text=> setAnswerValue(text)}/>
                                <WhisperAnswerBtn title="send" onPress={sendAnswer}>
                                <BtnText>send</BtnText>
                                </WhisperAnswerBtn>
                                </WhisperAnswerInputView>
    );
export default WhisperPage;

