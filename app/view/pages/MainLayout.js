import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {connect} from 'react-redux';

import {COLORS, SIZES, icons} from 'assets/constants';
import IconTextButton from '../components/IconTextButton';
import {setTradeModalVisibility} from '../../store/tab/tabAction';

const MainLayout = ({children, isTradeModalVisible}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280],
  });
  return (
    <View style={{flex: 1}}>
      {children}
      {/* Modal */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: modalY,
          width: '100%',
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}>
        <IconTextButton
          label={'Transfer'}
          icon={icons.send}
          onPress={() => console.log('Transfer')}
        />
        <IconTextButton
          label={'Withdraw'}
          icon={icons.withdraw}
          onPress={() => console.log('Withdraw')}
          containerStyle={{marginTop: SIZES.base}}
        />
      </Animated.View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
