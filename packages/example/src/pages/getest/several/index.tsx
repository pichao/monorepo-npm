import { useGeetest } from '@yyds-npm/utils';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
export default () => {
    const navigate = useNavigate();
    const [{ gInstance, initGetest, gStatus, gValidateData }] = useGeetest({
        autoInit: false
    });

    return (
        <div>
            <h1>单个页面多个极验验证</h1>
            <div>
                <Button
                    onClick={() => {
                        initGetest();
                    }}
                >
                    {' '}
                    显示极验1
                </Button>
                <Button
                    onClick={() => {
                        initGetest();
                    }}
                >
                    {' '}
                    显示极验2
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
                        navigate('../single');
                    }}
                >
                    单个极验实例
                </Button>
            </div>
        </div>
    );
};
