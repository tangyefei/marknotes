/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var o = {}, num, match;
    for(var i = 0, l = nums.length; i < l; i ++) {
        num = nums[i];
        o[num] = o[num] || i;
        match = target - num;
        if(match >= 0 && o[match]) {
            return (o[num] < o[match] ? [o[num], o[match]] : [o[match], o[num]]);
        }
    }
};

console.log(twoSum([3,8,9,7], 12));
