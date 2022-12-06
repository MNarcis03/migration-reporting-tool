const { beforeMethod, afterMethod } = require('kaop-ts');

const enteringMethodAspect = function(meta) {
  const methodName = `${ meta.target.constructor.name }::${ meta.method.name }`;
  const args = JSON.stringify(meta.args);

  console.info(`Entering ${ methodName } with parameters ${ args }!`);
}

const exitingMethodAspect = function(meta) {
  const methodName = `${ meta.target.constructor.name }::${ meta.method.name }`;
  const result = JSON.stringify(meta.result);
  console.info(`Exiting ${  methodName } with result ${ result }!`);
}

const EnteringLog = beforeMethod(enteringMethodAspect);
const ExitingLog = afterMethod(exitingMethodAspect);

module.exports = {
  EnteringLog,
  ExitingLog
};
