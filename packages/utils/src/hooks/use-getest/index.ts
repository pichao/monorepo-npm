import { useCallback, useEffect, useState } from 'react';

if (typeof window !== 'undefined') {
    require('./gt.js');
}

export const useGeetest = ({ autoInit = true }) => {
    console.log(autoInit, '是否自动初始化');
    const [gInstance, setGinstance] = useState() as any; // 极验实例
    const [gStatus, setGstatus] = useState('init'); // 极验status
    const [gValidateData, setGvalidateData] = useState() as any; // 极验status
    const initGetest = useCallback(() => {
        const captchaId = 'e2951b9b294d4f4deed5a2d6c5fa4fe7';
        (window as any).initGeetest4(
            {
                // 省略必须的配置参数
                captchaId,
                product: 'bind'
            },
            (captchaObj) => {
                captchaObj
                    .onReady(() => {
                        setGstatus('ready');
                        if (!autoInit) {
                            captchaObj.showCaptcha();
                            return;
                        }
                        setGinstance(captchaObj);
                        //验证码ready之后才能调用showCaptcha方法显示验证码
                    })
                    .onSuccess(() => {
                        setGstatus('success');
                        const result = captchaObj.getValidate();
                        console.log(result, '极验getValidate数据');
                        setGvalidateData(result);
                        if (!autoInit) {
                            captchaObj.destroy();
                            return;
                        }
                        captchaObj.reset();
                    })
                    .onClose(() => {
                        console.log('close');
                        setGstatus('close');
                        if (!autoInit) {
                            captchaObj.destroy();
                            return;
                        }
                        // captchaObj.destroy();
                        // 用户把验证关闭了，这时你可以提示用户需要把验证通过后才能进行后续流程
                    })
                    .onError(() => {
                        setGstatus('error');
                        //your code
                    });
            }
        );
    }, []);

    useEffect(() => {
        if (autoInit) {
            console.log(gInstance, '自动初始化极验');
            initGetest();
        }
    }, []);
    useEffect(() => {
        return () => {
            if (gInstance) {
                console.log(gInstance, 'hook离开时执行');
                gInstance.destroy();
            }
        };
    }, [gInstance]);
    console.log(gInstance, '导出的极验实例');
    return [{ gInstance, initGetest, gStatus, gValidateData }];
};
