import ReactDOM from 'react-dom';
import Router from './Router.jsx';

const bootstrap = () => {
    ReactDOM.render(Router, document.getElementById('app'));
};
bootstrap();
