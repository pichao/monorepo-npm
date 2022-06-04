import { useGeetest } from '@yyds-npm/utils';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default () => {
    const navigate = useNavigate();
    const [{ gInstance, initGetest, gStatus }] = useGeetest({
        autoInit: true
    });
    console.log(gInstance, initGetest, gStatus, 'gInstance');
    useEffect(() => {
        console.log(gStatus, 'gStatus');
    }, [gStatus]);
    return (
        <div>
            <h1>单个页面单个极验验证</h1>
            <div>
                <Button
                    onClick={() => {
                        gInstance.showCaptcha();
                    }}
                >
                    点击显示极验
                </Button>
            </div>
            <div>
                <Button
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    首页
                </Button>
                <Button
                    onClick={() => {
                        navigate('../several');
                    }}
                >
                    多个极验实例
                </Button>
            </div>
        </div>
    );
};
