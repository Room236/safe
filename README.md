# Safe

Undefined-safety for TypeScript/JavaScript

## Example

```typescript
import {safe} from '@room236/safe';

class Foo {
    public bar: string|undefined;

    public calculateImportantValue(): number|undefined {
        return null;
    }

    public getRandomNumber(): number {
        return 4; // chosen by fair dice roll.
                  // guaranteed to be random.
    }

    public throwError(): void {
        throw new Error('This method throws an error.');
    }

}


const foo = new Foo();
safe(() => foo.bar);                            // returns undefined
safe(() => foo.nonExistentValue);               // returns undefined
safe(() => foo.nonExistentValue.doSomething()); // returns undefined
safe(() => foo.nonExistentValue, -1);           // returns -1
safe(() => foo.calculateImportantValue());      // returns null
safe(() => foo.getRandomNumber());              // returns 4
safe(() => foo.throwError());                   // throws Error
```

## Changelog

### 1.0.1
* Added this README

### 1.0.0
* Added the `safe()` function
