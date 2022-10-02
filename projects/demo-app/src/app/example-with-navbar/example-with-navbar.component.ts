import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpyDirective, SpyTargetDirective, SpyTargetContainerDirective } from '@thejlifex/ngx-scroll-spy';
import { LoremIpsumPipe } from '../lorem-ipsum.pipe';

@Component({
  selector: 'app-example-with-navbar',
  standalone: true,
  imports: [
    CommonModule,
    SpyDirective,
    SpyTargetDirective,
    SpyTargetContainerDirective,
    LoremIpsumPipe
  ],
  templateUrl: './example-with-navbar.component.html',
  styleUrls: ['./example-with-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleWithNavbarComponent implements OnInit {

  exampleNavBar = {
    title: 'Navbar',
    spyTargetContainerId: 'navbar',
    spyActiveClass: 'active',
    items: [
      {
        name: 'Home',
        fragment: 'home'
      },
      {
        name: 'Features',
        fragment: 'features'
      },
      {
        name: 'Pricing',
        fragment: 'pricing'
      },
      {
        name: 'About us',
        fragment: 'about-us'
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
