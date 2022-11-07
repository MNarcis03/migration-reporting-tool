import { afterMethod, beforeMethod, Metadata } from "kaop-ts"

const UserAction = (action: string) => {
    return () => {
        console.info(`Action done: ${action}`);
    }
}

const EnteringMethodAspect = () => {
    return (meta: Metadata<any>) => {
        const methodName = `${meta.target.constructor.name}::${meta.method.name}`;
        const args = JSON.stringify(meta.args);
        console.info(`Entering ${methodName} with parameters ${args}`);
    }
}

const ExitingMethodAspect = () => {
    return (meta: Metadata<any>) => {
        const methodName = `${meta.target.constructor.name}::${meta.method.name}`;
        const result = JSON.stringify(meta.result);
        console.info(`Exiting ${methodName} with result: ${result}`);
    }
}

export function ActionLog(action: string) {
    return afterMethod(UserAction(action));
}
export const EnteringLog = beforeMethod(EnteringMethodAspect());

export const ExitingLog = afterMethod(ExitingMethodAspect());

