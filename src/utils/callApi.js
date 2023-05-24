import request from 'superagent';

import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import each from 'lodash/each';

const noop = () => { };
const apiBase = `${window.location.origin}`;

const callApi = ({ api = '', type = 'POST', data = {}, success = noop, error = noop }) => {
  request(type, apiBase + api)
    .type('form')
    .withCredentials()
    .send(toFlattenMap(data))
    .end((err, res) => {
      if (err || !res.ok) {
        error(err);
      } else {
        // http res code is 200
        if (res.body.errorCode === 200) {
          // normal
          const stringifiedBigNumber = res.text.replace(/([^\\])":(\d{15,})/g, '$1":"$2"');
          const body = JSON.parse(stringifiedBigNumber);
          success(body.response);
        } else {
          if (error) {
            error(res.body);
          } else {
            console.warn(res.body.errorDescription);
          }
        }
      }
    });
};

export default callApi;


function prepend(prefix, name, separator) {
  if (prefix) {
    if (separator) {
      return prefix + "." + name;
    }
    return prefix + name;
  }
  return name;
}

function flatten(prefix, obj, map) {
  if (obj) {
    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        var item = obj[i];
        flatten(prepend(prefix, "[" + i + "]", false), item, map);
      }
    } else if (isPlainObject(obj)) {
      if (obj['__type__'] === 'map') {
        each(obj, function (propertyObject, propertyName) {
          if (propertyName !== '__type__') {
            flatten(prepend(prefix, "[" + propertyName + "]", false), propertyObject, map);
          }
        });
      } else {
        each(obj, function (propertyObject, propertyName) {
          flatten(prepend(prefix, propertyName, true), propertyObject, map);
        });
      }
    }
    else {
      map[prefix] = obj;
    }
  }
}

function toFlattenMap(obj) {
  var map = {};

  flatten(null, obj, map);
  return map;
}
