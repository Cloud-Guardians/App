import {StackScreenProps} from '@react-navigation/stack';
export interface Post {
    id: number;
    title: string;
    date: string;
    time: string;
    photoUrl: string;
    views: number;
    content: string;
    writer: string;
    favoriteCount: number;
    commentCount: number;
    isBest: boolean;
  }

export interface Comment {
    id: number;
    date: string;
    updatedDate: string;
    content: string;
    parentCommentId: number;
    writer: string;
    commentPostId:number;
    };

  export type RootStackParamList = {
    Community: undefined;
    CommunityDetail: undefined;
    CommentPage: undefined;
  };

  export type communityProps = StackScreenProps<
    RootStackParamList,
    'Community' | 'CommunityDetail'|'CommentPage'
  >;