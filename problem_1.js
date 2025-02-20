var sum_to_n_a = function(n) {
    // Mathematical formula approach (most effecient ~ O(1) time)

    return (n * (n + 1)) / 2;
};

var sum_to_n_b = function(n) {
    // Two-pointer approach: Add two numbers at a time from both ends, takes O(n/2) ~ O(n) time

    let left = 1;
    let right = n;
    let count = 0;
    
    while (left <= right) { 
        if (left !== right) {
            count += left + right;
        } else {
            count += left;
        }     
        left++;
        right--;
    }
    return count;
};

var sum_to_n_c = function(n) {
    // Recursive approach: Calls function n times, taking O(n) time
    if (n === 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1); 
};
