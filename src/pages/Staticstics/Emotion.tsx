import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {G, Rect, Text as SVGText, Svg} from 'react-native-svg';
import colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import {makeApiRequest} from '../../utils/api';
import {staticsticsProps} from '../../types/staticstics.type';

const Tab = createMaterialTopTabNavigator();

const getWeekOfMonth = (date: Date): number => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfMonth = startOfMonth.getDay();
  const dayOfMonth = date.getDate();
  return Math.ceil((dayOfMonth + firstDayOfMonth) / 7);
};

const padNumber = (num: number, size: number = 2): string => {
  let s = num.toString();
  while (s.length < size) s = '0' + s;
  return s;
};

const getWeekRange = (year: number, month: number, week: number): string => {
  const startDate = new Date(year, month, (week - 1) * 7 + 1);
  const endDate = new Date(year, month, week * 7);
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  if (endDate.getDate() > totalDaysInMonth) {
    endDate.setDate(totalDaysInMonth);
  }
  return `${startDate.getDate()}-${endDate.getDate()}일`;
};

const CustomBarChart = ({
  data,
}: {
  data: {value: number; label: string; color: string}[];
}) => {
  const barWidth = 40;
  const barSpacing = 30;
  const chartHeight = 150;
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Svg
      height={chartHeight + 50}
      width={data.length * (barWidth + barSpacing)}>
      {data.map((item, index) => {
        const barHeight =
          maxValue !== 0 ? (item.value / maxValue) * chartHeight : 0;
        return (
          <G key={index}>
            <Rect
              x={index * (barWidth + barSpacing)}
              y={chartHeight - barHeight}
              width={barWidth}
              height={barHeight >= 0 ? barHeight : 0}
              fill={item.color}
              rx={5}
            />
            <SVGText
              x={index * (barWidth + barSpacing) + barWidth / 2}
              y={chartHeight + 25}
              fontSize={12}
              fill="black"
              textAnchor="middle">
              {item.label}
            </SVGText>
            <SVGText
              x={index * (barWidth + barSpacing) + barWidth / 2}
              y={chartHeight - barHeight - 5}
              fontSize={12}
              fill="black"
              textAnchor="middle">
              {item.value}
            </SVGText>
          </G>
        );
      })}
    </Svg>
  );
};

const Emotion = ({navigation}: staticsticsProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const SummaryComponent = ({
    data,
    type,
  }: {
    data: any;
    type: 'monthly' | 'weekly';
  }) => {
    const chartData = [
      {
        value: data?.monthlyJoy || data?.weeklyJoy || 0,
        label: '😊',
        color: '#BBE6A1',
      },
      {
        value: data?.monthlySadness || data?.weeklySadness || 0,
        label: '😭',
        color: '#A5BEDD',
      },
      {
        value: data?.monthlyAnger || data?.weeklyAnger || 0,
        label: '😤',
        color: '#E7C8C8',
      },
      {
        value: data?.monthlyAnxiety || data?.weeklyAnxiety || 0,
        label: '😰',
        color: '#EDC29A',
      },
      {
        value: data?.monthlyBoredom || data?.weeklyBoredom || 0,
        label: '😑',
        color: '#C4C4C4',
      },
    ];

    return (
      <View style={styles.summaryContainer}>
        <View style={styles.bookContainer}>
          <Icon name="book" size={40} color={colors.darkBrown} />
          <Text style={styles.totalDiaryText}>{data?.totalDiary || 0}</Text>
          <Text style={styles.totalDiaryLabel}>Total Diaries</Text>
        </View>
        {type === 'monthly' && (
          <View style={styles.characterContainer}>
            <View style={styles.characterSection}>
              <Text style={styles.sectionTitle}>많은 기운</Text>
              {data.maxCharacter?.map((character: string, index: number) => (
                <Text key={index} style={styles.characterText}>
                  - {character}
                </Text>
              )) || <Text style={styles.noDataText}>데이터가 없습니다.</Text>}
            </View>
            <View style={styles.characterSection}>
              <Text style={styles.sectionTitle}>부족한 기운</Text>
              {data.minCharacter?.map((character: string, index: number) => (
                <Text key={index} style={styles.characterText}>
                  - {character}
                </Text>
              )) || <Text style={styles.noDataText}>데이터가 없습니다.</Text>}
            </View>
          </View>
        )}
        <CustomBarChart data={chartData} />
      </View>
    );
  };

  const WeekScreenComponent = ({week}: {week: number | 'month'}) => {
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [noDataMessage, setNoDataMessage] = useState<string | null>(null);

    useFocusEffect(
      React.useCallback(() => {
        const fetchData = async () => {
          const year = date.getFullYear();
          const month = date.getMonth();
          try {
            setIsLoading(true);
            setNoDataMessage(null);

            const requestUrl =
              week === 'month'
                ? `/statistics/monthly/${year}/${padNumber(month + 1)}`
                : `/statistics/weekly/${year}/${padNumber(month + 1)}/${week}`;

            const response = await makeApiRequest(
              'GET',
              requestUrl,
              undefined,
              'application/json',
            );

            if (response.status === 200 || response.status === 201) {
              setData(response.data);
            } else if (response.status === 404) {
              setNoDataMessage('아직 데이터가 없습니다.');
            } else {
              throw new Error('데이터를 불러오지 못했습니다.');
            }
          } catch (error: any) {
            setNoDataMessage('데이터를 불러오는 중 문제가 발생했습니다.');
            Alert.alert('오류', '데이터를 불러오는 중 문제가 발생했습니다.');
          } finally {
            setIsLoading(false);
          }
        };

        fetchData();
      }, [date, week]),
    );

    return (
      <View style={styles.weekContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.statisticSection}>
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.primaryColorSky} />
            ) : noDataMessage ? (
              <Text style={styles.noDataText}>{noDataMessage}</Text>
            ) : data ? (
              <SummaryComponent
                data={data.data}
                type={week === 'month' ? 'monthly' : 'weekly'}
              />
            ) : (
              <Text style={styles.noDataText}>
                아직 통계를 생성할 수 없습니다.
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderTabs = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const totalWeeks = getWeekOfMonth(new Date(year, month, totalDaysInMonth));

    const tabs = Array.from({length: totalWeeks}, (_, i) => (
      <Tab.Screen
        key={`Week${i + 1}`}
        name={`${i + 1}주차 (${getWeekRange(year, month, i + 1)})`}>
        {() => <WeekScreenComponent week={i + 1} />}
      </Tab.Screen>
    ));

    return [
      <Tab.Screen key="Month" name="이번 달">
        {() => <WeekScreenComponent week="month" />}
      </Tab.Screen>,
      ...tabs,
    ];
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <View style={styles.selectedDateContainer}>
            <Icon name="calendar" size={20} color={colors.primaryColorSky} />
            <Text style={styles.selectedDate}>
              {date.getFullYear()}-{padNumber(date.getMonth() + 1)}
            </Text>
          </View>
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
      <Tab.Navigator screenOptions={tabOptions}>{renderTabs()}</Tab.Navigator>
    </View>
  );
};

const tabOptions = {
  tabBarScrollEnabled: true,
  tabBarActiveTintColor: colors.darkBrown,
  tabBarInactiveTintColor: colors.darkBrown,
  tabBarIndicatorStyle: {backgroundColor: colors.darkBrown},
  tabBarLabelStyle: {fontFamily: Fonts.MapoFont, fontSize: 14},
  tabBarStyle: {backgroundColor: colors.white},
};

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollContainer: {flexGrow: 1},
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkBrown,
    padding: 10,
    borderRadius: 10,
  },
  selectedDate: {
    fontSize: 18,
    fontFamily: Fonts.MapoFont,
    marginLeft: 10,
    color: colors.white,
  },
  weekContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  statisticSection: {
    width: '100%',
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
  summaryContainer: {flex: 1, alignItems: 'center'},
  bookContainer: {alignItems: 'center', marginBottom: 20},
  totalDiaryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.darkBrown,
  },
  totalDiaryLabel: {fontSize: 14, color: colors.darkBrown},
  characterContainer: {
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '100%',
  },
  characterSection: {flex: 1, paddingHorizontal: 10},
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.darkBrown,
  },
  characterText: {fontSize: 14, marginBottom: 5},
  noDataText: {
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
    color: colors.primaryColorSky,
    textAlign: 'center',
  },
});

export default Emotion;
