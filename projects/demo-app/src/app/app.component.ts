import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  navbarLinks = [
    {
      name: 'Example with navbar',
      fragment: 'example-with-navbar'
    },
    {
      name: 'Example with navbar and sidebar',
      fragment: 'example-with-navbar-and-sidebar'
    },
    {
      name: 'Example with list-group',
      fragment: 'example-with-list-group'
    },
    {
      name: 'Example with nested list-group',
      fragment: 'example-with-nested-list-group'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
