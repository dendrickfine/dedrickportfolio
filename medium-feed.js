// Fetch Medium RSS feed and display the posts
const mediumRSSFeed = "https://medium.com/feed/@arsenaltimeline";
const rssToJsonAPI = `https://api.rss2json.com/v1/api.json?rss_url=${mediumRSSFeed}`;

fetch(rssToJsonAPI)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch Medium feed");
    }
    return response.json();
  })
  .then((data) => {
    const posts = data.items; // Extract posts from the response
    const container = document.getElementById("medium-feed");

    if (posts.length === 0) {
      container.innerHTML = "<p>No posts found on Medium.</p>";
      return;
    }

    // Loop through each post and create HTML structure
    posts.forEach((post) => {
      const article = document.createElement("div");
      article.className = "medium-post";
      article.innerHTML = `
        <h3><a href="${post.link}" target="_blank">${post.title}</a></h3>
        <p>${post.description.substring(0, 400)}...</p>
        <a href="${post.link}" target="_blank">Read More</a>
      `;
      container.appendChild(article);
    });
  })
  .catch((error) => {
    console.error("Error fetching Medium feed:", error);
    const container = document.getElementById("medium-feed");
    container.innerHTML = "<p>Failed to load Medium posts. Please try again later.</p>";
  });
