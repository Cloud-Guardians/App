import { Post } from "../types/community";

export const Strings = {
  searchHint: '검색어를 입력해주세요.',
  comment: '댓글',
  reportManage: '신고 관리하기',
  new: 'New',
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
} as const;

export type CommunityStackParamList = {
  PostDetailPage: { post: Post },
  CommentPage: undefined,
};