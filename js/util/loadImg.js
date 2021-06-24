export default async function loadImages(imageUrlArray) {
    const promiseArray = []; // create an array for promises
    const imageObj = {}; // array for the images
    for (const imageName in imageUrlArray) {
        promiseArray.push(new Promise((resolve) => {
            const img = new Image();
            // if you don't need to do anything when the image loads,
            // then you can just write img.onload = resolve;
            img.onload = function () {
                // do stuff with the image if necessary
                // resolve the promise, indicating that the image has been loaded
                resolve();
            };
            img.onerror = function () {
                alert("Images Failed, throwing error");
                console.log("Images Failed to load");
                throw "Err, Images Failed To Load";
            };
            img.src = imageUrlArray[imageName];
            imageObj[imageName] = img;
        }));
    }
    await Promise.all(promiseArray); // wait for all the images to be loaded
    console.log("all images loaded");
    return imageObj;
}
//# sourceMappingURL=loadImg.js.map