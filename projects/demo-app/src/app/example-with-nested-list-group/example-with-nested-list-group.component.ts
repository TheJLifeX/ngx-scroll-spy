import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpyDirective, SpyTargetDirective, SpyTargetContainerDirective } from '@thejlifex/ngx-scroll-spy';
import { LoremIpsumPipe } from '../lorem-ipsum.pipe';

@Component({
  selector: 'app-example-with-nested-list-group',
  standalone: true,
  imports: [
    CommonModule,
    SpyDirective,
    SpyTargetDirective,
    SpyTargetContainerDirective,
    LoremIpsumPipe
  ],
  templateUrl: './example-with-nested-list-group.component.html',
  styleUrls: ['./example-with-nested-list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleWithNestedListGroupComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
