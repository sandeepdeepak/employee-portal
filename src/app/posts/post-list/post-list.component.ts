import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent, MatDialog } from "@angular/material";
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from "../../auth/auth.service";
import { ViewMoreDetailsDialogComponent } from "../view-more-details-dialog/view-more-details-dialog.component";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  userIsAuthenticated = false;
  userId: string;
  role: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public dialog: MatDialog,
    public postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.role = this.authService.getRole();
    console.log(this.role, this.userId);
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: any; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
        console.log(this.posts);
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.role = this.authService.getRole();
        console.log(this.role);
      });
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(
      () => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  openMoreDetailsDialog(post) {
    const dialogRef = this.dialog.open(ViewMoreDetailsDialogComponent, {
      data: { post: post },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  onApply(postId: string, postData: any) {
    let post: any = {
      title: postData.title,
      company: postData.company,
      location: postData.location,
      time: postData.time,
      role: postData.role,
      description: postData.description,
      hour: postData.hour,
      creator: postData.creator,
    };

    this.postsService.applyPost(postId, post);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
