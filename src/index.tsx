import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from './App';
import './styles/style.scss';
import 'antd/dist/antd.css';   
import './config/app.config';

const ROOT = document.querySelector('#app');

ReactDom.render(<App/>, ROOT);
