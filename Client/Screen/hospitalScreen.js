import React, { useState, useEffect } from 'react';
import { Text, Alert, useColorScheme, NativeEventEmitter, Platform, View, Image, SafeAreaView, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { KakaoMapView } from '@jiggag/react-native-kakao-maps';
import KakaoShareLink from 'react-native-kakao-share-link';

import CallScreen from './callScreen';

import telIcon from '../assets/telephone.png';
import camIcon from '../assets/cam-recorder.png';
import shareIcon from '../assets/share.png'

import ZoomUs, {ZoomEmitter, ZoomUsVideoView} from 'react-native-zoom-us';

import {extractDataFromJoinLink} from '../extractDataFromJoinLink';

import sdkJwtTokenJson from '../api/sdk.jwt.json';

const sdkKey = 'u7DXonFoa9AVMWZIcWhgK0ekCNfSSVfayyIa';
const sdkSecret = 'nziYp8gkOlq9Tz4f9RBN0ri0viivIf0ChQp1';

const sdkJwtToken = sdkJwtTokenJson.jwtToken;

const exampleJoinLink =
  'https://us05web.zoom.us/j/88482755624?pwd=QVQxR2JYcWR5emx5Y3IrYkp2bVRZQT09';

const exampleJoinMeeting = extractDataFromJoinLink(exampleJoinLink);

const enableCustomizedMeetingUI = false;

export default function HospitaltScreen({ navigation, route }) {
    const isDarkMode = useColorScheme() === 'dark';
    const [isInitialized, setIsInitialized] = useState(false);
    const [isMeetingOngoing, setIsMeetingOngoing] = useState(false);

    console.log({isDarkMode});

    useEffect(() => {
      (async () => {
        try {
          const initializeResult = await ZoomUs.initialize(
            sdkJwtToken
              ? {jwtToken: sdkJwtToken}
              : {clientKey: sdkKey, clientSecret: sdkSecret},
            {
              language: 'ko',
              enableCustomizedMeetingUI,
            },
          );

          console.log({initializeResult});

          setIsInitialized(true);
        } catch (e) {
          Alert.alert('Error', 'Could not execute initialize');
          console.error('ERR', e);
        }
      })();
    }, []);

    useEffect(() => {
      if (!isInitialized) {
        return;
      }

      // For more see https://github.com/mieszko4/react-native-zoom-us/blob/master/docs/EVENTS.md
      const zoomEmitter = new NativeEventEmitter(ZoomEmitter);
      const eventListener = zoomEmitter.addListener(
        'MeetingEvent',
        ({event, status, ...params}) => {
          console.log({event, status, params}); //e.g.  "endedByHost" (see more: https://github.com/mieszko4/react-native-zoom-us/blob/master/docs/EVENTS.md)

          if (status === 'MEETING_STATUS_CONNECTING') {
            setIsMeetingOngoing(true);
          }

          if (status === 'MEETING_STATUS_DISCONNECTING') {
            // Once it is set it is good to render
            setIsMeetingOngoing(false);
          }
        },
      );

      return () => eventListener.remove();
    }, [isInitialized]);

    const joinMeeting = async () => {
      try {
        const joinMeetingResult = await ZoomUs.joinMeeting({
          autoConnectAudio: true,
          userName: `Wick ${Platform.OS}`,
          meetingNumber: exampleJoinMeeting.meetingNumber || '',
          password: exampleJoinMeeting.password || '',
          noMeetingErrorMessage: true, // Set this to be able to show Alert.alert
        });

        console.log({joinMeetingResult});
      } catch (e) {
        Alert.alert('Error', 'Could not execute joinMeeting');
        console.error('ERR', e);
      }
    };
    
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
              <TouchableOpacity
                style={styles.touchContainer}
                onPress={() => joinMeeting()}
                disabled={!isInitialized}>
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