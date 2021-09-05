let c = document.getElementById("project");
let ctx = c.getContext("2d");

let loadImage = (src, callback1) => {
  let img = document.createElement("img");
  img.onload = () => callback1(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) =>
  "project/images/" + animation + "/" + frameNumber + ".png";

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  backward: [1, 2, 3, 4, 5, 6],
  forward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  punch2: [1, 2, 3, 4, 5, 6, 7],
};

let loadImages = (callback2) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    block: [],
    backward: [],
    forward: [],
    punch2: [],
  };
  imagesToLoad = 0;

  ["idle", "kick", "punch", "block", "backward", "forward", "punch2"].forEach(
    (animation) => {
      let animationFrames = frames[animation];
      imagesToLoad += animationFrames.length;

      animationFrames.forEach((frameNumber) => {
        let path = imagePath(frameNumber, animation);

        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          if (--imagesToLoad === 0) callback2(images);
        });
      });
    }
  );
};

let animate = (ctx, images, animation, callback3) => {
  images[animation].forEach((image, index) =>
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      let fn2 = index % 7;
      //if (fn2 > 6) fn2 = 0;
      ctx.drawImage(images.punch2[fn2], 100, 0, 475, 500);

      ctx.drawImage(image, 0, 0, 375, 500);
    }, index * 100)
  );
  setTimeout(callback3, images[animation].length * 100);
};

loadImages((images) => {
  let quAnimations = [];

  let aux = () => {
    let selectedAnimation;
    if (quAnimations.length === 0) selectedAnimation = "idle";
    else selectedAnimation = quAnimations.shift();

    animate(ctx, images, selectedAnimation, aux);
  };

  aux();

  document.getElementById("kick").onclick = () => quAnimations.push("kick");
  document.getElementById("punch").onclick = () => quAnimations.push("punch");
  document.getElementById("backward").onclick = () =>
    quAnimations.push("backward");
  document.getElementById("forward").onclick = () =>
    quAnimations.push("forward");
  document.getElementById("block").onclick = () => quAnimations.push("block");
  //quAnimations.push("punch2");

  document.addEventListener("keyup", (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"

    if (key === "ArrowLeft") quAnimations.push("kick");
    else if (key === "ArrowRight") quAnimations.push("punch");
    else if (key === "ArrowUp") quAnimations.push("forward");
    else if (key === "ArrowDown") quAnimations.push("backward");
    else if (key === "B" || key === "b") quAnimations.push("block");
  });
});