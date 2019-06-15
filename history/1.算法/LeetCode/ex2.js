
/*
    https://leetcode.com/problems/add-two-numbers/
*/

// var deepth = 0;

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var addTwoNumbers = function(l1, l2) {
    // if(deepth > 10) return;
    var r = null, t = null, inc = arguments[2] || 0, emptyNode = new ListNode(0);

    if(
        (l1 instanceof Object  && l1.hasOwnProperty('val')) ||
        (l2 instanceof Object && l2.hasOwnProperty('val')) ||
         inc
    ) {
        l1 = l1 || emptyNode;
        l2 = l2 || emptyNode;

        if(!r) {
            r = new ListNode((l1.val + l2.val + inc) % 10);
            t = r;
        }

        t.next =  addTwoNumbers(l1.next, l2.next, parseInt((l1.val + l2.val + inc) / 10))
    }
    // deepth ++;
    return r;
};

var factory  = (function() {
    return {
        produce: function(arr) {
            var start;
            for (var i = 0; i < arr.length; i++) {
                if(!start) {
                    start = new ListNode(arr[i]);
                    current = start;
                }
                if(i < arr.length - 1) {
                    current.next = new ListNode(arr[i + 1]);
                    current = current.next;
                }
            };
            return start;
        },
        print: function(prefix, node) {
            var r = '';
            while(node) {
                r += ',' + node.val;
                node = node.next;
            }
            r = r.substring(1, r.length);
            console.log(prefix + ': '  + r);
        }
    };
})();

var test = function(arr1, arr2) {
    var nodeList1 = factory.produce(arr1);
    factory.print('nodeList1', nodeList1);
    var nodeList2 = factory.produce(arr2);
    factory.print('nodeList2', nodeList2);
    var nodeList3 = addTwoNumbers(nodeList1, nodeList2);
    factory.print('nodeList3', nodeList3);
}

test([0], [0]);
test([5], [5]);
test([7,0,3,6,7,3,2,1,5], [9,2,5,5,6,1,2,2,4]);