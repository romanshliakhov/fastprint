import './_vendor';
import vars from './_vars';
import './_components';



// lightgallery
let videoBlock = [...document.querySelectorAll('[data-modal="video"]')]

const videoInit = (items) => {
    for (const item of items) {
        lightGallery(item), {

            controls: 0,
        };
    }
}

if (videoBlock) {
    videoInit(videoBlock);
}










