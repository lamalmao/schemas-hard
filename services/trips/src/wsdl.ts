import { readFileSync } from 'fs';
import { resolve } from 'path';

const wsdl = readFileSync(resolve('wsdl.xml')).toString();
export default wsdl;
