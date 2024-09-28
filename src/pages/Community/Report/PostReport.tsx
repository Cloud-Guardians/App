import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Text, View, Image, TextInput, SafeAreaView,Platform,TouchableOpacity, ScrollView,StyleSheet, Animated, ActivityIndicator, ImageBackground, Modal} from 'react-native';
import Images from '../../../constants/images';
import styled from 'styled-components/native';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { likeState } from '../../../atoms/communityAtom';
import Fonts from '../../../constants/fonts';
import {CheckBox} from 'react-native-elements';
import { tokenState } from '../../../atoms/authAtom';
const PostReport = ({diaryId, visible, accessToken, onClose})=>{
    const [postModalVisible, setPostModalVisible] = useState(false);
    const [reportVisible, setReportVisible] = useState(visible);
    const closeReportModal = () => {
            setReportVisible(false);
            onClose();
        };
    const sendReport = async (checkedReason, reasonValue, diaryId, accessToken)=> {
        console.log("Checked Reason:", checkedReason);
            console.log("Reason Value:", reasonValue);
            console.log("Diary ID:", diaryId);
            console.log("Access Token:", accessToken);
        try {
                                             const response = await fetch(`http://ec2-3-38-253-190.ap-northeast-2.compute.amazonaws.com:9090/api/public-diaries/${diaryId}/reports`, {
                                                 method: 'POST',
                                                 body:JSON.stringify({
                                                                    reason:checkedReason.reason,
                                                                    customReason:reasonValue || ''}),
                                                 headers: {
                                                     'Authorization': accessToken,
                                                     'Content-Type': 'application/json'
                                                 }
                                             });

                                             if (response.ok) {
                                                console.log("report done");
                                                setReasonValue('');
                                                setIsChecked(prev => prev.map(item => ({ ...item, isChecked: false }))); // 체크박스 리셋
                                                                setReportVisible(false);
                                                onClose();

                                                }
                                            else {
                                                        const errorResponse = await response.json();
                                                        console.error("Report submission failed:", errorResponse);
                                                        alert(`리포트 제출에 실패했습니다: ${errorResponse.message || '알 수 없는 오류 발생'}`);
                                                    }

                                         } catch (error) {
                                             console.log('Failed to fetch comments:', error);
                                         }
        }

    type Report = {
        id:number;
        content: string;
        reason: string;
        isChecked: boolean;
        }
    const [isChecked, setIsChecked] = useState<Report[]>([{
    id:1, content:"영리 목적/홍보성", reason:"ADVERTISEMENT_PROMOTION", isChecked:false},
    {id:2, content:"저작권 침해", reason:"COPYRIGHT_INFRINGEMENT",isChecked:false},
    {id:3, content:"음란성/선정성", reason:"OBSCENITY",isChecked:false},
    {id:4, content:"개인 정보 노출", reason:"PERSONAL_INFORMATION_LEAK",isChecked:false},
    {id:5, content:"도배", reason:"THEFT",isChecked:false},
    {id:6, content:"기타", reason:"OTHER", isChecked:false}]);
    const [reasonValue, setReasonValue] =useState('');
    const [checkedReason, setCheckedReason] = useState<Report | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

   const toggleCheckBox = (id) => {
           setIsChecked(prev => {
               // 모든 체크박스를 체크 해제하고 선택된 체크박스만 체크
               return prev.map(report => {
                   if (report.id === id) {
                       // 체크박스 상태를 반전시킴
                       setCheckedReason(report); // 선택된 체크박스 정보를 저장
                       return { ...report, isChecked: true }; // 선택된 체크박스는 체크
                   }
                   return { ...report, isChecked: false }; // 나머지는 체크 해제
               });
           });
       };

    return(
         <TouchableOpacity onPress={()=>setReportVisible(true)}>
                            <Images.Report/>

        <Modal transparent={true} visible={reportVisible} animationType="slide">
        <ReportView>
        <HeaderView>
       <ReportText style={{fontSize:15, color:"black", position:"relative", textAlign:"center", width:"90%", margin:"auto"}}>신고 사유</ReportText>
               <View style={{width:"20%", margin:"auto"}}>
        <TouchableOpacity onPress={closeReportModal}>
        <Images.Cancel style={{top:10}}/></TouchableOpacity></View>
        </HeaderView>
        <ReportLine/>
        <CheckBoxView>
        {isChecked.map((checked,index) => (
                         <CheckBox
                            containerStyle={{width:"43%", height: 40, borderRadius:10, borderWidth:0, flexDirection:"row",justifyContent:"space-between"}}
                            textStyle={{fontSize:10, fontFamily:`${Fonts.MapoFont}`}}
                           checkedColor="gray"
                            size={20}
                             key={index === `${checked.id}`+1}
                             title={`${checked.content}`}
                             checked={checked.isChecked}
                             onPress={() => toggleCheckBox(checked.id)} // 인덱스를 전달
                         />
                     ))}
            <ReportInputBox
            value={reasonValue}
            onChangeText={text=> setReasonValue(text)}
            />
            <TouchableOpacity style={{width: 200, height: 35, margin:"auto", marginTop:30, backgroundColor:"#35465C", borderRadius:10}} onPress={()=>sendReport(checkedReason, reasonValue, diaryId, accessToken)}>
            <ReportText style={{fontSize:15, margin:"auto", color:"white"}}>신고하기</ReportText>
            </TouchableOpacity>
        </CheckBoxView>

        </ReportView>
        </Modal>
        </TouchableOpacity>
        );

    }

const ReportInputBox = styled.TextInput`
width:80%;
height: 100px;
margin: 0 auto;
background-color:#F1EFEF;
font-family:${Fonts.MapoFont};
padding: 10px;
color: black;
font-size:10px;
border-radius: 20px;
`;
const CheckBoxView = styled.View`
width:100%;
flex-direction: row;
flex-wrap: wrap;
    justifyContent: space-between;
margin-top:10px;
height:190px;
`;
const HeaderView = styled.View`

flex-direction: row;
    justifyContent: space-between;
    width: 100%;
    height: 50px;
`;
const ReportLine = styled.View`
width: 70%;
background-color:#B0A195;
height: 1px;
margin: 0 auto;
`;
const ReportText = styled.Text`
font-family: ${Fonts.MapoFont};
font-size:10px;
`;
const ReportView = styled.View`
width: 300px;
height: 400px;
background-color:white;
elevation:2;
margin: auto;
border-radius:20px;

`;
export default PostReport;