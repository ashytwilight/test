function getNumberIntervals(obj) {
  var dict = {};
  var ans = { overlap: [], notInclude: [] };

  obj.forEach(arr => {
    var a = arr[0],
      b = arr[1];
    for (let i = a; i <= b; i++) {
      if (!dict[i]) {
        dict[i] = 1;
      } else {
        dict[i] += 1;
      }
    }
  });

  //處理overlap
  var overlap_start = null;
  var overlap_end = null;
  for (let key in dict) {
    if (dict[key] > 1) {
      if (overlap_start) {
        overlap_end = key;
      } else {
        overlap_start = key;
        overlap_end = key;
      }
    } else {
      let temp = [overlap_start, overlap_end];
      if (temp[0]) {
        ans.overlap.push(temp);
      }

      overlap_start = null;
      overlap_end = null;
    }
  }

  //處理notinclude
  var notInclude_start = null;
  var notInclude_end = null;

  for (let i = 0; i <= 20; i++) {
    if (!dict[i]) {
      if (notInclude_start === null) {
        notInclude_start = i;
      }
      notInclude_end = i;
    } else if (notInclude_start !== null) {
      ans.notInclude.push([notInclude_start, notInclude_end]);
      notInclude_start = null;
      notInclude_end = null;
    }
  }
  if (notInclude_start !== null) {
    ans.notInclude.push([notInclude_start, notInclude_end]);
  }
}
