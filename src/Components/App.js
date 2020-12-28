import React from "react";
import Router from "components/Router";
import GlobalStyles from "styles/globalStyles";

class App extends React.Component {
  render() {
    return (
      <>
        <Router />
        <GlobalStyles />
      </>
    );
  }
}

export default App;
