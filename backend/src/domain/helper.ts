export const mongooseClean = (obj: Record<string, any>) => {
  const { _id, __v, ...rest } = obj;
  return { ...rest, id: _id };
};
