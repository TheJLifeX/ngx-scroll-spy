import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loremIpsum',
  standalone: true
})
export class LoremIpsumPipe implements PipeTransform {

  transform(count: number = 1): string {
    const loremIpsum: string = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate quidem repudiandae, aliquam mollitia reprehenderit nesciunt temporibus dolorum voluptatum dolorem accusamus saepe, doloremque eius quam, placeat aperiam assumenda recusandae quibusdam veniam!`;
    return loremIpsum.repeat(count);
  }
}
