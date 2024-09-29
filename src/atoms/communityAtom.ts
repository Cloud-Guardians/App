import {atom} from 'recoil';

export const todayState = atom({
    key:'todayState',
    default:'',
    });


export const likeState = atom({
  key: 'likeState',
  default: {
  },
});

export const taggingState = atom({
    key: 'taggingState',
    default: {
        writer:'',
        id:'',
        },
    });

export const profileState = atom({
    key:'profileState',
    default:{
        },
    })
