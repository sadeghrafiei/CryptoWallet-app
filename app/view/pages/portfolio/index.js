import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getHoldings, getCoinMarket} from 'store/market/marketAction';

import MainLayout from '../MainLayout';
import BalanceInfo from '../../components/BalanceInfo';
import Chart from '../../components/Chart';
import {SIZES, COLORS, FONTS, icons} from 'assets/constants';
import {holdings} from 'assets/constants/dummy';

const Portfolio = ({getHoldings, myHoldings}) => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  useFocusEffect(
    useCallback(() => {
      getHoldings(holdings);
      getCoinMarket();
    }, []),
  );

  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);

  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  function renderCurrentBalanceSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        <Text
          style={{
            marginTop: 30,
            color: COLORS.white,
            ...FONTS.largeTitle,
          }}>
          Portfolio
        </Text>
        <BalanceInfo
          title={'Current Balance'}
          changePct={percChange}
          displayAmount={totalWallet}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    );
  }
  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {renderCurrentBalanceSection()}
        <Chart
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d.value
              : myHoldings[0]?.sparkline_in_7d?.value
          }
        />
        <FlatList
          data={myHoldings}
          renderItem={({item}) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency === 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCoin(item)}
                style={{flexDirection: 'row', height: 55}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 20, height: 20}}
                  />
                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}>
                    $ {item.current_price.toLocaleString()}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    {item.price_change_percentage_7d_in_currency !== 0 && (
                      <Image
                        source={icons.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{rotate: '45deg'}]
                              : [{rotate: '125deg'}],
                        }}
                      />
                    )}
                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,
                        ...FONTS.body5,
                        lineHeight: 15,
                      }}>
                      {item.price_change_percentage_7d_in_currency.toFixed(2)} %
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}>
                    $ {item.total.toLocaleString()}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.lightGray3,
                      ...FONTS.body5,
                      lineHeight: 15,
                    }}>
                    {item.qty} {item.symbol.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View>
              <Text style={{...FONTS.h2, color: COLORS.white}}>
                Your Assets
              </Text>
              <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
                <Text style={{flex: 1, color: COLORS.lightGray3}}>Asset</Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    color: COLORS.lightGray3,
                    textAlign: 'right',
                  }}>
                  Holdings
                </Text>
              </View>
            </View>
          }
          ListFooterComponent={<View style={{marginBottom: 20}} />}
        />
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
