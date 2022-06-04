import { message } from 'antd';
import { lazy, Suspense, useCallback } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const ExampleComponent = lazy(() => import(/* webpackChunkName: 'ExampleComponent'*/ './index'));
const GetestComponent = lazy(() => import(/* webpackChunkName: 'GetestComponent'*/ './getest'));
const TableComponent = lazy(() => import(/* webpackChunkName: 'TableComponent'*/ './table'));
export interface HelloWorldProps {
    userName: string;
    lang: string;
}
message.config({
    // message全局提示
    // top: 100,
    duration: 2,
    maxCount: 1
});

const App = () => {
    const renderContent = useCallback(() => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <Routes>
                        {/* <Route exact path="/" component={null}></Route> */}
                        <Route path="/" element={<ExampleComponent />}></Route>
                        <Route path="/getest/*" element={<GetestComponent />}></Route>
                        <Route path="/table" element={<TableComponent />}></Route>
                        {/* <Route path="users" element={<Users />}>
                            <Route path="me" element={<OwnUserProfile />} />
                            <Route path=":id" element={<UserProfile />} />
                        </Route> */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        );
    }, []);
    return renderContent();
};
export default App;
