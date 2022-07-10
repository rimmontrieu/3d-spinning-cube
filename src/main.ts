
import ImageQuery from './ImageQuery';
import SpinningCube3D from './SpinningCube3D'
import './style.css'

const API_KEY = "YOUR_API_KEY";

let currentImageSet:any = [];

// Init 3D cub
const cube = new SpinningCube3D();

// Init image query component
const iq = new ImageQuery(API_KEY)

// Setup image input element
const imageInput = document.querySelector('.image-input') as HTMLInputElement;
imageInput!.addEventListener('change', () => {

  iq.query(imageInput.value, (data) => {

    currentImageSet = data.hits;
    if (currentImageSet[0]) cube.load(currentImageSet[0].webformatURL);
  });
});

// Select all text on click
imageInput.addEventListener('click', () => {
  imageInput.select();
});

// Load random image in the set while clicking on body element
cube.el.addEventListener('click', () => {

  const index = Math.floor(Math.random() * currentImageSet.length);
  if (!currentImageSet[index]) return;
  cube.load(currentImageSet[index].webformatURL);
});

// Start rotation animation
cube.startAnimate();
