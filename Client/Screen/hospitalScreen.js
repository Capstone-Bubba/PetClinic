import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { KakaoMapView } from '@jiggag/react-native-kakao-maps';
import homeMarker from '../assets/home.png';
import hospitalMarker from '../assets/location.png';

export default function HospitaltScreen({ navigation, route }) {
    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <KakaoMapView
                    // markerImageName="home" // 옵션1
                    // markerImageUrl="https://github.com/jiggag/react-native-kakao-maps/blob/develop/example/custom_image.png?raw=true" // 옵션2
                    markerList={[
                        {
                            lat: route.params.data.latitude,
                            lng: route.params.data.longitude,
                            markerName: 'marker'
                        },
                    ]}
                    centerPoint={{
                        lat: route.params.data.latitude,
                        lng: route.params.data.longitude,
                    }}
                    style={styles.mapStyle}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text>{route.params.data.hospital_name}</Text>
                <Text>{route.params.data.phone}</Text>
                <Text>{route.params.data.addr_basic}</Text>
                <Text>{route.params.data.addr_st}</Text>
            </View>
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
        height: '100%'
    },
    mapContainer: {
        flex: 1,
        padding: '2%',
        // borderWidth: 3
    },
    infoContainer: {
        flex: 1,
        // borderWidth: 3,
        paddingLeft: '2%',
        paddingRight: '2%'
    }
});