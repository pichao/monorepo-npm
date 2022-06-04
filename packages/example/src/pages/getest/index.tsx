import { lazy, Suspense } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
const Single = lazy(() => import(/* webpackChunkName: 'Single'*/ './single'));
const Several = lazy(() => import(/* webpackChunkName: 'Several'*/ './several'));

export default () => {
    const navigate = useNavigate();

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* <Route exact path="/" component={null}></Route> */}
                    <Route path="single" element={<Single />}></Route>
                    <Route path="several" element={<Several />}></Route>

                    {/* <Route path="users" element={<Users />}>
                            <Route path="me" element={<OwnUserProfile />} />
                            <Route path=":id" element={<UserProfile />} />
                        </Route> */}
                </Routes>
            </Suspense>
        </div>
    );
};
