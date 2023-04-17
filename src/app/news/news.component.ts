import { Component, NgModule } from '@angular/core';
import { NewsService } from '../services/news.service';
import { SnackbarService } from '../shared/snackbar.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  news: Array<any> = [];

  constructor(private newsService: NewsService, private snackbarService: SnackbarService) {}

  ngOnInit(): void{
    this.snackbarService.show(['Itt találod az általános híreket.'], 'red-snackbar');
    this.newsService.getAllNews().subscribe((news) => {
      this.news = news;
    })
  }

}
