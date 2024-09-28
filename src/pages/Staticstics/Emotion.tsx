import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BarChart} from 'react-native-gifted-charts';
import colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import Images from '../../constants/images';
import {makeApiRequest} from '../../utils/api';
import {staticsticsProps} from '../../types/staticstics.type';

const Tab = createMaterialTopTabNavigator();

// Week calculation helper
const getWeekOfMonth = (date: Date): number => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfMonth = startOfMonth.getDay();
  const dayOfMonth = date.getDate();
  return Math.ceil((dayOfMonth + firstDayOfMonth) / 7);
};

const Emotion = ({navigation}: staticsticsProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedWeek, setSelectedWeek] = useState<number>(
    getWeekOfMonth(new Date()),
  );
  const [weeklyData, setWeeklyData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [noDataMessage, setNoDataMessage] = useState<string | null>(null);

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    setSelectedWeek(getWeekOfMonth(currentDate));
  };

  // Fetch weekly data
  const fetchWeeklyData = async (year: number, month: number, week: number) => {
    try {
      setIsLoading(true);
      setNoDataMessage(null); // Reset no data message
      const response = await makeApiRequest(
        'GET',
        `/statistics/weekly/${year}/${month}/${week}`,
        undefined,
        'application/json',
      );
      if (response.status === 200) {
        setWeeklyData(response.data);
        setNoDataMessage(null);
      } else if (response.status === 404) {
        setWeeklyData(null); // No data
        setNoDataMessage('아직 데이터가 없습니다.');
      } else {
        throw new Error(
          response.data.errorMessage || '주간 데이터를 불러오지 못했습니다.',
        );
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setWeeklyData(null); // No data
        setNoDataMessage('아직 데이터가 없습니다.');
      } else {
        setNoDataMessage('데이터를 불러오는 중 문제가 발생했습니다.');
        Alert.alert('오류', '데이터를 불러오는 중 문제가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    fetchWeeklyData(year, month, selectedWeek);
  }, [date, selectedWeek]);

  const WeekScreenComponent = ({week}: {week: number | 'month'}) => (
    <View style={styles.weekContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.statisticSection}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primaryColorSky} />
          ) : noDataMessage ? (
            <Text style={styles.noDataText}>{noDataMessage}</Text>
          ) : weeklyData ? (
            <View>
              <Text style={styles.chartTitle}>이 주의 감정 통계</Text>
              <BarChart
                data={[
                  {
                    value: weeklyData.weeklyJoy,
                    label: '😊',
                    frontColor: '#BBE6A1',
                  },
                  {
                    value: weeklyData.weeklySadness,
                    label: '😭',
                    frontColor: '#A5BEDD',
                  },
                  {
                    value: weeklyData.weeklyAnger,
                    label: '😤',
                    frontColor: '#E7C8C8',
                  },
                  {
                    value: weeklyData.weeklyAnxiety,
                    label: '😰',
                    frontColor: '#EDC29A',
                  },
                  {
                    value: weeklyData.weeklyBoredom,
                    label: '😑',
                    frontColor: '#C4C4C4',
                  },
                ]}
                width={300}
                height={220}
                disablePress
                barBorderRadius={4}
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor={colors.darkBrown}
              />
            </View>
          ) : (
            <Text style={styles.noDataText}>
              아직 통계를 생성할 수 없습니다.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );

  const renderTabs = () => {
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
        <Tab.Screen key={`Week${i}`} name={`${i}주차`}>
          {() => <WeekScreenComponent week={i} />}
        </Tab.Screen>,
      );
    }

    tabs.unshift(
      <Tab.Screen key="Month" name="이번 달">
        {() => <WeekScreenComponent week="month" />}
      </Tab.Screen>,
    );

    return tabs;
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  selectedDate: {
    fontSize: 18,
    fontFamily: Fonts.MapoFont,
    marginRight: 10,
    backgroundColor: colors.darkBrown,
    color: colors.white,
    padding: 10,
    borderRadius: 10,
  },
  weekContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  statisticSection: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
    color: colors.red,
    textAlign: 'center',
  },
});

export default Emotion;
