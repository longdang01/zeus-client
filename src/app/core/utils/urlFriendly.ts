export const urlFriendly = () => {
    return function string_to_slug(str: any, sep: any) {
      sep = sep || '-';
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();
      
      // remove accents, swap ñ for n, etc
      var from = "àáäâầèéëêệếìíïîòóöôọùúüûụñç·/_,:;";
      var to   = "aaaaaeeeeeeiiiiooooouuuuunc------";
      for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
    
      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, sep) // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
    
      return str;
    }
  }
