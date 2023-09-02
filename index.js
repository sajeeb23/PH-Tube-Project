let videoCardContainer = [];

const handleCategory = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");
  
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button onclick="handleLoadVideos(${category.category_id})" class="btn btn-active hover:bg-[#FF1F3D]">
        <a class="tab hover:text-white">${category.category}</a>
      </button>
    `;
    tabContainer.appendChild(div);
  });
  
  const sortByViewsButton = document.getElementById('sort-button');
  sortByViewsButton.addEventListener('click', () => {
    sortByViews();
  });
};

const handleLoadVideos = async (categoryID) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`);
  const data = await response.json();
  videoCardContainer = data.data;
  videos(videoCardContainer);
};

const videos = (videosCondition) => {
  const videoCard = document.getElementById("vdo-card");
  videoCard.innerHTML = "";

  if (videosCondition.length === 0) {
    videoCard.innerHTML = `
      <div class="flex flex-col container md:mx-64 lg:mx-96 my-20 lg:my-48 items-center text-center">
        <img src="./img/Icon.png" class="lg:w-3/5" alt="">
        <p class="font-bold text-2xl">Oops!! Sorry, There is no content here</p>
      </div>
    `;
  } else {
    videosCondition.forEach((video) => {
      const div = document.createElement('div');
      const hours = Math.floor(video.others?.posted_date / 3600);
      const minutes = Math.floor((video.others?.posted_date % 3600) / 60);
      const time = (hours > 0 || minutes > 0) ? `${hours} hours and ${minutes} minutes` :"";
      
      const verifiedIcon = video.authors[0].verified ? '<img src="./img/verified.png" class="w-5" alt=""></img>' : '';
      
      div.innerHTML = `
        <div class="card card-compact mx-auto w-11/12 h-3/4 bg-base-100 shadow-xl hover:cursor-pointer hover:animate-pulse">
          <figure>
            <p class="absolute top-16 left-36 md:top-14 md:left-11 lg:top-28 lg:left-36 bg-black text-white p-2 rounded">${time}</p>
            <img src="${video.thumbnail}" alt="Shoes" />
          </figure>
          <div class="card-body">
            <div class="flex flex-col">
              <div class="avatar gap-3">
                <div class="w-8 rounded-full">
                  <img src="${video?.authors[0].profile_picture}" />
                </div>
                <h2 class="card-title">${video?.title}</h2>
              </div>
              <div class="mt-2">
                <p class="flex flex-row gap-1">${video.authors[0].profile_name} ${verifiedIcon}</p>
              </div>
              <p class="mt-2">${video.others?.views} views</p>
            </div>
          </div>
        </div>
      `;
      videoCard.appendChild(div);
    });
  }
};

const sortByViews = () => {
  videoCardContainer.sort((a, b) => {
    const viewsA = parseInt(a.others?.views, 10);
    const viewsB = parseInt(b.others?.views, 10);
    return viewsB - viewsA;
  });
  videos(videoCardContainer);
};

handleCategory();
handleLoadVideos("1000");
