export function Transaction() {
  const test = function (target, name, descriptor): any {
    const targetMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const transactionSession = await this.connection.startSession();
      try {
        await transactionSession.startTransaction();

        const result = await targetMethod.apply(this, [
          ...args,
          transactionSession,
        ]);
        await transactionSession.commitTransaction();
        return result;
      } catch (err) {
        await transactionSession.abortTransaction();
        throw err;
      }
    };
    return descriptor;
  };
  return test;
}
