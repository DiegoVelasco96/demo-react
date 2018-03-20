import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import routes from './routes';
import { Layout } from 'antd';
import MenuApp from './components/MenuApp';

const { Header, Content } = Layout;

function App() {
    return (
        <div>
            <Layout>
                <Header>
                    <MenuApp />
                </Header>
                <Content>
                    <Switch>
                        {routes.map((route) =>
                            <Route
                                key={route.index}
                                exact={route.exact}
                                component={route.component}
                                path={route.path}
                            />
                        )}
                    </Switch>
                </Content>
            </Layout>
        </div>
    );
}

export default App;