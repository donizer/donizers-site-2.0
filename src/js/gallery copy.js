const gBack = document.getElementById("gBack");
const gallery = document.getElementById("gallery");
const galleryItems = document.getElementsByClassName("gallery__item");
const baseRule34ApiURL =
  "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1";
const baseRule34ApiTagsURL =
  "https://api.rule34.xxx/index.php?page=dapi&s=tag&q=index";
const r34Filter = document.getElementById("r34Filter");
const r34Result = document.getElementById("r34Result");

let searchTags = document.getElementById("r34search").value;
let score = document.getElementById("score").value;

let sortBy = document.getElementById("sortBy").value;
let sortType = document.getElementById("sortType").value;

let gay = document.getElementById("gay").firstElementChild.id;
let futa = document.getElementById("futanari").firstElementChild.id;
let rating = document.getElementById("rating").firstElementChild.id;

let isModuleActive = false;
let isSample = true;

for (let i = 0; i < galleryItems.length; i++) {
  galleryItems[i].setAttribute("onclick", "galleryPreview(this)");
}

class GalleryItem {
  constructor(response) {
    this.width = response["width"];
    this.height = response["height"];
    this.dir = response["directory"];
    this.image = response["image"];
    this.preview_url = response["preview_url"];
    this.sample_url = response["sample_url"];
    this.file_url = response["file_url"];
    this.isMP4 =
      response["file_url"].split(".")[
        response["file_url"].split(".").length - 1
      ] === "mp4";
    this.owner = response["owner"];
    this.id = response["id"];
    this.score = response["score"];
  }
  static r0 = 0.333;
  static r1 = 0.85;
  static r2 = 1.5;
  static r3 = 2.5;
}
