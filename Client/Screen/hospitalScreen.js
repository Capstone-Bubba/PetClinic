import React, { useState, useEffect } from 'react';
import { Text, View, Image, SafeAreaView, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { KakaoMapView } from '@jiggag/react-native-kakao-maps';
import KakaoShareLink from 'react-native-kakao-share-link';

import telIcon from '../assets/telephone.png';
import camIcon from '../assets/cam-recorder.png';
import shareIcon from '../assets/share.png'

export default function HospitaltScreen({ navigation, route }) {
    const kakaoShare = async () => {
        try {
            const response = await KakaoShareLink.sendLocation({
                address: route.params.data.addr_basic,
                addressTitle: route.params.data.hospital_name,
                content: {
                    title: route.params.data.hospital_name,
                    imageUrl:
                        'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
                    link: {
                        webUrl: 'https://developers.kakao.com/',
                        mobileWebUrl: 'https://developers.kakao.com/',
                    },
                    description: route.params.data.addr_basic,
                },
            })
            console.log(response)
        } catch (err) {
            console.error(err);
            console.error(err.message);
        }
    }

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <KakaoMapView
            markerList={[
              {
                lat: route.params.data.latitude,
                lng: route.params.data.longitude,
                markerName: 'marker',
              },
            ]}
            centerPoint={{
              lat: route.params.data.latitude,
              lng: route.params.data.longitude,
            }}
            style={styles.mapStyle}
          />
        </View>
        <SafeAreaView style={styles.infoContainer}>
          <ScrollView>
            <View style={styles.textContainer}>
              <Text style={styles.nameStyle}>
                {route.params.data.hospital_name}
              </Text>
              <Text style={styles.otherTextStyle}>
                Tel: {route.params.data.phone}
              </Text>
              <Text style={styles.otherTextStyle}>
                지번주소: {route.params.data.addr_basic}
              </Text>
              <Text style={styles.otherTextStyle}>
                도로명주소: {route.params.data.addr_st}
              </Text>
            </View>

            <View style={styles.telIconContainer}>
              <TouchableOpacity
                style={styles.touchContainer}
                onPress={() => {
                  Linking.openURL(`tel:${route.params.data.phone}`);
                }}>
                <View style={styles.touchViewContainer}>
                  <Image source={telIcon} style={styles.telIconStyle} />
                  <Text style={{color: 'black'}}>전화</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchContainer}>
                <View style={styles.touchViewContainer}>
                  <Image source={camIcon} style={styles.camIconStyle} />
                  <Text style={{color: 'black'}}>화상통화</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchContainer}
                onPress={kakaoShare}>
                <View style={styles.touchViewContainer}>
                  <Image source={shareIcon} style={styles.telIconStyle} />
                  <Text style={{color: 'black'}}>공유</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  telIconStyle: {
    width: 30,
    height: 30,
  },
  camIconStyle: {
    width: 40,
    height: 40,
    marginTop: -10,
  },
  nameStyle: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  otherTextStyle: {
    fontSize: 15,
    color: 'black',
  },
  touchContainer: {
    flex: 1,
  },
  touchViewContainer: {
    // borderWidth: 3,
    alignItems: 'center',
  },
  telIconContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  mapContainer: {
    flex: 1,
    padding: '2%',
  },
  infoContainer: {
    flex: 0.45,
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingTop: '5%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginLeft: '2%',
    marginRight: '2%',
    paddingBottom: '2%',
  },
  textContainer: {
    paddingBottom: '2%',
  },
});