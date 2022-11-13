import { render } from '../../node_modules/lit-html/lit-html.js';
import { contactTemplate } from './templates/contactTemplate.js';
import { contacts } from './contacts.js';

render(contacts.map(contactTemplate), document.querySelector('#contacts'));
