import React,{Component} from 'react'
import {observer} from 'mobx-react'
import {inject} from '../../store/index'
import {View,Text} from 'react-native'
import { NavBar,} from '../../component/index'
import {List,InputItem,Button} from 'antd-mobile'
import {cleanString} from '../../common/Tools'

class UserAddCard extends Component{
    componentDidMount(){
        this.props.user.getBankCards();
    }
    render(){
        const {goBack} = this.props.navigation
        const {cardInfo} = this.props.user
        const {idCard,userName} = cardInfo.userInfo
        return <View style={{flex:1}}>
            <NavBar
                title={'绑定银行卡'}
            />
            <List renderHeader={() => '添加新的银行卡'}>
                <InputItem editable={false} value={userName}>
                    姓名
                </InputItem>
                <InputItem editable={false} value={idCard}>
                    身份证号码
                </InputItem>
                <InputItem  placeholder={'请输入您的银行卡号'} clear={true} type='bankCard' onChange={(val)=>{
                    this.props.user.newCard.bankCard = cleanString(val)
                }}>
                    银行卡号
                </InputItem>
            </List>
            <Button style={{margin:10}} type="primary" onClick={
                ()=>{this.props.user.addCard().then((res)=>res&&goBack())}
            }>保存</Button>
        </View>
    }
}
export  default inject('user')(observer(UserAddCard))