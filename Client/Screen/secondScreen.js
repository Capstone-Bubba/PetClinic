import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SecondScreen({ navigation, route }) {
    const email = route.params.email;
    const [addr, setAddr] = useState('');
    const [phone, setPhone] = useState('');
    const name = route.params.name;

    const [doOpen, setDoOpen] = useState(false);
    const [siOpen, setSiOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [state, setState] = useState([
        { label: '경기도', value: 'Gyeonggi-do' },
        { label: '강원도', value: 'Gangwon-do' },
        { label: '충청북도', value: 'Chungcheongbuk-do' },
        { label: '충청남도', value: 'Chungcheongnam-do' },
        { label: '경상북도', value: 'Gyeongsangbuk-do' },
        { label: '경상남도', value: 'Gyeongsangnam-do' },
        { label: '전라북도', value: 'Jeollabuk-do' },
        { label: '전라남도', value: 'Jeollanam-do' },
        { label: '제주도', value: 'Jeju-do' },
        { label: '서울특별시', value: 'Seoul' },
        { label: '대전광역시', value: 'Daejeon' },
        { label: '세종특별자치시', value: 'Sejong' },
        { label: '울산광역시', value: 'Ulsan' },
        { label: '광주광역시', value: 'Gwangju' },
        { label: '인천광역시', value: 'Incheon' },
        { label: '대구광역시', value: 'Daegu' },
        { label: '부산광역시', value: 'Busan' },
    ]);

    console.log(value)

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={email}
            />
            <TextInput
                style={styles.inputBox}
                value={name}
            />
            <DropDownPicker
                style={styles.dropDown}
                open={doOpen}
                value={value}
                items={state}
                setOpen={setDoOpen}
                setValue={setValue}
                setItems={setState}
                zIndex={2000}
            />
            <DropDownPicker
                style={styles.dropDown}
                open={siOpen}
                value={value}
                items={state}
                setOpen={setSiOpen}
                setValue={setValue}
                setItems={setState}
                zIndex={1000}
            />
            <TextInput
                style={styles.inputBox}
                placeholder={'주소'}
                onChangeText={(addr) => setAddr(addr)}
            />
            <TextInput
                style={styles.inputBox}
                placeholder={'전화번호'}
                onChangeText={(phone) => setPhone(phone)}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 15,
        backgroundColor: '#fff',
        flexDirection: 'column',
        flex: 1,
    },
    inputBox: {
        borderWidth: 1,
        borderStyle: "solid",
        marginBottom: 20,
        borderRadius: 20,
        paddingLeft: 15
    }, dropDown: {
        marginBottom: 20,
        borderRadius: 20,
        paddingLeft: 15,
        width: '70%',
    }
})