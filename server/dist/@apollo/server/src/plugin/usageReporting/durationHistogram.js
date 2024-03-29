class DurationHistogram {
    toArray() {
        let bufferedZeroes = 0;
        const outputArray = [];
        for (const value of this.buckets) {
            if (value === 0) {
                bufferedZeroes++;
            }
            else {
                if (bufferedZeroes === 1) {
                    outputArray.push(0);
                }
                else if (bufferedZeroes !== 0) {
                    outputArray.push(-bufferedZeroes);
                }
                outputArray.push(Math.floor(value));
                bufferedZeroes = 0;
            }
        }
        return outputArray;
    }
    static durationToBucket(durationNs) {
        const log = Math.log(durationNs / 1000.0);
        const unboundedBucket = Math.ceil(log / DurationHistogram.EXPONENT_LOG);
        // Compare <= 0 to catch -0 and -infinity
        return unboundedBucket <= 0 || Number.isNaN(unboundedBucket)
            ? 0
            : unboundedBucket >= DurationHistogram.BUCKET_COUNT
                ? DurationHistogram.BUCKET_COUNT - 1
                : unboundedBucket;
    }
    incrementDuration(durationNs, value = 1) {
        this.incrementBucket(DurationHistogram.durationToBucket(durationNs), value);
        return this;
    }
    incrementBucket(bucket, value = 1) {
        if (bucket >= DurationHistogram.BUCKET_COUNT) {
            // Since we don't have fixed size arrays I'd rather throw the error manually
            throw Error('Bucket is out of bounds of the buckets array');
        }
        // Extend the array if we haven't gotten it long enough to handle the new bucket
        if (bucket >= this.buckets.length) {
            const oldLength = this.buckets.length;
            this.buckets.length = bucket + 1;
            this.buckets.fill(0, oldLength);
        }
        this.buckets[bucket] += value;
    }
    combine(otherHistogram) {
        for (let i = 0; i < otherHistogram.buckets.length; i++) {
            this.incrementBucket(i, otherHistogram.buckets[i]);
        }
    }
    constructor(options) {
        const initSize = options?.initSize || 74;
        const buckets = options?.buckets;
        const arrayInitSize = Math.max(buckets?.length || 0, initSize);
        this.buckets = Array(arrayInitSize).fill(0);
        if (buckets) {
            buckets.forEach((val, index) => (this.buckets[index] = val));
        }
    }
}
DurationHistogram.BUCKET_COUNT = 384;
DurationHistogram.EXPONENT_LOG = Math.log(1.1);
export { DurationHistogram };
