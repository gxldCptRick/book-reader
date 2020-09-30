import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { initializeIOC } from "./data/ioc";
import "./App.css";
import HomePage from "./components/pages/homepage";
const routes = [
  {
    name: "All Books",
    url: "/all/books",
    component: HomePage,
    props: { managerName: "externalManager" },
  },
  {
    name: "My Books",
    url: "/my/books",
    component: HomePage,
    props: { managerName: "sessionManager" },
  },
  {
    name: "My History",
    url: "/my/history",
    component: HomePage,
    props: { managerName: "historyManager" },
  },
];

const Wrapper = ({ component: Component, props: outerProps, ...rest }) => {
  return (props) => <Component {...props} {...rest} {...outerProps} />;
};
const ioc = initializeIOC();
function App() {
  return (
    <BrowserRouter>
      {routes.map(({ url, name, component, props = {} }) => (
        <React.Fragment key={name}>
          <Route
            path={url}
            exact
            component={Wrapper({ component, navElements: routes, ioc, props })}
          />
        </React.Fragment>
      ))}
      <Route
        path="/"
        exact
        component={Wrapper({ component: HomePage, navElements: routes, ioc })}
      />
    </BrowserRouter>
  );
}

export default App;
