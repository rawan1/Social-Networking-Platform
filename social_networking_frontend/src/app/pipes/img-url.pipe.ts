import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Pipe({
  name: 'imgUrl',
  standalone: true,
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: string | null): string {
    console.log(value);
    if (value && value.length > 0) {
      console.log(environment.apiUrl.substring(0, environment.apiUrl.indexOf("api")))
      return environment.apiUrl.substring(0, environment.apiUrl.indexOf("api")) + 'Storage/' + value;
    }
    return 'assets/img/noImg.jpg';
  }

}
