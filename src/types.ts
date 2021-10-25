export type Options = Readonly<{
    regexp: string | undefined;
}>

export type TestFunction = () => void;

export type TestResult = Readonly<{
    succeeded: boolean;
    funcName: string;
}>;