import React, {Component} from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Modal
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class Registered extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmDirty: false,
           
        };
    }
   

    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .form
            .validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }else{
                    console.log(values)
                }
            });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不同!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    checkedbox=(rule, value, callback) => {
        if(!value){
            callback('请阅读条约');
        }else{
            callback();
        }
        
    }

    render() {
        const {getFieldDecorator} = this.props.form;
       
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 8
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 16
                }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };
        const prefixSelector = getFieldDecorator('prefix', {initialValue: '86'})(
            <Select style={{
                width: 70
            }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );


        return (
            <Modal
            title="Welcome F IT"
            visible={this.props.showreModal}
            footer={null}
            onCancel={this.props.Cancel}>
            <Form onSubmit={this.handleSubmit} className='reform' >
                <FormItem {...formItemLayout} label="邮箱">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '请填写正确的邮箱!'
                            }, {
                                required: true,
                                message: '请填写你的邮箱!'
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="密码">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请填写你的密码!'
                            }, {
                                validator: this.validateToNextPassword
                            }
                        ]
                    })(<Input type="password"/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="重新输入密码">
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请重新输入密码!'
                            }, {
                                validator: this.compareToFirstPassword
                            }
                        ]
                    })(<Input type="password" onBlur={this.handleConfirmBlur}/>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                    <span>
                        昵称&nbsp;
                        <Tooltip title="你希望别人怎么称呼你?">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                    </span>
                )}>
                    {getFieldDecorator('nickname', {
                        rules: [
                            {
                                required: true,
                                message: '请输入你的昵称!',
                                whitespace: true
                            }
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="电话">
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                required: true,
                                message: '请填写你的电话!'
                            }
                        ]
                    })(<Input
                        addonBefore={prefixSelector}
                        style={{
                        width: '100%'
                    }}/>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="验证码"
                    extra="我得看看你是不是来搞破坏的">
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('captcha', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写正确的验证码!'
                                    }
                                ]
                            })(<Input/>)}
                        </Col>
                        <Col span={12}>
                            <Button>获取验证码</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        rules: [
                           {
                                validator: this.checkedbox
                            }
                        ],
                        valuePropName: 'checked', 
                        initialValue: true
                    })(
                        <Checkbox>我已阅读
                            <a href="">老黄条款</a>
                        </Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">注册</Button>
                </FormItem>
            </Form>
            </Modal>
        );
    }

}

export default Form.create()(Registered)
