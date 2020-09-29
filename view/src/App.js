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
  },
  {
    name: "My Books",
    url: "/my/books",
    component: HomePage,
  },
  {
    name: "My History",
    url: "/my/history",
    component: HomePage,
  },
];

const Wrapper = ({ component: Component, ...rest }) => {
  return (props) => <Component {...props} {...rest} />;
};
const ioc = initializeIOC();
function App() {
  return (
    <BrowserRouter>
      {routes.map(({ url, name, component }) => (
        <React.Fragment key={name}>
          <Route
            path={url}
            exact
            component={Wrapper({ component, navElements: routes, ioc })}
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
