import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const render = (Component) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

setTimeout(() => render(App), 2500);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
