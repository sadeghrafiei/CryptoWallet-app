import React, {useCallback, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {connect} from 'react-redux';

import MainLayout from '../MainLayout';
import {getHoldings, getCoinMarket} from 'store/market/marketAction';
import {holdings} from 'assets/constants/dummy';
import {COLORS, SIZES, icons} from 'assets/constants';
import BalanceInfo from '../../components/BalanceInfo';
import IconTextButton from '../../components/IconTextButton';
import Chart from '../../components/Chart';
import {FONTS} from '../../../assets/constants';

const Home = ({getHoldings, getCoinMarket, myHoldings, coins}) => {
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
  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        <BalanceInfo
          title={'Your Wallet'}
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{marginTop: 25}}
        />

        <View
          style={{
            flexDirection: 'row',
            marginTop: 38,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}>
          <IconTextButton
            label={'Transfer'}
            icon={icons.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius,
            }}
            onPress={() => console.log('Transfer')}
          />
          <IconTextButton
            label={'Withdraw'}
            icon={icons.withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
            }}
            onPress={() => console.log('withdraw')}
          />
        </View>
      </View>
    );
  }

  return (
    <MainLayout>
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {renderWalletInfoSection()}

        <Chart
          containerStyle={{marginTop: SIZES.padding * 2}}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.price
              : coins[0]?.sparkline_in_7d?.price
          }
        />
        <FlatList
          data={coins}
          renderItem={({item}) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setSelectedCoin(item)}>
                <View style={{width: 35}}>
                  <Image
                    source={{uri: item.image}}
                    style={{height: 20, width: 20}}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text style={{color: COLORS.white, ...FONTS.h3}}>
                    {item.name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}>
                    $ {item.current_price}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    {item.price_change_percentage_7d_in_currency !== 0 && (
                      <Image
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform:
                            item.price_change_percentage_7d_in_currency > 0
                              ? [{rotate: '45deg'}]
                              : [{rotate: '125deg'}],
                        }}
                        source={icons.upArrow}
                      />
                    )}
                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,
                        ...FONTS.body5,
                        lineHeight: 15,
                      }}>
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: 15,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{marginBottom: SIZES.radius}}>
              <Text style={{color: COLORS.white, ...FONTS.h3, fontSize: 18}}>
                Top Cryptocurrency
              </Text>
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
    coins: state.marketReducer.coins,
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
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getCoinMarket(
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
