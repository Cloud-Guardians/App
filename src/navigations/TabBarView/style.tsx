import styled from 'styled-components/native';

export const S = {
  Container: styled.View`
    position: absolute;
    flex-direction: row;
    justify-content: space-between;
    bottom: 0;
    background-color: transparent;
    align-items: center;
  `,
  ItemContainer: styled.Pressable`
    flex: 1;
    align-items: center;
    overflow: visible;
  `,
  Item: styled.View<{isPressed: boolean}>`
    background-color: ${props => (props.isPressed ? '#F2F4F6' : 'transparent')};
    align-items: center;
    justify-content: center;
  `,
};
