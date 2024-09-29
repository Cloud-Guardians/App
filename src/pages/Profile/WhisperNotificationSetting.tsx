import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import colors from '../../constants/colors';
import Fonts from '../../constants/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';
import {tokenState} from '../../atoms/authAtom';
import {useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native'; // useNavigation 추가

type Notification = {
  id: number;
  time: string;
};

const WhisperNotificationSetting = () => {
  const [notificationTime, setNotificationTime] = useState('12:30');
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]); // 알림 내역 상태 추가
  const {accessToken} = useRecoilValue(tokenState);
  const navigation = useNavigation(); // useNavigation 사용

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${Config.API_BASE_URL}/api/users/notifications`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await response.json();

        // 응답 데이터 로그로 확인하기
        console.log('알림 리스트 응답 데이터:', data);

        if (data.notifications) {
          setNotifications(data.notifications);
        } else {
          console.log('알림 데이터가 없습니다.');
          setNotifications([]);
        }
      } catch (error) {
        console.error('알림 데이터 불러오기 오류:', error);
        Alert.alert('오류', '알림 내역을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [accessToken]);

  const handleSaveNotificationTime = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${Config.API_BASE_URL}/api/users/diary-notification?time=${notificationTime}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 201 || response.status === 200) {
        Alert.alert('성공', '알림 시간이 저장되었습니다.');
      } else {
        Alert.alert('오류', '알림 시간 저장에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '알림 시간 저장 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNotification = async (id: number) => {
    try {
      const response = await fetch(
        `${Config.API_BASE_URL}/api/users/diary-notification/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 200) {
        setNotifications(
          notifications.filter(notification => notification.id !== id),
        );
        Alert.alert('성공', '알림이 삭제되었습니다.');
      } else {
        Alert.alert('오류', '알림 삭제에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', '알림 삭제 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color={colors.darkBrown} />
      </TouchableOpacity>
      <Text style={styles.title}>다이어리 알림 설정</Text>

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>알림 시간</Text>
          <TextInput
            style={styles.input}
            value={notificationTime}
            onChangeText={setNotificationTime}
            placeholder="HH:MM"
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveNotificationTime}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>저장</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* 알림 내역 리스트 */}
      <FlatList
        data={notifications}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.notificationRow}>
            <Text style={styles.notificationText}>{item.time}</Text>
            <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
              <FontAwesome name="trash" size={24} color={colors.darkBrown} />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>등록된 알림이 없습니다.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.MapoFont,
    color: colors.darkBrown,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
    color: colors.darkBrown,
    marginBottom: 5,
  },
  input: {
    borderColor: colors.darkBrown,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: colors.darkBrown,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  notificationText: {
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
    color: colors.darkBrown,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.lightBrown,
    marginTop: 20,
  },
});

export default WhisperNotificationSetting;
