import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpyDirective, SpyTargetDirective, SpyTargetContainerDirective } from '@thejlifex/ngx-scroll-spy';
import { LoremIpsumPipe } from '../lorem-ipsum.pipe';

@Component({
  selector: 'app-example-with-navbar-and-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SpyDirective,
    SpyTargetDirective,
    SpyTargetContainerDirective,
    LoremIpsumPipe
  ],
  templateUrl: './example-with-navbar-and-sidebar.component.html',
  styleUrls: ['./example-with-navbar-and-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleWithNavbarAndSidebarComponent implements OnInit {

  exampleNavBarAndSideBar = {
    title: 'Navbar and sidebar',
    spyTargetContainerId: 'navbar-sidebar',
    spyActiveClass: 'active',
    navBarItems: [
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
    ],
    sidebarItems: [
      {
        name: 'Pricing section 1',
        fragment: 'pricing-section-1'
      },
      {
        name: 'Pricing section 2',
        fragment: 'pricing-section-2'
      },
      {
        name: 'Pricing section 3',
        fragment: 'pricing-section-3'
      },
      {
        name: 'Pricing section 4',
        fragment: 'pricing-section-4'
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
