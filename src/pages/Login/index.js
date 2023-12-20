import { Button, Input, Form, Card, message } from "antd"
import "./index.scss"
import logo from "@/assets/logo.png"
import { useDispatch } from "react-redux";
import { featchLogin } from "@/store/modules/user";
import { useNavigate } from "react-router-dom";


const Login = ()=>{
    const navgate = useNavigate()
    const dispath = useDispatch()
    const onFinish = async (params) => {
        console.log(params);
        await dispath(featchLogin(params, navgate, message))
    };
    const onFinishFailed = (errorInfo) => {
        message.error("请重试...")
    };


    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt=""/>
                <Form 
                    validateTrigger="onBlur"     
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item 
                        name="username"
                        rules={
                            [
                                { required: true, message: '用户名不能为空!' },
                                { pattern: /^1[3-9]\d{9}$/, message:"请输入正确的手机号"}
                            
                            ]
                        }
                    >
                        <Input size="large" placeholder="请输入用户名" ></Input>
                    </Form.Item>
                    <Form.Item
                          name="password"
                          rules={[{ required: true, message: '密码不能为空!' }]}
                    >
                        <Input size="large" placeholder="请输入密码"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>登陆</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login