import { Component, Input } from "@angular/core";
import { BlogPost } from "../../models/blog-post";

@Component({
  selector: "app-blog-post",
  templateUrl: "./blog-post.component.html",
  styleUrls: ["./blog-post.component.scss"]
})
export class BlogPostComponent {
  //region Properties

  @Input() blogPostList: BlogPost[];

  //endregion
}
