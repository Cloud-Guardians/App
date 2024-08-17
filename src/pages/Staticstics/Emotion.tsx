import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import Images from '../../constants/images';
import Boss from '../../../assets/images/boss.svg';
import {BarChart} from 'react-native-gifted-charts';
import Gold from '../../../assets/images/gold.svg';
import {staticsticsProps} from '../../types/staticstics.type';

type WeekScreenProps = {
  week: number | 'month';
  isMonthly: boolean;
  onGotoCollection: () => void;
};

const Tab = createMaterialTopTabNavigator();

// 주차 계산 함수
const getWeekOfMonth = (date: Date): number => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfMonth = startOfMonth.getDay();
  const dayOfMonth = date.getDate();
  const weekNumber = Math.ceil((dayOfMonth + firstDayOfMonth) / 7);
  return weekNumber;
};

// 차트 데이터 및 스타일 설정
const chartData = [
  {value: 80, label: '😊', frontColor: '#BBE6A1'},
  {value: 60, label: '😭', frontColor: '#A5BEDD'},
  {value: 50, label: '😤', frontColor: '#E7C8C8'},
  {value: 40, label: '😰', frontColor: '#EDC29A'},
  {value: 20, label: '😑', frontColor: '#C4C4C4'},
];

const WeekScreen: React.FC<WeekScreenProps> = ({
  week,
  isMonthly,
  onGotoCollection,
}) => (
  <ImageBackground
    style={{flex: 1}}
    resizeMode={'cover'}
    source={Images.backgroundImage}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.weekContainer}>
        <View style={styles.totalAnswer}>
          <View style={styles.totalAnswerList}>
            <Icon name="book" size={50} color={colors.darkBrown} />
            <Text style={styles.numberContainer}>27/31</Text>
          </View>
          <View style={styles.totalAnswerList}>
            <Icon name="comments" size={50} color={colors.darkBrown} />
            <Text style={styles.numberContainer}>27/31</Text>
          </View>
        </View>
        <View style={styles.totalChart}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Boss />
            <Text style={styles.chartTitle}>이 달의 평균 감정</Text>
          </View>
          <BarChart
            data={chartData}
            width={300}
            height={220}
            disablePress
            initialSpacing={20}
            spacing={30}
            barBorderRadius={4}
            yAxisThickness={0}
            xAxisThickness={1}
            xAxisColor={colors.darkBrown}
            xAxisLabelTextStyle={{
              fontFamily: Fonts.MapoFont,
              color: colors.darkBrown,
            }}
            yAxisTextStyle={{
              fontFamily: Fonts.MapoFont,
              color: colors.darkBrown,
            }}
          />
        </View>
        {isMonthly && (
          <View style={styles.podiumContainer}>
            <View style={styles.gotoCollection}>
              <TouchableOpacity
                onPress={onGotoCollection}
                style={styles.collectionButton}>
                <Text style={{fontFamily: Fonts.MapoFont}}>Collection</Text>
                <Icon name="angle-right" color={colors.darkBrown} size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.podiumItem}>
              <Text style={styles.podiumText}>2위</Text>
              <Gold width={60} height={60} />
              <View style={[styles.podiumBar, {height: 25}]} />
            </View>
            <View style={[styles.podiumItem, styles.firstPlace]}>
              <Text style={styles.podiumText}>1위</Text>
              <Gold width={70} height={70} />
              <View style={[styles.podiumBar, {height: 40}]} />
            </View>
            <View style={styles.podiumItem}>
              <Text style={styles.podiumText}>3위</Text>
              <Gold width={60} height={60} />
              <View style={[styles.podiumBar, {height: 15}]} />
            </View>
          </View>
        )}
      </View>
      <View style={styles.tipSection}>
        <Text style={styles.title}>조화로운 하루를 보내는 팁</Text>
        <View style={styles.hashtagSection}>
          <Text style={styles.hashtag}>#활동적</Text>
          <Text style={styles.hashtag}>#차분한</Text>
          <Text style={styles.hashtag}>#열정적</Text>
          <Text style={styles.hashtag}>#여유</Text>
        </View>
        <View style={styles.activitySection}>
          <Text style={styles.activity}>- 요가</Text>
          <Text style={styles.activity}>- 등산</Text>
          <Text style={styles.activity}>- 독서</Text>
          <Text style={styles.activity}>- 명상</Text>
        </View>
      </View>
    </ScrollView>
  </ImageBackground>
);

const Emotion = ({navigation}: staticsticsProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedWeek, setSelectedWeek] = useState<number>(
    getWeekOfMonth(new Date()),
  );

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined,
  ): void => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    setSelectedWeek(getWeekOfMonth(currentDate));
  };

  const renderTabs = (): JSX.Element[] => {
    const totalDaysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    const totalWeeks = getWeekOfMonth(
      new Date(date.getFullYear(), date.getMonth(), totalDaysInMonth),
    );
    let tabs: JSX.Element[] = [];

    for (let i = 1; i <= totalWeeks; i++) {
      tabs.push(
        <Tab.Screen
          key={`Week${i}`}
          name={`${i}주차`}
          component={WeekScreenComponent(i, false)}
        />,
      );
    }

    tabs.unshift(
      <Tab.Screen
        key="Month"
        name="이번 달"
        component={WeekScreenComponent('month', true)}
      />,
    );

    return tabs;
  };

  const WeekScreenComponent = (week: number | 'month', isMonthly: boolean) => {
    return () => (
      <WeekScreen
        week={week}
        isMonthly={isMonthly}
        onGotoCollection={gotoCollectionList}
      />
    );
  };

  const gotoCollectionList = () => {
    navigation.navigate('Collection');
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.selectedDate}>
          {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()} (
          {selectedWeek}주차)
        </Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Icon name="calendar" size={24} color={colors.darkBrown} />
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <View style={styles.tabContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: colors.darkBrown,
            tabBarInactiveTintColor: colors.darkBrown,
            tabBarIndicatorStyle: {
              backgroundColor: colors.darkBrown,
            },
            tabBarLabelStyle: {
              fontFamily: Fonts.MapoFont,
              fontSize: 12,
            },
            tabBarStyle: {
              backgroundColor: colors.white,
            },
          }}>
          {renderTabs()}
        </Tab.Navigator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  weekContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  selectedDate: {
    fontSize: 18,
    fontFamily: Fonts.MapoFont,
    marginRight: 10,
    backgroundColor: colors.darkBrown,
    color: colors.white,
    padding: 6,
    borderRadius: 10,
  },
  tabContainer: {
    flex: 1,
  },
  totalAnswer: {
    marginTop: 20,
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    height: 120,
    maxHeight: 120,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  totalAnswerList: {
    backgroundColor: colors.white,
    width: '44%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
    gap: 4,
  },
  numberContainer: {
    fontFamily: Fonts.MapoFont,
    backgroundColor: colors.darkBrown,
    fontSize: 16,
    padding: 4,
    borderRadius: 10,
    color: colors.white,
  },
  totalChart: {
    width: '96%',
    height: 320,
    maxHeight: 320,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
    padding: 10,
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
    color: colors.black,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 4,
    width: '96%',
    height: 160,
    maxHeight: 160,
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
    padding: 10,
    position: 'relative',
  },
  gotoCollection: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  collectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  podiumItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  firstPlace: {
    marginTop: -20,
  },
  podiumText: {
    fontSize: 14,
    fontFamily: Fonts.MapoFont,
    color: colors.black,
    marginBottom: 5,
  },
  podiumBar: {
    width: '80%',
    backgroundColor: colors.darkBrown,
    borderRadius: 6,
    marginTop: 2,
  },
  title: {
    fontFamily: Fonts.MapoFont,
    fontSize: 20,
    color: colors.black,
    marginBottom: 20,
  },
  tipSection: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: '96%',
    height: 160,
    maxHeight: 160,
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
    padding: 10,
    marginLeft: 10,
    position: 'relative',
  },
  hashtagSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  hashtag: {
    fontFamily: Fonts.MapoFont,
    fontSize: 14,
    color: colors.primaryColorSky,
    marginHorizontal: 5,
  },
  activitySection: {
    alignItems: 'center',
  },
  activity: {
    fontFamily: Fonts.MapoFont,
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
  },
  cloud: {},
});

export default Emotion;
