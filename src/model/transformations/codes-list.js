import { QUESTION_TYPE_ENUM } from 'constants/pogues-constants';
import { uuid } from 'utils/utils';

const { MULTIPLE_CHOICE } = QUESTION_TYPE_ENUM;
/**
 *
 * @param {*} codes The list of codes
 */
export function sortByWeight(codes) {
  return (code1, code2) => {
    const weight1 = codes[code1].weight;
    const weight2 = codes[code2].weight;
    if (weight1 < weight2) return -1;
    if (weight1 > weight2) return 1;
    return 0;
  };
}
export function remoteToCodesState(codes, parent = '', depth = 1) {
  return codes
    .filter(c => c.Parent === parent)
    .reduce((acc, c, index) => {
      const codeState = {
        value: c.Value,
        label: c.Label,
        parent: c.Parent,
        depth,
        weight: index + 1,
      };
      if (c.Precisionid) {
        codeState.precisionid = c.Precisionid;
        codeState.precisionlabel = c.Precisionlabel;
        codeState.precisionsize = c.Precisionsize;
      }
      return {
        ...acc,
        [codeState.value]: codeState,
        ...remoteToCodesState(codes, codeState.value, depth + 1),
      };
    }, {});
}
export function getcodelistwithclarification(remote, variableclarification) {
  remote.forEach(codelist => {
    variableclarification.forEach(clarif => {
      if (clarif.codelistid === codelist.id) {
        let index = 0;
        if (clarif.type === MULTIPLE_CHOICE) {
          index = parseInt(clarif.position);
        } else {
          index = codelist.Code.findIndex(
            code => code.Value === clarif.position,
          );
        }
        codelist.Code[parseInt(index)] = {
          ...codelist.Code[parseInt(index)],
          Precisionid: clarif.responseclar.Name,
          Precisionlabel: clarif.responseclar.Label,
          Precisionsize: clarif.responseclar.Response[0].Datatype.MaxLength,
        };
      }
    });
  });
  return remote;
}
export function remoteToStore(remote, variableclarification) {
  const remotecode = getcodelistwithclarification(
    remote,
    variableclarification,
  );
  return remotecode.reduce((acc, codesList) => {
    const { id, Label: label, Code: codes } = codesList;
    return {
      ...acc,
      [id]: {
        id,
        label,
        codes: remoteToCodesState(codes),
        name: '',
      },
    };
  }, {});
}
export function remoteToState(remote) {
  return { id: remote };
}
/**
 * @param {*} codes The list of codes
 * @param {*} depth The depth of a code
 * @param {*} parent The parent code of another one
 */
function getCodesListSortedByDepthAndWeight(codes, depth = 1, parent = '') {
  return Object.keys(codes)
    .filter(code => codes[code].depth === depth)
    .filter(code => codes[code].parent === parent)
    .sort(sortByWeight(codes))
    .reduce(
      (acc, code) => [
        ...acc,
        code,
        ...getCodesListSortedByDepthAndWeight(codes, depth + 1, code),
      ],
      [],
    );
}
export function storeToRemote(store) {
  const codeList = [];
  Object.keys(store).map(key => {
    const { id, label, codes, duplicateCodeList } = store[key];
    const code = {
      id,
      Label: label,
      Name: '',
      Code: getCodesListSortedByDepthAndWeight(codes).map(keyCode => {
        const { label: labelCode, value, parent } = codes[keyCode];
        return {
          Label: labelCode,
          Value: value,
          Parent: parent,
        };
      }),
    };
    codeList.push(code);
    if (duplicateCodeList) {
      const codeDub = {
        id: uuid(),
        Label: `${label}_2`,
        Name: '',
        Code: getCodesListSortedByDepthAndWeight(codes).map(keyCode => {
          const { label: labelCode, value, parent } = codes[keyCode];
          return {
            Label: labelCode,
            Value: value,
            Parent: parent,
          };
        }),
      };
      codeList.push(codeDub);
    }
  });
  return codeList;
  // return Object.keys(store).map(key => {
  //   const { id, label, codes, duplicateCodeList } = store[key];
  //   const code = {
  //     id,
  //     Label: label,
  //     Name: '',
  //     Code: getCodesListSortedByDepthAndWeight(codes).map(keyCode => {
  //       const { label: labelCode, value, parent } = codes[keyCode];
  //       return {
  //         Label: labelCode,
  //         Value: value,
  //         Parent: parent,
  //       };
  //     }),
  //   };
  //   if (duplicateCodeList) {
  //     const codeDub = {
  //       id: uuid(),
  //       Label: `${label}_2`,
  //       Name: '',
  //       Code: getCodesListSortedByDepthAndWeight(codes).map(keyCode => {
  //         const { label: labelCode, value, parent } = codes[keyCode];
  //         return {
  //           Label: labelCode,
  //           Value: value,
  //           Parent: parent,
  //         };
  //       }),
  //     };
  //     console.log('store[key]', { code, codeDub });

  //     return code;
  //   } else {
  //     return code;
  //   }
  // });
}
