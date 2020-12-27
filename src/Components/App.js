import React from "react";
import Router from "Components/Router";
import GlobalStyles from "Styles/GlobalStyles";

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
