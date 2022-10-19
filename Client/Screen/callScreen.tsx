import React, {useEffect, useState} from 'react';
import { StyleSheet,
  View,
  Button,
  Alert,
  useColorScheme,
  NativeEventEmitter,
  Platform,
} from 'react-native';

import ZoomUs, {ZoomEmitter, ZoomUsVideoView} from 'react-native-zoom-us';

import {extractDataFromJoinLink} from '../extractDataFromJoinLink';

import sdkJwtTokenJson from '../api/sdk.jwt.json';

const sdkKey = 'u7DXonFoa9AVMWZIcWhgK0ekCNfSSVfayyIa';
const sdkSecret = 'nziYp8gkOlq9Tz4f9RBN0ri0viivIf0ChQp1';

const sdkJwtToken = sdkJwtTokenJson.jwtToken;

const exampleJoinLink =
  'https://us05web.zoom.us/j/82271505807?pwd=YUJIMWRVakZyRVNjd0NraTV4TTFwdz09';

const exampleJoinMeeting = extractDataFromJoinLink(exampleJoinLink);

const enableCustomizedMeetingUI = false;

const CallScreen = () => {
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

  return (
    <>
      <View style={styles.container}>
        <Button
          onPress={() => joinMeeting()}
          title="Join example meeting"
          disabled={!isInitialized}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  customViewer: {
    width: '100%',
    flex: 1,
  },
});

export default CallScreen;
