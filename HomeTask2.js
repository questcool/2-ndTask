function makeObjectDeepCopy(obj) {
    
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Array) {
        let copy = [];
        for (let i = 0; i < obj.length; i++) {
            copy[i] = makeObjectDeepCopy(obj[i]);
        }
        return copy;
    }

    if (obj instanceof Object) {
        let copy = {};
        for (let field in obj) {
            if (obj.hasOwnProperty(field)) {
                copy[field] = makeObjectDeepCopy(obj[field]);
            }
        }
        return copy;
    }
}

function selectFromInterval(arr, int1, int2){

    if(!Array.isArray(arr) || arr.some((item) => (!Number.isInteger(item)))) {
        throw new Error('Array is not valid or not an array')
    }

    if(!int1 || !int2 || !Number.isInteger(int1) || !Number.isInteger(int2)){
        throw new Error('Interval is not valid')
    }

    let result = arr.filter((item)=> {
        if(item >= (int1 > int2 ? int2 : int1) && item <= (int1 > int2 ? int1 : int2)){
            return item;
        }
    });
    return result;
}

const myIterable = {
    from: 1,
    to: 6,

    [Symbol.iterator]() {

        if (!Number.isInteger(this.from) 
        || !Number.isInteger(this.to) 
        || !this.hasOwnProperty('from') 
        || !this.hasOwnProperty('to') 
        || this.to<this.from) {
            throw new Error('My Error')
        }

        this.current = this.from;
        return this;
      },
    
      next() {
        if (this.current <= this.to) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
}