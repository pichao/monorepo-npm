import { Link } from 'react-router-dom';
import styles from './index.module.scss';
export default () => {
    return (
        <>
            <div className={styles.pageContainer}>
                <h1 className={styles.title}>hook、组件、工具函数目录</h1>
                <div className={styles.linkCon}>
                    <div>
                        <Link to="table">表格示例</Link>
                    </div>
                    <div>
                        <Link to="getest/single">极验示例</Link>
                    </div>

                    {/* <h1>表格hook示例</h1>
            <Ptable
                tableProps={{
                    columns
                }}
            /> */}

                    {/* <Dupload />
            <Button
                onClick={() => {
                    init1();
                    console.log(encrypt('cccccccc'));
                }}
            >
                显示极验1
            </Button>
            <Button
                onClick={() => {
                    init2();
                    console.log(encrypt('cccccccc'));
                }}
            >
                显示极验2
            </Button>
            <Button
                onClick={() => {
                    navigate('/getest');
                }}
            >
                getets
            </Button> */}
                </div>
            </div>
        </>
    );
};
