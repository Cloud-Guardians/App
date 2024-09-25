import React, {useState, useEffect, useRef} from 'react';
import { Text, PanResponder, View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components/native';
import S from './style';
import Fonts from '../../constants/fonts';
import { Strings } from '../../constants/strings';
import moment from 'moment';
import WhisperPage from './Whisper/Whisper';
import Images from '../../constants/images';
import LinearGradient from 'react-native-linear-gradient';
import { useRecoilValue,useRecoilState } from 'recoil';
import { tokenState } from '../../atoms/authAtom';
import {todayState} from '../../atoms/communityAtom';
import { useNavigation } from '@react-navigation/native';

interface CustomDate {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

const HomePage: React.FC = () => {
     const tokens = useRecoilValue(tokenState);
     const accessToken= 'Bearer '+tokens.accessToken;



     console.log("tokens:"+JSON.stringify(tokens));
    const navigation = useNavigation();
  const [selectedScreen, setSelectedScreen] = useState<'Diary' | 'Whisper'>('Diary');
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  type Data = {
      personalDiaryId:number;
      date: Date;
      elementPhotoUrl: string;
      joy: number;
      sadness: number;
      anger: number;
      anxiety: number;
      boredom: number;
      }

  // joy #368F3F sadness #295D9B anger #B73636 anxiety #D7801A boredom #393636


  const [diaryData, setDiaryData] = useState<Data[]>([]);
  const [todayElement,setTodayElement] = useRecoilState(todayState);

//
const colorSheet = (data: Data) => {
    const colors = [

        `rgba(255,0,0,${data.anger === 0 ? 0 : data.anger / 100})`,
        `rgba(235,184,56,${data.anxiety === 0 ? 0 : data.anxiety / 100})`,
            `rgba(140,222,33,${data.joy === 0 ? 0 : data.joy / 100})`,
          `rgba(75,170,201,${data.sadness === 0 ? 0 : data.sadness / 100})`,
            `rgba(130,130,130,${data.boredom === 0 ? 0 : data.boredom / 100})`,
    ];

 const filteredColors = colors.filter(color => {
        const alphaValue = parseFloat(color.match(/rgba\(.*?,.*?,.*?,(.*?)\)/)?.[1] || '0');
        return alphaValue > 0;
    });

  if (filteredColors.length === 1) {
         // 색상이 1개일 경우 해당 색상을 두 번 반환
         return [filteredColors[0], filteredColors[0]];
     } else if (filteredColors.length === 0) {

     }
    // 색상 배열이 유효한지 확인
    return filteredColors.length >= 2 ? filteredColors : ['rgba(0,0,0,0)', 'rgba(255,255,255,0)'];
};

useEffect(()=>{

    const calendarUpdate = async() => {
            try{
            const response = await fetch('http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/home/calendar/2024-09-20',{
            method:'GET',
            headers:{
                'Authorization': accessToken,
                'Content-Type': 'application/json',
                },
            });
                if(response.ok){
                    const data = await response.json();

                    console.log("diary data"+JSON.stringify(data));
                   const formattedData: Data[] = data.data.map((item: any) => ({
                                               personalDiaryId:item.personalDiaryId,
                                                     date: item.date,
                                                     elementPhotoUrl: item.elementPhotoUrl,
                                                     joy: item.emotionsResponse.joy,
                                                     sadness: item.emotionsResponse.sadness,
                                                    anger: item.emotionsResponse.anger,
                                                     anxiety: item.emotionsResponse.anxiety,
                                                     boredom: item.emotionsResponse.boredom,
                                             }));

                                         setDiaryData(formattedData);
                                         console.log("diary:"+JSON.stringify(formattedData));
                    }


                } catch(error){
                    console.error(error);}
            }
calendarUpdate();

    },[]);

useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayData = diaryData.filter(item => item.date === today);

    if (todayData.length > 0) {
        setTodayElement(todayData[0].elementPhotoUrl);
        console.log("존재합니다.");
    } else {
        setTodayElement('Yinyang');
    }
}, [diaryData]);
const toUpperCase = (data)=>{
    return data.charAt(0).toUpperCase()+data.slice(1);
    };



const Stick = styled.View`
margin-top:3px;
width:40px;
height:10px;
border-width:1px;
border-color:lightgray;
border-radius:20px;
`;

const Gradient = styled(LinearGradient)`
margin-top:3px;
width:40px;
height:5px;
border-radius:20px;
`;


const goToDiary = (diaryId: number) => {
    navigation.navigate('Diary', {
     screen: 'MyDiary',
     params:{diaryId}
    });
  };
  const renderDay = (date: CustomDate) => {
      const formattedDate = `${date.date.year}-${String(date.date.month).padStart(2, '0')}-${String(date.date.day).padStart(2, '0')}`;
       const filteredData: Data[] = diaryData.filter(item => item.date === formattedDate);
       //console.log("f:"+JSON.stringify(date.date));
    const color = colorSheet(filteredData);


    return (
      <S.CalendarDayContainer>
        <S.CalendarDayText>{date.date.day}</S.CalendarDayText>
        {filteredData.length > 0 ? ( // filteredData가 비어있지 않다면
            <View>
                {filteredData.map((data, index) => (
                    <View key={index}>
                    <TouchableOpacity key={index} onPress={()=> goToDiary(data.personalDiaryId)}>
                    <S.DayData source={GetCalendarElement(data.elementPhotoUrl)}/>
                    </TouchableOpacity>
                    <Gradient
                        key={index}
                        colors={colorSheet(data)}
                        start={{ x: 0, y: 3 }}
                        end={{ x: 1, y: 3 }}
                    />
                    </View>
                ))}
            </View>
        ): (
               <S.EmptyDay/>
             )}
      </S.CalendarDayContainer>
    );
  };


  const onMonthChange = (date: CustomDate) => {
    setCurrentDate(moment(date.dateString).format('YYYY-MM-DD'));
  };

  const goLastMonth = () => {
    const newDate = moment(currentDate).subtract(1, 'month').format('YYYY-MM-DD');
    setCurrentDate(newDate);
  };

  const goNextMonth = () => {
    const newDate = moment(currentDate).add(1, 'month').format('YYYY-MM-DD');
    setCurrentDate(newDate);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50) {
        goLastMonth();
      } else if (gestureState.dx < -50) {
        goNextMonth();
      }
    }
  });

  const getDiaries = (date:Date) =>{
      const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 +1 필요
          const day = String(date.getDate()).padStart(2, '0');

          // 날짜를 'YYYY-MM-DD' 형식으로 포맷
          const formattedDate = `${year}-${month}-${day}`;
             const filteredData:Data = diaryData.find(item => item.date === formattedDate);
             return filteredData || null;
      };

  return (
    <S.RootContainer>
      <S.HeaderContainer>
        <TouchableOpacity onPress={() => setSelectedScreen('Diary')}>
          <S.TypeText>
            {Strings.diaryType}
          </S.TypeText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedScreen('Whisper')}>
          <S.TypeText>
            {Strings.whisperType}
          </S.TypeText>
        </TouchableOpacity>
      </S.HeaderContainer>

      {selectedScreen === 'Diary' && (
        <>
          <S.DateContainer>
            <S.YearText>{moment(currentDate).format('YYYY')}</S.YearText>
            <S.YearText>{moment(currentDate).format('MMMM')}</S.YearText>

        {getDiaries(new Date()) !== null? (<View><TouchableOpacity onPress={()=> goToDiary(new Date())}>{GetElement(data.elementPhotoUrl)}</TouchableOpacity></View>):(<View>
            <S.Yinyang /></View>)}
          </S.DateContainer>
          <View {...panResponder.panHandlers}>
            <S.CalendarContainer>
              <Calendar
                key={currentDate} 
                current={currentDate}
                onMonthChange={onMonthChange}
                 dayComponent={renderDay}
                disableAllTouchEventsForDisabledDays={true}
                hideExtraDays={true}
                renderHeader={() => null}
                renderArrow={() => null}
                theme={{
                  textDayFontFamily: Fonts.MapoFont,
                  textMonthFontFamily: Fonts.MapoFont,
                  textDayHeaderFontFamily: Fonts.MapoFont,
                  textDayFontSize: 6,
                  textMonthFontSize: 10,
                  textDayHeaderFontSize: 16,
                  textSectionTitleFontFamily: Fonts.MapoFont,
                  textSectionTitleColor: 'black',
                }}
              />

            </S.CalendarContainer>
          </View>
        </>
      )}

      {selectedScreen === 'Whisper' && (
        <WhisperPage/>
      )}
    </S.RootContainer>
  );
};

export const GetCalendarElement =(data)=>{
    if(data===null){

        return Images.Yinyang;
        }
    if(data==='Fire'){
        return Images.Fire;
        }
    if(data==='Water'){

        return Images.Water;
        }
    if(data==='Tree'){

        return Images.Tree;
        }
    if(data==='Gold'){

        return Images.Gold;
        }
    if(data==='Soil'){

        return Images.Soil;
        }
    }


export const GetElement =(data)=>{
    if(data===null){
        setTodayElement('Yinyang');
        return <Image source={Images.Yinyang}/>;
        }
    if(data==='fire'){
        setTodayElement('Fire');
        return <Images.Fire/>
        }
    if(data==='water'){
        setTodayElement('Water');
        return <Images.Water/>
        }
    if(data==='tree'){
        setTodayElement('Tree');
        return <Images.Tree/>
        }
    if(data==='gold'){
        setTodayElement('Gold');
        return <Images.Gold/>
        }
    if(data==='soil'){
        setTodayElement('Soil');
        return <Images.Soil/>
        }
    }

export default HomePage;
