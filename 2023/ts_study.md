
原文: https://juejin.cn/post/7193917621069152311

>实现Readonly，接收一个泛型参数，并返回一个完全一样的类型，只是所有属性都会被readonly所修饰。

    type MyReadonly<T> = {
       readonly [P in keyof T] : T[P]
    }

    interface Todo {
      title: string;
      description: string;
    }

    const todoObj: MyReadonly<Todo> = {
      title: "Hey",
      description: "foobar",
    };

    console.log(todoObj.title)
    todoObj.description = "barFoo"; 
    // Error: cannot reassign a readonly property

>实现First，他接受一个数组 T 并返回它的第一个元素类型

    type First<T extends any[]> = T extends [] ? never : T[0];

    type arr1 = ['a', 'b', 'c']
    type arr2 = [3, 2, 1]

    type head1 = First<arr1> // expected to be 'a'
    type head2 = First<arr2> // expected to be 3

>实现TupleToObject，传入元组类型，将元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

    type TupleToObject<T extends readonly any[]> = {
      [P in T[number]]: P;
    };

    const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

    type result = TupleToObject<typeof tuple>; 
    // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

>创建一个通用的Length，接受一个readonly的数组，返回这个数组的长度。

    type Length<T extends readonly unknown[]> = T["length"];

    type tesla = ["tesla", "model 3", "model X", "model Y"];
    type spaceX = [
       "FALCON 9",
       "FALCON HEAVY",
       "DRAGON",
       "STARSHIP",
       "HUMAN SPACEFLIGHT"
    ];

    type teslaLength = Length<tesla>; // expected 4
    type spaceXLength = Length<spaceX>; // expected 5

>从联合类型T中排除U的类型成员，来构造一个新的类型。

    type MyExclude<T, U> = T extends U ? never : T;

    type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'

>假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。<br/>
例如：Promise，请你返回 ExampleType 类型。
    
    type MyAwaited<T> = T extends PromiseLike<infer R> ? MyAwaited<R> : T

    type ExampleType = Promise<string>

    type Results = MyAwaited<ExampleType> // string

>实现一个 IF 类型，它接收一个条件类型 C ，一个判断为真时的返回类型 T ，以及一个判断为假时的返回类型 F。 C 只能是 true 或者 false， T 和 F 可以是任意类型。

    type If<C extends boolean, T, F> = C extends true ? T : F;

    type A = If<true, "a", "b">; // expected to be 'a'
    type B = If<false, "a", "b">; // expected to be 'b'

>在类型系统里实现 JavaScript 内置的 Array.concat 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

    type Concat<T extends any[], U extends any[]> = [...T, ...U];

    type ResultConcat = Concat<[1], [2]>; // expected to be [1, 2]

>实现 Array.includes 方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false。

    type Includes<T extends readonly any[], U> =  U extends T[number] ? true : false

    type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Esidisi'> // expected to be `false`

>实现通用的Array.push类型。

    type Push<T extends readonly unknown[], U> = [...T, U];

    type Resulted = Push<[1, 2], "3">; // [1, 2, '3']

>实现类型 Array.unshift类型。

    type Unshift<T extends readonly unknown[], U> = [U, ...T];

    type UnshiftList = Unshift<[1, 2], 0>; // [0, 1, 2,]
>实现内置的 Parameters 类型。

    type MyParameters<T extends (...args: any[]) => any> = T extends (
       ...args: infer U
    ) => any ? U : never;

    const foo = (arg1: string, arg2: number): void => {};

    type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]


>不使用 ReturnType 实现 TypeScript 的 ReturnType 泛型。

    type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

    const fn = (v: boolean) => {
      if (v) return 1;
      else return 2;
    };

    type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"

>不使用 Omit 实现 TypeScript 的 Omit<T, K> 泛型。Omit 会创建一个省略 K 中字段的 T 对象。

    type MyOmit<T, K extends keyof any> = {
      [key in Exclude<keyof T, K>]: T[key];
    };

    interface Todo {
      title: string;
      description: string;
      completed: boolean;
    }

    type TodoPreview = MyOmit<Todo, "description" | "title">;

    const todo: TodoPreview = {
      completed: false,
    };

>实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。 K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly一样。

    type MyReadonly2<T, K extends keyof T = keyof T> = {
      readonly [P in K]: T[P];
    } & {
      [P in Exclude<keyof T, K>]: T[P];
    };

    interface Todo {
      title: string;
      description: string;
      completed: boolean;
    }

    const todos: MyReadonly2<Todo, "title" | "description"> = {
      title: "Hey",
      description: "foobar",
      completed: false,
    };

    todos.title = "Hello"; // Error: cannot reassign a readonly property
    todos.description = "barFoo"; // Error: cannot reassign a readonly property
    todos.completed = true; // OK

>实现一个通用的DeepReadonly，它将对象的每个参数及其子对象递归地设为只读。

    type DeepReadonly<T> = T extends Function
      ? T
      : {
          readonly [K in keyof T]: K extends Object ? DeepReadonly<T[K]> : T[K];
        };

    type X = {
      x: {
        a: 1;
        b: "hi";
      };
      y: "hey";
    };

    type Expected = {
      readonly x: {
        readonly a: 1;
        readonly b: "hi";
      };
      readonly y: "hey";
    };

    type Todo = DeepReadonly<X>; // should be same as `Expected`

>实现泛型TupleToUnion，它返回元组所有值的合集。

    type TupleToUnion<T extends unknown[]> = T[number]

    type Arr = ['1', '2', '3']

    type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'

>实现一个Last，它接受一个数组T并返回其最后一个元素的类型。

    type Last<T extends unknown[]> = T extends [...unknown[], infer R] ? R : never

    type arr1 = ['a', 'b', 'c']
    type arr2 = [3, 2, 1]

    type tail1 = Last<arr1> // expected to be 'c'
    type tail2 = Last<arr2> // expected to be 1

