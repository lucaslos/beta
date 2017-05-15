const smallS = 'test';
const largeS = 'test.test.testtest.sjflkjsçlfjsçalfk.slkfjlsdfjlskjad.lskjflasjfdlksaj.slkfjslfjlsadjflk.jlsjflsjadflj.slkfjsjfsljflsf.sjdflsjflksjdaflks.dfjldskjfkdsajfçlkjsdlkfjldsakjelwakjflkjsçfj';
const smallNum = 1;
const largeNum = 1545465465165465165165494516516549845132165465456161.54654654654989841321645498765132165487651315464864213;
const elem = document.body;

var obj = {
  smallS,
  largeS,
  smallS1: smallS,
  largeS1: largeS,
  smallNum,
  largeNum,
  elem,
  largeNum,
  elem,
  smallNum,
}

function raw(
  param1,
  param2,
  param3,
  param4,
  param5,
  param6,
  param7,
  param8,
  param9,
  param10,
) {
  console.log(param1);
  console.log(param2);
  console.log(param3);
  console.log(param4);
  console.log(param5);
  console.log(param6);
  console.log(param7);
  console.log(param8);
  console.log(param9);
  console.log(param10);
}

function obj(obj) {
  console.log(obj.smallS);
  console.log(obj.largeS);
  console.log(obj.smallS);
  console.log(obj.largeS);
  console.log(obj.smallNum);
  console.log(obj.largeNum);
  console.log(obj.elem);
  console.log(obj.largeNum);
  console.log(obj.elem);
  console.log(obj.smallNum);
}
