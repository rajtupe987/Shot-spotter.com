var images = [
    "https://d3btuubl2bvm9d.cloudfront.net/images/2c9f8d6952b600c30152c4a9bff60025/1552548481006-web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/ebef5f883b2a11e3b6330e2f866a9102/1409833764181_web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/6a90c3b48b1a11e4ae4c0e2f866a9102/1419391423179_web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/89c6667bfeba11e3be570e2f866a9102/1460453036405-web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/2c9f848756a55ba40156c1b2a2860117/1472926761431-web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/dbdc4253eb0d11e3be570e2f866a9102/1488030734959-web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/2c9f84875922ae4c0159254f815a0011/1482499879830-web.jpg",
    "https://d3btuubl2bvm9d.cloudfront.net/images/2c9f84875892d5730158961b42ca0023/1479989585463-web.jpg"
    // Add more image URLs as needed
  ];

  var index = 0;
  var sliderImage = document.querySelector(".slider-image");
  var category = document.getElementById("category");

  setInterval(function() {
    sliderImage.style.backgroundImage = "url('" + images[index] + "')";
    index = (index + 1) % images.length;
  }, 3000);


  var categories = ["Wedding", "Babies", "Anniversary", "Commercial", "Events", "Fashion", "Nature", "Travel"];
  var currentIndex = 0;
  var categoryElement = $('#category');
  var forwards = true;
  var offset = 0;
  var speed = 110;
  var skip_count = 0;
  var skip_delay = 15;
  
  function wordFlick() {
    var currentCategory = categories[currentIndex];
    var part;
  
    if (forwards) {
      if (offset >= currentCategory.length) {
        ++skip_count;
        if (skip_count === skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    } else {
      if (offset === 0) {
        forwards = true;
        currentIndex = (currentIndex + 1) % categories.length;
      }
    }
  
    part = currentCategory.substr(0, offset);
    if (skip_count === 0) {
      if (forwards) {
        offset++;
      } else {
        offset--;
      }
    }
  
    categoryElement.text(part);
  
    if (offset === currentCategory.length && !forwards) {
      setTimeout(function() {
        wordFlick();
      }, 0); // Wait for 3 seconds before starting the next word flick
    } else {
      setTimeout(function() {
        wordFlick();
      }, speed);
    }
  }
  
  $(document).ready(function() {
    wordFlick(); // Start the word flick effect
  });
  