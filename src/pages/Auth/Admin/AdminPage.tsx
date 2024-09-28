import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useRecoilValue} from 'recoil';
import {tokenState} from '../../../atoms/authAtom';
import Fonts from '../../../constants/fonts';
import Images from '../../../constants/images';
import colors from '../../../constants/colors';
import {makeApiRequest} from '../../../utils/api';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

interface DiaryReportItem {
  reportId: number;
  reporter: {
    nickname: string;
  };
  reportedDiary: {
    reportedDiaryData: {
      title: string;
      content: string;
    };
  };
  reason: string;
}

interface CommentReportItem {
  reportId: number;
  reporter: {
    nickname: string;
  };
  reportedComment: {
    content: string;
  };
  reason: string;
}

type ReportItem = DiaryReportItem | CommentReportItem;

const AdminPage = () => {
  const navigation = useNavigation();
  const {accessToken} = useRecoilValue(tokenState);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'diaries', title: '일기 신고'},
    {key: 'comments', title: '댓글 신고'},
  ]);

  const [diaryReports, setDiaryReports] = useState<DiaryReportItem[]>([]);
  const [commentReports, setCommentReports] = useState<CommentReportItem[]>([]);

  const [isPending, setIsPending] = useState(true); // 대기/완료 상태
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDismissModal, setShowDismissModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  const initialLayout = {width: Dimensions.get('window').width};

  const fetchDiaryReports = useCallback(async () => {
    try {
      const status = isPending ? 'pending' : 'dismiss';
      const response = await makeApiRequest(
        'GET',
        `admin/reports/public-diaries?status=${status}`,
        undefined,
        accessToken || undefined,
        undefined,
        true,
      );

      if (response && response.status === 200) {
        setDiaryReports(response.data.data);
      } else {
        Alert.alert(
          '오류',
          response?.data?.errorMessage ||
            '일기 신고 목록을 가져오는 데 실패했습니다.',
        );
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        Alert.alert('알림', '현재 처리할 일기 신고가 없습니다.');
      } else {
        console.error('일기 신고 목록 가져오기 오류:', error);
        Alert.alert(
          '오류',
          '일기 신고 목록을 가져오는 중 오류가 발생했습니다.',
        );
      }
    }
  }, [accessToken, isPending]);

  const fetchCommentReports = useCallback(async () => {
    try {
      const status = isPending ? 'pending' : 'dismiss';
      const response = await makeApiRequest(
        'GET',
        `admin/reports/comments?status=${status}`,
        undefined,
        accessToken || undefined,
        undefined,
        true,
      );

      if (response && response.status === 200) {
        setCommentReports(response.data.data);
      } else {
        Alert.alert(
          '오류',
          response?.data?.errorMessage ||
            '댓글 신고 목록을 가져오는 데 실패했습니다.',
        );
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        Alert.alert('알림', '현재 처리할 댓글 신고가 없습니다.');
      } else {
        console.error('댓글 신고 목록 가져오기 오류:', error);
        Alert.alert(
          '오류',
          '댓글 신고 목록을 가져오는 중 오류가 발생했습니다.',
        );
      }
    }
  }, [accessToken, isPending]);

  useEffect(() => {
    fetchDiaryReports();
    fetchCommentReports();
  }, [fetchDiaryReports, fetchCommentReports]);

  const handleDeleteReport = async (report: ReportItem) => {
    // TODO: 서버에 삭제 요청 보내기
    try {
      const response = await makeApiRequest(
        'DELETE',
        `admin/reports/${report.reportId}`,
        undefined,
        accessToken || undefined,
        undefined,
        true,
      );

      if (response && response.status === 200) {
        Alert.alert('알림', '글이 삭제되었습니다.');
        fetchDiaryReports();
        fetchCommentReports();
      } else {
        Alert.alert('오류', '글 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('글 삭제 오류:', error);
      Alert.alert('오류', '글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleDismissReport = async (report: ReportItem) => {
    // TODO: 서버에 기각 요청 보내기
    try {
      const response = await makeApiRequest(
        'PUT',
        `admin/reports/${report.reportId}/dismiss`,
        undefined,
        accessToken || undefined,
        undefined,
        true,
      );

      if (response && response.status === 200) {
        Alert.alert('알림', '신고가 기각되었습니다.');
        fetchDiaryReports();
        fetchCommentReports();
      } else {
        Alert.alert('오류', '신고 기각에 실패했습니다.');
      }
    } catch (error) {
      console.error('신고 기각 오류:', error);
      Alert.alert('오류', '신고 기각 중 오류가 발생했습니다.');
    }
  };

  const renderDiaryItem = ({item}: {item: DiaryReportItem}) => (
    <View style={styles.reportItem}>
      <Text style={styles.reportTitle}>신고 ID: {item.reportId}</Text>
      <Text style={styles.reportText}>신고자: {item.reporter.nickname}</Text>
      <Text style={styles.reportText}>
        제목: {item.reportedDiary.reportedDiaryData.title}
      </Text>
      <Text style={styles.reportText}>
        내용: {item.reportedDiary.reportedDiaryData.content}
      </Text>
      <Text style={styles.reportText}>신고 사유: {item.reason}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => {
            setSelectedReport(item);
            setShowDeleteModal(true);
          }}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={() => {
            setSelectedReport(item);
            setShowDismissModal(true);
          }}>
          <Text style={styles.dismissButtonText}>기각</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCommentItem = ({item}: {item: CommentReportItem}) => (
    <View style={styles.reportItem}>
      <Text style={styles.reportTitle}>신고 ID: {item.reportId}</Text>
      <Text style={styles.reportText}>신고자: {item.reporter.nickname}</Text>
      <Text style={styles.reportText}>
        댓글 내용: {item.reportedComment.content}
      </Text>
      <Text style={styles.reportText}>신고 사유: {item.reason}</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => {
            setSelectedReport(item);
            setShowDeleteModal(true);
          }}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={() => {
            setSelectedReport(item);
            setShowDismissModal(true);
          }}>
          <Text style={styles.dismissButtonText}>기각</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const DiariesRoute = () => (
    <FlatList
      data={diaryReports}
      renderItem={renderDiaryItem}
      keyExtractor={item => item.reportId.toString()}
      contentContainerStyle={styles.listContent}
    />
  );

  const CommentsRoute = () => (
    <FlatList
      data={commentReports}
      renderItem={renderCommentItem}
      keyExtractor={item => item.reportId.toString()}
      contentContainerStyle={styles.listContent}
    />
  );

  const renderScene = SceneMap({
    diaries: DiariesRoute,
    comments: CommentsRoute,
  });

  return (
    <ImageBackground
      source={Images.backgroundImage}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        {/* 헤더 영역 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={24} color={colors.darkBrown} />
          </TouchableOpacity>
          <Text style={styles.title}>관리자 페이지</Text>
          <View style={{width: 24}} /> {/* 오른쪽 공간 확보 */}
        </View>

        {/* '대기/완료' 버튼 */}
        <View style={styles.statusToggle}>
          <TouchableOpacity onPress={() => setIsPending(!isPending)}>
            <Text style={styles.statusToggleText}>
              {isPending ? '대기' : '완료'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 탭뷰 */}
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: colors.darkBrown}}
              style={{backgroundColor: 'transparent'}}
              labelStyle={{
                fontFamily: Fonts.MapoFont,
                color: colors.darkBrown,
              }}
            />
          )}
        />

        {/* 삭제 모달 */}
        <Modal
          transparent={true}
          visible={showDeleteModal}
          animationType="fade"
          onRequestClose={() => setShowDeleteModal(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                해당 유저의 글을 삭제하시겠습니까?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    if (selectedReport) {
                      handleDeleteReport(selectedReport);
                    }
                    setShowDeleteModal(false);
                  }}>
                  <Text style={styles.modalButtonText}>삭제</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setShowDeleteModal(false)}>
                  <Text style={styles.modalButtonText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* 기각 모달 */}
        <Modal
          transparent={true}
          visible={showDismissModal}
          animationType="fade"
          onRequestClose={() => setShowDismissModal(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                해당 신고글을 기각하시겠습니까?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    if (selectedReport) {
                      handleDismissReport(selectedReport);
                    }
                    setShowDismissModal(false);
                  }}>
                  <Text style={styles.modalButtonText}>확인</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setShowDismissModal(false)}>
                  <Text style={styles.modalButtonText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.MapoFont,
    color: colors.darkBrown,
  },
  statusToggle: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statusToggleText: {
    fontSize: 18,
    fontFamily: Fonts.MapoFont,
    color: colors.darkBrown,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  reportItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  reportTitle: {
    fontSize: 18,
    fontFamily: Fonts.MapoFont,
    color: '#333',
    marginBottom: 5,
  },
  reportText: {
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
    color: '#555',
    marginBottom: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dismissButton: {
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissButtonText: {
    fontSize: 16,
    fontFamily: Fonts.MapoFont,
    color: 'blue',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    fontFamily: Fonts.MapoFont,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    fontSize: 18,
    fontFamily: Fonts.MapoFont,
    color: colors.darkBrown,
  },
});

export default AdminPage;
