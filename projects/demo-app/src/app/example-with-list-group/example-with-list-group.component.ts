import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpyDirective, SpyTargetDirective, SpyTargetContainerDirective } from '@thejlifex/ngx-scroll-spy';
import { LoremIpsumPipe } from '../lorem-ipsum.pipe';

@Component({
  selector: 'app-example-with-list-group',
  standalone: true,
  imports: [
    CommonModule,
    SpyDirective,
    SpyTargetDirective,
    SpyTargetContainerDirective,
    LoremIpsumPipe
  ],
  templateUrl: './example-with-list-group.component.html',
  styleUrls: ['./example-with-list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleWithListGroupComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
