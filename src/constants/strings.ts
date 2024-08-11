import ReportManagePage from "../pages/Profile/Report/ReportManagePage/ReportManagePage";
import { Post } from "../types/community";

export const Strings = {
  searchHint: '검색어를 입력해주세요.',
  comment: '댓글',
  reportManage: '신고 관리하기',
  new: 'New',
  delete: '삭제',
  cancel: '취소',
  check: '확인',
  userDeleteGuide: '해당 유저 글을\n삭제하시겠습니까?',
  userDismissGuide: '해당 신고 글을\n기각하시겠습니까?',
  myDiary: '작성글',
  myComment: '댓글단 글',
} as const;

export const StackNames = {
    homeStack: 'homeStack',
    statisticsStack: 'statisticsStack',
    diaryStack: 'diaryStack',
    communityStack: 'communityStack',
    mypageStack: 'mypageStack',
} as const;

export const RouteNames = {
    home: 'home',
    statistics: 'statistics',
    diary: 'diary',
    community: 'community',
    mypage: 'mypage',
} as const;

export const CommunityScreens = {
  PostDetailPage: 'PostDetailPage',
  CommentPage: 'CommentPage',
  CommunityUserProfile: 'CommunityUserProfile',
} as const;

export type CommunityStackParamList = {
  PostDetailPage: { post: Post },
  CommentPage: undefined,
  CommunityUserProfile: undefined,
};

export const ReportScreens = {
  ReportManagePage: 'ReportManagePage',
} as const;

export type ReportStackParamList = {
  ReportManagePage: undefined,
};