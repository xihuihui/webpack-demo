import React, { Component } from 'react';

import {
    Form,
    Icon,
    Button,
    Modal,
    Input,
    Checkbox
} from 'antd';

const FormItem = Form.Item;

class Loginmodal extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log("ajax交互",values);
                }
            });
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
            title="Welcome F IT"
            visible={this.props.visible}
            // onOk={this.handleOk}
            footer={null}
            // confirmLoading={this.state.confirmLoading}
            onCancel={this.props.handleCancel}>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [
                            {
                                required: true,
                                message: '请输入你的用户名!'
                            }
                        ]
                    })(
                        <Input
                            prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                            placeholder="用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入你的密码!'
                            }
                        ]
                    })(
                        <Input
                            prefix={< Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                            type="password"
                            placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住我</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </FormItem>
            </Form>
        </Modal> 
        );
    }
}

export default Form.create()(Loginmodal);
