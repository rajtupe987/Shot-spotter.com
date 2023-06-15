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

  var categories=["Wedding","Babies & Kids","Special Occasion","Commercial","Events","Fashion","Nature","Travel"]

  var index = 0;
  var sliderImage = document.querySelector(".slider-image");
  var category = document.getElementById("category");

  setInterval(function() {
    sliderImage.style.backgroundImage = "url('" + images[index] + "')";
    category.textContent = categories[index];
    index = (index + 1) % images.length;
  }, 5000);