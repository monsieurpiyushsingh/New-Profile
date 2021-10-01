window.onload = function () {
  const loader = document.querySelector(" .preloader");
  loader.className += " hidden"; //class "loader hidden"

  let imagesToLoad = document.querySelectorAll('img[data-src]');
  const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
      image.removeAttribute('data-src');
    };
  };
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
};
