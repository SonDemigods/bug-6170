import { fetchApi as fetchApiOrg} from 'ehome-utils';
import {getQueryParams} from 'utils'

function getCookie(cName) {
  let cStart, cEnd;
  if (document.cookie.length > 0) {
    cStart = document.cookie.indexOf(cName + '=');
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1;
      cEnd = document.cookie.indexOf(';', cStart);
      if (cEnd === -1) cEnd = document.cookie.length;
      return unescape(document.cookie.substring(cStart, cEnd));
    }
  }
  return '';
}

function fetchApi({
	data,
	...resetConfig
}
) {
  return fetchApiOrg({
    data:{...data,appId:getQueryParams()?.appId,namespaceId:getCookie('namespace_id')},
    // data:{...data,appId:'745',namespaceId:getCookie('namespace_id')},
    ...resetConfig
  })
}
export default fetchApi