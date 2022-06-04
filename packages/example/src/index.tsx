import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './pages/container';
import './reset.css';
import getStore from './store';
dayjs.locale('zh-cn');
// const store = createStore(joke, applyMiddleware(thunk));

// const store = createStore(joke, applyMiddleware(thunk));

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={getStore()}>
            <App />
        </Provider>
    </ConfigProvider>,
    document.getElementById('output')
);
if (module.hot) {
    module.hot.accept();
}
