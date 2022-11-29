import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'slugify'
})
export class SlugifyPipe implements PipeTransform {

  // transform(str: string): string {
  //   return this.isString(str)
  //     ? str.toLowerCase().trim()
  //       .replace(/[^\w\-]+/g, ' ')
  //       .replace(/\s+/g, '-')
  //     : str;
  // }
  // isString(value: any) {
  //   return typeof value === 'string';
  // }

  transform(str: string): string {
    let string: string = this.remove_accents(str);
    string = string.toLowerCase().trim().replace(/[^a-z0-9\s]/gi, '').replace(/[-\s]/g, '-');
    return string;
  }

  remove_accents(strAccents: any) {
    var strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents =    "ÀÁÂẦÃÄÅàáâầãäåÒÓÔÕÕÖØòóôõöøÈÉÊËỆèéêëệÇçðÐÌÍÎÏìíîïÙÚÛÜỤùúûüụÑñŠšŸÿýŽž";
    var accentsOut = "AAAAAAAaaaaaaaOOOOOOOooooooEEEEEeeeeeCcdDIIIIiiiiUUUUUuuuuuNnSsYyyZz";

    // var accents = "àáäâầèéëêệếìíïîòóöôọùúüûụñç·/_,:;";
    // var accentsOut   = "aaaaaeeeeeeiiiiooooouuuuunc------";
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
        } else
            strAccentsOut[y] = strAccents[y];
    }
    let result:string = strAccentsOut.join('');

    return result;
}

}