import { html, render } from './node_modules/lit-html/lit-html.js';

const grid = document.getElementById('box');

const response = await fetch('./data.json');
const data = await response.json();

document.querySelector('.activity').addEventListener('click',(e)=>{
    if(e.target.tagName === 'P') {
        let activity = e.target.textContent.toLowerCase();
        let paragraphs = [...e.target.parentNode.querySelectorAll('p')];
        paragraphs.forEach(p=>{
            if (p.textContent.toLowerCase() === activity) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');

            }
        })        

        render(data.map(d=>cardTemplate(d,activity)),grid);
    }
})



const cardTemplate = ({title,timeframes},choice='daily') => html`
    <div class="card-wrapper">
        <div class='card-body'>
            <p>${title}</p>
            <p>${timeframes[choice].current}hrs</p>
            <p>Last week - ${timeframes[choice].previous}hrs</p>
            <img src="/images/icon-ellipsis.svg">
        </div>
    </div>
    `

render(data.map(d => cardTemplate(d)), grid)