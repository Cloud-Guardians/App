import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { S } from './style.tsx';
import { RouteNames } from '../../constants/strings.ts';
import { getSize } from '../../utils/utils.ts';
import Images from '../../constants/images.ts';

const TabBarView = ({ state, navigation }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();
  const [pressedTab, setPressedTab] = useState<string | null>(null);

  const getNaviIcon = ({
    title,
    isFocused,
    isPressed,
  }: {
    title: string;
    isFocused: boolean;
    isPressed: boolean;
  }) => {
    const widthSize = getSize(50);
    const heightSize = getSize(45);

    switch (title) {
      case RouteNames.home:
        return isFocused ? (
          <Images.HomeEnable width={widthSize} height={heightSize} />
        ) : (
          <Images.HomeDisable width={widthSize} height={heightSize} />
        );
      case RouteNames.statistics:
        return isFocused ? (
          <Images.StatisticsEnable width={widthSize} height={heightSize} />
        ) : (
          <Images.StatisticsDisable width={widthSize} height={heightSize} />
        );
      case RouteNames.diary:
        return (
          <Images.AddDiary width={widthSize + 10} height={heightSize + 15} />
        );
      case RouteNames.community:
        return isFocused ? (
          <Images.CommunityEnable width={widthSize} height={heightSize} />
        ) : (
          <Images.CommunityDisable width={widthSize} height={heightSize} />
        );
      default:
        return isFocused ? (
          <Images.MyPageEnable width={widthSize} height={heightSize} />
        ) : (
          <Images.MyPageDisable width={widthSize} height={heightSize} />
        );
    }
  };

  return (
    <S.Container style={{ paddingBottom: bottom }}>
      {state.routes.map((route, index) => {
        const label = route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <S.ItemContainer
            onPress={onPress}
            key={index}
            onPressIn={() => {
              setPressedTab(route.name);
            }}
            onPressOut={() => {
              setPressedTab(null);
            }}>
            <S.Item isPressed={route.name === pressedTab}>
              {getNaviIcon({
                title: route.name,
                isFocused,
                isPressed: route.name === pressedTab,
              })}
            </S.Item>
          </S.ItemContainer>
        );
      })}
    </S.Container>
  );
};

export default TabBarView;
