import {GeoJSONRenderer} from '../../src/index';
import {DotMap} from "../../src/dot-map/dotMap";

const input1 = document.createElement('input');
const input2 = document.createElement('input');
const button1 = document.createElement('button');

button1.addEventListener('click',(event) => {
    const value1 = input1.value;
    const value2 = input2.value;
    // app.move(parseInt(value1), parseInt(value2));
});
input1.type = "number";
input2.type = "number";
button1.innerText = "move";
document.body.appendChild(input1);
document.body.appendChild(input2);
document.body.appendChild(button1);

const dotMap = new DotMap().attaching(document.body);

