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

  loremIpsum: string = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate quidem repudiandae, aliquam mollitia reprehenderit nesciunt temporibus dolorum voluptatum dolorem accusamus saepe, doloremque eius quam, placeat aperiam assumenda recusandae quibusdam veniam!`;

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

  exampleListGroup = {
    spyTargetContainerId: 'list-group',
    spyActiveClass: 'active',
    items: [
      {
        name: 'FAQ section 1',
        fragment: 'faq-section-1'
      },
      {
        name: 'FAQ section 2',
        fragment: 'faq-section-2'
      },
      {
        name: 'FAQ section 3',
        fragment: 'faq-section-3'
      },
      {
        name: 'FAQ section 4',
        fragment: 'faq-section-4'
      }
    ]
  };

  exampleNestedListGroup = {
    spyTargetContainerId: 'nested-list-group',
    spyActiveClass: 'active',
    items: [
      {
        name: 'FAQ section 1',
        subItems: [
          {
            name: 'FAQ section 1.1',
            fragment: 'faq-section-1.1'
          },
          {
            name: 'FAQ section 1.2',
            fragment: 'faq-section-1.2'
          },
          {
            name: 'FAQ section 1.3',
            fragment: 'faq-section-1.3'
          }
        ],
        fragment: 'faq-section-1'
      },
      {
        name: 'FAQ section 2',
        subItems: [
          {
            name: 'FAQ section 2.1',
            fragment: 'faq-section-2.1'
          },
          {
            name: 'FAQ section 2.2',
            fragment: 'faq-section-2.2'
          }
        ],
        fragment: 'faq-section-2'
      },
      {
        name: 'FAQ section 3',
        fragment: 'faq-section-3'
      }
    ]
  };

  constructor() { }

  ngOnInit(): void { }
}
